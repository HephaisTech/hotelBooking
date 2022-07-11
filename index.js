    const express = require('express');
    const app = express();
    const port = 5000;
    const bodyParser = require('body-parser');
    const path = require('path');
    const Db = require('./config/Db');
    const hotelRoutes = require('./api/routers/hotelrouter');
    const roomRoutes = require('./api/routers/roomrouter');
    const guestRoutes = require('./api/routers/guestrouter');
    const BookRoutes = require('./api/routers/bookRouter');
    const multer = require('multer');

    app.use(bodyParser.json());
    // Pour gere les requette POST
    app.use(express.json());




    // S'execute avant les routes graces à la function next()
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'Application/json');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
    });

    app.use('/images', express.static(path.join(__dirname, './api/images')));
    app.use('/api/hotels', hotelRoutes);
    app.use('/api/rooms', roomRoutes);
    app.use('/api/guest', guestRoutes);
    app.use('/api/book', BookRoutes);
    app.listen(port, () => console.log(`Listening on port ${port}`));