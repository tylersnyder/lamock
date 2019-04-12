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
    .createServer(function (req, res) {
      const url = parse(req.url, true);
      const queryStringParameters = url.query;

      if (url.pathname.includes("favicon.ico")) {
        return res.end();
      }

      return handler({ queryStringParameters }, context(req, res), callback(req, res));
    })
    .listen(PORT, () => {
      console.log(`Handler listening on localhost:${PORT}`);
    });
}

module.exports = serve;
