import React, { useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch } from "react-redux";
import "react-quill/dist/quill.snow.css";
import { getFeed } from "../../store/feed";
import "./index.css";
import { useModal } from "../../context/Modal";

function UpdateCommentModal({ comment_id }) {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  let Quill = ReactQuill.Quill;
  let Font = Quill.import("formats/font");
  Font.whitelist = [
    "Arial",
    "Times-New-Roman",
    "Verdana",
    "Courier-New",
    "Georgia",
    "Impact",
    "Charcoal",
    "Lucida-Sans-Unicode",
  ];
  Quill.register(Font, true);
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

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ font: Font.whitelist }],
      ["color"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <div>
      <ReactQuill
        className="quill"
        value={content}
        onChange={handleChange}
        modules={modules}
        theme="snow"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default UpdateCommentModal;
