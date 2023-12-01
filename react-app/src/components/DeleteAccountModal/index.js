import React from "react";
import { useModal } from "../../context/Modal";
import './index.css';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import { removeFeed } from "../../store/feed";

function DeleteAccoutModal() {
   const {closeModal} = useModal();
   const dispatch = useDispatch(); // Corrected here
   const history = useHistory();
   const sessionUser = useSelector((state) => state.session.user);

   const handleDelete = async() => {
       const response = await fetch (`/api/users/delete/${sessionUser.user_id}`, {
           method: "DELETE"
       });
       dispatch(logout());
       dispatch(removeFeed());
       closeModal();
       history.push('/');

   }

   return (
       <div className="delete-account-modal">
           <p>Are you sure you'd like to delete your account?</p>
           <div className="delete-account-button">
               <button onClick={handleDelete}>Confirm Delete</button>
           </div>
           <div className="cancel-account-button">
               <button onClick={() => closeModal()}>Cancel</button>
           </div>
       </div>
   )
};

export default DeleteAccoutModal;
