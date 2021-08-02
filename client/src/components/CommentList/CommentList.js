import React from 'react'


export default function CommentList({comments}) {
    

    const renderedComments = comments.map(comment => {
        let content;
        if(comment.status === 'approved'){
            content = comment.content;
        }
        else if(comment.status === 'pending'){
            content = 'This comment is awaiting moderation';
        }
        else if(comment.status === 'rejected'){
            content = 'This comment has been rejected';

        }
        else{
            content = 'This comment is pending';
        }
        return <li key={comment.id}>{content}</li>
    });

    return (
        <ul>
            {renderedComments}
        </ul>
    )
}
