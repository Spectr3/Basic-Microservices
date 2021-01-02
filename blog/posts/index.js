const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', async (req, res) => {
    console.log('Post sent');
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id, title
    };

    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
            id, title
        }
    });
    console.log('Sent event');

    res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
    console.log('Recieved event', req.body);

    res.send({});
});

app.listen(4000, () => {
    console.log('Listening on 4000');
});