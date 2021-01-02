const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(bodyParser.json);
app.use(cors);

app.post('/events', async (req, res) => {
    console.log('Event started');
    const event = req.body;

    console.log('Received event');

    await axios.post('http://localhost:4000/events', event);
    await axios.post('http://localhost:4001/events', event);
    await axios.post('http://localhost:4002/events', event);

    res.status(200).send();
});

app.listen(4005, () => {
    console.log('Listening on 4005');
});