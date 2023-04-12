var mysql = require('mysql');

exports.queryDrones = function (callback) {
    const sql = 'select * from Drone where ordered = 0';
    query(sql, callback);
};

exports.orderDrone = function (name, callback) {
    var sql = "UPDATE Drone SET ordered = 1 WHERE name = '" + name + "'";
    query(sql, callback);
}

exports.orderedCount = function (callback) {
    var sql = "select count(*) as c from Drone where ordered = 1";
    query(sql, callback);
}

exports.releaseDrone = function (callback) {
    var select = "select name from Drone where ordered = 1 limit 1";

    query(select, (result) => {
        var nameToRelease = result[0].name;

        var update = "UPDATE Drone SET ordered = 0 WHERE name = '" + nameToRelease + "'";
        query(update, callback);
    });
}

function query(sql, callback) {
    var con = getConnection();
    con.query(sql, function (err, result) {
        if (err)
            throw err;
        callback(result);
    });
}

function getConnection() {
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "qwerty",
        database: "drones"
    });
}
