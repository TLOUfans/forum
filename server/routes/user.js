'use strict'

const router = require('koa-router')();
const contorller = require('../controllers/user');

router.post('/register', contorller.register);
router.post('/query', contorller.query);
router.post('/remove', contorller.remove);
router.post('/update', contorller.update);
router.post('/readFile', contorller.readFileSync);

module.exports = router;