# Coal Plant 3D Viewer

A web application for visualizing coal plant structures in 3D. This application allows users to upload JSON data files containing information about buildings, silos, equipment, and other structures in a coal plant, and view them in an interactive 3D environment.

## Features

- Upload JSON data files with plant structure information
- Interactive 3D visualization of plant structures
- Toggle visibility of different structure types
- Export data for sharing or backup
- Example data loader for demonstration

## Technologies Used

- Next.js
- React
- Three.js
- React Three Fiber
- React Dropzone
- TypeScript
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/coal-plant-3d-viewer.git
   cd coal-plant-3d-viewer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. On the home page, either:
   - Upload a JSON file with plant data
   - Click "Load Example Data" to see a demonstration

2. In the 3D viewer:
   - Use mouse to rotate the view
   - Scroll to zoom in/out
   - Use the controls panel to toggle visibility of different structure types
   - Click "Export Data" to download the current plant data as a JSON file

## JSON Data Format

The application expects JSON data in the following format:

```json
{
  "buildings": [
    {
      "id": "building1",
      "name": "Main Building",
      "position": { "x": 0, "y": 0, "z": 0 },
      "dimensions": { "width": 20, "height": 10, "depth": 30 }
    }
  ],
  "structures": [
    {
      "id": "silo1",
      "name": "Coal Silo 1",
      "type": "silo",
      "position": { "x": -15, "y": 0, "z": 10 },
      "dimensions": { "radius": 5, "height": 20 }
    },
    {
      "id": "conveyor1",
      "name": "Main Conveyor",
      "type": "equipment",
      "position": { "x": -5, "y": 5, "z": 0 },
      "dimensions": { "width": 2, "height": 1, "depth": 25 },
      "color": "#555555"
    }
  ],
  "misc": [
    {
      "id": "generator1",
      "name": "Generator",
      "position": { "x": 10, "y": 0, "z": 10 },
      "dimensions": { "width": 8, "height": 4, "depth": 8 },
      "color": "#AA4444"
    }
  ]
}
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Three.js for 3D rendering
- React Three Fiber for React integration with Three.js
- Next.js for the React framework
