import axios from "axios";
import api from "../api";

export const login = async (email, password) => {
	try {
		const response = await api.post("/user/login", {
			email: email,
			password: password,
		});
		return response;
	} catch (e) {
		if (axios.isAxiosError(e)) {
			if (e.response?.status !== undefined && e.response.data) {
				alert(e.response.data);
			}
		}
		return null;
	}
};

export const register = async (email, username, password) => {
	try {
		const response = await api.post("/user/register", {
			email: email,
			password: password,
			username: username,
		});
		return response;
	} catch (e) {
		if (axios.isAxiosError(e)) {
			if (e.response?.status !== undefined && e.response.data) {
				alert(e.response.data);
			}
		}
		return null;
	}
};


export const logout = async () => {
	try {
		const response = await api.get("/user/logout");
		return response;
	} catch (e) {
		if (axios.isAxiosError(e)) {
			if (e.response?.status !== undefined && e.response.data) {
				alert(e.response.data);
			}
		}
		return null;
	}
}