const inquirer = require ('inquirer');
const fs = require ('fs'); 
const axios = require('axios');

const questions = [
    { 
        type: 'input',
        message: 'What is your GitHub user name?',
        name: 'user-name'
    },
    {
        type: 'list',
        message: 'What is your favorite color?',
        name: 'fav-color',
        choices: ['green', 'blue', 'pinl', 'red']
    }
];

function writeToFile(fileName, data) {
 
}

function init() {}

init();
