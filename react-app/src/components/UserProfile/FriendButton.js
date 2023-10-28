import React, {useEffect, useState} from 'react';

function FriendButton({friend_id}){
    const [isFriend, setIsFriend] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [friendshipInfo, setFriendshipInfo] = useState({})



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
            console.log(data);
        }
    };
    const handleRemoveFriend = () => {
        fetch(`/api/friendships/delete_friendship/${friend_id}`, {
            method: 'DELETE',
        })
        .then(() => {
            setIsFriend(false);
        });
    }

    return(
        <div>
            {isFriend
                ? <button onClick={handleRemoveFriend}>Remove Friend</button>
                : isPending
                    ? <button disabled>Friend Request Pending</button>
                    : <button onClick={handleAddFriend}>Add Friend</button>}
        </div>
    )
}

export default FriendButton;
