var mysql = require('mysql');

var isConnectionPool = false;
// var isConnectionPool = true;

var connection;

if (isConnectionPool == false) {
    connection = mysql.createConnection({
        host: 'linkedinproject.cfs5kthazndf.us-west-1.rds.amazonaws.com',
        user: 'nrupa16',
        password: '16Jan91*',
        database: 'linkedin_project',
        port: 3306,
    });

}
else {
    connection = mysql.createPool({
        connectionLimit: 20,
        host: 'linkedinproject.cfs5kthazndf.us-west-1.rds.amazonaws.com',
        user: 'nrupa16',
        password: '16Jan91*',
        database: 'linkedin_project',
        port: 3306
    });
}


function insertQuery(query, post, callback) {
    console.log("query = ", query, post)
    if (isConnectionPool == false) {
        connection.query(query, post, function (error, results) {
            if (error)
                callback(error, null);
            else
                callback(null, results);
        });
    }
    else {
        connection.getConnection(function (err, con) {
            if (err) {
                con.release();
                console.log("Could not get Pool Connection Object!!")
            }
            else {
                console.log("Getting Pool Connection!")
                con.query(query, post, function (error, results) {
                    if (error) {
                        con.release();
                        callback(error, null);
                    }
                    else {
                        con.release();
                        callback(null, results);
                    }
                })
            }
        })
    }
}

function selectQuery(query, post, callback) {
    console.log("query = ", query, post)
    if (isConnectionPool == false) {
        connection.query(query, post, function (error, results) {
            if (error)
                callback(error, null);
            else
                callback(null, results);
        });
    }
    else {
        connection.getConnection(function (err, con) {
            if (err) {
                con.release();
                console.log("Could not get Pool Connection Object!!" , err)
            }
            else {
                console.log("Getting Pool Connection!")
                con.query(query, post, function (error, results) {
                    if (error){
                        con.release();
                        console.log("some err" , err)
                        callback(error, null);
                    }
                    else {
                        con.release();
                        callback(null, results);
                    }
                })
            }
        })
    }
}

function updateQuery(query, post, callback) {
    console.log("query = ", query, post)
    if (isConnectionPool == false) {
        connection.query(query, post, function (error, results) {
            if (error)
                callback(error, null);
            else
                callback(null, results);
        });
    }
    else{
        connection.getConnection(function (err, con) {
            if (err) {
                con.release();
                console.log("Could not get Pool Connection Object!!")
            }
            else {
                console.log("Getting Pool Connection!")
                con.query(query, post, function (error, results) {
                    if (error) {
                        con.release();
                        callback(error, null);
                    }
                    else {
                        con.release();
                        callback(null, results);
                    }
                })
            }
        })
    }
}

function closeConnection() {
    console.log("state: ", connection.state);
    if (connection.state == "connected" || connection.state == "authenticated") {
        connection.end();
    }
}

function startConnection() {
    if (isConnectionPool == false) {
        connection.connect()
    }
}

module.exports = {
    insertQuery: insertQuery,
    closeConnection: closeConnection,
    selectQuery: selectQuery,
    updateQuery: updateQuery,
    startConnection: startConnection,
    secret : 'project_LinkedIn'
};