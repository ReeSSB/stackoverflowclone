import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import "./HomeStyle.css";
function Home() {
	return (
		<div className="home">
			<div>
				<div className="hometext">
					<h2>Join the Stack Overflow community</h2>
					<ul>
						<li>Get unstuck — ask a question</li>
						<li>
							Unlock new privileges like voting and commenting
						</li>
						<li>Save your favorite tags, filters, and jobs</li>
						<li>Earn reputation and badges</li>
					</ul>
					<p>
						Collaborate and share knowledge with a private group
						for FREE.
					</p>
				</div>
			</div>

			<div className="homeSignup">
				<Signup />
			</div>
		</div>
	);
}

export default Home;
