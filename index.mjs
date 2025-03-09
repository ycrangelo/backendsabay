import express from 'express';

const app = express()
const PORT = 5000

app.get('/try', (request,response) => {
  console.log('Request received at /try'); // Debug log
response.send('heeloo jake at chalres')
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Listening on http://192.168.18.3:${PORT}`);
});