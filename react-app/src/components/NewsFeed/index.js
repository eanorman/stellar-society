import React, { useEffect, useState } from 'react';
import { getFeed } from '../../store/feed';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import './index.css'


function NewsFeed() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const posts = useSelector((state) => state.feed.posts);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState({});

    if (!sessionUser) history.push("/");

    useEffect(() => {
        async function fetchFeed() {
            const data = await dispatch(getFeed())
            return data;
        }
        fetchFeed();
    }, [dispatch])

    useEffect(() => {
        async function fetchUsers() {
            const users = {};
            for (const post of posts) {
                const response = await fetch(`/api/users/${post.user_id}`);
                const user = await response.json();
                users[post.user_id] = user;
            }
            setUsers(users);
        }
        if (posts) {
            fetchUsers();
            setIsLoaded(true);
        }
    }, [posts]);


    return (
        <div>
            {
                isLoaded ? ( posts.map((post) => {
                    const user = users[post.user_id];
                    return(
                        user ? (
                            <div className='post-content'>
                                <img key={post.post_id} src={user.profile_picture} alt={`${user.username}`} onClick={() => history.push(`/users/${post.user_id}`)} />
                                <div className='post-info'>
                                    <a href={`/users/${user.user_id}`}>{user.username}</a>
                                    <p>{post.content}</p>
                                </div>
                            </div>
                        ) : null
                    )
                })) : (
                    <div>
                        <h1>Loading...</h1>
                    </div>
                )
            }
        </div>
    )
}

export default NewsFeed
