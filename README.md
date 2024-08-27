# Simple Web App

A basic web application built with Angular for the frontend, Flask for the backend, and MongoDB for the database. The application provides a simple to-do list functionality with CRUD operations.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Database Setup](#database-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Screenshots](#screenshots)
- [Video](#video)

## Project Overview

This project is a simple web application that allows users to manage their to-do items. The application provides features to create, read, update, and delete to-dos. 

The frontend is developed using Angular, while the backend is built with Flask. MongoDB is used as the database to store to-do items.

## Features

- Create, read, update, and delete to-do items.
- Responsive design for different devices.
- User-friendly interface with enhanced visual styling.

## Technology Stack

- **Frontend:** Angular
- **Backend:** Flask
- **Database:** MongoDB

## Setup Instructions

### Backend Setup

1. **Clone the repository:**
   git clone https://github.com/Tkenthiran98/simple-web-app.git
 
   cd simple-web-app/backend
  Create a virtual environment and activate it:
  python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

  Install the required Python packages:
   pip install -r requirements.txt

Frontend Setup
Navigate to the frontend directory:
cd ../frontend

Install the required Node.js packages:
  npm install
Serve the Angular application:

ng serve

Open http://localhost:4200 in your browser to view the application.

Database Setup
Navigate to the database directory:
cd ../database

 Usage
Frontend: Access the to-do list UI at http://localhost:4200. You can add, view, update, and delete to-dos from the interface.
Backend: The Flask backend provides API endpoints for managing to-dos. The API is accessible at http://localhost:5000.
Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature/your-feature).
Create a new Pull Request.