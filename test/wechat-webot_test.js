'use strict';

var wechatWebot = require('../lib/wechat-webot.js');

require('should');

describe('wechat-webot', function () {
  it('should export function', function () {
    wechatWebot.should.be.type('function');
  });
});
