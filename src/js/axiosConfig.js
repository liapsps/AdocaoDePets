const api = axios.create({
	baseURL: "http://localhost:1337/api",
	timeout: 15000,
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("jwt");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default api;