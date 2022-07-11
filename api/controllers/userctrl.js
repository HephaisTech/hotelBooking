const db = require('./../../config/Db');
const bcrypt = require('bcrypt')
const Joi = require('@hapi/joi')
const jwt = require('jsonwebtoken')
const fs = require('fs');
//npm install jwt

const validator = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required()
})

/* A function that creates a user. */
exports.createUser = (async(req, res, next) => {
        const { error } = validator.validate(req.body);
        if (error) {
            res.status(404).json({ error: error.details[0].message });
        } else {
            const EmailExists = await User.findOne({ email: req.body.email });
            if (EmailExists) {
                res.status(500).json({ Message: 'Email already exists' });
            } else {
                const HashKey = await bcrypt.genSalt(10);
                const password = await bcrypt.hash(req.body.password, HashKey);
                const user = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: password
                });
                user.save((err, user) => {
                    if (err) {
                        res.status(500).json({ error: err });
                    } else {
                        res.status(201).json({ data: user });
                    }
                })
            }
        }
    })
    /* A function that returns all the users in the database. */
exports.readuser = (req, res, next) => {
        try {
            User.find().then((user) => {
                res.status(200).json({ data: user })
            });
        } catch (error) {

        }
    }
    /* A function that returns a user by id. */
exports.infoUser = (req, res, next) => {
    try {
        res.status(200).json({ data: User.findById(req.params.id) });
    } catch (error) {

    }
};
/* A function that updates a user. */
exports.updateUser = (async(req, res, next) => {
        try {
            const { error } = validator.validate(req.body);
            if (error) {
                res.status(404).json({ error: error.details[0].message });
            } else {
                const HashKey = await bcrypt.genSalt(10);
                const password = await bcrypt.hash(req.body.password, HashKey);
                const userP = new User({
                    _id: req.params.id,
                    username: req.body.username,
                    email: req.body.email,
                    password: password,
                    Image: `${req.protocol}://${req.get('host')}/images/users/${req.file.filename}`,
                });
                User.findOne({ _id: req.params.id })
                    .then(user => {
                        /* Deleting the image of the user. */
                        const filename = user.Image.split('/images/users/')[1];
                        fs.unlink(`images/users/${filename}`, () => {});
                    }).finally(() => {
                        User.updateOne({ _id: req.params.id }, userP, { new: true })
                            .then((result) => {
                                res.status(200).json({ data: userP });
                            });
                    })
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
    /* Deleting a user by id. */
exports.deleteUser = (async(req, res, next) => {
        try {
            User.findById({ _id: req.params.id }).then((user) => {
                if (!user) {
                    res.status(401).json({ error: 'User not found' });
                } else {
                    /* Deleting the image of the user. */
                    try {
                        const filename = user.Image.split('/images/users/')[1];
                        fs.unlink(`images/users/${filename}`, () => {
                            User.deleteOne({ _id: req.params.id })
                                .then(() => res.status(200).json({ message: 'User deleted' }))
                                .catch((error) => res.status(404).json({ error: error }));
                        });
                    } catch (error) {
                        res.status(500).json({ error: error.message });
                    }
                }
            })
        } catch (error) {
            res.status(500).json({ error: error.message });

        }
    })
    /* A function that checks if the user is logged in. */
exports.login = (async(req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) { res.status(404).json({ error: err.Message }); };
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) { res.status(404).json({ error: 'invalid username or password' }); };

        const token = jwt.sign({
                email: user.email,
                id: user._id,
            }, user.email, { expiresIn: "2h" }

        )
        res.header('geduxtoken', token).json({ data: token, message: 'you are now log in' });

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
});
/* A function that checks if the user is logged in. */
exports.tokenCheck = (req, res, next) => {
    try {
        const token = req.header('geduxtoken');
        const authEmail = jwt.decode(token);
        if (!token) return res.status(401).json({ error: 'Invalid token' });
        const verified = jwt.verify(token, authEmail.email);
        req.user = verified;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}

// User.findByIdAndUpdate({ _id: req.params.id }, user, { new: true }, async(err, user) => {
//     if (!err) {
//         res.status(200).json(user);
//     } else {
//         res.status(500).json({ message: err.message });
//     }
// })