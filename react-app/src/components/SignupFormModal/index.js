import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import galaxy from '../../images/galaxy-background.jpg';
import { useHistory } from "react-router-dom";

function SignupFormModal() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [country, setCountry] = useState('');
	const [bio, setBio] = useState('');
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();
	const regex = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
			return;
		}
	
		if (!email.includes('@')) {
			setErrors([
				"Email must contain @ symbol"
			])
			return;
		}
	
		if (regex.test(firstName)) {
			setErrors([
				"First name must not include numbers or symbols"
			])
			return;
		}
		if (regex.test(lastName)) {
			setErrors([
				"Last name must not include numbers or symbols"
			])
			return;
		}
	
		const data = await dispatch(signUp(username, email, password, firstName, lastName, city, state, country, bio));
		if (data) {
			setErrors(data);
		} else {
			closeModal();
			history.push('/add-picture')
		}
	};

	return (

		<div className="sign-up-modal">
			<div className="galaxy">
				<img src={galaxy} alt='galaxy' />
			</div>

			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit} className="sign-up-container">
				<div className="sign-up-child">
					<ul className="signup-errors">
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
				</div>
				<div className="sign-up-child">
					<label>
						Email
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className="sign-up-child">
					<label>
						Username
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className="sign-up-child">
					<div className="password-container">
						<label>
							Password
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</label>
						<label>
							Confirm Password
							<input
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							/>
						</label>
					</div>
				</div>
				<div className="sign-up-child">
					<div className="name-container">
						<label>
							First Name
							<input
								type="text"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								required
							/>
						</label>
						<label>
							Last Name
							<input
								type="text"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								required
							/>
						</label>
					</div>
				</div>
				<div className="sign-up-child">
					<div className="location-container">
						<label>
							City
							<input
								type="text"
								value={city}
								onChange={(e) => setCity(e.target.value)}
								required
							/>
						</label>

						<label>
							State
							<input
								type="text"
								value={state}
								onChange={(e) => setState(e.target.value)}
								required
							/>
						</label>
					</div>
				</div>
				<div className="sign-up-child">
					<label>
						Country
						<input
							type="text"
							value={country}
							onChange={(e) => setCountry(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className="sign-up-child">
					<label>
						Bio
						<textarea
							value={bio}
							onChange={(e) => setBio(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className="sign-up-child">
					<button type="submit">Sign Up</button>
				</div>
			</form>
		</div>
	);
}

export default SignupFormModal;
