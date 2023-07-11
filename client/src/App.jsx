import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Main from "./components/main";
import Error from "./components/errors";
import Login from "./components/login";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login />}/>
					<Route path="/register" />
					<Route path="/getuser" />
					<Route path="/" element={<Main />}/>
					<Route path="/page" />
					<Route path="/reset_password" />
					<Route path="/error" element={<Error />}/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
