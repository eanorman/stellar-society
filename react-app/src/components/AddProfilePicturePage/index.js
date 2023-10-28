import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addProfilePicture } from "../../store/session";
import "./index.css";
import default_picture from "../../images/default-profile-picture.jpg";

function AddProfilePicture() {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [image, setImage] = useState("");

  if (!sessionUser) history.push("/");

  const handleClick = () => {
    inputRef.current.click();
  };

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

  const handleSkip = () => {
    history.push("/");
  };

  const handleUpload = async () => {
    const data = await dispatch(addProfilePicture(sessionUser.user_id, image));
    if (data) {
      history.push("/");
    }
  };

  return (
    <div className="picture-page-container">
      <div className="main-content">
        <h1>Upload A Profile Photo</h1>
        <div onClick={handleClick} className="user-picture-input">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt=" "
              className="profile-picture-image"
            />
          ) : (
            <img
              src={default_picture}
              alt=" "
              className="profile-picture-image"
            />
          )}
          <input type="file" ref={inputRef} onChange={handleImageChange} />
        </div>
        <div className="input-buttons">
          <button className="image-upload-button" onClick={handleUpload}>
            Upload
          </button>
          <button className="image-skip-button" onClick={handleSkip}>
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProfilePicture;
