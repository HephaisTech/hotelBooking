    const express = require('express');
    const router = express.Router();
    const roomCtrl = require('./../controllers/roomCtrl');
    const roomPhoto = require('./../middlewares/roomPhoto');

    router.get('/', roomCtrl.getRooms);
    router.post('/', roomPhoto, roomCtrl.createRoom);
    router.route('/:id').get(roomCtrl.infoRoom).put(roomPhoto, roomCtrl.updateRoom).delete(roomCtrl.deleteRoom);
    module.exports = router;