import React, {useState, useEffect} from 'react';
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import galaxy from '../../images/galaxy-background.jpg';
import './index.css';
import PendingFriendRequest from './PendingFriendRequest';

function FriendRequestModal() {
    const history = useHistory();
    const { closeModal } = useModal();
    const [pendingFriends, setPendingFriends] = useState()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const getPendingFriends = async () => {
            const response = await fetch('/api/friendships/get_pending_requests')
            const data = await response.json()
            setPendingFriends(data)
        }
        getPendingFriends();
        setIsLoaded(true)
    }, [])


    const removeFriendship = (friendshipId) => {
        setPendingFriends(pendingFriends.filter(friendship => friendship.friendship_id !== friendshipId));
    };

    return (
        <div className='friend-request-modal'>
    	<div className="galaxy">
				<img src={galaxy} alt='galaxy' />
			</div>
            <h1>Pending Friend Requests</h1>
            {isLoaded ? (pendingFriends?.length > 0 ? (
                pendingFriends?.map((friendship) => {
                    return <PendingFriendRequest friendship={friendship} removeFriendship={() => removeFriendship(friendship.friendship_id)} />
                })
            ) : (
                <p>No friend requests</p>
            )) : (
                <div><p> loading...</p></div>
            )}

        </div>
    )
}

export default FriendRequestModal;
