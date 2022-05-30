const express = require("express");
const { join } = require("node:path");
const { createReadStream, createWriteStream } = require("fs");

const app = express();

app.get("/", async (req, res) => {
	const video = createReadStream(join(__dirname, "1.mp4"));

	res.writeHead(200, {
		"Content-Type": "video/mp4"
	});

	video.pipe(res);
});

app.listen(4000);