const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const Event = require("./models/event");
const User = require("./models/user");
const bcrypt = require("bcryptjs");

const app = express();

app.use(bodyParser.json());

const events = [];

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`

        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type User {
            _id: ID!
            name: String!
            email: String!
            password: String
        }

        input UserInput {
            name: String!
            email: String!
            password: String!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
            
        }


        type RootQuery {
            events: [Event!]!
        }
        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return Event.find()
          .then((events) =>
            events.map((event) => {
              console.log(event);
              return { ...event._doc, _id: event._doc._id.toString() };
            })
          )
          .catch((err) => {
            throw err;
          });
      },
      createUser: (args) => {
        return User.findOne({ email: args.userInput.email })
          .then((user) => {
            if (user) {
              throw new Error("User exists already.");
            }
            return bcrypt.hash(args.userInput.password, 12);
          })

          .then((hashedPassword) => {
            const user = new User({
              name: args.userInput.name,
              email: args.userInput.email,
              password: hashedPassword,
            });
            return user
              .save()
              .then((user) => {
                return { ...user._doc, password: null, _id: user._doc.id };
              })
              .catch((err) => {
                console.log(err);
                throw err;
              });
          })
          .catch((err) => {
            throw err;
          });
      },
      createEvent: (args) => {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date),
          creator: "63161d1352c5fd1573cb74fc",
        });

        let createdEvent;

        return event
          .save()
          .then((result) => {
            createdEvent = { ...result._doc, _id: event._doc.id };
            return User.findById("63161d1352c5fd1573cb74fc");
          })
          .then((user) => {
            if (!user) {
              throw new Error("User not found!");
            }
            console.log(user);
            user.createdEvents.push(event);
            return user.save();
          })
          .then(() => {
            return createdEvent;
          })
          .catch((err) => {
            console.log(err);
            throw err;
          });
      },
    },
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
