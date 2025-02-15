const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const connectDB = require("./config/db");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const app = express();
connectDB();

const server = new ApolloServer({ typeDefs, resolvers });
server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen(4000, () => console.log("Server running on http://localhost:4000/graphql"));
});
