import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Likes from "./Likes";
import Comments from "./Comments";

function PostComponent({ post_id }) {
    const history = useHistory();
    const [post, setPost] = useState('');
    const [user, setUser] = useState('');
    const [comments, setComments] = useState('');
    const [isLoaded, setIsLoaded] = useState(false)
    let user_id;

    async function getPost(post_id) {
        const response = await fetch(`/api/posts/${post_id}`);
        const post = await response.json();
        setPost(post);
    }

    async function getUser(user_id) {
        const response = await fetch(`/api/users/${user_id}`);
        const user = await response.json();
        setUser(user);
    }

    async function getComments(post_id) {
        const response = await fetch(`/api/posts/${post_id}/comments`)
        const comments = await response.json();
        setComments(comments)
    }

    useEffect(() => {
        getPost(post_id);
    }, [])

    useEffect(() => {
        if (post) {
            user_id = post.user_id
            getUser(user_id)


        }
    }, [post])

    useEffect(() => {

        getComments(post_id)
        console.log(comments)
        setIsLoaded(true)

    }, [post])



    return (
        <div>
            {
                isLoaded ? (
                    <div className='post-content'>
                        <img key={post.post_id} src={user.profile_picture} alt={`${user.username}`} onClick={() => history.push(`/users/${post.user_id}`)} />
                        <div className='post-info'>
                            <a href={`/users/${user.user_id}`}>{user.username}</a>
                            <p>{post.content}</p>
                        </div>
                        <div>
                            <Likes />
                            {comments ? (comments.map((comment) => {
                                <Comments comment={comment} />
                            })) : (
                                null
                            )}
                        </div>
                    </div>
                ) : (
                    <h2>Loading...</h2>
                )
            }
        </div>
    )
}

export default PostComponent;