# 🏥 Health Information System

This is a web application that helps doctors manage health programs, providing the ability to create, update, search and view programs efficiently with aim of enrolling clients to health program. It is built with React for the frontend, TailwindCSS for styling, and connects to a backend API for CRUD operations on programs. The app also utilizes secure Bearer Token authentication to manage user sessions.

## 🎯 Features

**User Enrollment**

- Register new doctor members.
- Store and manage doctor's details.

**Client Management**

- Registration of new clients
- Search functionality with debouncing

**Program Management**

- Creation of health programs with validation
- Program categorization by status
- Program editing and management
- Search functionality with debouncing

**Enrollment System**

- Enroll clients in multiple programs
- Prevent duplicate enrollments

**Dashboard**

- Overview of key statistics
- Quick access to common actions

## 👩‍💻 Tech Stack

**Frontend**

- **React**: JavaScript library for building user interfaces.

- **TailwindCSS**: Utility-first CSS framework for styling the application.

- **Axios**: HTTP client for making API requests.

- **React Hooks**: Used for managing state and lifecycle methods in functional components.

**Backend**:

- **Node.js**: Backend to handle API requests for creating and managing data.

- **JWT (JSON Web Tokens)**: Authentication method to secure API endpoints.

- **SQLite**: Database to store data.

## Screenshots

Below are screenshots of the application:

**Sign In**
![](https://github.com/Allan-Ojwang/CEMA-Health-App/blob/main/signin.PNG)

**Sign Up**
![](https://github.com/Allan-Ojwang/CEMA-Health-App/blob/main/signup.PNG)

**Home**
![](https://github.com/Allan-Ojwang/CEMA-Health-App/blob/main/home.PNG)

**Program**
![](https://github.com/Allan-Ojwang/CEMA-Health-App/blob/main/program.PNG)

**Client**
![](https://github.com/Allan-Ojwang/CEMA-Health-App/blob/main/client.PNG)

## Demo

Below is a short demo of the application:

![](https://github.com/Allan-Ojwang/CEMA-Health-App/blob/main/demo-1.gif)

![](https://github.com/Allan-Ojwang/CEMA-Health-App/blob/main/demo-2.gif)

![](https://github.com/Allan-Ojwang/CEMA-Health-App/blob/main/demo-3.gif)

![](https://github.com/Allan-Ojwang/CEMA-Health-App/blob/main/demo-4.gif)


## 🏠 Run Locally

Clone the project

```bash
   https://github.com/Allan-Ojwang/CEMA-Health-App.git
```

Go to the backend directory

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Create .env

```bash
  cp .env.example .env
```

Then edit .env and add the following:

```bash
    JWT_SECRET=your_jwt_secret
    REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

Run the backend app

```bash
  npm run dev
```

Go to the frontend directory

```bash
  cd frontend
```

Install dependencies

```bash
  npm install
```

Run the frontend app

```bash
  npm run dev
```

## 📈 Database Schema Overview

| **Table**     | **Description**                 |
| ------------- | ------------------------------- |
| `doctors`     | Stores doctors information.     |
| `clients`     | Stores clients information.     |
| `programs`    | Stores programs information.    |
| `enrollments` | Stores enrollments information. |

## 🎡 API Endpoints

Here are the backend endpoints based on the routes and controllers created:

**🩺 Authentication Routes**
| Method | Endpoint | Description |
|--------|-------------------------------------|----------------------------------|
| POST | `/api/auth/signup	` | Register a new doctor|
| POST | `/api/auth/signin	` | Authenticate doctor (login) |
| POST | `/api/auth/refresh-token	` | Refresh access token using refresh token |

**👥 Client Routes**
| Method | Endpoint | Description |
|--------|-------------------------------------|----------------------------------|
| POST | `/api/clients	` | Register a new client|
| GET | `/api/clients	` | Retrieve all clients |
| GET | `/api/clients/:id	` | Retrieve a specific client by ID |
| DELETE | `/api/clients/:id	` | Delete a specific client by ID |
| GET | `/api/clients/count	` | Count all clients |
| GET | `/api/clients/count/age-group	` | Count clients by certain age group (3 ie; 18-30, 31-50 and 51+) |
| GET | `/api/clients/count/gender	` | Count clients by gender (male and female) |

**📚 Program Routes**
| Method | Endpoint | Description |
|--------|-------------------------------------|----------------------------------|
| POST | `/api/api/programs		` | Create a new program|
| GET | `/api/programs	` | Retrieve all programs |
| DELETE | `/api/programs/:id	` | Delete a specific client by ID |
| PUT | `/api/programs/:id	` | Update a specific client by ID |
| GET | `/api/programs/active-count	` | Count active programs |

**📝 Enrollment Routes**
| Method | Endpoint | Description |
|--------|-------------------------------------|----------------------------------|
| POST | `/api/enrollments		` | Enroll a user in a program|
| GET | `/api/enrollments	` | Retrieve all enrollments |
| PUT | `/api/enrollments/:id	` | Update a specific enrollment |
| DELETE | `/api/enrollments/:id		` | Delete a specific enrollment |

## 👥 Author

- [Allan Ojwang - Github](https://github.com/Allan-Ojwang)

## 📝 License

[MIT](https://choosealicense.com/licenses/mit/)
