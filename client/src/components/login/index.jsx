import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth";
import "./index.css";

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const loginUser = async (e) => {
		e.preventDefault();
		const response = await login(email, password);

		const newUser = {
			email: response.data.user.email,
			username: response.data.user.username
		}
		localStorage.setItem('user', JSON.stringify(newUser))

		if (!response) navigate("/error");
		console.log("logged in user", response.data.user);
		navigate("/");
	};

	return (
		<div className="loginPage">
			<form>
				<h1>Login Below!</h1>
				<input
					type="email"
					name="email"
					placeholder="Enter email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
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
				<button onClick={loginUser}>Login</button>
			</form>
			<a href="/register">Do not have account? Register!</a>
		</div>
	);
};

export default Login;
