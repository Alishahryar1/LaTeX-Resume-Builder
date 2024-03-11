const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
	credentials: {
		type: process.env.type,
		project_id: process.env.project_id,
		private_key_id: process.env.private_key_id,
		private_key: process.env.private_key.replace(/\\n/g, "\n"),
		client_email: process.env.client_email,
		client_id: process.env.client_id,
		auth_uri: process.env.auth_uri,
		token_uri: process.env.token_uri,
		auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
		client_x509_cert_url: process.env.client_x509_cert_url,
		universe_domain: process.env.universe_domain,
	},
});
const app = express();
const uuid = require("uuid");

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send("Server is running");
});

app.post("/", (req, res) => {
	const {
		name,
		email,
		phone,
		linkedin,
		github,
		portfolio,
		display_summary,
		summary,
		education_array,
		exp_array,
		proj_array,
		skill_array,
	} = req.body;

	const sendFile = (path) => {
		return new Promise((resolve, reject) => {
			res.sendFile(path, (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	};

	const writeFile = (path, data) => {
		return new Promise((resolve, reject) => {
			fs.writeFile(path, data, (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	};

	const getPDF = (url) => {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await axios.get(url, {
					responseType: "arraybuffer",
				});
				resolve(response);
			} catch (err) {
				reject(err);
			}
		});
	};

	const saveFile = (file, data) => {
		return new Promise((resolve, reject) => {
			file.save(data, (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	};

	inputPath = path.resolve(__dirname, "static/resume.tex");
	fs.readFile(inputPath, "utf8", async (err, data) => {
		var latex_code = data.split("\n");
		var new_latex_code = [];
		for (let i = 0; i < latex_code.length; i++) {
			var line = latex_code[i];
			var start;
			if (line.includes("%Name")) {
				if (name == "") {
					continue;
				}
				new_latex_code.push(
					String.raw`    \textbf{\Huge \scshape ` +
						name +
						String.raw` } \\ \vspace{1pt} %Name`
				);
			} else if (line.includes("%Email")) {
				if (email == "") {
					continue;
				}
				new_latex_code.push(
					String.raw`    $|$ \href{mailto:` +
						email +
						String.raw`}{` +
						email +
						String.raw`} %Email`
				);
			} else if (line.includes("%Phone")) {
				if (phone == "") {
					continue;
				}
				new_latex_code.push(
					String.raw`    \small ` + phone + String.raw` %Phone`
				);
			} else if (line.includes("%Linkedin")) {
				if (linkedin == "") {
					continue;
				}
				new_latex_code.push(
					String.raw`    $|$ \href{https://` +
						linkedin +
						String.raw`}{` +
						linkedin +
						String.raw`} %Linkedin`
				);
			} else if (line.includes("%Github")) {
				if (github == "") {
					continue;
				}
				new_latex_code.push(
					String.raw`    $|$ \href{https://` +
						github +
						String.raw`}{` +
						github +
						String.raw`} %Github`
				);
			} else if (line.includes("%Portfolio")) {
				if (portfolio == "") {
					continue;
				}
				new_latex_code.push(
					String.raw`    $|$ \href{https://` +
						portfolio +
						String.raw`}{Portfolio Website} %Portfolio`
				);
			} else if (line.includes(String.raw`\section{Summary}`)) {
				if (display_summary) {
					start = "";
				} else {
					start = "%";
				}
				new_latex_code.push(start + String.raw`\section{Summary}`);
				new_latex_code.push(
					start + String.raw`\resumeSubHeadingListStart`
				);
				new_latex_code.push(
					start + String.raw`\resumeItem{` + summary + String.raw`}`
				);
				new_latex_code.push(
					start + String.raw`\resumeSubHeadingListEnd`
				);
				new_latex_code.push(start + String.raw`\vspace{-10pt}`);
				i += 4;
			} else if (line.includes(String.raw`\section{Education}`)) {
				i += 2;
				if (education_array.length == 0) {
					continue;
				}
				new_latex_code.push(String.raw`\section{Education}`);
				new_latex_code.push(String.raw`  \resumeSubHeadingListStart`);
				var start;
				for (let j = 0; j < education_array.length; j++) {
					new_latex_code.push(String.raw`    \resumeSubheading`);
					new_latex_code.push(
						String.raw`      {` +
							education_array[j].name +
							String.raw`}{` +
							education_array[j].location +
							String.raw`}`
					);
					if (education_array[j].graduated) {
						start = "";
					} else {
						start = "Expected ";
					}
					new_latex_code.push(
						String.raw`      {` +
							education_array[j].description +
							String.raw`}{` +
							start +
							education_array[j].end_month +
							" " +
							education_array[j].end_year +
							String.raw`}`
					);
				}
				new_latex_code.push(String.raw`  \resumeSubHeadingListEnd`);
			} else if (line.includes(String.raw`\section{Skills}`)) {
				i += 4;
				if (skill_array.length == 0) {
					continue;
				}
				new_latex_code.push(line);
				new_latex_code.push(
					String.raw` \begin{itemize}[leftmargin=0.15in, label={}]`
				);
				new_latex_code.push(String.raw`    \small{\item{`);
				for (let j = 0; j < skill_array.length; j++) {
					new_latex_code.push(
						String.raw`     \textbf{` +
							skill_array[j].name +
							String.raw`}{: ` +
							skill_array[j].skills +
							String.raw`} \\`
					);
				}
				new_latex_code.push(String.raw`    }}`);
				new_latex_code.push(String.raw` \end{itemize}`);
			} else if (line.includes(String.raw`\section{Projects}`)) {
				i += 2;
				if (proj_array.length == 0) {
					continue;
				}
				new_latex_code.push(line);
				new_latex_code.push(String.raw`   \resumeSubHeadingListStart`);
				for (let j = 0; j < proj_array.length; j++) {
					new_latex_code.push(
						String.raw`        \resumeProjectHeading`
					);
					new_latex_code.push(
						String.raw`          {\href{` +
							proj_array[j].link +
							String.raw`}{\textbf{` +
							proj_array[j].title +
							String.raw`}} $|$ \emph{` +
							proj_array[j].tech +
							String.raw`}}{}`
					);
					if (proj_array[j].bullets.length == 0) {
						continue;
					}
					new_latex_code.push(
						String.raw`        \resumeItemListStart`
					);
					for (let k = 0; k < proj_array[j].bullets.length; k++) {
						new_latex_code.push(
							String.raw`          \resumeItem{` +
								proj_array[j].bullets[k] +
								String.raw`}`
						);
					}
					new_latex_code.push(String.raw`        \resumeItemListEnd`);
				}
				new_latex_code.push(String.raw`   \resumeSubHeadingListEnd`);
			} else if (line.includes(String.raw`\section{Experience}`)) {
				i += 2;
				if (exp_array.length == 0) {
					continue;
				}
				new_latex_code.push(line);
				new_latex_code.push(String.raw`\resumeSubHeadingListStart`);
				for (let j = 0; j < exp_array.length; j++) {
					new_latex_code.push(String.raw`    \resumeSubheading`);
					new_latex_code.push(
						String.raw`      {` +
							exp_array[j].title +
							String.raw`}{` +
							exp_array[j].start_month +
							" " +
							exp_array[j].start_year +
							" -- " +
							exp_array[j].end_month +
							" " +
							exp_array[j].end_year +
							String.raw`}`
					);
					new_latex_code.push(
						String.raw`      {` +
							exp_array[j].company +
							String.raw`}{` +
							exp_array[j].location +
							String.raw`}`
					);
					if (exp_array[j].bullets.length == 0) {
						continue;
					}
					new_latex_code.push(String.raw`      \resumeItemListStart`);
					for (let k = 0; k < exp_array[j]["bullets"].length; k++) {
						new_latex_code.push(
							String.raw`        \resumeItem{` +
								exp_array[j].bullets[k] +
								String.raw`}`
						);
					}
					new_latex_code.push(String.raw`      \resumeItemListEnd`);
				}
				new_latex_code.push(String.raw`\resumeSubHeadingListEnd`);
			} else {
				new_latex_code.push(line);
			}
		}
		latex_code = new_latex_code.join("\n");
		console.log("Tex file generated locally");
		var resume_id = uuid.v4();
		const bucket = storage.bucket("latex_resume_bucket");
		const file = bucket.file(resume_id + ".tex");
		texURL =
			"https://storage.googleapis.com/latex_resume_bucket/" +
			resume_id +
			".tex";
		pdfURL =
			"https://latexonline.cc/compile?url=" +
			texURL +
			"&download=sample.pdf";

		try {
			await saveFile(file, latex_code);
			console.log("Tex file saved to GCS");
		} catch (err) {
			console.log("Error in saving Tex to GCS");
			res.status(500).send("");
			return;
		}

		let response;
		try {
			response = await getPDF(pdfURL);
			console.log("Tex file compiled to PDF");
		} catch (err) {
			console.log("Error in compiling Tex to PDF");
			res.status(500).send("");
		} finally {
			file.delete((err) => {
				if (err) {
					console.log(err);
				} else {
					console.log("Tex file deleted from GCS");
				}
			});
			if (!response) {
				return;
			}
		}

		try {
			await writeFile(
				"static/" + resume_id + ".pdf",
				new Buffer.from(response.data)
			);
			console.log("PDF file saved locally");
		} catch (err) {
			console.log("Error in saving PDF locally");
			res.status(500).send("");
			return;
		}

		try {
			await sendFile(
				path.resolve(__dirname, "static/" + resume_id + ".pdf")
			);
			console.log("PDF file sent back for client " + name);
		} catch (err) {
			console.log("Error in sending PDF back");
			res.status(500).send("");
			return;
		} finally {
			fs.unlink(
				path.resolve(__dirname, "static/" + resume_id + ".pdf"),
				(err) => {
					if (err) {
						console.log(err);
					} else {
						console.log("PDF file deleted locally");
					}
				}
			);
		}
	});
});

const port = process.env.port || 3000;
app.listen(port, function () {
	console.log(`Server is running on port ${port}`);
});
