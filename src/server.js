const app = require('./app.js');
const port = 3002;
const conn = require('./db/connection.js');

app.listen(port, () => {
  console.log(`Q&A API listening at http://localhost:${port}`);
});