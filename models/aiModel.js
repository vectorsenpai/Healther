const { Configuration, OpenAIApi } = require("openai");
const fetch = require('node-fetch');
const imageToURI = require('image-to-uri');
const sblob = require('node:buffer');
const FileReader = require('filereader');
const { response } = require("express");
const configuration = new Configuration({
	apiKey: "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" 
});
const openai = new OpenAIApi(configuration);

async function getNutrition(age, height, weight){
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: "format both DRI and micronutrients into a javascript object with milligrams: " + age + " year old, " + height + " centimeters, " + weight + " kilograms.",
		max_tokens: 3000,
		temperature: 0,
	});
	//console.log(typeof response.data.choices[0].text)
	return response.data.choices[0].text
}

async function getDiet(age, height, weight){
	
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: "create a food diet based on this information: " + age + " year old, " + height + " centimeters, " + weight + " kilograms." + " format this into a javascript object",
		max_tokens: 3000,
		temperature: 0,
	});
	//console.log(response.data.choices[0].text)
	return response.data.choices[0].text
}

async function getNutritionalValues(food) {
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: "return all nutritional facts for " + food,
		max_tokens: 3000,
		temperature: 0
	});
	return response.data.choices[0].text;
}

async function queryTags(images) {
    fetch('https://www.nyckel.com/v1/functions/b2a5oliheud0po9y/invoke', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"data": images})    
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return data.labelName;
    });
}

module.exports = {getDiet, getNutrition, queryTags}