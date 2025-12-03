# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a pywebview-React boilerplate project that combines Python backend capabilities with a React frontend in a desktop application framework. The stack uses Pywebview for native desktop windowing, React (create-react-app) for the UI, SASS for styling, and PyInstaller (Windows/Linux) or Py2app (macOS) for building executables.

## Common Development Commands

### Initial Setup
```bash
# Install all dependencies (Python virtualenv + Node modules)
yarn run init

# Manual installation (if needed)
yarn install
pip install -r requirements.txt
```

### Development Workflow
```bash
# Build frontend and run the desktop application
yarn run start

# Start React development server only (for frontend testing)
yarn run dev

# Run frontend tests
yarn run frontend:test

# Clean build artifacts (gui, build, dist directories)
yarn run clean
```

### Build Executable
```bash
# Build production executable for current platform
yarn run build
```

The build process automatically detects the platform:
- Windows: Uses PyInstaller with `build-windows.spec`
- macOS: Uses Py2app with `build-macos.py`
- Linux: Uses PyInstaller with `build-linux.spec` (onefile)

## Architecture

### Python Backend (`src/index.py`)
- **Entry point**: Creates pywebview window with React frontend
- **API Class**: Exposes Python methods to JavaScript via `js_api=Api()`
  - `fullscreen()`: Toggles window fullscreen mode
  - `save_content(content)`: Opens file dialog and saves content to disk
  - `ls()`: Lists current directory contents
- **get_entrypoint()**: Dynamically locates the built HTML file (development vs production)
- **set_interval decorator**: Creates background threads for periodic tasks
- **update_ticker()**: Updates frontend ticker every second with timestamp

### React Frontend (`src/index.jsx`)
- Built with create-react-app and TypeScript
- Component architecture:
  - **Header**: Application title and navigation
  - **Ticker**: Demonstrates Python→JavaScript communication by displaying Python-generated timestamps
  - **Editor**: Text editor with save functionality using Python backend

### Python-JavaScript Communication
The project demonstrates bidirectional communication:
- **Python → JavaScript**: Python calls `window.pywebview.state.setTicker()` to update React state
- **JavaScript → Python**: React components call `(window).pywebview.api.save_content()` to invoke Python methods

### Build Process
1. Frontend builds to `./gui/` directory (`BUILD_PATH='./gui'`)
2. Python application serves the built HTML from `gui/index.html`
3. Platform-specific packagers create native executables

## File Structure
- `src/index.py`: Main Python entry point
- `src/index.jsx`: React application entry point
- `src/components/`: React components with SASS stylesheets
- `src/assets/`: Static assets (logos, fonts)
- `requirements.txt`: Python dependencies
- `package.json`: Node dependencies and build scripts
- Platform-specific build specs: `build-windows.spec`, `build-linux.spec`, `build-macos.py`

## Development Notes
- The Python backend runs with `debug=True` for development
- Frontend builds use relative paths (`homepage: "./"` in package.json)
- TypeScript configuration targets ES5 with strict mode enabled
- Components use functional components with React hooks
- SASS is used for component styling