const app = require('./app.js');
const port = 3002;

app.listen(port, () => {
  console.log(`Q&A API listening at http://localhost:${port}`);
});