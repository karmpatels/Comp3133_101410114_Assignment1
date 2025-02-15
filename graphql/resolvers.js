const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Employee = require("../models/Employee");
require("dotenv").config();

const resolvers = {
  Query: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found"); // Error Handeling message for wrong email
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid credentials"); // Error Handeling message for wrong password
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      const message = "Login successful"; // Success Validation message after login

      return {
        message,
        token,
        user,
      };
    },

    getAllEmployees: async () => {
      const employees = await Employee.find();
      return employees;
    },

    searchEmployeeById: async (_, { id }) => {
      const employee = await Employee.findById(id);
      if (!employee) {
        throw new Error("Employee not found"); // Error message for wrong employee ID
      }
      return employee;
    },

    searchEmployeeByDesignationOrDepartment: async (_, { designation, department }) => {
      const employees = await Employee.find({
        $or: [{ designation }, { department }],
      });

      return employees;
    },
  },

  Mutation: {
    signup: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("User already exists with this email"); // Error message avoiding signup because of existing email
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword});
      

      await user.save();
      return user;
    },

    addEmployee: async (_, args) => {
      const { first_name, last_name, email, salary, department, designation } = args;

      if (!first_name || !last_name || !email || !salary || !department || !designation) {
        throw new Error("All fields are required"); // error adding employee from expelled or missing field
      }

      const employee = new Employee(args);
      await employee.save();
      return employee;
    },

    updateEmployee: async (_, { id, ...updates }) => {
      const employee = await Employee.findById(id);
      if (!employee) {
        throw new Error("Employee not found"); // error message for updating employee from wrong employee ID
      }

      return await Employee.findByIdAndUpdate(id, updates, { new: true });
    },

    deleteEmployee: async (_, { id }) => {
      const employee = await Employee.findById(id);
      if (!employee) {
        throw new Error("Employee not found"); // error message for deleting employee from wrong employee ID
      }

      await Employee.findByIdAndDelete(id);
      return "Employee deleted successfully"; // success validation message for deleting employee
    },
  },
};

module.exports = resolvers;
