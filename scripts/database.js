let lists = [];
let mostRecentEncryption = 5;
let currentEncryptionNum = mostRecentEncryption;

fetch("rotw/database.json")
.then(response => response.text())
.then(data => {
	const obj = JSON.parse(data);

	lists = obj["codeBreakers"];

	// Default encryption number
	let propLists = getPropertyListsByEncryption(currentEncryptionNum);
	displayCodeBreakers(propLists[0], propLists[1]);
});


function getListByEncryption(encryptionNum) {
	return lists[encryptionNum];
}

function isArrayIndex(n) {
	return !isNaN(parseInt(n, 10));
}

function getPropertyListsByEncryption(encryptionNum) {
	let nameList = [];
	let colorList = [];
	let currentList = getListByEncryption(encryptionNum);

	for (let n in currentList) {
		if (currentList.hasOwnProperty(n) && isArrayIndex(n)) {
			nameList.push(currentList[n].name);
			colorList.push(currentList[n].color);
		}
	}

	return [colorList, nameList];
}

function displayCodeBreakers(colorList, nameList) {
	if(nameList.length > 0) {
		let string = "";

		for (let i = 0; i < nameList.length; i++) {
			string += "<div style='color: " + colorList[i] + "'>" + nameList[i] + "</div>";
		}

		document.getElementById("breakerList").innerHTML = "<p>" + string + "</p>"
	} else {
		document.getElementById("breakerList").innerHTML = "<p>No Code Breakers yet!</p>"
	}
}

function previousCodeBreakers() {
	if(currentEncryptionNum > 0) {
		currentEncryptionNum--;
		let propLists = getPropertyListsByEncryption(currentEncryptionNum);
		displayCodeBreakers(propLists[0], propLists[1])
	}
	document.getElementById("nextCodeBreaker").disabled = false;
	document.getElementById("prevCodeBreaker").disabled = currentEncryptionNum === 0;

	displayExplanation();
}

function nextCodeBreakers() {
	if(currentEncryptionNum < lists.length - 1) {
		currentEncryptionNum++;
		let propLists = getPropertyListsByEncryption(currentEncryptionNum);
		displayCodeBreakers(propLists[0], propLists[1])
	}
	document.getElementById("prevCodeBreaker").disabled = false;
	document.getElementById("nextCodeBreaker").disabled = currentEncryptionNum === lists.length - 1;

	displayExplanation();
}


function displayExplanation() {
	if(currentEncryptionNum !== mostRecentEncryption) {
		document.getElementById("explanation").style.display = "inline"

		if(UrlExists("../explain/cipher" + currentEncryptionNum + "/encryption.html")) {
			document.getElementById("explainLink").innerHTML = "<a href='../explain/cipher" + currentEncryptionNum + "/encryption.html' target='_blank'>Here</a>";
		} else {
			document.getElementById("explainLink").innerHTML = "Explanation coming Soon™!"
		}
	} else {
		document.getElementById("explanation").style.display = "none"
	}
}


function UrlExists(url) {
	let http = new XMLHttpRequest();
	http.open('HEAD', url, false);
	http.send();
	return http.status !== 404;
}

window.previousCodeBreakers = previousCodeBreakers;
window.nextCodeBreakers = nextCodeBreakers;