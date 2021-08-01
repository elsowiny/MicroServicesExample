const express = require('express');
const cors = require('cors');


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

app.get('/posts', (req, res) => { 
    res.send(posts);
});

app.post('/events', (req, res) => { 
    
    const {type, data} = req.body;
    if(type === 'PostCreated'){
        const {id, title } = data;
        posts[id] = {id, title, comments: []};
    }

    if(type === 'CommentCreated'){
        const {id, content, postId } = data;
        const post = posts[postId];
        post.comments.push({id, content});

    }
    console.log(posts);
    res.sendStatus(200);
    
});

app.listen(4002, () => { 
    console.log('listening on port 4002!'); 

});
