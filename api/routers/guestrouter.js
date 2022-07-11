    const express = require('express');
    const router = express.Router();
    const guestCtrl = require('../controllers/guestCtrl');
    const guestPhoto = require('../middlewares/guestPhoto');

    router.post('/register', guestCtrl.creatGuest);
    router.post('/login', guestCtrl.login);
    router.get('/', guestCtrl.tokenCheck, guestCtrl.readGuest);
    router.route('/:id').get(guestCtrl.tokenCheck, guestCtrl.infoGuest)
        .delete(guestCtrl.tokenCheck, guestCtrl.deleteGuest)
        .put(guestCtrl.tokenCheck, guestPhoto, guestCtrl.updateGuest)


    module.exports = router;