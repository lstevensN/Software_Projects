"use strict";

var _require = require('./PuppeteerMock.js'),
    mockPuppeteer = _require.mockPuppeteer;

var _require2 = require('fs'),
    readdirSync = _require2.readdirSync,
    mkdirSync = _require2.mkdirSync,
    writeFileSync = _require2.writeFileSync;

var rimraf = require('rimraf');

var SubscribersHandler = require('../../classes/SubscribersHandler.js');

var DataHandler = require('../../classes/DataHandler.js');

var dataDir = './tests/test-data';
var subscribersFile = "".concat(dataDir, "/subscribers-schema.yaml");
process.env.SCRAPPER_SCHEMA_FILE = 'scrapper-schema.yaml';
process.env.SUBSCRIBERS_SCHEMA_FILE = subscribersFile;
process.env.MAIL_DATA_DIR = dataDir;
jest.mock('puppeteer', function () {
  return mockPuppeteer;
});
var sH;
var email = 'jane@mail.com';
var hour = new Date().getHours();

var mailDataGen = function mailDataGen(email, hour) {
  return "\n-\n  email: ".concat(email, "\n  mails:\n    -\n      cron: '* ").concat(hour, " * * *'\n      name: Daily Digest\n      list:\n        -\n          base: indiehackers\n          name: 'Indie Hackers'\n          count: 6\n        -\n          base: hackernews\n          name: Hacker News\n          count: 6\n");
};

var mailData = mailDataGen(email, hour);
var mailData2 = mailDataGen(email, hour + 1);
beforeAll(function () {
  try {
    mkdirSync(dataDir);
  } catch (e) {}

  writeFileSync(subscribersFile, mailData);
}); // afterAll((cb) => rm(dataDir, { recursive: true, force: true }, cb))

afterAll(function (cb) {
  return rimraf(dataDir, cb);
});
beforeEach(function () {
  sH = SubscribersHandler.init();
  sH.quiet = false;
});
test('if init is working as expected', function () {
  expect(sH).toEqual(expect.any(SubscribersHandler));
});
describe('start is working as expected on', function () {
  test('when cron matches', function _callee() {
    var count, dirData;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(sH.start());

          case 2:
            count = _context.sent;
            expect(count).toBe(1);
            dirData = readdirSync(dataDir);
            expect(dirData).toEqual(expect.arrayContaining(["".concat(email, "-mail-0.yaml")]));
            _context.t0 = expect;
            _context.next = 9;
            return regeneratorRuntime.awrap(DataHandler.read("".concat(dataDir, "/").concat(email, "-mail-0.yaml")));

          case 9:
            _context.t1 = _context.sent;
            _context.t2 = "\n      Object {\n        \"0\": Object {\n          \"config\": Object {\n            \"count\": 6,\n            \"ignore\": \"^(ascending|outsideContext|ignore|count|name|channel|post|website)$\",\n            \"link\": \"https://indiehackers.com\",\n            \"name\": \"Indie Hackers\",\n            \"post\": \".feed-item\",\n            \"website\": \"https://indiehackers.com\",\n          },\n          \"posts\": Array [],\n        },\n        \"1\": Object {\n          \"config\": Object {\n            \"count\": 6,\n            \"ignore\": \"^(ascending|outsideContext|ignore|count|name|channel|post|website)$\",\n            \"link\": \"https://news.ycombinator.com/news\",\n            \"name\": \"Hacker News\",\n            \"outsideContext\": true,\n            \"post\": \" .athing\",\n            \"website\": \"https://news.ycombinator.com/news\",\n          },\n          \"posts\": Array [],\n        },\n        \"cron\": \"* ".concat(hour, " * * *\",\n        \"name\": \"Daily Digest\",\n      }\n    ");
            (0, _context.t0)(_context.t1).toMatchInlineSnapshot(_context.t2);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    });
  });
  test('when cron dont match', function _callee2() {
    var count;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            writeFileSync(subscribersFile, mailData2);
            sH = SubscribersHandler.init();
            sH.quiet = false;
            _context2.next = 5;
            return regeneratorRuntime.awrap(sH.start());

          case 5:
            count = _context2.sent;
            expect(count).toBe(0);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
});
test('if handleMail is working as expected', function _callee3() {
  var mail;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          mail = {
            cron: "* ".concat(hour, " * * *"),
            name: 'Daily Digest',
            list: [{
              base: 'indiehackers',
              name: 'Indie Hackers',
              count: 6
            }]
          };
          _context3.next = 3;
          return regeneratorRuntime.awrap(sH.load());

        case 3:
          _context3.t0 = expect;
          _context3.next = 6;
          return regeneratorRuntime.awrap(sH.handleMail(mail));

        case 6:
          _context3.t1 = _context3.sent;
          (0, _context3.t0)(_context3.t1).toMatchInlineSnapshot("\n    Array [\n      Object {\n        \"config\": Object {\n          \"count\": 6,\n          \"ignore\": \"^(ascending|outsideContext|ignore|count|name|channel|post|website)$\",\n          \"link\": \"https://indiehackers.com\",\n          \"name\": \"Indie Hackers\",\n          \"post\": \".feed-item\",\n          \"website\": \"https://indiehackers.com\",\n        },\n        \"posts\": Array [],\n      },\n    ]\n  ");

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
});
test('if load is working as expected', function _callee4() {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(sH.load());

        case 2:
          expect(sH).toEqual(expect.objectContaining({
            subscribers: [expect.anything()],
            scrapperSchema: expect.any(Object)
          }));

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
});
test('if writeMailData is working as expected', function _callee5() {
  var data, filename, fileLink, dirData;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          // write the mail data to disk
          data = {
            a: 'foo',
            b: 'bar'
          };
          filename = 'testmail.yaml';
          fileLink = "".concat(dataDir, "/").concat(filename);
          _context5.next = 5;
          return regeneratorRuntime.awrap(sH.writeMailData(fileLink, data));

        case 5:
          dirData = readdirSync(dataDir);
          expect(dirData).toEqual(expect.arrayContaining([filename]));
          _context5.t0 = expect;
          _context5.next = 10;
          return regeneratorRuntime.awrap(DataHandler.read(fileLink));

        case 10:
          _context5.t1 = _context5.sent;
          _context5.t2 = data;
          (0, _context5.t0)(_context5.t1).toEqual(_context5.t2);

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  });
});
//# sourceMappingURL=SubcribersHandler.test.dev.js.map
