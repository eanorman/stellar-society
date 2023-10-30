import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import ImageUploader from "quill-image-uploader";

import "react-quill/dist/quill.snow.css";
import "./index.css";
import { createPost } from "../../store/feed";
import "react-quill/dist/quill.bubble.css";

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

function CreatePostComponent() {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [image, setImage] = useState("");
  const inputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imgname = event.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          (maxSize - img.width) / 2,
          (maxSize - img.height) / 2
        );
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imgname, {
              type: image / ProcessingInstruction,
              lastModified: Date.now(),
            });
            setImage(file);
          },
          "image/jpeg",
          0.8
        );
      };
    };
  };

  const handleChange = (value) => {
    setContent(value);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleSubmit = async () => {
    const user_id = sessionUser.user_id;
    const post = await dispatch(createPost(user_id, content));

    setContent("");
    const formData = new FormData();
    formData.append("image", image);
    formData.append("user_id", user_id);
    formData.append("post_id", post.post_id);

    const res = await fetch("/api/photos/upload_image", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    setImage('');
    inputRef.current.value = '';
  };

  return (
    <div className="create-post">
      <div onClick={handleClick} className="user-picture-input">
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt=" "
            className="post-picture-preview"
          />
        ) : null}
      </div>
      <ReactQuill
        className="quill"
        value={content}
        onChange={handleChange}
        theme="snow"
      />
      <input type="file" ref={inputRef} onChange={handleImageChange} />
      <button disabled={!content} onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default CreatePostComponent;
