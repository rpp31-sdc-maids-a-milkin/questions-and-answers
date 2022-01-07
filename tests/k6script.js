import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  const questionId = Math.ceil(Math.random() * 1000011);
  http.get(`http://localhost:3002/qa/questions?product_id=${questionId}`, { tags: { name: 'questions' }});
  // sleep(1);
  http.get(`http://localhost:3002/qa/questions/${questionId}/answers`, { tags: { name: 'questions' }});
  // sleep(1);
}