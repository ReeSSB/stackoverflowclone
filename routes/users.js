var express = require("express");
var router = express.Router();

const { hashing, hashCompare, createJWT, authentication } = require("../library/auth");
const { dbUrl, mongodb, MongoClient, dbName } = require("../dbConfig");

router.get("/getall", async function (req, res) {
	const client = await MongoClient.connect(dbUrl);
	try {
		const db = await client.db(dbName);
		let stackUser = await db.collection("stackUser").find().toArray();
		res.json({
			statusCode: 200,
			message: "Data fetched Successfully",
			data: stackUser,
		});
	} catch (error) {
		console.log(error);
		res.json({ statusCode: 500, message: "Internal Server Error!" });
	} finally {
		client.close();
	}
});
router.post("/register", async (req, res) => {
	// Creating connection
	const client = await MongoClient.connect(dbUrl);

	try {
		const db = await client.db(dbName);

		const stackUser = await db
			.collection("stackUser")
			.findOne({ email: req.body.email });

		if (stackUser) {
			res.json({
				statusCode: 422,
				message: "User already exists, please try with new email",
			});
		} else {
			const hash = await hashing(req.body.password);
			// req.body.password = hash;
			// console.log(hash);
			// res.send(hash);

			let accountCreation = {
				email: req.body.email,
				password: hash,
				verify: "N",
			};
			let document = await db
				.collection("stackUser")
				.insertOne(accountCreation);
			const token = await createJWT({ email: req.body.email });

			// let document = await db.collection("stackUser").insertOne(req.body);

			res.json({
				statusCode: 200,
				message: "User created successfully!",
				emailVerifyToken: token,
			});
		}

		// Hashing password inserted by stackUser
	} catch (err) {
		res.send(err);
	} finally {
		client.close();
	}
});

router.post("/verify-token/:token", async (req, res) => {
	const connection = await MongoClient.connect(dbUrl);

	try {
		const validity = await authentication(req.params.token);
		console.log(validity);
		if (validity.validity == true) {
			const db = await connection.db("b26we");
			const stackUser = await db
				.collection("stackUser")
				.updateOne({ email: validity.email }, { $set: { verify: "Y" } });

			res.json({
				statusCode: 200,
				message: "User verified successfullly!",
				validity: validity,
			});
		} else {
			res.json({
				message: "Token expired!",
			});
		}
	} catch (error) {
		console.log(error);
		res.json({ message: "Error Occured" });
	}
});

router.post("/login", async (req, res) => {
	const connection = await MongoClient.connect(dbUrl);

	try {
		const db = await connection.db("b26we");
		const stackUser = await db
			.collection("stackUser")
			.findOne({ email: req.body.email });

		if (stackUser) {
			const passwordCompare = await hashCompare(
				req.body.password,
				stackUser.password
			);
			if (passwordCompare === true) {
				// console.log(passwordCompare);
				res.json({
					statusCode: 200,
					message: "Logged in successfully!",
				});
			} else {
				res.json({
					message: "Wrong password!, please enter correct password.",
				});
			}
		} else {
			res.json({ message: "User dont exist" });
		}
	} catch (error) {
		res.send(error);
	} finally {
		connection.close();
	}
});

router.post("/forgot-password", async function (req, res) {
	const client = await MongoClient.connect(dbUrl);

	try {
		const db = await client.db("b26we");
		const stackUser = await db
			.collection("stackUser")
			.findOne({ email: req.body.email });

		if (stackUser) {
			const updatedPasswordHashed = hashing(req.body.password);
			// let accountUpdation = {
			// password: hash,
			// };
			let document = await db.collection("stackUser").updateOne(
				{
					email: req.body.email,
				},
				{
					$set: {
						password: updatedPasswordHashed,
					},
				}
			);
			res.json({
				statusCode: 200,
				message: "Password Updated Successfully!",
			});
		} else {
			res.json({ message: "User does not exist!" });
		}
	} catch (error) {
		res.send(error);
	} finally {
		client.close();
	}
});

router.post("/reset-password", async function (req, res) {
	const client = await MongoClient.connect(dbUrl);
	try {
		const db = await client.db("b26we");
		const stackUser = await db
			.collection("stackUser")
			.findOne({ email: req.body.email });

		if (stackUser) {
			const compareExistingPasswords = await hashCompare(
				req.body.oldPassword,
				stackUser.password
			);

			if (compareExistingPasswords) {
				const hashNewPassword = await hashing(req.body.newPassword);
				let document = await db.collection("stackUser").updateOne(
					{
						email: req.body.email,
					},
					{
						$set: {
							password: hashNewPassword,
						},
					}
				);
				res.json({
					statusCode: 200,
					message: "Password changed successfully!",
				});
			} else {
				res.json({ message: "Wrong Password" });
			}
		} else {
			res.json({ message: "User don't exist" });
		}
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
