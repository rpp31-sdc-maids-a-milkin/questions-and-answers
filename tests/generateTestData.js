const fs = require('fs');

const values = [];

for (let i = 0; i < 15000; i++) {
  const n = Math.ceil((Math.random() * 100001) + 90000);
  values.push([n]);
};

const data = {
  keys: ['product_id'],
  values,
};

fs.writeFile(__dirname + '/testData.json', JSON.stringify(data), (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('done');
  }
});
