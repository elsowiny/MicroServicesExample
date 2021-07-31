import React from 'react';
import PostCreate from './components/PostCreate/PostCreate';
import PostList from './components/PostList/PostList';
import './App.css';

export default function App(){
    return(

        <div className="container">
            <h1>Create Post</h1>
            <PostCreate />
            <hr />
            <h1>Post</h1>
            <PostList />
            
        </div>
    )
};