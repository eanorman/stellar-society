import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import './FriendButton.css'

function FriendButton({friend_id}){
    const [isFriend, setIsFriend] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [friendshipInfo, setFriendshipInfo] = useState({})
    const sessionUser = useSelector((state) => state.session.user);


    useEffect(() => {
        const fetchFriendshipStatus = async () => {
            const response = await fetch(`/api/friendships/check_friendship/${friend_id}`)
            const data = await response.json()
            setFriendshipInfo(data);
            if(data.status === 'ACCEPTED') setIsFriend(true)
            if(data.status === 'PENDING') setIsPending(true)
        }
        fetchFriendshipStatus();
    }, [friend_id])

    const handleAddFriend = async () => {
        const response = await fetch(`/api/friendships/send_friend_request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                friend_id: friend_id
            })
        })
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const data = await response.json();
            setIsPending(true)
        }
    };
    const handleRemoveFriend = () => {
        fetch(`/api/friendships/delete_friendship/${friendshipInfo.friendship_id}`, {
            method: 'DELETE',
        })
        .then(() => {
            setIsFriend(false);
        });
    }

    return (
        <div>
          {parseInt(sessionUser.user_id) !== parseInt(friend_id) ? (
            isFriend ? (
              <button className='remove-friend' onClick={handleRemoveFriend}>
                Remove Friend
              </button>
            ) : isPending ? (
              <button className='pending-friend' disabled>
                Friend Request Pending
              </button>
            ) : (
              <button className='add-friend' onClick={handleAddFriend}>
                Add Friend
              </button>
            )
          ) : null}
        </div>
      );
}

export default FriendButton;
