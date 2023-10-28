import React from "react";
import { useDispatch} from "react-redux";
import { getFeed } from "../../store/feed";
import { useModal } from "../../context/Modal";
import './index.css'



function DeletePostModal({post_id}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const handleDelete = async () => {
        const response = await fetch(`/api/posts/${post_id}`, {
          method: "DELETE",
        });
        dispatch(getFeed())
        closeModal();
    }

    return(
        <div className="delete-post-modal">
                <p>Are you sure you'd like to delete this post?</p>
                <div className="delete-post-button">
                <button onClick={handleDelete}>Confirm Delete</button>
                </div>
                <div className="cancel-post-button">
                <button onClick={() => closeModal()}>Cancel</button>
                </div>
        </div>
    )

}

export default DeletePostModal;
