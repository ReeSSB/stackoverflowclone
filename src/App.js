import React, { useEffect } from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Login from "./components/Login";
import env from "react-dotenv";

function App() {
	console.log(env);
	console.log(env.API_URL);
	console.log(env.API_URL_USERS_REGISTER);
	console.log(env.API_URL_USERS);

	let getData = async () => {
		let res = await axios.get(env.API_URL_USERS);
		console.log(res.data);
	};
	useEffect(() => {
		getData();
	}, []);
	return (
		<div className="App">
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/dashboard" element={<Dashboard />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
