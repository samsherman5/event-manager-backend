const Event = require("../models/Event");

// Create Event
exports.create_event = async (req, res, next) => {
  // creates a new event using model
  const event = new Event({
    title: req.body.title,
    organizer: req.body.organizer,
    time: req.body.time,
    day: req.body.day,
  });

  // saves new event to database
  await event
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Created event",
        event: {
          _id: result._id,
          title: result.title,
          organizer: result.organizer,
          time: result.time,
          day: result.day,
        },
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

// Get Events
exports.get_events = async (req, res, next) => {
  // searches events for all events on the inputted day
  await Event.find({ day: req.headers.day })
    .select("_id title organizer time")
    .exec()
    .then((docs) => {
      // returns the events for the day specified
      const response = {
        events: docs.map((doc) => {
          return {
            _id: doc.id,
            title: doc.title,
            organizer: doc.organizer,
            time: doc.time,
            day: doc.day,
          };
        }),
      };

      res.status(200).json(response); // sends the events back as a json
    });
};

// Remove Event
exports.remove_event = async (req, res, next) => {
  // deletes an event with the id specified
  await Event.deleteOne({ _id: req.body._id })
    .exec()
    .then(() => {
      res.status(200).send("Event deleted successfully"); // sends a 200 status code, deleted successfully
    })
    .catch((error) => {
      res.status(500).send("Error occurred while deleting the event"); // sends a 500 status code, error with deletion
    });
};

// Edit Event
exports.edit_event = async (req, res, next) => {
  try {
    // filters the events for the same id to update it
    const filter = { _id: req.body._id };
    // new event data
    const update = {
      title: req.body.title,
      organizer: req.body.organizer,
      time: req.body.time,
      day: req.body.day,
    };

    // options for update, upsert means that if one is not found it will insert a new one (disabled)
    const opts = { new: true, upsert: false };

    let doc = await Event.findOneAndUpdate(filter, update, opts); // finds a doc that matches the filter and sets it to the updated one specified

    res.sendStatus(200); // sends status 200: it worked
  } catch (error) {
    res.sendStatus(500); // sends status 500: error occured
  }
};

// Clear ALL Events
exports.clear_events = async (req, res, next) => {
  // deletes all events
  await Event.deleteMany({})
    .then(() => {
      res.status(200).send("All events deleted successfully"); // successful!
    })
    .catch((error) => {
      res.status(500).send("Error occurred while deleting events"); // error occured
    });
};

exports.import_json = async (req, res, next) => {
  try {
    await Event.deleteMany({});
    const array = req.body.events;
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      const event = new Event({
        title: element.title,
        organizer: element.organizer,
        time: element.time,
        day: element.day,
      });

      await event.save();
    }

    res.status(200).send("Success!");
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send(
        "Error occured while importing events. Did you format the JSON right?"
      );
  }
};

exports.export_json = async (req, res, next) => {
  // searches events for all events on the inputted day
  await Event.find()
    .select("_id title organizer time day")
    .exec()
    .then((docs) => {
      // returns the events for the day specified
      const response = {
        events: docs.map((doc) => {
          return {
            title: doc.title,
            organizer: doc.organizer,
            time: doc.time,
            day: doc.day,
          };
        }),
      };

      res.status(200).json(response); // sends the events back as a json
    });
};
