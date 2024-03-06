// Description: This file contains the client side code for the resume builder application.

var addEducationButton = document.getElementById("addEducation");
var educationCount = 0;
addEducationButton.addEventListener("click", function () {
	var newDiv = document.createElement("div");
	newDiv.id = "education" + educationCount;

	var newH3 = document.createElement("h3");
	newH3.textContent = "Education " + (educationCount + 1);
	newDiv.appendChild(newH3);

	var newLine = document.createElement("p");
	var newName = document.createElement("input");
	newName.type = "text";
	newName.placeholder = "Enter institute name";
	newName.id = "educationName" + educationCount;
	var newLoc = document.createElement("input");
	newLoc.type = "text";
	newLoc.placeholder = "Enter location";
	newLoc.id = "educationLoc" + educationCount;
	newLine.appendChild(document.createTextNode("Institute Name: "));
	newLine.appendChild(newName);
	newLine.appendChild(document.createTextNode(" Location: "));
	newLine.appendChild(newLoc);
	newDiv.appendChild(newLine);

	newLine = document.createElement("p");
	var newEndM = document.createElement("input");
	newEndM.type = "text";
	newEndM.placeholder = "Enter end month";
	newEndM.id = "educationEndM" + educationCount;
	var newEndY = document.createElement("input");
	newEndY.type = "text";
	newEndY.placeholder = "Enter end year";
	newEndY.id = "educationEndY" + educationCount;
	newLine.appendChild(document.createTextNode("End Month: "));
	newLine.appendChild(newEndM);
	newLine.appendChild(document.createTextNode(" End Year: "));
	newLine.appendChild(newEndY);
	newDiv.appendChild(newLine);

	newLine = document.createElement("p");
	var newDesc = document.createElement("textarea");
	newDesc.placeholder = "Enter description";
	newDesc.rows = 4;
	newDesc.cols = 50;
	newDesc.id = "educationDesc" + educationCount;
	newLine.appendChild(document.createTextNode("Description: "));
	newLine.appendChild(document.createElement("br"));
	newLine.appendChild(document.createElement("br"));
	newLine.appendChild(newDesc);
	newDiv.appendChild(newLine);

	newLine = document.createElement("p");
	var newGrad = document.createElement("input");
	newGrad.type = "checkbox";
	newGrad.id = "educationGrad" + educationCount;
	newLine.appendChild(document.createTextNode("Graduated: "));
	newLine.appendChild(newGrad);
	newDiv.appendChild(newLine);

	var educationList = document.getElementById("educationList");
	educationList.appendChild(newDiv);

	educationCount++;
});

var deleteEducationButton = document.getElementById("deleteEducation");
deleteEducationButton.addEventListener("click", function () {
	if (educationCount > 0) {
		var educationList = document.getElementById("educationList");
		var education = document.getElementById(
			"education" + (educationCount - 1)
		);
		educationList.removeChild(education);
		educationCount--;
	}
});

var addExperienceButton = document.getElementById("addExperience");
var experienceCount = 0;
var expBullets = {};
addExperienceButton.addEventListener("click", function () {
	newDiv = document.createElement("div");
	newDiv.id = "experience" + experienceCount;
	expBullets[newDiv.id] = 0;

	var newH3 = document.createElement("h3");
	newH3.textContent = "Experience " + (experienceCount + 1);
	newDiv.appendChild(newH3);

	var newLine = document.createElement("p");
	var newTitle = document.createElement("input");
	newTitle.type = "text";
	newTitle.placeholder = "Enter job title";
	newTitle.id = "experienceTitle" + experienceCount;
	var newCompany = document.createElement("input");
	newCompany.type = "text";
	newCompany.placeholder = "Enter company name";
	newCompany.id = "experienceCompany" + experienceCount;
	newLine.appendChild(document.createTextNode("Job Title: "));
	newLine.appendChild(newTitle);
	newLine.appendChild(document.createTextNode(" Company: "));
	newLine.appendChild(newCompany);
	newDiv.appendChild(newLine);

	newLine = document.createElement("p");
	var newStartM = document.createElement("input");
	newStartM.type = "text";
	newStartM.placeholder = "Enter start month";
	newStartM.id = "experienceStartM" + experienceCount;
	var newStartY = document.createElement("input");
	newStartY.type = "text";
	newStartY.placeholder = "Enter start year";
	newStartY.id = "experienceStartY" + experienceCount;
	newLine.appendChild(document.createTextNode("Start Month: "));
	newLine.appendChild(newStartM);
	newLine.appendChild(document.createTextNode(" Start Year: "));
	newLine.appendChild(newStartY);
	newDiv.appendChild(newLine);

	newLine = document.createElement("p");
	var newEndM = document.createElement("input");
	newEndM.type = "text";
	newEndM.placeholder = "Enter end month";
	newEndM.id = "experienceEndM" + experienceCount;
	var newEndY = document.createElement("input");
	newEndY.type = "text";
	newEndY.placeholder = "Enter end year";
	newEndY.id = "experienceEndY" + experienceCount;
	newLine.appendChild(document.createTextNode("End Month: "));
	newLine.appendChild(newEndM);
	newLine.appendChild(document.createTextNode(" End Year: "));
	newLine.appendChild(newEndY);
	newDiv.appendChild(newLine);

	newLine = document.createElement("p");
	var newLoc = document.createElement("input");
	newLoc.type = "text";
	newLoc.placeholder = "Enter location";
	newLoc.id = "experienceLoc" + experienceCount;
	newLine.appendChild(document.createTextNode("Location: "));
	newLine.appendChild(newLoc);
	newDiv.appendChild(newLine);

	newLine = document.createElement("p");
	var addButton = document.createElement("button");
	addButton.textContent = "Add Bullet";
	addButton.id = "addExp" + experienceCount;
	var delButton = document.createElement("button");
	delButton.textContent = "Delete Bullet";
	delButton.id = "delExp" + experienceCount;
	newLine.appendChild(addButton);
	newLine.appendChild(delButton);
	newDiv.appendChild(newLine);

	addButton.addEventListener("click", function () {
		var currExp = addButton.id.substring(6);
		var currDivId = "experience" + currExp;
		var currDiv = document.getElementById(currDivId);
		var newLine = document.createElement("p");
		newLine.id = "e" + currExp + "l" + expBullets[currDivId];
		var newBullet = document.createElement("input");
		newBullet.type = "text";
		newBullet.placeholder = "Enter bullet";
		newBullet.id = "e" + currExp + "b" + expBullets[currDivId];
		newLine.appendChild(
			document.createTextNode(
				"Bullet " + (expBullets[currDivId] + 1) + ": "
			)
		);
		newLine.appendChild(newBullet);
		currDiv.appendChild(newLine);
		expBullets[currDivId]++;
	});

	delButton.addEventListener("click", function () {
		var currExp = delButton.id.substring(6);
		var currDivId = "experience" + currExp;
		var currDiv = document.getElementById(currDivId);
		if (expBullets[currDivId] > 0) {
			var bullet = document.getElementById(
				"e" + currExp + "l" + (expBullets[currDivId] - 1)
			);
			currDiv.removeChild(bullet);
			expBullets[currDivId]--;
		}
	});

	var experienceList = document.getElementById("experienceList");
	experienceList.appendChild(newDiv);
	experienceCount++;
});

var deleteExperienceButton = document.getElementById("deleteExperience");
deleteExperienceButton.addEventListener("click", function () {
	if (experienceCount > 0) {
		var experienceList = document.getElementById("experienceList");
		var experience = document.getElementById(
			"experience" + (experienceCount - 1)
		);
		experienceList.removeChild(experience);
		experienceCount--;
	}
});

var addSkillButton = document.getElementById("addSkill");
var skillCount = 0;
addSkillButton.addEventListener("click", function () {
	var newDiv = document.createElement("div");
	newDiv.id = "skill" + skillCount;

	var newH3 = document.createElement("h3");
	newH3.textContent = "Skill Type " + (skillCount + 1);
	newDiv.appendChild(newH3);
	newDiv.appendChild(document.createElement("p"));

	var newLine = document.createElement("p");
	var newSkill = document.createElement("input");
	newSkill.type = "text";
	newSkill.placeholder = "Enter skill name (e.g. Languages): ";
	newSkill.id = "skillName" + skillCount;
	newSkill.style = "width: 300px;";
	newLine.appendChild(document.createTextNode("Skill type: "));
	newLine.appendChild(newSkill);
	newDiv.appendChild(newLine);

	newLine = document.createElement("p");
	var skills = document.createElement("textarea");
	skills.placeholder =
		"Enter skills as a comma seperated list (e.g. Python, Java, C++)";
	skills.rows = 4;
	skills.cols = 50;
	skills.id = "skills" + skillCount;
	newLine.appendChild(document.createTextNode("Skills: "));
	newLine.appendChild(document.createElement("br"));
	newLine.appendChild(document.createElement("br"));
	newLine.appendChild(skills);
	newDiv.appendChild(newLine);

	var skillList = document.getElementById("skillsList");
	skillList.appendChild(newDiv);

	skillCount++;
});

var deleteSkillButton = document.getElementById("deleteSkill");
deleteSkillButton.addEventListener("click", function () {
	if (skillCount > 0) {
		var skillList = document.getElementById("skillsList");
		var skill = document.getElementById("skill" + (skillCount - 1));
		skillList.removeChild(skill);
		skillCount--;
	}
});

var addProjectButton = document.getElementById("addProject");
var projectCount = 0;
var projBullets = {};
addProjectButton.addEventListener("click", function () {
	var newDiv = document.createElement("div");
	newDiv.id = "project" + projectCount;
	projBullets[newDiv.id] = 0;

	var newH3 = document.createElement("h3");
	newH3.textContent = "Project " + (projectCount + 1);
	newDiv.appendChild(newH3);
	newDiv.appendChild(document.createElement("p"));

	var newLine = document.createElement("p");
	var newTitle = document.createElement("input");
	newTitle.type = "text";
	newTitle.placeholder = "Enter project title";
	newTitle.name = "title";
	newTitle.id = "projectTitle" + projectCount;
	var newLink = document.createElement("input");
	newLink.type = "text";
	newLink.name = "link";
	newLink.placeholder = "Enter link without https://";
	newLink.id = "projectLink" + projectCount;
	newLine.appendChild(document.createTextNode("Title: "));
	newLine.appendChild(newTitle);
	newLine.appendChild(document.createTextNode(" Link: "));
	newLine.appendChild(newLink);
	newDiv.appendChild(newLine);

	newLine = document.createElement("p");
	var newTech = document.createElement("textarea");
	newTech.placeholder =
		"Enter tech used as a comma seperated list (e.g. Python, Java, C++)";
	newTech.rows = 4;
	newTech.cols = 50;
	newTech.id = "projectTech" + projectCount;
	newLine.appendChild(document.createTextNode("Tech Used: "));
	newLine.appendChild(document.createElement("br"));
	newLine.appendChild(document.createElement("br"));
	newLine.appendChild(newTech);
	newDiv.appendChild(newLine);

	newLine = document.createElement("p");
	var addButton = document.createElement("button");
	addButton.textContent = "Add Bullet";
	addButton.id = "addProj" + projectCount;
	var delButton = document.createElement("button");
	delButton.textContent = "Delete Bullet";
	delButton.id = "delProj" + projectCount;
	newLine.appendChild(addButton);
	newLine.appendChild(delButton);
	newDiv.appendChild(newLine);

	addButton.addEventListener("click", function () {
		var currProj = addButton.id.substring(7);
		var currDivId = "project" + currProj;
		var currDiv = document.getElementById(currDivId);
		var newLine = document.createElement("p");
		newLine.id = "p" + currProj + "l" + projBullets[currDivId];
		var newBullet = document.createElement("input");
		newBullet.type = "text";
		newBullet.placeholder = "Enter bullet";
		newBullet.id = "p" + currProj + "b" + projBullets[currDivId];
		newLine.appendChild(
			document.createTextNode(
				"Bullet " + (projBullets[currDivId] + 1) + ": "
			)
		);
		newLine.appendChild(newBullet);
		currDiv.appendChild(newLine);
		projBullets[currDivId]++;
	});

	delButton.addEventListener("click", function () {
		var currProj = delButton.id.substring(7);
		var currDivId = "project" + currProj;
		var currDiv = document.getElementById(currDivId);
		if (projBullets[currDivId] > 0) {
			var bullet = document.getElementById(
				"p" + currProj + "l" + (projBullets[currDivId] - 1)
			);
			currDiv.removeChild(bullet);
			projBullets[currDivId]--;
		}
	});

	var projectList = document.getElementById("projectList");
	projectList.appendChild(newDiv);

	projectCount++;
});

var deleteProjectButton = document.getElementById("deleteProject");
deleteProjectButton.addEventListener("click", function () {
	if (projectCount > 0) {
		var projectList = document.getElementById("projectList");
		var project = document.getElementById("project" + (projectCount - 1));
		projectList.removeChild(project);
		projectCount--;
	}
});

var generateButton = document.getElementById("generateButton");
generateButton.addEventListener("click", async function (e) {
	e.preventDefault();

	var body = {
		name: document.getElementById("name").value.replaceAll("%", "\\%"),
		email: document.getElementById("email").value.replaceAll("%", "\\%"),
		phone: document.getElementById("phone").value,
		linkedin: document
			.getElementById("linkedin")
			.value.replaceAll("%", "\\%"),
		github: document.getElementById("github").value.replaceAll("%", "\\%"),
		portfolio: document
			.getElementById("portfolio")
			.value.replaceAll("%", "\\% "),
		display_summary: document.getElementById("displaySummary").checked,
		summary: document
			.getElementById("summary")
			.value.replaceAll("%", "\\%"),
		education_array: [],
		exp_array: [],
		proj_array: [],
		skill_array: [],
	};

	var educationList = document.getElementById("educationList").childNodes;
	for (let i = 0; i < educationList.length; i++) {
		var educationObject = {
			name: document
				.getElementById("educationName" + i)
				.value.replaceAll("%", "\\%"),
			location: document.getElementById("educationLoc" + i).value,
			description: document
				.getElementById("educationDesc" + i)
				.value.replaceAll("%", "\\%"),
			end_month: document.getElementById("educationEndM" + i).value,
			end_year: document.getElementById("educationEndY" + i).value,
			graduated: document.getElementById("educationGrad" + i).checked,
		};
		body["education_array"].push(educationObject);
	}

	var skillList = document.getElementById("skillsList").childNodes;
	for (let i = 0; i < skillList.length; i++) {
		var skillObject = {
			name: document
				.getElementById("skillName" + i)
				.value.replaceAll("%", "\\%"),
			skills: document
				.getElementById("skills" + i)
				.value.replaceAll("%", "\\%"),
		};
		body["skill_array"].push(skillObject);
	}

	var experienceList = document.getElementById("experienceList").childNodes;
	for (let i = 0; i < experienceList.length; i++) {
		var experienceObject = {
			title: document.getElementById("experienceTitle" + i).value,
			company: document.getElementById("experienceCompany" + i).value,
			start_month: document.getElementById("experienceStartM" + i).value,
			start_year: document.getElementById("experienceStartY" + i).value,
			end_month: document.getElementById("experienceEndM" + i).value,
			end_year: document.getElementById("experienceEndY" + i).value,
			location: document.getElementById("experienceLoc" + i).value,
			bullets: [],
		};
		for (let j = 0; j < expBullets[experienceList[i].id]; j++) {
			experienceObject["bullets"].push(
				document
					.getElementById("e" + i + "b" + j)
					.value.replaceAll("%", "\\%")
			);
		}

		body["exp_array"].push(experienceObject);
	}

	var projectList = document.getElementById("projectList").childNodes;
	for (let i = 0; i < projectList.length; i++) {
		var project = projectList[i];
		var projectObject = {
			title: document.getElementById("projectTitle" + i).value,
			tech: document.getElementById("projectTech" + i).value,
			link: document.getElementById("projectLink" + i).value,
			bullets: [],
		};
		for (let j = 0; j < projBullets[project.id]; j++) {
			projectObject["bullets"].push(
				document
					.getElementById("p" + i + "b" + j)
					.value.replaceAll("%", "\\%")
			);
		}

		body["proj_array"].push(projectObject);
	}

	try {
		const response = await fetch("https://latex-builder.onrender.com/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const blob = await response.blob();
		const objectURL = URL.createObjectURL(blob);

		document.getElementById("pdfViewer").src = objectURL;
	} catch (error) {
		console.error("Error:", error);
	}
});
