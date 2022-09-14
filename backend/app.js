const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const isAuth = require("./middleware/is-auth");

const mongoose = require("mongoose");
const graphiqlSchema = require("./graphql/schema");
const graphiqlResolvers = require("./graphql/resolvers");

const app = express();

app.use(bodyParser.json());

app.use(isAuth);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphiqlSchema,
    rootValue: graphiqlResolvers,
    graphiql: true,
  })
);

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Database connected");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
