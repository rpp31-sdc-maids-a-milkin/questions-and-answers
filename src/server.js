require('dotenv').config();
const app = require('./app');
console.log(process.env.NEWRELIC)

const port = process.env.PORT || 3002;
const conn = require('./db/connection');

app.listen(port, () => {
  console.log(`Q&A API listening at http://localhost:${port}`);
});
