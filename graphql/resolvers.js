const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Employee = require("../models/Employee");
require("dotenv").config();

const resolvers = {
  Query: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Invalid credentials");

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      return { token, user };
    },
    getAllEmployees: async () => await Employee.find(),
    searchEmployeeById: async (_, { id }) => await Employee.findById(id),
    searchEmployeeByDesignationOrDepartment: async (_, args) => {
      return await Employee.find({ $or: [{ designation: args.designation }, { department: args.department }] });
    },
  },
  Mutation: {
    signup: async (_, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      return user;
    },
    addEmployee: async (_, args) => {
      const employee = new Employee(args);
      await employee.save();
      return employee;
    },
    updateEmployee: async (_, { id, ...updates }) => {
      return await Employee.findByIdAndUpdate(id, updates, { new: true });
    },
    deleteEmployee: async (_, { id }) => {
      await Employee.findByIdAndDelete(id);
      return "Employee deleted successfully";
    },
  },
};

module.exports = resolvers;
