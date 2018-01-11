'use strict'

const path = require('path');

const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const koaStatic = require('koa-static');

// 路由模块
const user = require('./server/routes/user');

const staticPath = './server/public';
const app = new Koa();

app.use(bodyParser());
app.use(json());
app.use(koaStatic(path.join(__dirname, staticPath)));

router.use('/user', user.routes());
app.use(router.routes());

app.listen(3000, () => {
  console.log('app start at 3000 port');
});
