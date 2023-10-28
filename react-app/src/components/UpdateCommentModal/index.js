import React, { useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch } from "react-redux";
import "react-quill/dist/quill.snow.css";
import { getFeed } from "../../store/feed";
import "./index.css";
import { useModal } from "../../context/Modal";

function UpdateCommentModal({ comment_id, commentContent }) {
  const [content, setContent] = useState(commentContent);
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const handleChange = (value) => {
    setContent(value);
  };

  const updateComment = async () => {
    const response = await fetch(`/api/comments/${comment_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
      }),
    });

    if (response.ok) {
      dispatch(getFeed());
      setContent("");
    }
  };

  const handleSubmit = () => {
    updateComment();
    closeModal();
    setContent('');
  };



  return (
    <div className="update-comment-modal">
      <ReactQuill
        className="quill"
        value={content}
        onChange={handleChange}
        theme="snow"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default UpdateCommentModal;
