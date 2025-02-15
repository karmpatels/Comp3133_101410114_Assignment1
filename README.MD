# **Employee Management System – Backend API**

## **Project Overview**
This project implements the backend of an **Employee Management System** using **Node.js**, **Express**, **GraphQL**, and **MongoDB**. The system allows for operations like creating new users, employee management (CRUD operations), and employee searches through GraphQL queries.

The backend includes secure user authentication using **JWT** (JSON Web Tokens) and performs validation for incoming requests using **express-validator**.

---

## **GitHub Profile**
You can view my profile and other repositories here:  
[GitHub Profile – karmpatels](https://github.com/karmpatels)

---

## **Project Setup**

### **Step 1: Clone the Repository**
Clone the repository to your local machine:
```bash
git clone https://github.com/karmpatels/comp3133_101410114_assignment1.git
```
### **Step 2: Install Dependencies**
Navigate to the project folder and install the required dependencies:
```bash
cd comp3133_101410114_assignment1
npm install
```
### **Step 3: Set Up MongoDB**
You will need a [MongoDB](https://mongodb.com/download) instance. You can use either:
1) A local [MongoDB](https://mongodb.com) instance (make sure it is running).
2) [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) for a cloud-based solution.

Create a .env file in the root directory with the following variables:
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_generated_jwt_secret_key
```
Replace your_mongodb_connection_string with your actual MongoDB connection URL, and your_generated_jwt_secret_key with the JWT_SECRET you generated.

### **Step 4: Run the Application**
Run the application using nodemon for development mode:
```bash
npm run dev
```
**This will start the GraphQL server, which can be accessed at http://localhost:4000/graphql.**

## GraphQL API Endpoints ##
### Mutations ###
1) Signup
Allows the user to create a new account.
```bash
mutation {
  signup(username: "testuser", email: "testuser@email.com", password: "Test@123") {
    username
    email
    created_at
  }
}
```
2) Add Employee
Allows the admin to create a new employee.
```bash
mutation {
  addEmployee(
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@email.com",
    gender: "Male",
    designation: "Software Engineer",
    salary: 5000,
    date_of_joining: "2024-02-10",
    department: "IT",
    employee_photo: "john_doe.png"
  ) {
    _id
    first_name
    last_name
    email
  }
}
```
3) Update Employee
Allows the admin to update employee details by employee ID.
```bash
mutation {
  updateEmployeeById(eid: "employee_id", salary: 6000) {
    _id
    first_name
    last_name
    salary
  }
}
```
4) Delete Employee
Allows the admin to delete an employee by employee ID.
```bash
mutation {
  deleteEmployeeById(eid: "employee_id") {
    message
  }
}
```
### Queries ###
1. Login
Allows a user to log in and obtain a JWT token for authentication.
```bash
query {
  login(username: "testuser", password: "Test@123") {
    token
    user {
      username
      email
    }
  }
}
```
2. Get All Employees
Retrieves a list of all employees.
```bash
query {
  getAllEmployees {
    _id
    first_name
    last_name
    email
    designation
    department
  }
}
```
3. Search Employee by ID
Retrieves an employee by their unique employee ID.
```bash
query {
  searchEmployeeById(eid: "employee_id") {
    first_name
    last_name
    email
    designation
  }
}
```
4. Search Employee by Designation or Department
Retrieves employees based on their designation or department.
```bash
query {
  searchEmployeeByDepartment(department: "IT") {
    _id
    first_name
    last_name
    designation
  }
}
```

## Validation & Error Handling ##
- *Validation is performed on all incoming requests using express-validator.*
- *Errors are returned as JSON objects with appropriate error codes and messages.*

## Technologies Used ##
- [Node.js](https://www.nodejs.org): Server-side runtime.
- [Express](https://www.expressjs.com): Web framework for handling HTTP requests.
- [GraphQL](https://www.graphql.org): For flexible data querying.
- [ApolloServer](https://www.apollographql.com): GraphQL server implementation for Express.
- [MongoDB](https://www.mongodb.com): NoSQL database for storing user and employee data.
- [express-validator](https://www.express-validator.github.io/docs): For validating incoming requests.
- [dotenv](https://www.npmjs.com/package/dotenv): For managing environment variables.

## Requirements for the Project ##
* [Node.js](https://nodejs.org/en/download)
* [MongoDB](https://www.mongodb.com/try/download/community)
* [Postman](https://www.postman.com/downloads/)
* [GitHub](https://desktop.github.com/download/)

## Testing with Postman ##
* All GraphQL queries and mutations can be tested using Postman.
* Each API endpoint is tested by sending requests to the GraphQL server at
```bash
http://localhost:4000/graphql
```

## License ##
This project is licensed under the MIT License. See the LICENSE file for details.

This Structured README File ensure my ability and responsibility to state the project and the requirements for using the contents of repositoty after taking the licensed permission and checking, discusing, permissing the documentation with me.

Thanks,
karmpatels