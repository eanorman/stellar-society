import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faComments } from "@fortawesome/free-regular-svg-icons";
import DOMPurify from 'dompurify';
import Likes from "./Likes";
import Comments from "./Comments";
import './index.css';
import { getFeed } from "../../store/feed";

function PostComponent({ post_id }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [post, setPost] = useState("");
  const [user, setUser] = useState("");
  const [comments, setComments] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCurrentUserPost, setIsCurrentUserPost] = useState(false);
  const [hidden, setHidden] = useState(true);
  const sessionUser = useSelector((state) => state.session.user);
  let user_id;

  const sanitizeHTML = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };

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

  const handleDelete = async () => {
    const response = await fetch(`/api/posts/${post_id}`, {
      method: 'DELETE'
    })
    dispatch(getFeed())
  }

  const handleClick = () => {
    setHidden(!hidden);
  }

  useEffect(() => {
    getPost(post_id);
  }, [post_id]);

  useEffect(() => {
    if (post) {
      let user_id = post.user_id;
      getUser(user_id);
      setIsLoaded(true);
      if(user_id === sessionUser.user_id){
        setIsCurrentUserPost(true)
      }
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
          <p className="post" dangerouslySetInnerHTML={sanitizeHTML(post.content)} />
          </div>
          <div className="likes-comments">
            <Likes post_id={post_id} />
            {comments
              ?
                <div className="comment-section">
                  <FontAwesomeIcon icon={faComments} onClick={handleClick}/>
                  <p>{comments.length}</p>
                  <div className={`comment ${hidden ? "hidden" : ""}`}>
                {comments.map((comment) => {
                  return (
                    <div key={post_id}>
                      <Comments comment={comment} />
                    </div>
                  );
                })}
                </div>
              </div>

              : null}
            {isCurrentUserPost ? (
              <div className="delete-button">
                <button onClick={handleDelete}>Delete</button>
              </div>
            ) : (null)}

          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}

export default PostComponent;
