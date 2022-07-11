    var mysql = require('mysql');
    require('dotenv').config();
    var connexion = mysql.createConnection({
        host: process.env.HOST, //|| 'localhost',
        user: process.env.USERDB, // || 'root',
        password: process.env.PASSWORD, // || '',
        database: process.env.DATABASE, // || 'bookingme'
    });
    connexion.connect({}, (err, conn) => {
        if (err) throw err;
        console.log('Connected to database!');
    })
    module.exports = connexion;