import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/auth";
import Cookies from "js-cookie";

const Header = () => {
	const navigate = useNavigate();

	const accessToken = Cookies.get("accessToken");

	return (
		<div className="headerPage">
			<div>
				<a href="/" onClick={() => navigate("/")}>
					Main Page
				</a>
				<hr />

				{accessToken ? (
					<div>
						<a
							href="/"
							onClick={() => {
								logout();
								localStorage.removeItem('user')
								navigate("/");
							}}
						>
							Logout
						</a>
						<hr />
						<a href="/getuser" onClick={() => navigate("/getuser")}>
							Get User
						</a>
					</div>
				) : (
					<a href="/login">Login</a>
				)}

				<hr />
			</div>
		</div>
	);
};

export default Header;
