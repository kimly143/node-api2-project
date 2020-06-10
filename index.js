const express = require('express');
const postRouter = require('./postRouter');
const app = express();

app.use(express.json());
app.use('/api/posts', postRouter);

//put app listening at 4040
app.listen(4040);
