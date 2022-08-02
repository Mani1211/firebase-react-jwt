import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Create from "./Components/Create";
import Home from "./Container/Home";
import Login from "./Container/Login";
import { usersAccessToken, fetchUser } from "./utils/fetchUser";

const App = () => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const accessToken = usersAccessToken();
		if (!accessToken) navigate("/login", { replace: true });
		const userInfo = fetchUser();
		if (userInfo) setUser(userInfo[0]);
		console.log("usesdsdrInfo", userInfo);
	}, []);
	return (
		<Routes>
			<Route path="login" element={<Login />} />
			<Route path="/*" element={<Home user={user} />} />
			<Route path="/create" element={<Create />} />
		</Routes>
	);
};

export default App;
