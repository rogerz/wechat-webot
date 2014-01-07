# wechat-webot [![Build Status](https://secure.travis-ci.org/rogerz/wechat-webot.png?branch=master)](http://travis-ci.org/rogerz/wechat-webot)

wechat-webot creates an [express](http://expressjs.com/)/[connect](http://www.senchalabs.org/connect/) middleware with  [wechat](https://github.com/node-webot/wechat) API and [webot](https://github.com/rogerz/webot) rule engine

## Getting Started
Install the module with: `npm install wechat-webot`

```javascript
var wechatWebot = require('wechat-webot');
```

## Examples

```javascript
var express = require('express');
var bot = require('webot-chat')();
var app = express();

app.use(express.query());
app.use('/wechat', require('wechat-webot')('token', bot));
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

_(Nothing yet)_

## License

Copyright (c) 2014 Rogerz Zhang. Licensed under the MIT license.
