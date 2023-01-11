# Chatty Corner API

This is the API for the Chatty Corner chat web application.

## Installation

1. Clone the repository to your local machine

```bash
git clone https://github.com/yourusername/chatty-corner-api.git
```

2. Install the dependencies

```bash
cd chatty-corner-api
npm install
```

3. Create a .env file in the root of your project, and set the following environment variables

```txt
MONGO_URI=mongodb://localhost/your_db
JWT_SECRET=yoursecret
```

4. Start the server

```bash
npm run dev 
or
npm start
```

## Usage

After starting the server, the API can be accessed at `http://localhost:3000/`.
The API has several endpoints for managing user authentication, creating and retrieving messages and managing channels.
You can also refer the swagger documentation on '/api-docs' route to see the list of available endpoints and their usage.

## Contribution

You are welcome to contribute to this project by opening a pull request with any new feature or bug fix.
Please make sure to follow the project's coding conventions and to write tests for any new code.
```
chatty-corner-api
├─ .gitignore
├─ package-lock.json
├─ package.json
├─ README.md
└─ src
   ├─ app.js
   ├─ controllers
   │  ├─ auth.controller.js
   │  └─ user.controller.js
   ├─ middlewares
   │  └─ auth.middleware.js
   ├─ models
   │  ├─ forms
   │  │  └─ register.form.js
   │  └─ user.model.js
   ├─ routes
   │  └─ auth.route.js
   ├─ swagger.js
   ├─ tools
   │  └─ tools.js
   └─ utilities
      ├─ cryptography.js
      └─ date.js
```