const tables = {
    UserTable: "CREATE TABLE IF NOT EXISTS user(id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(64) NOT NULL UNIQUE, email VARCHAR(128) NOT NULL UNIQUE, password VARCHAR(128) NOT NULL);",
    EventTable: "CREATE TABLE IF NOT EXISTS event(id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(128) NOT NULL, tag VARCHAR(64) NOT NULL UNIQUE, location VARCHAR(128) NOT NULL);",
    UserEventTable: "CREATE TABLE IF NOT EXISTS user_event(id INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,  user_id INT(10) UNSIGNED NOT NULL,event_id INT(10) UNSIGNED NOT NULL, tag VARCHAR(64) NOT NULL UNIQUE, FOREIGN KEY (user_id) REFERENCES user(id), FOREIGN KEY (event_id) REFERENCES event(id));",
};
const user = {
    InsertUserQuery: "INSERT INTO user(name, email, password) VALUES ?;",
    GetUserByNameQuery: "SELECT * FROM user WHERE name = ?;"
};
const event = {
    InsertUserEventQuery: "INSERT INTO user_event(user_id, event_id, tag) VALUES ?;",
    GetUserEventQuery: "SELECT * FROM user_event where user_id = ?;",
    GetAllEvents: "SELECT * FROM event;",
    GetEventUsers: "SELECT * FROM user WHERE id IN (SELECT user_id AS id FROM user_event WHERE event_id = ?);"
};
module.exports.tables = tables;
module.exports.user = user;
module.exports.event = event;