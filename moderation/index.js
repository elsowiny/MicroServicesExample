const express = require('express');
const axios = require('axios');


const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

app.post('/events',  async (req, res) => {
    const {type, data } = req.body;

    if (type === 'CommentCreated'){
        const status = data.content.includes('zugzwang') ? 'rejected' : 'accepted';
        console.log(status);

        await axios.post('http://localhost:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        });
    }

    res.sendStatus(200);
});

app.listen(4003, () => {
    console.log('Listening on port 4003');
} );