import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import './comments.css'
import OpenModalButton from "../OpenModalButton";
import UpdateCommentModal from "../UpdateCommentModal";
import { getFeed } from "../../store/feed";
import DeleteCommentModal from "../DeleteCommentModal";


function Comments({comment}){
    const [user, setUser] = useState("");
    const dispatch = useDispatch();
    const [profilePicture, setProfilePicture] = useState();
    const [isLoaded, setIsLoaded] = useState(false)
    const [isCurrentUserComment, setIsCurrentUserComment] = useState(false);
    const user_id = comment.user_id;
    const sessionUser = useSelector((state) => state.session.user);

    async function getUser(user_id) {
        const response = await fetch(`/api/users/${user_id}`);
        const user = await response.json();
        setUser(user);
      }

      useEffect(() => {
        getUser(user_id)
      }, [user_id])

      useEffect(() => {
        setProfilePicture(user.profile_picture)
        setIsLoaded(true)
        if(user_id === sessionUser.user_id) setIsCurrentUserComment(true)
      }, [user])



    return (
        <div className="comment-container">
      {isLoaded ? (
        <div className="comment-content">
            <img src={profilePicture} alt={user.username} />
            <a href={`/users/${user.user_id}`}>{user.username}</a>
            <p className="post" dangerouslySetInnerHTML={{ __html: comment.content }}></p>
            {isCurrentUserComment ? (
          <div>
            <OpenModalButton buttonText="Update" modalComponent={<UpdateCommentModal comment_id={comment.comment_id}/>} />
            <OpenModalButton buttonText="Delete" modalComponent={<DeleteCommentModal comment_id={comment.comment_id}/>} />
          </div>) : (null)}
        </div>

      ) : (
        <div>
        </div>
      )}

        </div>
    )
}

export default Comments;
