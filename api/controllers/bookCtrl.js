const db = require('../../config/Db');
const express = require('express');
var crypto = require('crypto');
const { response } = require('express');

let messenger = express.response;

exports.createBook = (async(req, res, next) => {
    try {
        let sql = "SELECT * FROM rooms WHERE id = ? and status = true ";
        db.query(sql, req.body.idroom, (err, result) => {
            if (err) {
                res.json({
                    error: err
                });
                return;
            } else {
                if (result.length > 0) {
                    res.status(401).json({
                        message: 'This room is not available'
                    });
                    return;
                } else {
                    db.query("SELECT * FROM rooms WHERE id = ? ", req.body.idroom, (err, result) => {
                        if (result.length > 0) {
                            if (result[0].maxpeople < req.body.personcount) {
                                res.status(401).json({
                                    message: `This room can't receive more than ${result[0].maxpeople} people.`
                                });
                                return;
                            }
                            req.body.total = req.body.extraservice + result[0].price * Math.ceil(Math.abs(new Date(req.body.todate) - new Date(req.body.fromdate)) / (1000 * 60 * 60 * 24));
                            req.body.id = crypto.createHash('sha256').update(`${req.body.guestid},${req.body.roomid},${Date.now().toString()}`).digest('hex');
                            let sql = "INSERT INTO book SET ?";
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
                                    return;
                                }
                            });
                        }
                    });
                }
            }
        })
    } catch (error) {
        res.status(500).json({ error: error });
        return;
    }
})
exports.getBooks = (async(req, res, next) => {
    try {
        let sql = "SELECT * FROM book";
        db.query(sql, (err, result) => {
            if (err) {
                res.json({
                    error: err
                });
                return;
            } else {
                res.status(200).json({
                    data: result,
                    message: 'success'
                });
                return;
            }
        });
    } catch (error) {
        res.status(500).json({ error: error });
        return;
    }
})
exports.infoBook = (async(req, res, next) => {
    try {
        let sql = "SELECT * FROM book WHERE id = ?";
        db.query(sql, req.params.id, (err, result) => {
            if (err) {
                res.json({
                    error: err
                });
                return;
            } else {
                res.status(200).json({
                    data: result,
                    message: 'success'
                });
                return;
            }
        });
    } catch (error) {
        res.status(500).json({ error: error });
        return;
    }
})

exports.updateBook = (async(req, res, next) => {
    try {
        let sql = "SELECT * FROM book WHERE id = ?";
        db.query(sql, req.params.id, (err, result) => {
            if (err) {
                res.json({
                    error: err
                });
                return;
            } else {
                if (result.length > 0) {
                    let sql = "UPDATE book SET ? WHERE id = ?";
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
                            return;
                        }
                    });
                } else {
                    res.status(401).json({
                        message: 'This book is not available'
                    });
                    return;
                }
            }
        });
    } catch (error) {
        res.status(500).json({ error: error });
        return;
    }
});
exports.deleteBook = (async(req, res, next) => {
    try {
        let sql = "SELECT * FROM book WHERE id = ?";
        db.query(sql, req.params.id, (err, result) => {
            if (err) {
                res.json({
                    error: err
                });
                return;
            } else {
                if (result.length > 0) {
                    let sql = "DELETE FROM book WHERE id = ?";
                    db.query(sql, req.params.id, (err, result) => {
                        if (err) {
                            res.json({
                                error: err
                            });
                        } else {
                            res.status(200).json({
                                data: req.body,
                                message: 'success'
                            });
                            return;
                        }
                    });
                } else {
                    res.status(401).json({
                        message: 'This book is not available'
                    });
                    return;
                }
            }
        });
    } catch (error) {
        res.status(500).json({ error: error });
        return;
    }
})