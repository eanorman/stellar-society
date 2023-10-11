import React, { useEffect, useState } from "react";
import './comments.css'

function Comments({comment}){
    const [user, setUser] = useState("");
    const [profilePicture, setProfilePicture] = useState();
    const [isLoaded, setIsLoaded] = useState(false)
    const user_id = comment.user_id;

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
      }, [user])

    return (
        <div className="comment-container">
      {isLoaded ? (
        <div className="comment-content">
            <img src={profilePicture} alt={user.username} />
            <a href={`/users/${user.user_id}`}>{user.username}</a>
            <p>{comment.content}</p>
        </div>
      ) : (
        <div>
        </div>
      )}

        </div>
    )
}

export default Comments;
