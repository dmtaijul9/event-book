const Event = require("../../models/event");
const User = require("../../models/user");
const { transformEvent } = require("./merge");

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();

      return events.map((event) => {
        return transformEvent(event);
      });
    } catch (error) {
      throw error;
    }
  },

  createEvent: async (args) => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: "63161d1352c5fd1573cb74fc",
    });

    let createdEvent;
    try {
      const result = await event.save();

      createdEvent = transformEvent(result);
      const creator = await User.findById("63161d1352c5fd1573cb74fc");

      if (!creator) {
        throw new Error("User not found!");
      }

      creator.createdEvents.push(event);
      await creator.save();

      return createdEvent;
    } catch (err) {
      throw err;
    }
  },
};
