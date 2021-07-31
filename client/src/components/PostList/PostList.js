import React, { useState, useEffect} from 'react'
import CommentCreate from '../CommentCreate/CommentCreate';
import axios from 'axios'
import CommentList from '../CommentList/CommentList';

export default function PostList() {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const response = await axios.get('http://localhost:4000/posts');
        setPosts(response.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    console.log(posts);
    const renderedPosts = Object.values(posts);
    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {
                renderedPosts.map((post, index) => {
                    return (
                        <div className="card" 
                        style={{ width: '30%', marginBottom: '20px'}} 
                            key={post.id}>

                                <div className="card-body">
                                    <h3>{post.title}</h3>
                                    <CommentList postId={post.id}/>
                                    <CommentCreate postId={post.id}/>
                                </div>
                                
                            
                        </div>
                    );
                }
                )
                
            }
           

            
        </div>
    )
}
