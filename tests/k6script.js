import http from 'k6/http';
// import { sleep } from 'k6';

export const options = {
  scenarios: {
    one_request_per_second: {
      executor: 'constant-arrival-rate',
      rate: 1,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      duration: '30s',
      preAllocatedVUs: 1, // how large the initial pool of VUs would be
      maxVUs: 2, // if the preAllocatedVUs are not enough, we can initialize more
    },
    ten_requests_per_second: {
      executor: 'constant-arrival-rate',
      rate: 10,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      startTime: '30s',
      duration: '30s',
      preAllocatedVUs: 2, // how large the initial pool of VUs would be
      maxVUs: 5, // if the preAllocatedVUs are not enough, we can initialize more
    },
    one_hundred_requests_per_second: {
      executor: 'constant-arrival-rate',
      rate: 100,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      startTime: '60s',
      duration: '30s',
      preAllocatedVUs: 10, // how large the initial pool of VUs would be
      maxVUs: 20, // if the preAllocatedVUs are not enough, we can initialize more
    },
    one_thousand_requests_per_second: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      startTime: '90s',
      duration: '30s',
      preAllocatedVUs: 1000, // how large the initial pool of VUs would be
      maxVUs: 2000, // if the preAllocatedVUs are not enough, we can initialize more
    },
  },
};

export default () => {
  const questionId = Math.ceil(Math.random() * 1000011);
  http.get(`http://localhost:3002/qa/questions?product_id=${questionId}`, { tags: { name: 'questions' } });
  // sleep(1);
  // http.get(`http://localhost:3002/qa/questions/${questionId}/answers`, { tags: { name: 'questions' } });
  // sleep(1);
};
