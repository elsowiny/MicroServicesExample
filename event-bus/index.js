const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

const events = [];


app.post('/events', (req, res) => {
    console.log("Event recieved: ", req.body.type);
    const event = req.body;
    events.push(event);

    axios.post('http://localhost:4000/events', event).catch((err) => {
        console.log(err.message);
      });
    axios.post('http://localhost:4001/events', event).catch((err) => {
        console.log(err.message);
      });
    axios.post('http://localhost:4002/events', event).catch((err) => {
        console.log(err.message);
      });
    axios.post('http://localhost:4003/events', event).catch((err) => {
        console.log(err.message);
      });

    res.send({status: 'Ok'});
});

app.get('/events', (req, res) => {
    res.send(events);
});

app.listen(4005, () => {
    console.log('listening on port 4005!');
});