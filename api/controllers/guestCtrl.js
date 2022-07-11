    const db = require('./../../config/Db');
    const bcrypt = require('bcrypt')
    const Joi = require('@hapi/joi')
    const jwt = require('jsonwebtoken')
    const fs = require('fs');

    const validator = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            password: Joi.string().required()
        })
        /* A function that is being exported to be used in another file. */
    exports.creatGuest = (async(req, res, next) => {
        /* Checking if the email already exists in the database. */
        try {
            const { error } = validator.validate(req.body);
            if (error) {
                res.status(404).json({ error: error.details[0].message });
                return;
            }
            let sql = "SELECT * FROM guest WHERE email = ?";
            db.query(sql, req.body.email, async(err, result) => {
                if (err) {
                    res.json({
                        error: err
                    });
                    return;
                } else {
                    if (result.length > 0) {
                        res.status(409).json({
                            message: 'Email already exists'
                        });
                        return;
                    } else {
                        const HashKey = await bcrypt.genSalt(10);
                        req.body.password = await bcrypt.hash(req.body.password, HashKey);
                        try {
                            req.body.profil = `${req.protocol}://${req.get('host')}/images/guest/${req.file.filename}`;
                        } catch (error) {}
                        /* Inserting the data into the database. */
                        sql = "INSERT INTO guest SET ?";
                        db.query(sql, req.body, (err, result) => {
                            if (err) {
                                res.json({
                                    error: err
                                });
                                return;
                            } else {
                                res.status(200).json({
                                    data: req.body,
                                    message: 'success'
                                });
                                return;
                            }
                        });
                    }
                }
            })
        } catch (error) {
            res.status(500).json({ error: error });
        }
    });
    /* A function that is being exported to be used in another file. */
    exports.readGuest = (async(req, res, next) => {
        try {
            let sql = "SELECT * FROM guest ";
            db.query(sql, req.params.id, (err, result) => {
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
            res.status(500).json({ error: error });
        }
    });
    exports.infoGuest = (async(req, res, next) => {
        try {
            let sql = "SELECT * FROM guest WHERE (guest.id = ?)";
            db.query(sql, req.params.id, (err, result) => {
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
            res.status(500).json({ error: error });
        }
    });
    exports.updateGuest = (async(req, res, next) => {
                try {
                    const { error } = validator.validate(req.body);
                    if (error) {
                        res.status(404).json({ error: error.details[0].message });
                        return;
                    }
                    db.query("SELECT `profil` FROM `guest` WHERE id = ?", req.params.id, (err, result) => {
                                if (err) {
                                    res.json({
                                        error: err
                                    });
                                    return;
                                } else {
                                    try {
                                        fs.unlink(`./api/images/guests/${result[0].profil.split(`images/guests/`)[1]}`, () => { })
                                        console.log(result[0].profil.split(`images/guests/`)[1]);
                                        } catch (error) {
                                            res.status(500).json({
                                                error: error
                                            });
                                         return;
                                        }
                    }
                    });
            const HashKey = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, HashKey);
            req.body.profil = `${req.protocol}://${req.get('host')}/images/guests/${req.file.filename}`;
            let sql = "UPDATE guest SET ? WHERE id = ?";
            db.query(sql, [req.body, req.params.id], (err, result) => {
                if (err) {
                    res.json({
                        error: err
                    });
                    return;
                } else {
                    res.status(200).json({
                        data: req.body,
                        message: 'success'
                    });
                    return;
                }
            });
        } catch (error) {
            res.status(500).json({ error: error });
            return;
        }
    });
    /* A function that is being exported to be used in another file. */
    exports.deleteGuest = (async(req, res, next) => {
        try {
            let sql = "SELECT `profil` FROM `guest` WHERE id = ?";
            db.query(sql, req.params.id, (err, result) => {
                if (err) {
                    res.json({
                        error: err
                    });
                    return;
                } else {
                    try {
                        fs.unlink(`./api/images/guest/${result[0].profil.split(`images/guest/`)[1]}`, () => { })
                        } catch (error) {}
                }
            });
            sql = "DELETE FROM guest WHERE id = ?";
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
        }
    });
        /* A function that checks if the user is logged in. */
exports.login = (async(req, res, next) => {
    try {
        let user ; 
         db.query("SELECT * FROM `guest` WHERE (`Email` = ?)   ORDER BY `id` LIMIT 1", req.body.email, (err, result) => { 
            if (err) {
                res.status(500).json({error: err.message})
            } else {
                if (result.length > 0) {
                    user = result[0]; 
                     bcrypt.compare(req.body.password, user.password, async (err, result) => {
                        if (err) {
                            res.status(500).json({error: err.message})
                            return;
                        } else {
                          try {
                            if (result) { 
                                const token = jwt.sign({
                                    email: user.Email,
                                    id: user._id,
                                }, user.Email, { expiresIn: "8h" });
                                res.header('booker', token).json({ data: token, message: 'you are now log in' });
                                return;
                            } else {
                                res.status(401).json({
                                    message: 'invalid Email or Password'
                                });
                                return;
                            }
                          } catch (error) {
                                res.status(500).json({ error: error.message });
                          }
                        }
                    });
                } else {
                    res.status(404).json({
                        message: 'User not found'
                    });
                      return;
                }
            }
        }); 
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
});
/* A function that checks if the user is logged in. */
exports.tokenCheck = (req, res, next) => {
    try {
        const token = req.header('booker');
        const authEmail = jwt.decode(token);
        if (!token) return res.status(401).json({ error: 'Invalid token' });
        const verified = jwt.verify(token, authEmail.email);
        req.user = verified;
        next();
    } catch (error) {
        res.status(500).json({ error: "tokenCheck error" });
    }
}