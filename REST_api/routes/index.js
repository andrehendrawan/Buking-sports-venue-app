const express = require('express');
const UserController = require('../controllers/UserController');
const errorHandler = require('../middlewares/errorHandler');
const authentication = require('../middlewares/authentication');
const VenueController = require('../controllers/VenueController');
const NewsController = require('../controllers/NewsController');
const OrderController = require('../controllers/OrderController');
const CategoryController = require('../controllers/CategoryController');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: 'THIS IS HOME' })
})
router.post('/login', UserController.login)
router.post('/google-login', UserController.googleLogin)
router.post('/register', UserController.register)
router.post('/venues/detail/booking/notifications', VenueController.getMidtransNotifications)


router.use(authentication)

router.get('/venues', VenueController.listVenue)
router.post('/venues', VenueController.createVenue)
router.put('/venues/:id', VenueController.editVenue)
router.delete('/venues/:id', VenueController.deleteVenue)
router.get('/venues/detail/:id', VenueController.detailVenue)

router.post('/venues/detail/:id/booking/midtrans', VenueController.getMidTransToken)

router.get('/order/history/:id', OrderController.orderHistory)

router.get('/categories', CategoryController.listCategory)
router.post('/categories', CategoryController.createCategory)
router.get('/news', NewsController.news)

router.use(errorHandler)

module.exports = router