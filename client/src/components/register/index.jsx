import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/auth";
import "./index.css";

const Register = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const registerUser = async (e) => {
		e.preventDefault();
		const response = await register(email, username, password);
		if (!response) navigate("/error");
		else {
			console.log("logged in user", response.data.user);
			navigate("/", {
				state: {
					message: "You have successfully registered",
					data: response.data.user,
				},
			});
		}
	};

	return (
		<div className="registerPage">
			<form>
				<h1>Register!</h1>
				<input
					type="email"
					name="email"
					placeholder="Enter email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					type="text"
					name="username"
					placeholder="Enter username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="Enter password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button onClick={registerUser}>Register</button>
			</form>
		</div>
	);
};

export default Register;
