const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');


const { postsData } = require('./PostsData');
const posts = postsData;

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads
app.use(cors());

app.get('/posts', (req, res) => {
    res.send(posts);

});

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = {
        id, title
    };
    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data:{
            id, title
        }
    });
    res.status(201).send(posts[id]);

} );


app.post('/events',  (req, res) => {
    console.log('Recieved Event', req.body.type);
    res.status(200).send('Event Recieved');
    
});

app.listen(4000, () => {
    console.log('Server is running on 4000');
} );