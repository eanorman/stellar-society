import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./LoginForm.css";
import galaxy from '../../images/galaxy-background.jpg'

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal();
        history.push('/feed')
    }
  };

  const handleDemo = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data) {
      setErrors(data);
    } else {
        closeModal();
        history.push('/feed')
    }
  }

  return (
    <div className="login-modal">
      	<div className="galaxy">
				<img src={galaxy} alt='galaxy' />
			</div>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="login-container">
      <div className="login-child">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        </div>
        <div className="login-child">
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        </div>
        <div className="login-child">
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        </div>
        <div className="login-child">
        <button type="submit">Log In</button>
        <button onClick={handleDemo}>Demo User</button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
