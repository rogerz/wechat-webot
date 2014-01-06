/*
 * wechat-webot
 * https://github.com/rogerz/wechat-webot
 *
 * Copyright (c) 2014 Rogerz Zhang
 * Licensed under the MIT license.
 */

'use strict';

var wechat = require('wechat');
var webot = require('webot');

//
// borrowed from https://github.com/node-webot/weixin-robot
//
// convert weixin props to
// more human readable names
var pmap = {
  FromUserName: 'uid',
  ToUserName: 'sp',
  CreateTime: 'createTime',
  MsgId: 'id',
  MsgType: 'type',
  Content: 'text'
};

var mmap = {
  Location_X: 'lat',
  Location_Y: 'lng',
  // Event == LOCATION
  Latitude: 'lat',
  Longitude: 'lng'
};

function normInfo(original) {
  var param = {};
  var data = {
    raw: original,
    original: original,
    param: param
  };

  var key, val;
  for (key in original) {
    val = original[key];
    if (key in pmap) {
      data[pmap[key]] = val;
    } else if (key in mmap) {
      // 名字特殊处理的参数
      param[mmap[key]] = val;
    } else {
      // convert 其他参数都是将首字母转为小写
      key = key[0].toLowerCase() + key.slice(1);
      if (key === 'recognition') {
        data.text = val;
      }
      param[key] = val;
    }
  }
  data.created = new Date(parseInt(original.CreateTime, 10) * 1000);
  return webot.Info(data);
}

module.exports = function (token, webot) {
  return wechat(token, function (req, res) {
    var info = normInfo(req.weixin);
    webot.reply(info, function (err, info) {
      if (info.noReply === true) {
        res.statusCode = 204;
        res.end();
        return;
      }
      var reply = info.reply;
      if (typeof reply === 'object' && !reply.type && !Array.isAray(reply)) {
        reply = [reply];
      }
      res.reply(reply, info.flag);
    });
  });
};
