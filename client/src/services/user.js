import api from "../api";
import axios from "axios";

export const getUserById = async () => {
	try {
		const user = await api.get("/user/1");
		return user;
	} catch (e) {
		if (axios.isAxiosError(e)) {
			if (e.response?.status !== undefined && e.response.data) {
				alert(e.response.data);
			}
		}
		return null;
	}
};
