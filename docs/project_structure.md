# Project Structure

This document outlines the folder structure for the portfolio website.

```
/
|-- public/
|   |-- favicons/
|   |-- images/
|-- src/
|   |-- assets/
|   |   |-- fonts/
|   |   |-- styles/
|   |       |-- main.css
|   |-- components/
|   |   |-- common/
|   |   |-- layout/
|   |   |-- portfolio/
|   |-- hooks/
|   |-- pages/
|   |   |-- Home.jsx
|   |   |-- About.jsx
|   |   |-- Portfolio.jsx
|   |   |-- Contact.jsx
|   |-- services/
|   |   |-- github.js
|   |-- App.jsx
|   |-- main.jsx
|-- .gitignore
|-- index.html
|-- package.json
|-- README.md
|-- netlify.toml
```

## Explanation

- **`public/`**: For static assets that don't need to be processed by the build tool.
- **`src/`**: Contains all the source code.
- **`src/assets/`**: For static assets like fonts and global stylesheets.
- **`src/components/`**: For reusable React components.
  - **`common/`**: For general-purpose components (buttons, inputs, etc.).
  - **`layout/`**: For layout components (Header, Footer, etc.).
  - **`portfolio/`**: For components specific to the portfolio section.
- **`src/hooks/`**: For custom React hooks.
- **`src/pages/`**: For the main page components.
- **`src/services/`**: For modules that handle external services, like the GitHub API.
- **`App.jsx`**: The main application component where routing will be handled.
- **`main.jsx`**: The entry point of the application.
- **`.gitignore`**: To specify which files and folders to ignore in Git.
- **`index.html`**: The main HTML file.
- **`package.json`**: To manage project dependencies and scripts.
- **`README.md`**: To provide information about the project.
- **`netlify.toml`**: For Netlify deployment configuration.