'use strict'

const model = require('../databases/model');
const User = model('user');
const crypto = require('crypto');

const fs = require('fs');

// 注册
const register = async (ctx) => {
  let { name, nickName, password } = ctx.request.body;
  let findUser = await User.findOne({ name: name });
  if (findUser) {
    ctx.body = {
      success: false,
      msg: '用户名重复，不能注册'
    }
    return;
  }
  const hash = crypto.createHash('md5');
  hash.update(password);
  let user = new User({
    name: name,
    nickName: nickName,
    password: hash.digest('hex')
  });
  let result = await user.save();
  ctx.body = {
    success: true,
    msg: 'success',
    result: result
  }
}

// 查询
const query = async (ctx) => {
  let { pageIndex = 1, pageSize = 0, sort = {}, where = {} } = ctx.request.body;
  let result = {
    data: await User.find(where).skip((pageIndex - 1) * pageSize).limit(pageSize).sort(sort),
    total: await User.count(where)
  }
  ctx.body = {
    success: true,
    msg: 'success',
    result: result
  }
}

// 删除
const remove = async (ctx) => {
  let { id } = ctx.request.body;
  let result = await User.findOneAndRemove({ _id: id });
  if (result) {
    ctx.body = {
      success: true,
      msg: 'success',
      result: result
    }
    return
  }
  ctx.body = {
    success: false,
    msg: 'success',
    result: result
  }
}

// 修改
const update = async (ctx) => {
  let { _id, name, nickName } = ctx.request.body;
  let result = await User.findOneAndUpdate({ _id: _id }, { name: name, nickName: nickName });
  if (result) {
    ctx.body = {
      success: true,
      msg: 'success',
      result: result
    }
    return
  }
  ctx.body = {
    success: false,
    msg: 'success',
    result: result
  }
}

const readFileSync = async (ctx, next) => {
  let { filePath = '' } = ctx.request.body;
  var res = await new Promise((resolve, reject) => {
    fs.readFile(filePath, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    })
  })
  ctx.body = res;
}

module.exports = {
  register,
  query,
  remove,
  update,
  readFileSync
}