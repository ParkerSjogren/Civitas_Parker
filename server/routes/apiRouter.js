const router = require('express').Router()

const user = require('./user');
const auth = require('./auth');
const register = require('./register');
const userLevel = require('./userLevel');
const home = require('./home');
const community = require('./community');
const member = require('./member');
const event = require('./event');
const eventRegistration = require('./eventRegistration');
const mail = require('./mail');
const square = require('./square');
const photos = require('./photos');

router.use('/user',user)
router.use('/auth',auth)
router.use('/register',register)
router.use('/userLevel',userLevel)
router.use('/home',home)
router.use('/community',community)
router.use('/member',member)
router.use('/event',event)
router.use('/eventRegistration',eventRegistration)
router.use('/mail',mail)
router.use('/square',square)
router.use('/photos',photos)

module.exports = router
