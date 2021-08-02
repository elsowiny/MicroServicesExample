const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads
app.use(cors());
const commentsByPostId = {};


app.get('/', (req, res) => {
    res.send('Hello World! Server is running');
});


app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);

});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({
        id: commentId, content, status: 'pending'
    });
    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/events' , {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending'

        }
    });

    res.status(201).send(comments);

});

app.post('/events', async (req, res) => {

    console.log("event recieved:", req.body.type);
    const {type, data} = req.body;

    if (type === 'CommentModerated'){
        const {postId, id, status, content } = data;

        const comments = commentsByPostId[postId] || [];
        const comment = comments.find(comment => comment.id === id);
        comment.status = status;
        console.log(comment);
        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                status, 
                postId,
                content

            }
        });
    };

    res.status(201).send(req.body);
});

app.listen(4001, () => {
    console.log('Server is running on 4001');
});