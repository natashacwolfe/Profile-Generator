const fs = require ('fs'); 
const inquirer = require ('inquirer');
const axios = require('axios');

const questions = [
    { 
        type: 'input',
        message: 'What is your GitHub user name?',
        name: 'username'
    },
    {
        type: 'list',
        message: 'What is your favorite color?',
        name: 'fav-color',
        choices: ['green', 'blue', 'pink', 'red']
    }
];

// function writeToFile(fileName, data) {
 
// }

// function init() {}

// init();


inquirer.prompt(questions)
    .then(function( {username} ) {
        const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
        
        axios.get (queryUrl).then(function(response) {
            console.log(response);
        })
    })