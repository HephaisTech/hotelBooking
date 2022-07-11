    const db = require('./../../config/Db');
    var fs = require('fs');

    /* This is a function that is used to create a hotel. */
    exports.createHotel = (req, res, next) => {
            db.query("SELECT * FROM hotels WHERE telephone = ?", req.body.telephone, (err, result) => {
                if (err) {
                    res.json({
                        error: err
                    });
                } else {
                    if (result.length > 0) {
                        res.status(409).json({
                            message: 'This Hotel already exist'
                        });
                    } else {
                        let sql = "INSERT INTO hotels  SET ?";
                        req.body.photos = [];
                        req.files.forEach(element => {
                            req.body.photos.push(`${req.protocol}://${req.get('host')}/images/hotels/${element.filename}`);
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
        }
        /* This is a function that is used to get all the hotels. */
    exports.getHotels = (req, res, next) => {
            let sql = "SELECT * FROM hotels";
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
        }
        /* This is a function that is used to get a hotel by id. */
    exports.infoHotel = (async(req, res, next) => {
        try {
            let sql = "SELECT * FROM hotels  WHERE id = ?";
            db.query(sql, req.params.id, (err, result) => {
                if (err) {
                    res.json({
                        error: err
                    });
                } else {
                    try {
                        let sql = `SELECT * FROM rooms WHERE hotelid = ${result[0].id}`;
                        db.query(sql, (err, rooms) => {
                            if (err) {
                                res.json({
                                    error: err
                                });
                            } else {
                                result[0].rooms = JSON.stringify(rooms);
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
                }
            })
        } catch (error) {
            res.status(500).json({
                error: error
            });
        }
    })

    /* A function that is used to update a hotel. */
    exports.updateHotel = (async(req, res, next) => {
                try {
                    album = []
                    db.query("SELECT * FROM hotels WHERE id = ?", req.params.id, (err, result) => {
                                if (err) {
                                    res.json({
                                        error: err
                                    });
                                } else {
                                    try {
                                        album = JSON.parse(result[0].photos);
                                        album.forEach(element => {
                                                    console.log(`${element.split(`images/hotels/`)[1]}`);
                            fs.unlink(`./api/images/hotels/${element.split(`images/hotels/`)[1]}`, () => { })
                        });
                    } catch (error) {
                        res.status(500).json({
                            error: error
                        });
                    }
                }
            });
            let sql = "UPDATE hotels SET ? WHERE id = ?";
            req.body.photos = [];
            req.files.forEach(element => {
                req.body.photos.push(`${req.protocol}://${req.get('host')}/images/hotels/${element.filename}`);
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
    })
    /* A function that is used to delete a hotel. */
    exports.deleteHotel = (async (req, res, next) => {
        try {
            album = []
            db.query("SELECT * FROM hotels WHERE id = ?", req.params.id, (err, result) => {
                if (err) {
                    res.json({
                        error: err
                    });
                } else {
                    try {
                        album = JSON.parse(result[0].photos);
                        album.forEach(element => {
                            console.log(`${element.split(`images/hotels/`)[1]}`);
                            fs.unlink(`./api/images/hotels/${element.split(`images/hotels/`)[1]}`, () => { })
                        });
                    } catch (error) {

                    }
                }
            });
            let sql = "DELETE FROM hotels WHERE id = ?";
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