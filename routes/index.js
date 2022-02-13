var express = require("express");
var router = express.Router();
const { dbUrl, mongodb, MongoClient, dbName } = require("../dbConfig");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get("/", async function (req, res) {
	const client = await MongoClient.connect(dbUrl);
	try {
		const db = await client.db(dbName);
		let stackData = await db.collection("stackData").find().toArray();
		res.json({
			statusCode: 200,
			message: "Data fetched Successfully",
			data: stackData,
		});
	} catch (error) {
		console.log(error);
		res.json({ statusCode: 500, message: "Internal Server Error!" });
	} finally {
		client.close();
	}
});

router.get("/:id", async function (req, res) {
	const client = await MongoClient.connect(dbUrl);
	try {
		const db = await client.db(dbName);
		let stackData = await db
			.collection("stackData")
			.findOne({ _id: mongodb.ObjectId(req.params.id) });
		res.json({
			statusCode: 200,
			message: "User fetched Successfully",
			data: stackData,
		});
	} catch (error) {
		console.log(error);
		res.json({ statusCode: 500, message: "Internal Server Error!" });
	} finally {
		client.close();
	}
});

router.post("/", async (req, res) => {
	const client = await MongoClient.connect(dbUrl);
	try {
		const db = await client.db(dbName);
		let stackData = await db
			.collection("stackData")
			.findOne({ email: req.body.email });
		if (stackData) {
			res.json({ statusCode: 400, message: "User Already Exists!" });
		} else {
			const stackData = await db.collection("stackData").insertOne(req.body);
			res.json({
				statusCode: 200,
				message: "User Added successfully!",
				data: stackData,
			});
		}
	} catch (error) {
		console.log(error);
		res.json({ statusCode: 500, message: "Internal Server Error!" });
	} finally {
		client.close();
	}
});

router.put("/:id", async (req, res) => {
	const client = await MongoClient.connect(dbUrl);
	try {
		const db = await client.db(dbName);

		let stackData = await db
			.collection("stackData")
			.findOneAndReplace({ _id: mongodb.ObjectId(req.params.id) }, req.body);

		// {
		// 	businessName: req.body.businessName,
		// 	email: req.body.email,
		// 	mobile: req.body.mobile,
		// 	address: req.body.address,
		// 	city: req.body.city,
		// 	state: req.body.state,
		// 	pincode: req.body.pincode,
		//}

		res.json({
			statusCode: 200,
			message: "Data Edited Successfully!",
			data: stackData,
		});
	} catch (error) {
		console.log(error);
		res.json({ statusCode: 500, message: "Internal Server Error!" });
	} finally {
		client.close();
	}
});

router.delete("/:id", async function (req, res) {
	const client = await MongoClient.connect(dbUrl);
	try {
		const db = await client.db(dbName);
		let stackData = await db
			.collection("stackData")
			.deleteOne({ _id: mongodb.ObjectId(req.params.id) });
		res.json({
			statusCode: 200,
			message: "stackData deleted Successfully",
			data: stackData,
		});
	} catch (error) {
		console.log(error);
		res.json({ statusCode: 500, message: "Internal Server Error!" });
	} finally {
		client.close();
	}
});

module.exports = router;
