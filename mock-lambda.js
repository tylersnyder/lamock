const headers = { "content-type": "text/plain" };

function getErrorHandler (res) {
  return function (error) {
    console.error("error: ", error);
    res.writeHead(result.statusCode || 400, headers);
    res.write(error);
    res.end();
  };
}

function getSuccessHandler (res) {
  return function (result) {
    console.log("success: ", result);

    if (result.headers) {
      res.writeHead(result.statusCode || 200, result.headers);
    } else {
      res.writeHead(200, headers);
    }

    if (result.body) {
      res.write(result.body);
    } else if (typeof result === "string") {
      res.write(result);
    }

    res.end();
  };
}

module.exports.context = function context (req, res) {
  return {
    succeed: getSuccessHandler(res),
    fail: getErrorHandler(res)
  };
};

module.exports.callback = function callback (req, res) {
  return function (error, result) {
    if (error) {
      const handleError = getErrorHandler(res);
      return handleError(error);
    }

    const handleSuccess = getSuccessHandler(res);
    return handleSuccess(result);
  };
};
