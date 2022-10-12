const express = require('express');
const router = express.Router();
const eventController = require('./controllers/eventFormController')
const bannerController = require('./controllers/bannerFormController')
const eventModel = require('./models/eventSchema')
const bannerModel = require('./models/bannerSchema')
const adminLoginController=require('./controllers/adminLoginController')
const middleware = require('./middleware/middleware')

router.get('/', (req, res) => res.send('Hello World!'));

/////////CREATE//////////

router.post('/createEvent', middleware.authentication, eventController.createEvent) 
router.post('/createBanner' ,middleware.authentication, bannerController.createBanner)
 
////////GET//////////// 

router.get('/getAllEvent',middleware.authentication, eventController.getAllEvents)
router.get('/getAllBanner',middleware.authentication, bannerController.getAllBanners)


////////DELETE//////////

router.delete('/deleteEvent/:id', middleware.authentication,eventController.deleteEvent)
router.delete('/deleteBanner/:id',middleware.authentication, bannerController.deleteBanner)


/////////UPDATE///////////////

router.put('/updateEvent/:id',middleware.authentication, eventController.updateEvent)
router.put('/updateBanner/:id', middleware.authentication,bannerController.updateBanner)


////////// FINDBYID /////////////////////
// router.get('/findBannerByID', bannerController.getBannerByID)
// router.get('/findEventByID', eventController.getEventByID)


/////////////////////////////////////////////////

router.get("/getBanner/:id", async (req, res) => {
    try {
        const getBanner = await bannerModel.findOne({ _id: req.params.id })
    res.status(200).send({status:true,msg:getBanner})
    }  catch (err) {
        return res.status(500).send({ status: false, msg: err })
     }
    })

router.get("/getEvent/:id", async (req, res) => {
    try {
        const getEvent = await eventModel.findOne({ _id: req.params.id })
    res.status(200).send({status:true,msg:getEvent})
    }  catch (err) {
        return res.status(500).send({ status: false, msg: err })
     }
})

router.post('/loginAdmin',adminLoginController.loginAdmin)


module.exports = router;