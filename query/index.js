const express = require('express');
const cors = require('cors');
const axios = require('axios');


const app = express();


app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

app.use(cors());

const posts = {};
// example
/*
posts === {
    'id2432' : { 
        id: 'id2432',
        title: 'Hello World',
        comments: [
            {id: ijk, content: 'Hello World'},
        ]
    },
    'id2433' : {...}
}

*/

const handleEvent = (type, data) => {
    if(type === 'PostCreated'){
        const {id, title } = data;
        posts[id] = {id, title, comments: []};
    }

    if(type === 'CommentCreated'){
        const {id, content, postId, status } = data;
        const post = posts[postId];
        post.comments.push({id, content, status});

    }
    if (type === 'CommentUpdated'){
        
        const {id, content, postId, status} = data;
        const post = posts[postId];
        const comment = post.comments.find(c => c.id === id);

        comment.status = status;
       
        comment.content = content;
        console.log('updating comment to:');
        console.log(status);
    };

};

app.get('/posts', (req, res) => { 
    res.send(posts);
});

app.post('/events', (req, res) => { 
    
    const {type, data} = req.body;
    handleEvent(type, data);
    
    console.log(posts);
    res.sendStatus(200);
    
});

app.listen(4002, async () => { 
    console.log('listening on port 4002!'); 

    try{
        const res = await axios.get('http://localhost:4005/events');
    
    for(let event of res.data){
        console.log('Processing events:', event.type);
        handleEvent(event.type, event.data);

    };
    }
    catch(err){
        console.log(err.message);
    }

    
});
