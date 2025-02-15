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
        throw new Error("User not found");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      return {
        success: true,
        message: "Login successful",
        token,
        user,
      };
    },

    getAllEmployees: async () => {
      const employees = await Employee.find();
      if (employees.length === 0) {
        throw new Error("No employees found");
      }

      return {
        success: true,
        message: "Employees retrieved successfully",
        employees,
      };
    },

    searchEmployeeById: async (_, { id }) => {
      const employee = await Employee.findById(id);
      if (!employee) {
        throw new Error("Employee not found");
      }

      return {
        success: true,
        message: "Employee retrieved successfully",
        employee,
      };
    },

    searchEmployeeByDesignationOrDepartment: async (_, args) => {
      const employees = await Employee.find({
        $or: [{ designation: args.designation }, { department: args.department }],
      });

      if (employees.length === 0) {
        throw new Error("No employees found with the given designation or department");
      }

      return {
        success: true,
        message: "Employees retrieved successfully",
        employees,
      };
    },
  },

  Mutation: {
    signup: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("User already exists with this email");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });

      await user.save();

      return {
        success: true,
        message: "User registered successfully",
        user,
      };
    },

    addEmployee: async (_, args) => {
      const { first_name, last_name, email, salary, department, designation } = args;

      if (!first_name || !last_name || !email || !salary || !department || !designation) {
        throw new Error("All fields are required");
      }

      const employee = new Employee(args);
      await employee.save();

      return {
        success: true,
        message: "Employee added successfully",
        employee,
      };
    },

    updateEmployee: async (_, { id, ...updates }) => {
      const employee = await Employee.findById(id);
      if (!employee) {
        throw new Error("Employee not found");
      }

      const updatedEmployee = await Employee.findByIdAndUpdate(id, updates, { new: true });

      return {
        success: true,
        message: "Employee updated successfully",
        updatedEmployee,
      };
    },

    deleteEmployee: async (_, { id }) => {
      const employee = await Employee.findById(id);
      if (!employee) {
        throw new Error("Employee not found");
      }

      await Employee.findByIdAndDelete(id);

      return {
        success: true,
        message: "Employee deleted successfully",
      };
    },
  },
};

module.exports = resolvers;
