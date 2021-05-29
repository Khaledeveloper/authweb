let langObj = {}
const fs = require('fs');
var path = require('path');
console.log("test");
//read file and return JSON obj
const readFile = (filepath) => {
	console.log("best");
	let rawdata = fs.readFileSync(path.join(__dirname, filepath));
	let data = JSON.parse(rawdata);


	return data

}

//set language 
const setLang = (lang) => {
	//UnhandledPromiseRejectionWarning: Error: ENOENT: no such file or directory, open
	if (!lang || lang === 'en') {

		langObj = readFile('en.json')

	}
	console.log('none');
	if (lang === 'ar') {

		langObj = readFile('ar.json')
	}

	return langObj
}


module.exports = { setLang }