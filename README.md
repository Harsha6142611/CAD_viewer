# CAD 3D Viewer

A web-based 3D CAD file viewer application that allows users to view and interact with CAD models directly in the browser.

## Features

- View 3D CAD models in the browser
- Support for common CAD file formats
- Interactive 3D model manipulation (rotate, zoom, pan)
- Responsive design for desktop and mobile devices

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- [Git](https://git-scm.com/)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Harsha6142611/CAD_viewer.git
```

2. Navigate to the project directory:
```bash
cd CAD_3d_viewer
```

3. Install dependencies:
```bash
npm install
```

## Running the Application

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

To build for production:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Technologies Used

- Next.js - React framework for production
- Three.js - 3D graphics library
- React Three Fiber - React renderer for Three.js
- TypeScript - For type safety
- Tailwind CSS - For styling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


##Backend
Flask API for handling file uploads and model retrieval.

## Running the Backend

To run the backend server, follow these steps:

1. Ensure you have Python 3.7 or higher installed.
2. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```
3. Set up your environment variables. You can create a `.env` file based on the `.env.example` provided.
4. Start the Flask application:
   ```bash
   flask run
   ```
5. The API will be available at `http://localhost:5000`.

## API Endpoints

- **Health Check**: `GET /api/health` - Check if the server is running.
- **Upload File**: `POST /api/upload` - Upload a 3D model file.
- **List Models**: `GET /api/models` - Retrieve a list of uploaded models.
- **Get Model**: `GET /api/models/<filename>` - Retrieve a specific model file.
- **Convert Model**: `POST /api/convert` - Convert a model to a different format.