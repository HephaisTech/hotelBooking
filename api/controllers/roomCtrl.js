    const db = require('./../../config/Db');
    var fs = require('fs')


    /* A function that is being exported to be used in another file. */
    exports.createRoom = (async(req, res, next) => {
        try {
            let sql = "SELECT * FROM rooms WHERE number = ?";
            db.query(sql, req.body.number, (err, result) => {
                if (err) {
                    res.json({
                        error: err
                    });
                } else {
                    if (result.length > 0) {
                        res.status(409).json({
                            message: 'This Room already exist'
                        });
                    } else {
                        let sql = "INSERT INTO rooms  SET ?";
                        req.body.photos = [];
                        req.files.forEach(element => {
                            req.body.photos.push(`${req.protocol}://${req.get('host')}/images/rooms/${element.filename}`);
                        });
                        req.body.photos = JSON.stringify(req.body.photos);
                        db.query(sql, req.body, (err, result) => {
                            if (err) {
                                res.json({
                                    error: err
                                });
                            } else {
                                res.status(201).json({
                                    data: req.body,
                                    message: 'success'
                                });
                            }
                        });
                    }
                }
            });
        } catch (error) {
            res.status(500).json({
                error: error
            });
        }
    })

    /* A function that is being exported to be used in another file. */
    exports.getRooms = (async(req, res, next) => {
        try {
            let sql = "SELECT * FROM rooms";
            db.query(sql, (err, result) => {
                if (err) {
                    res.json({
                        error: err
                    });
                } else {
                    res.status(200).json({
                        data: result,
                        message: 'success'
                    });
                }
            });
        } catch (error) {
            res.status(500).json({
                error: error
            });
        }
    })

    /* A function that is being exported to be used in another file. */
    exports.infoRoom = (async(req, res, next) => {
        try {
            let sql = "SELECT * FROM rooms WHERE id = ?";
            db.query(sql, req.params.id, (err, result) => {
                if (err) {
                    res.json({
                        error: err
                    });
                } else {
                    try {
                        let sql = `SELECT * FROM hotels WHERE id = ${result.hotelid}?`;
                        db.query(sql, req.params.id, (err, hotels) => {
                            if (err) {
                                res.json({
                                    error: err
                                });
                            } else {
                                result.hotel = JSON.stringify(hotels);
                            }
                        });
                    } catch (error) {}
                    res.status(200).json({
                        data: result,
                        message: 'success'
                    });
                }
            });
        } catch (error) {
            res.status(500).json({
                error: error
            });
        }
    })

    exports.updateRoom = (async(req, res, next) => {
                try {
                    album = []
                    db.query("SELECT * FROM rooms WHERE id = ?", req.params.id, (err, result) => {
                                if (err) {
                                    res.json({
                                        error: err
                                    });
                                } else {
                                    try {
                                        album = JSON.parse(result[0].photos);
                                        album.forEach(element => {
                                                    fs.unlink(`./api/images/rooms/${element.split(`images/rooms/`)[1]}`, () => { })
                        });
                    } catch (error) {

                    }
                }
            });
            let sql = "UPDATE rooms SET ? WHERE id = ?";
            req.body.photos = [];
            req.files.forEach(element => {
                req.body.photos.push(`${req.protocol}://${req.get('host')}/images/rooms/${element.filename}`);
            });
            req.body.photos = JSON.stringify(req.body.photos);
                db.query(sql, [req.body, req.params.id], (err, result) => {
                if (err) {
                    res.json({
                        error: err
                    });
                } else {
                    res.status(200).json({
                        data: req.body,
                        message: 'success'
                    });
                }
            });
        } catch (error) {
            res.status(500).json({
                error: error
            });
        }

    });


    exports.deleteRoom = (async(req, res, next) => {
        try {
            album = []
            db.query("SELECT * FROM rooms WHERE id = ?", req.params.id, (err, result) => {
                if (err) {
                    res.json({
                        error: err
                    });
                } else {
                    try {
                        album = JSON.parse(result[0].photos);
                        album.forEach(element => {
                            console.log(`${element.split(`images/rooms/`)[1]}`);
                            fs.unlink(`./api/images/rooms/${element.split(`images/rooms/`)[1]}`, () => { })
                        });
                    } catch (error) {

                    }
                }
            });
            let sql = "DELETE FROM rooms WHERE id = ?";
            db.query(sql, req.params.id, (err, result) => {
                if (err) {
                    res.json({
                        error: err
                    });
                } else {
                    res.status(200).json({
                        message: 'row delete successful'
                    });
                }
            });
        } catch (error) {
            res.status(500).json({
                error: error
            });
        }
    })