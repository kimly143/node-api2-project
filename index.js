const express = require('express');
const cors = require('cors');
const postRouter = require('./postRouter');
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/posts', postRouter);

//put app listening at 4040
app.listen(4040);
