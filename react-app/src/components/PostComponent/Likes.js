import React, { useEffect, useState } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faStar as star } from '@fortawesome/free-regular-svg-icons'
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import LikeModal from "../LikeModal";
import './Likes.css'


function Likes({ post_id }) {
    const [likes, setLikes] = useState()
    const sessionUser = useSelector((state) => state.session.user);
    const [userLike, setUserLike] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    async function getLikes(post_id){
        const response = await fetch(`/api/posts/${post_id}/likes`)
        const likes = await response.json()
        setLikes(likes)
    }

    function userLikes() {
        if(!likes) setUserLike(false)
        setUserLike(likes.some(like => like.user_id === sessionUser.user_id))
    }

    useEffect(() => {
        getLikes(post_id)
    }, [post_id])

    useEffect(() => {
        if(likes){
            userLikes()
            setIsLoaded(true);
        }
    }, [likes])

    async function likePost() {
        const response = await fetch(`/api/posts/${post_id}/likes`, {
            method: "POST"
        })
        const like = await response.json();
        getLikes(post_id)
        userLikes()
    }

    async function unLikePost(){
        const response = await fetch(`/api/posts/${post_id}/likes`, {
            method: 'DELETE'
        })

        getLikes(post_id).then(() => {
            userLikes()
        })
    }

    return (
        <div className="likes-container">
        {
            isLoaded ? (
                <div className="likes-content">
                    {
                        userLike ? (
                            <div className="star-solid">
                                <FontAwesomeIcon icon={solidStar} onClick={unLikePost}/>
                            </div>
                        ) : (
                            <div className="star">
                                <FontAwesomeIcon icon={star} onClick={likePost}/>
                            </div>
                        )
                    }
                        <OpenModalButton
                buttonText={likes.length}
                modalComponent={<LikeModal likes={likes}/>} />
                </div>
            ) : (
                null
            )
        }
        </div>
    )
}

export default Likes;
