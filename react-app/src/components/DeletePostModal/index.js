import React from "react";
import { useDispatch} from "react-redux";
import { getFeed } from "../../store/feed";
import { useModal } from "../../context/Modal";



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
        <div>
                <p>Are you sure you'd like to delete this post?</p>
                <button onClick={handleDelete}>Confirm Delete</button>
                <button onClick={() => closeModal()}>Cancel</button>
        </div>
    )

}

export default DeletePostModal;
