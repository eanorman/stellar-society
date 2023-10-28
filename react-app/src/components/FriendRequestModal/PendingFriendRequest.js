import React, { useState, useEffect } from "react";
import "./PendingFriendRequest.css";
import { useDispatch } from "react-redux";
import { getFeed } from "../../store/feed";

function PendingFriendRequest({ friendship, removeFriendship }) {
  const [friendInfo, setFriendInfo] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getFriendInfo = async () => {
      const response = await fetch(`/api/users/${friendship.user_id}`);
      const data = await response.json();
      setFriendInfo(data);
    };
    getFriendInfo();
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, [friendInfo]);

  async function acceptFriend() {
    const response = await fetch(
      `/api/friendships/accept_friend_request/${friendship.friendship_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(getFeed());
    removeFriendship();
  }

  async function rejectFriend() {
    const response = await fetch(
      `/api/friendships/reject_friend_request/${friendship.friendship_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    removeFriendship();
  }

  return (
    <div>
      {isLoaded && friendInfo ? (
        <div className="friend-info">
          <img src={friendInfo.profile_picture} alt={friendInfo.username} />
          <p>{friendInfo.username}</p>
          <p>{`${friendInfo.first_name} ${friendInfo.last_name}`}</p>
          <div className="friendship-buttons">
            <button onClick={acceptFriend}>Accept</button>
            <button onClick={rejectFriend}>Reject</button>
          </div>
        </div>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}

export default PendingFriendRequest;
