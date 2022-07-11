    const express = require('express');
    const router = express.Router();
    const HotelCtrl = require('./../controllers/hotelCtrl');
    const hotelPhoto = require('./../middlewares/hotelPhoto');


    router.get('/', HotelCtrl.getHotels);
    router.post('/', hotelPhoto, HotelCtrl.createHotel);
    router.route('/:id').get(HotelCtrl.infoHotel).put(hotelPhoto, HotelCtrl.updateHotel).delete(HotelCtrl.deleteHotel);

    module.exports = router;