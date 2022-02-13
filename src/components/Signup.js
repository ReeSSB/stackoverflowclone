import React, { useState } from "react";
import "./SignupStyle.css";
import { useNavigate } from "react-router-dom";
import env from "react-dotenv";
import axios from "axios";

function Signup() {
	// const [data, setData] = useState({
	// 	displayName: "",
	// 	email: "",
	// 	password: "",
	// });

	// let getData = async () => {
	// 	let res = await axios.get(env.API_URL);
	// 	console.log(res.data);
	// };
	// useEffect(() => {
	// 	getData();
	// }, []);

	// let navigate = useNavigate();

	// let displayName;

	// let handleChange = (e) => {
	// 	displayName = e.target.value;

	// 	setData({ ...data, [displayName]: displayName });
	// };

	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	const { displayName, email, password } = data;

	// 	const res = await axios(`${env.API_URL}/users/register`, {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({
	// 			displayName,
	// 			email,
	// 			password,
	// 		}),
	// 	});
	// 	const data = await res.json();

	// 	if (res.statusCode === 422 || !data) {
	// 		window.alert("Invalid Registration");
	// 		console.log("Invalid Registration");
	// 	} else {
	// 		window.alert("Registration Successful");
	// 		console.log("Registration Successful");
	// 		navigate("/login");
	// 	}
	// };

	let [displayName, setDisplayName] = useState("");
	let [email, setEmail] = useState("");
	let [password, setPassword] = useState("");

	let navigate = useNavigate();

	let handleSubmit = async () => {
		let res = await axios.post(`${process.env.API_URL_USERS_REGISTER}`, {
			displayName,
			email,
			password,
		});
		if (res.data.statusCode === 200) {
			console.log("login success");
			navigate("/login");
		}
	};
	let handleSignIn = () => {
		navigate("/login");
	};
	return (
		<div>
			<div>
				<form method="POST" onSubmit={handleSubmit}>
					<div class="container">
						<h1>Register</h1>
						<p>Sign Up to create an account.</p>
						<hr />

						<label for="username">
							<b>Display Name</b>
						</label>
						<input
							type="text"
							placeholder="Username"
							name="username"
							id="username"
							className="SignupInput"
							required
							// value={data.displayName}
							onChange={(e) => setDisplayName(e.target.value)}
						/>
						<br />
						<label for="email">
							<b>Email</b>
						</label>
						<input
							type="email"
							placeholder="Enter Email"
							name="email"
							id="email"
							required
							className="SignupInput"
							// value={data.email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<br />
						<label for="psw">
							<b>Password</b>
						</label>
						<input
							type="password"
							placeholder="Enter Password"
							name="psw"
							id="psw"
							required
							className="SignupInput"
							// value={data.password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						<hr />

						<p>
							By creating an account you agree to our{" "}
							<a href="#">Terms & Privacy</a>.
						</p>
						<button
							type="submit"
							class="registerbtn"
							onSubmit={() => {
								handleSubmit();
							}}
						>
							Register
						</button>
						<br />
						<p>
							Already have an account?{" "}
							<button
								onClick={() => {
									handleSignIn();
								}}
							>
								Sign in.
							</button>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Signup;
