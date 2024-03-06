const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
const cors = require("cors");
const axios = require("axios");

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

	var latex_code;
	inputPath = path.resolve(__dirname, "static/resume.tex");
	fs.readFile(inputPath, "utf8", (err, data) => {
		latex_code = data.split("\n");
		new_latex_code = [];
		for (let i = 0; i < latex_code.length; i++) {
			line = latex_code[i];
			if (line.includes("%Name")) {
				new_latex_code.push(
					String.raw`    \textbf{\Huge \scshape ` +
						name +
						String.raw` } \\ \vspace{1pt} %Name`
				);
			} else if (line.includes("%Email")) {
				new_latex_code.push(
					String.raw`    \href{mailto:` +
						email +
						String.raw`}{` +
						email +
						String.raw`} $|$ %Email`
				);
			} else if (line.includes("%Phone")) {
				new_latex_code.push(
					String.raw`    \small ` + phone + String.raw` $|$ %Phone`
				);
			} else if (line.includes("%Linkedin")) {
				new_latex_code.push(
					String.raw`    \href{https://` +
						linkedin +
						String.raw`}{` +
						linkedin +
						String.raw`} $|$ %Linkedin`
				);
			} else if (line.includes("%Github")) {
				new_latex_code.push(
					String.raw`    \href{https://` +
						github +
						String.raw`}{` +
						github +
						String.raw`} $|$ %Github`
				);
			} else if (line.includes("%Portfolio")) {
				new_latex_code.push(
					String.raw`    \href{https://` +
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
							String.raw`}} $|$ ` +
							proj_array[j].tech +
							String.raw`}{}`
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
		console.log("Latex code generated. Sending to Compile.");
		var timestamp = uuid.v4();
		//encodeUricomponent latex code
		latex_code = encodeURIComponent(latex_code);
		var pdfUrl =
			"https://latexonline.cc/compile?text=" +
			latex_code +
			"&download=resume.pdf";
		axios.get(pdfUrl, { responseType: "arraybuffer" }).then((response) => {
			const pdfPath = path.resolve(__dirname, `static/${timestamp}.pdf`);
			fs.writeFile(pdfPath, new Buffer.from(response.data), (err) => {
				if (err) {
					console.error(err);
					res.status(500).send("Error writing file");
				} else {
					res.sendFile(pdfPath, function (err) {
						if (err) {
							console.error(err);
						} else {
							fs.unlink(pdfPath, function (err) {
								if (err) {
									console.error(err);
								} else {
									console.log("File deleted");
								}
							});
						}
					});
				}
			});
		});
	});
});

const port = process.env.port || 3000;
app.listen(port, function () {
	console.log(`Server is running on port ${port}`);
});
