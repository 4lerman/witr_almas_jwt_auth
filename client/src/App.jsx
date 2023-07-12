import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/main";
import Error from "./components/errors";
import Login from "./components/login";
import Register from "./components/register";
import Header from "./components/header";
import GetById from "./components/get_by_id";

function App() {
	// const [user, setUser] = useState({ email: "", username: "" });

	// const createUser = (newUser) => [
	// 	setUser(newUser)
	// ]

	return (
		<div className="App">
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/login" element={<Login/>} />
					<Route path="/register" element={<Register />} />
					<Route path="/getuser" element={<GetById />} />
					<Route path="/" element={<Main/>} />
					<Route path="/page" />
					<Route path="/reset_password" />
					<Route path="/error" element={<Error />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
