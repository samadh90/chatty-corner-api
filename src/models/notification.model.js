// create mangoose notification model and export it

const Mongoose = require("mongoose");

const NotificationSchema = new Mongoose.Schema({
    notification_type: {
        type: String,
        unique: false,
        required: true,
    },
    notification_message: {
        type: String,
        unique: false,
        required: true,
    },
    is_read: {
        type: Boolean,
        default: false,
        required: true,
    },
    created_at: {
        type: Date,
        unique: false,
        required: true,
    },
});

const Notification = Mongoose.model("notification", NotificationSchema);
module.exports = Notification;