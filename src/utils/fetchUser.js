export const usersAccessToken = () => {
	const token = localStorage.getItem("accessToken");
	const accessToken =
		token !== "undefined" ? JSON.parse(token) : localStorage.clear();

	return accessToken;
};

export const fetchUser = () => {
	const token = localStorage.getItem("user");
	const userInfo =
		token !== "undefined" ? JSON.parse(token) : localStorage.clear();

	return userInfo;
};
