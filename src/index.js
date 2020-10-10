const app = require('./router/index');

app.express.get('/users', (req, res, next) => {
  res.status(200).send('Success');
});

app.express.get('/user:id', (req, res, next) => {
  res.status(200).send('Success');
});

app.express.put('/edit/user', (req, res, next) => {
  res.status(200).send('Success');
});

app.express.post('/create/user', (req, res, next) => {
  res.status(200).send('Success');
});