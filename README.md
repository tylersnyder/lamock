# lamock
Serve node.js Lambda functions on localhost

### Getting Started

1. Install `lamock`
```
npm install lamock --save-dev
```

2. Serve your function handler
```
const serve = require("lamock");
const { handler } = require("./my-lambda-function");

serve(handler);
```

Lamock will serve your handler from `localhost:3000`, and mock the AWS Lambda `event`, `context` and `callback`.
