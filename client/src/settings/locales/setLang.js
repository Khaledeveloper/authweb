let langObj = {}
const fs = require('fs');
var path = require('path');
console.log("test");
//read file and return JSON obj
const readFile = (filepath) => {
	
	let rawdata = fs.readFileSync(path.join(__dirname, filepath));
	let data = JSON.parse(rawdata);


	return data

}

//set language 
const setLang = (lang) => {
	
	if (!lang || lang === 'en') {

		langObj = readFile('en.json')

	}
	
	if (lang === 'ar') {

		langObj = readFile('ar.json')
	}
	if (lang === 'de') {

		langObj = readFile('de.json')
	}
	if (lang === 'uk') {

		langObj = readFile('uk.json')
	}
	if (lang === 'it') {

		langObj = readFile('it.json')
	}
	if (lang === 'ru') {

		langObj = readFile('ru.json')
	}

	return langObj
}


module.exports = { setLang }