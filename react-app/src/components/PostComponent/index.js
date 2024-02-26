import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import Likes from "./Likes";
import Comments from "./Comments";
import "./index.css";
import { getFeed } from "../../store/feed";
import CreateCommentComponent from "../CreateCommentComponent";
import OpenModalButton from "../OpenModalButton";
import UpdatePostModal from "../UpdatePostModal";
import DeletePostModal from "../DeletePostModal";

function PostComponent({ post_id }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [post, setPost] = useState("");
  const [user, setUser] = useState("");
  const [photos, setPhotos] = useState([]);
  const [comments, setComments] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCurrentUserPost, setIsCurrentUserPost] = useState(false);
  const [hidden, setHidden] = useState(true);
  const sessionUser = useSelector((state) => state.session.user);
  const sessionFeed = useSelector((state) => state.feed);
  let user_id;

  async function getPost(post_id) {
    const response = await fetch(`/api/posts/${post_id}`);
    const post = await response.json();
    setPost(post);
    getPhotos(post_id);
  }

  async function getPhotos(post_id) {
    const response = await fetch(`/api/photos/${post_id}/photos`);
    const photo_urls = await response.json();
    setPhotos(photo_urls);
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


  const handleClick = () => {
    setHidden(!hidden);
  };

  useEffect(() => {
    getPost(post_id);
  }, [post_id, sessionFeed]);

  useEffect(() => {
    if (post) {
      let user_id = post.user_id;
      getUser(user_id);
      setIsLoaded(true);
      if (user_id === sessionUser.user_id) {
        setIsCurrentUserPost(true);
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
  }, [post, post_id, sessionFeed]);

  return (
    <div>
      {isLoaded ? (
        <div className="post-content">
          <div className="user-post-info">

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
            {photos.map((photo, index) => (
              <img key={index} src={photo} alt={`Post photo ${index + 1}`} />
            ))}
            <p
              className="post"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></p>
          </div>
          </div>
          <div className="likes-comments">
            <Likes post_id={post_id} />
            {comments ? (
              <div className="comment-section">
                <FontAwesomeIcon icon={faComments} onClick={handleClick} />
                <p>{comments.length}</p>
                <div className={`comment${hidden ? " hidden" : ""}`}>
                  {comments.map((comment) => {
                    return (
                      <div key={`comments ${comment.comment_id}`}>
                        <Comments comment={comment} />
                      </div>
                    );
                  })}
                  <CreateCommentComponent post_id={post.post_id} />
                </div>
              </div>
            ) : null}

</div>
            {isCurrentUserPost ? (
              <div className="delete-update-post">
              <div className="update-post">
                <OpenModalButton
                  buttonText="Update"
                  modalComponent={<UpdatePostModal post_id={post.post_id} postContent={post.content}/>}
                />
                </div>
                <div className="delete-post">
                <OpenModalButton
                  buttonText="Delete"
                  modalComponent={<DeletePostModal post_id={post.post_id} />}
                />
              </div>
              </div>
            ) : null}

        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}

export default PostComponent;
