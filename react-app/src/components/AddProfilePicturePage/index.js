import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./index.css";

function AddProfilePicture() {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  console.log(sessionUser);
  if (!sessionUser) history.push("/");

  return (
    <div className="picture-page-container">
      <div className="main-content">
        <h1>HEY BESTIE!</h1>
      </div>
    </div>
  );
}

export default AddProfilePicture;
