import os
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from werkzeug.utils import secure_filename
import trimesh

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'stl', 'obj'}
MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Create uploads directory if it doesn't exist
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy"}), 200

@app.route('/api/upload', methods=['POST'])
def upload_file():
    """Handle file upload"""
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        try:
            # Validate the 3D model file
            mesh = trimesh.load(filepath)
            stats = {
                "vertices": len(mesh.vertices),
                "faces": len(mesh.faces),
                "filename": filename
            }
            return jsonify({
                "message": "File uploaded successfully",
                "stats": stats
            }), 200
        except Exception as e:
            # If file validation fails, delete the file and return error
            os.remove(filepath)
            return jsonify({"error": f"Invalid 3D model file: {str(e)}"}), 400
    
    return jsonify({"error": "File type not allowed"}), 400

@app.route('/api/models', methods=['GET'])
def list_models():
    """List all available models"""
    files = []
    for filename in os.listdir(UPLOAD_FOLDER):
        if allowed_file(filename):
            files.append(filename)
    return jsonify({"models": files}), 200

@app.route('/api/models/<filename>', methods=['GET'])
def get_model(filename):
    """Retrieve a specific model file"""
    if not allowed_file(filename):
        return jsonify({"error": "Invalid file type"}), 400
    
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(filename))
    if not os.path.exists(filepath):
        return jsonify({"error": "File not found"}), 404
    
    return send_file(filepath)

@app.route('/api/convert', methods=['POST'])
def convert_model():
    """Convert model between supported formats"""
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    target_format = request.form.get('target_format', '').lower()
    
    if file.filename == '' or not allowed_file(file.filename):
        return jsonify({"error": "Invalid file"}), 400
    
    if target_format not in ALLOWED_EXTENSIONS:
        return jsonify({"error": "Invalid target format"}), 400
    
    try:
        # Load the model
        mesh = trimesh.load(file)
        
        # Create a temporary filename for the converted file
        original_name = secure_filename(file.filename)
        base_name = os.path.splitext(original_name)[0]
        new_filename = f"{base_name}_converted.{target_format}"
        output_path = os.path.join(app.config['UPLOAD_FOLDER'], new_filename)
        
        # Export in the target format
        mesh.export(output_path)
        
        return send_file(output_path, as_attachment=True)
    except Exception as e:
        return jsonify({"error": f"Conversion failed: {str(e)}"}), 400

if __name__ == '__main__':
    app.run(debug=True) 