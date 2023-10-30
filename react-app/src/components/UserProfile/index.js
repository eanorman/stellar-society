import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import PostComponent from "../PostComponent";
import FriendButton from "./FriendButton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function UserProfile() {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [userPosts, setUserPosts] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const history = useHistory()

  async function getUserInfo() {
    const response = await fetch(`/api/users/${userId}`);
    if(response.ok){
      const data = await response.json();
      setUserInfo(data);

    } else history.push('/feed')

  }

  async function getUserPosts() {
    const response = await fetch(`/api/users/${userId}/posts`);
    const data = await response.json();
    setUserPosts(data);
  }

  useEffect(() => {
    getUserInfo();
    getUserPosts().then(() => setIsLoaded(true));
  }, []);


  return (
    <div className="profile-page-container">
      <div className="user-bio">
        <img src={userInfo.profile_picture} alt={userInfo.username} />
        <p>{userInfo.username}</p>
        <p>{`${userInfo.first_name} ${userInfo.last_name}`}</p>
        <p>{`${userInfo.city}, ${userInfo.state}, ${userInfo.country}`}</p>
        <p>{userInfo.bio}</p>
        <FriendButton friend_id={userId} />
      </div>
      {isLoaded ? (
      <div className="user-posts">
        {Array.isArray(userPosts) && userPosts.length > 0 ? (
          userPosts.map((post) => <PostComponent post_id={post.post_id} key={post.post_id} />)
        ) : (
          <div className="no-user-post"><p>User has no posts</p></div>
        )}
      </div>
    ) : null}
    </div>
  );
}

export default UserProfile;
