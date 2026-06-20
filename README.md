# O2H Task Manager

This is a mini full stack task manager project created for the O2H full stack developer preparation task.

In this project, a user can register, login, create tasks, view tasks, search tasks, filter tasks by status, complete tasks, delete tasks, restore deleted tasks, and view task history.

I made this project using React for frontend, Node.js and Express for backend, and MongoDB for database.

## Project Name

O2H Task Manager

## Tech Stack

Frontend:

React.js
Vite
Tailwind CSS
Axios
React Router DOM
Lucide React Icons
React Hot Toast

Backend:

Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
Bcryptjs
Dotenv
CORS

## Main Features

User registration

User login

JWT based authentication

Create new task

View all tasks

Search tasks

Filter tasks by status

Mark task as completed

Delete task

View deleted tasks

Restore deleted tasks

View task history

Dashboard statistics

Dark mode and light mode

Responsive design

## Folder Structure

project-root/

frontend/

public/

src/

assets/

logo.svg

login.svg

empty-state.svg

loader.svg

components/

Navbar.jsx

Sidebar.jsx

TaskCard.jsx

TaskForm.jsx

StatsCards.jsx

SearchBar.jsx

Pagination.jsx

Loader.jsx

EmptyState.jsx

pages/

Dashboard.jsx

AddTask.jsx

Login.jsx

Register.jsx

History.jsx

DeletedTasks.jsx

context/

AuthContext.jsx

TaskContext.jsx

ThemeContext.jsx

services/

api.js

authService.js

taskService.js

App.jsx

main.jsx

index.css

.env

package.json

vite.config.js

tailwind.config.js

backend/

routes/

authRoutes.js

taskRoutes.js

controllers/

authController.js

taskController.js

models/

User.js

Task.js

History.js

middleware/

authMiddleware.js

config/

mongodb.js

server.js

.env

package.json

README.md

## Frontend Explanation

The frontend is created using React and Vite.

I used components for reusable UI parts like Navbar, Sidebar, TaskCard, TaskForm, SearchBar, Pagination, Loader, EmptyState, and StatsCards.

I used pages for main screens like Dashboard, AddTask, Login, Register, History, and DeletedTasks.

I used services folder for API calls. Axios is configured in api.js. Authentication related API calls are written in authService.js and task related API calls are written in taskService.js.

I used context folder to manage common state in the application. AuthContext is used for login user and token. TaskContext is used for task data. ThemeContext is used for dark mode and light mode.

## Backend Explanation

The backend is created using Node.js and Express.js.

I used MongoDB as database and Mongoose for creating models.

The backend follows route, controller, model structure.

Routes are used to define API paths.

Controllers are used to write the main logic.

Models are used to define MongoDB schemas.

Middleware is used to protect private APIs using JWT token.

## Frontend Package Details

Package name:

frontend

Main frontend dependencies:

axios

lucide-react

react

react-dom

react-hot-toast

react-router-dom

Main frontend dev dependencies:

@vitejs/plugin-react

@tailwindcss/vite

tailwindcss

vite

eslint

## Backend Package Details

Package name:

back-end-task-manager

Description:

this is the Mini project for O2 as named as Project Task manager

Main backend dependencies:

bcryptjs

cors

dotenv

express

jsonwebtoken

mongoose

## Backend APIs

Auth APIs:

POST /api/auth/register

This API is used to register a new user.

POST /api/auth/login

This API is used to login user and return JWT token.

GET /api/auth/profile

This API is used to get logged in user profile.

Task APIs:

GET /api/tasks

This API is used to get all tasks of logged in user.

POST /api/tasks

This API is used to create a new task.

PUT /api/tasks/:id

This API is used to update task details or task status.

DELETE /api/tasks/:id

This API is used to delete a task.

GET /api/tasks?status=Pending

This API is used to filter tasks by status.

GET /api/tasks?search=login

This API is used to search tasks.

GET /api/tasks?page=1&limit=6

This API is used for pagination.

GET /api/tasks/meta/history

This API is used to get task history.

GET /api/tasks/meta/deleted

This API is used to get deleted tasks.

PUT /api/tasks/:id/restore

This API is used to restore a deleted task.

## Task Status

Pending

In Progress

Completed

## User Model

The user model contains:

name

email

password

phone

role

profileImage

isActive

lastLogin

createdAt

updatedAt

Password is hashed using bcrypt before saving in database.

## Task Model

The task model contains:

title

description

status

user

deletedAt

createdAt

updatedAt

Each task is connected with a user.

## History Model

The history model is used to store task activity.

It stores actions like:

CREATED

UPDATED

COMPLETED

DELETED

RESTORED

## Setup Steps

First clone or download the project.

Go to backend folder:

npm install

Create .env file in backend folder:

PORT=5000

MONGO_URI=your_mongodb_connection_url

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173

Start backend:

npm start

or

npm run dev

Go to frontend folder:

npm install

Create .env file in frontend folder:

VITE_API_URL=http://localhost:5000/api

Start frontend:

npm run dev

## How The Project Works

First user registers with name, email, phone, and password.

Password is hashed in backend before storing in database.

After registration or login, backend sends JWT token to frontend.

Frontend stores token in localStorage.

For protected API calls, token is sent in Authorization header.

User can create task from Add Task page.

Dashboard page shows all tasks with search, filters, pagination, and statistics.

If user completes a task, status becomes Completed.

If user deletes a task, it is shown in Deleted Tasks page.

History page shows task activities.

## Assumptions

Only logged in user can access tasks.

One user can see only their own tasks.

Deleted tasks are not permanently removed directly. They are stored with deletedAt value.

Description should have minimum 20 characters.

Task status can be Pending, In Progress, or Completed.

MongoDB is used as database.

JWT is used for authentication.

For some parts of the project, I referred to Google and AI tools for help with SVG images, syntax checking, Tailwind class usage, and finding small errors during development.

## My Short Explanation

This is a full stack task manager project. I created backend using Express and MongoDB. I created frontend using React and Tailwind CSS.

I separated the code properly into components, pages, services, context, routes, controllers, and models.

This project helped me understand authentication, API integration, CRUD operations, protected routes, state management, and database connection.
