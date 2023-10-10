import React, { useEffect, useState } from 'react';
import { getFeed } from '../../store/feed';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import './index.css'
import PostComponent from '../PostComponent';


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
            { isLoaded ? (posts.map((post) => {
              return <PostComponent post_id={post.post_id} key={post.post_id}/>
            })) : (
                <h2>Loading...</h2>
            )

            }
        </div>
    )
}

export default NewsFeed
