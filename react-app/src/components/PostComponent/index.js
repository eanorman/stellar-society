import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Likes from "./Likes";
import Comments from "./Comments";
import './index.css';

function PostComponent({ post_id }) {
  const history = useHistory();
  const [post, setPost] = useState("");
  const [user, setUser] = useState("");
  const [comments, setComments] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
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
    const response = await fetch(`/api/posts/${post_id}/comments`);
    const comments = await response.json();
    return comments;
  }

  useEffect(() => {
    getPost(post_id);
  }, [post_id]);

  useEffect(() => {
    if (post) {
      let user_id = post.user_id;
      getUser(user_id);
      setIsLoaded(true);
    }
  }, [post, user_id]);

  useEffect(() => {
    let isMounted = true;
    getComments(post_id).then((comments) => {
      if (isMounted) {
        setComments(comments);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [post, post_id]);

  return (
    <div>
      {isLoaded ? (
        <div className="post-content">
          <div className="user-info">
          <img
            key={post.post_id}
            src={user.profile_picture}
            alt={`${user.username}`}
            onClick={() => history.push(`/users/${post.user_id}`)}
          />
            <a href={`/users/${user.user_id}`}>{user.username}</a>
            </div>
          <div className="post-info">
            <p className="post">{post.content}</p>
          </div>
          <div>
            <Likes />
            {comments
              ? comments.map((comment) => {
                  return (
                    <div key={post_id}>
                      <Comments comment={comment} />
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}

export default PostComponent;
