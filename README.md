# Directus with Nodemon

This project sets up Directus, an open-source headless CMS, with Nodemon for development purposes. Nodemon is used to automatically restart the Directus server whenever file changes in the `extensions` directory are detected, making development more efficient.

## Getting Started

To get started with this project, follow these steps:

### Prerequisites

- Node.js installed on your system
- npm (Node Package Manager)

### Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install the required dependencies.

### Running the Project

- To start the Directus server in development mode with Nodemon, run:
  ```bash
  npm run dev
  ```

This command will start the Directus server and watch for any changes in the extensions directory, automatically restarting the server when changes are detected.

- To start the Directus server without Nodemon, run:
```bash
npm start
```

Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any improvements or suggestions.

License
This project is licensed under the ISC License - see the LICENSE file for details.

