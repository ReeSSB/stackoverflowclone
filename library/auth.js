const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const JWTD = require("jwt-decode");
const secret = "lkjfhtdfjgkhlkj;kljhjhgjjjvvjvjjv_90@089767ughi";

const hashing = async (value) => {
	try {
		const salt = await bcrypt.genSalt(10);
		console.log("salt", salt);
		const hash = await bcrypt.hash(value, salt);
		return hash;
	} catch (err) {
		return err;
	}
};

const hashCompare = async (password, hasValue) => {
	try {
		return await bcrypt.compare(password, hasValue);
	} catch (err) {
		return err;
	}
};

const createJWT = async ({ email }) => {
	return await JWT.sign({ email }, secret, {
		expiresIn: "2m",
	});
};

const authentication = async (token) => {
	const decode = await JWTD(token);
	console.log(decode);
	if (Math.round(new Date() / 1000) <= decode.exp) {
		console.log(true);
		return {
			email: decode.email,
			validity: true,
		};
	} else {
		console.log(false);
		return {
			email: decode.email,
			validity: false,
		};
	}
	// return decode;
};

const role = async function (req, res, next) {
	switch (req.body.role) {
		case 1:
			console.log("Admin");
			break;
		case 2:
			console.log("student");
			break;
		default:
			res.send({
				message: "Invalid role, 1 - Admin & 2 - Student",
			});
			break;
	}
	next();
};

module.exports = { hashing, hashCompare, createJWT, authentication };
