const authResolvers = require("./auth");
const eventResolvers = require("./events");
const bookingResolvers = require("./booking");

const rootResolvers = {
  ...authResolvers,
  ...eventResolvers,
  ...bookingResolvers,
};

module.exports = rootResolvers;
