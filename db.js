var mysql = require('mysql');

exports.queryDrones = function (rendererFunc) {
    var sql = 'select * from Drone where ordered = 0';
    query(sql, rendererFunc);
};

exports.orderDrone = function (name, callback) {
    var sql = "update Drone set ordered = 1 where name = '" + name + "'";
    query(sql, callback);
}

exports.orderedCount = function (callback) {
    var sql = 'select count(*) as count from Drone where ordered = 1';
    query(sql, callback);
}

exports.release = function(callback){
    var candidateSql = 'select name from Drone where ordered = 1 limit 1'

    query(candidateSql, function(result){
        var droneName = result[0].name;

        var releaseSql = "update Drone set ordered = 0 where name = '"+droneName+"'";
        query(releaseSql, callback);
    });
}

function query(sql, callback) {
    var conn = getConnection();

    conn.query(sql, function (err, dataFromDB) {
        callback(dataFromDB);
    });
}

function getConnection() {
    var params = {
        user: 'root',
        password: 'qwerty',
        database: 'drones'
    };

    return mysql.createConnection(params);
}