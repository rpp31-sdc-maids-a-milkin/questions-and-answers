#!/bin/bash

# mongosh --file ./validators.js

mongoimport --db=qa --collection=photos --type=csv --headerline --ignoreBlanks --stopOnError --file=../../dataSet/answers_photos.csv &
mongoimport --db=qa --collection=answers --type=csv --headerline --ignoreBlanks --stopOnError --file=../../dataSet/answers.csv &
mongoimport --db=qa --collection=questions --type=csv --headerline --ignoreBlanks --stopOnError --file=../../dataSet/questions.csv &
wait

mongosh --file ./aggregation.js
exit 0