/*
// Serves request handler on localhost
// mocks Lambda event, context, and callback
*/

const http = require("http");
const { parse } = require("url");
const { context, callback } = require("./mock-lambda");
const { PORT = 3000 } = process.env;

function serve (handler) {
  return http
    .createServer(async function (req, res) {
      const url = parse(req.url, true);
      const queryStringParameters = url.query;

      if (url.pathname.includes("favicon.ico")) {
        return res.end();
      }

      const result = await handler({ queryStringParameters }, context(req, res), callback(req, res));

      if (result) {
        return callback(req, res)(null, result);
      }
    })
    .listen(PORT, () => {
      console.log(`Handler listening on localhost:${PORT}`);
    });
}

module.exports = serve;
