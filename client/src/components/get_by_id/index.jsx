import React from "react";
import "./index.css";
import { getUserById } from "../../services/user";
import { useState } from "react";


const GetById = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')

	const foundUser = async (e) => {
        e.preventDefault()
        const response = await getUserById();
        console.log(response.data)
        setEmail(response.data.email);
        setUsername(response.data.username)
    };

	return (
		<div className="getById">
			<h1>Results</h1>
			<ul>
				<li> User email: {email}</li>
				<li> Username: {username}</li>
			</ul>
            <button onClick={foundUser}> Find User</button>
		</div>
	);
};

export default GetById;
