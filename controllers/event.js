const mysql = require('mysql');
const connectionConfig = require('../config/database');
const database = require('../db/queries');
const connection = mysql.createConnection(connectionConfig.data);

module.exports.registerForEvent = function (userId, eventId, tag, callback) {
    let values = [userId, eventId, tag];
    connection.query(database.event.InsertUserEventQuery, [[values]], function (error, result, fields) {
        if (error) {
            callback(500, "Database error");
        } else {
            callback(200, "Registered for the event");
        }
    });
};

module.exports.getUserEvents = function (userId, callback) {
    let values = [userId];
    connection.query(database.event.InsertUserEventQuery, [[values]], function (error, result, fields) {
        if (error) {
            callback(500, "Database error");
        } else {
            callback(200, result);
        }
    });
};

module.exports.getAllEvents = function (callback) {
    connection.query(database.event.GetAllEvents, null, function (error, result, fields) {
        if (error) {
            callback(500, "Database error");
        } else {
            callback(200, { events: result });
        }
    });
};

module.exports.getEventUsers = function (eventId, callback) {
    let values = [eventId];
    connection.query(database.event.GetEventUsers, [[values]], function (error, result, fields) {
        if (error) {
            callback(500, { msg: "Database error" });
        } else {
            result.forEach(function (item, index) {
                delete item.password;
            });
            callback(200, result);
        }
    });
};