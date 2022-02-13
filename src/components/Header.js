import React from "react";
import "./HeaderStyle.css";
import { useNavigate } from "react-router";

function Header() {
	let navigate = useNavigate();
	let handleClick = () => {
		navigate("/login");
	};
	let handleSignup = () => {
		navigate("/");
	};
	return (
		<div className="mainHeader">
			<div className="header">
				<div className="headerBtnSet1">
					<button className="headerBtn">About</button>
					<button className="headerBtn">Products</button>
					<button className="headerBtn">Team</button>
				</div>
				<div className="headerBtnSet2">
					<input type="search" className="searchbox " />
				</div>
				<div className="headerBtnSet3">
					<button
						className="headerBtn"
						onClick={() => {
							handleClick();
						}}
					>
						Log in
					</button>
					<button
						className="headerBtn"
						onClick={() => {
							handleSignup();
						}}
					>
						Sign Up
					</button>
				</div>
			</div>
		</div>
	);
}

export default Header;
