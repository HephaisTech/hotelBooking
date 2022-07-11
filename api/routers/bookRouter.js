const express = require('express');
const router = express.Router();
const bookCtrl = require('./../controllers/bookCtrl');

router.get('/', bookCtrl.getBooks);
router.post('/', bookCtrl.createBook);
router.route('/:id').get(bookCtrl.infoBook).put(bookCtrl.updateBook).delete(bookCtrl.deleteBook);


module.exports = router;