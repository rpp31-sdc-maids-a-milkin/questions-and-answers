import http from 'k6/http';
// import { sleep } from 'k6';

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      duration: '30s',
      preAllocatedVUs: 5000, // how large the initial pool of VUs would be
      maxVUs: 10000, // if the preAllocatedVUs are not enough, we can initialize more
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
