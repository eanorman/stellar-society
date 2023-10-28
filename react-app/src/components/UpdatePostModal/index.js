import React, { useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch } from "react-redux";
import "react-quill/dist/quill.snow.css";
import { getFeed } from "../../store/feed";
import "./index.css";
import { useModal } from "../../context/Modal";

function UpdatePostModal({post_id, postContent}) {
    const [content, setContent] = useState(postContent);
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const handleChange = (value) => {
      setContent(value);
    };

    const updatePost= async () => {
      const response = await fetch(`/api/posts/${post_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
        }),
      });

      if (response.ok) {

        setContent("");
      }
    };

    const handleSubmit = () => {
      updatePost();
      closeModal();
      setContent('');
      dispatch(getFeed());
    };


    return (
      <div className="update-post-modal">
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

export default UpdatePostModal;
