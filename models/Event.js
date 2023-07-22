const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  organizer: { type: [String], required: true },
  time: { type: String, required: true },
  tagline: { type: String, required: true },
  day: { type: String, required: true },
});

module.exports = mongoose.model("Event", EventSchema);
