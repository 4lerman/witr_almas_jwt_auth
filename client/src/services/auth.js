import axios from "axios";
import api from "../api";

const login = async (email, password) => {
	try {
		const response = await api.post("/user/login", { email: email, password: password });
        return response;
	} catch (e) {
		if (axios.isAxiosError(e)) {
            if (e.response?.status !== undefined && e.response.data) {
                alert(e.response.data)
            }
        };
		return null;
	}
};

export default login;