const bucket = function(array, count) {
  if (array.length <= count) {
    return [[...array.map((i) => i.toObject())]];
  }
  let buckets = [];
  let numBuckets = Math.floor(array.length / count);

  for (let bucket = 0; bucket < numBuckets * count; bucket += count) {
    let newBucket = array.slice(bucket, bucket + count);
    buckets.push(newBucket);
  }
  if (array.length > numBuckets * count) {
    let lastBucket = array.slice(numBuckets * count, array.length);
    buckets.push(lastBucket);
  }
  return buckets;
};

module.exports = bucket;