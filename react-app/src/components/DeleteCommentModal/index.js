import React from "react";
import { useDispatch} from "react-redux";
import { getFeed } from "../../store/feed";
import { useModal } from "../../context/Modal";

function DeleteCommentModal({ comment_id }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const handleDelete = async () => {
        const response = await fetch(`/api/comments/${comment_id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }
        })

        if (response.ok) {
          dispatch(getFeed());
        }
        closeModal();
    }

    return(
        <div>
                <p>Are you sure you'd like to delete this comment?</p>
                <button onClick={handleDelete}>Confirm Delete</button>
                <button onClick={() => closeModal()}>Cancel</button>
        </div>
    )
}

export default DeleteCommentModal;
