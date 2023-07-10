const Event = require('../models/Event');

// Create Event
exports.create_event = async (req, res, next) => {
    const event = new Event({
        title: req.body.title,
        organizer: req.body.organizer,
        time: req.body.time,
        day: req.body.day
    });

    await event.save().then((result) => {
        res.status(201).json({
            message: "Created event",
            event: {
                _id: result._id,
                title: result.title,
                organizer: result.organizer,
                time: result.time,
                day: result.day
            }
        });
    }).catch((err) => {
        console.error(err);
    });
};

// Get Events
exports.get_events = async (req, res, next) => {
    await Event.find({day: req.headers.day}).select('_id title organizer time').exec().then(docs => {
        const response = {
            events: docs.map(doc => {
                return {
                    _id: doc.id,
                    title: doc.title,
                    organizer: doc.organizer,
                    time: doc.time,
                    day: doc.day
                };
            })
        };

        res.status(200).json(response);
    });
};

// Remove Event
exports.remove_event = async (req, res, next) => {
    await Event.deleteOne({ _id: req.body._id }).exec()
    .then(() => {
        res.status(200).send('Event deleted successfully');
    })
    .catch((error) => {
        res.status(500).send('Error occurred while deleting the event');
    });
};

// Edit Event
exports.edit_event = async (req, res, next) => {
    const filter = { _id: req.body._id };
    const update = { 
        title: req.body.title,
        organizer: req.body.organizer,
        time: req.body.time,
        day: req.body.day 
    };
    // If you set the `upsert` option, Mongoose will insert
    // a new document if one isn't found.
    const opts = { new: true, upsert: false };
    console.log(req.body._id);

    let doc = await Event.findOneAndUpdate(filter, update, opts);

    res.status(200);
};

// Clear ALL Events
exports.clear_events = async (req, res, next) => {
    await Event.deleteMany({})
      .then(() => {
        res.status(200).send('All events deleted successfully');
      })
      .catch((error) => {
        res.status(500).send('Error occurred while deleting events');
      });
};