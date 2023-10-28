import React from "react";
import { useDispatch } from "react-redux";
import { getFeed } from "../../store/feed";
import { useModal } from "../../context/Modal";
import "./index.css";

function DeleteCommentModal({ comment_id }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const handleDelete = async () => {
    const response = await fetch(`/api/comments/${comment_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      dispatch(getFeed());
    }
    closeModal();
  };

  return (
    <div className="delete-comment-modal">
      <p>Are you sure you'd like to delete this comment?</p>
      <div className="delete-comment-button">
        <button onClick={handleDelete}>Confirm Delete</button>
      </div>
      <div className="cancel-comment-button">
        <button onClick={() => closeModal()}>Cancel</button>
      </div>
    </div>
  );
}

export default DeleteCommentModal;
