import React, { useEffect, useState } from "react";
import './index.css'

function LikeModal({ likes }) {
    const [users, setUsers] = useState([]);


    function getUsers() {
        likes.forEach(async (like) => {
            let userId = like.user_id
            const response = await fetch(`/api/users/${userId}`)
            const user = await response.json()
            setUsers(oldUsers => [...oldUsers, user])
        })
    }
    useEffect(() => {
        getUsers()

        return () => {
            setUsers([]);
        }
    }, [likes])



    return (
        <div className="like-modal">
            <div className="like-header">
                <h2>Likes</h2>
            </div>
            {
                likes.length ? (
                    <div>
                        {users ? (
                        users.map((user) => {
                            return (
                                <div className="liked-by">
                                    <img src={user.profile_picture} alt={user.username} />
                                    <a href={`/users/${user.user_id}`}>{user.username}</a>
                                </div>
                            )
                        })
                        ) : (
                        <div>
                            <h4>Loading...</h4>
                        </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <h4>No likes yet.</h4>
                    </div>
                )
            }
        </div>
    )
}

export default LikeModal;
