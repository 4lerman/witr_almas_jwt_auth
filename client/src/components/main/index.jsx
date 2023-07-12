import React from "react";
import "./index.css";

const Main = () => {
	const user = JSON.parse(localStorage.getItem("user"));


	return (
		<div className="mainPage">
			<div>
				<h1>You are in main page</h1>
				{user ? (
					<ul>
						<p>You are logged in</p>
						<li>User: {user.email}</li>
						<li>Username: {user.username}</li>
					</ul>
				) : (
					<p>You are not logged in</p>
				)}
			</div>
		</div>
	);
};

export default Main;
