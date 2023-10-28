import React, { useEffect, useState } from "react";
import { getFeed } from "../../store/feed";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./index.css";
import PostComponent from "../PostComponent";
import CreatePostComponent from "../CreatePostComponent";

function NewsFeed() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const posts = useSelector((state) => state.feed.posts);
  const feed = useSelector((state) => state.feed);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const users = {};

  if (!sessionUser) history.push("/");

  useEffect(() => {
    async function fetchFeed() {
      try {
        await dispatch(getFeed());
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    fetchFeed();
  }, [dispatch]);

  useEffect(() => {
    async function fetchUsers() {
      if (Array.isArray(posts)) {
        try {
          for (const post of posts) {
            const response = await fetch(`/api/users/${post.user_id}`);
            const user = await response.json();
            users[post.user_id] = user;
          }
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      }
    }
    fetchUsers();
  }, [posts, feed]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>An error occurred: {error.message}</h2>;
  }

  return (
    <div>
      <CreatePostComponent />
      {Array.isArray(posts) && posts.map((post) => {
        return <PostComponent post_id={post.post_id} key={`post ${post.post_id}`} />
      })}
    </div>
  );
}

export default NewsFeed;
