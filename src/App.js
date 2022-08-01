import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Container/Home";
import Login from "./Container/Login";
import { usersAccessToken, fetchUser } from "./utils/fetchUser";

const App = () => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const accessToken = usersAccessToken();
		if (!accessToken) navigate("/login", { replace: true });
		const [userInfo] = fetchUser();
		setUser(userInfo);
	}, []);
	return (
		<Routes>
			<Route path="login" element={<Login />} />
			<Route path="/*" element={<Home user={user} />} />
		</Routes>
	);
};

export default App;
