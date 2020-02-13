const fs = require ('fs'); 
const inquirer = require ('inquirer');
const axios = require('axios');
let pdf = require('html-pdf');

const generateHTML = require("./generateHTML");


const questions = [
    { 
        type: 'input',
        message: 'What is your GitHub user name?',
        name: 'username'
    },
    {
        type: 'list',
        message: 'What is your favorite color?',
        name: 'favColor',
        choices: ['green', 'blue', 'pink', 'red']
    }
];

let favColor;

function writeToFile(fileName, data) {
    let html = fs.readFileSync("./index.html", "utf8");
    let options = {fortmat: "letter"};

    pdf.create(html, options).toFile("./user.pdf", function(err, result) {
        if (err) throw err;
        console.log("PDF file was created");
    })
};



    function init() {
    inquirer.prompt(questions)
    .then(function(userResponses) {
        // console.log(userResponses)
        const username = userResponses.username;
        favColor =  userResponses.favColor;

        const one = `https://api.github.com/users/${username}`;
        const two = `https://api.github.com/users/${username}/starred`;

        const requestOne = axios.get(one);
        const requestTwo = axios.get(two);
        
        axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];
            const data = responseOne.data;
            const stars = responseTwo.data.length
            console.log(data, stars)

                 const user = {
                        "favColor": favColor,
                        "profileImg": data.avatar_url,
                        "userName": data.name,
                        "company": data.company,
                        "location": data.location,
                        "github": data.html_url,
                        "blog": data.blog,
                        "bio": data.bio,
                        "repos": data.public_repos,
                        "followers": data.followers,
                        "following": data.following,
                        "stars": stars
                 }
                 return generateHTML(user)
        }))
            .then((function(htmlData) {
                fs.writeFile("index.html", htmlData, function(err, result) {
                    if (err) throw err;
                    return writeToFile("index.html", htmlData);
                })
            }))
            .catch(function(err) {
                console.log(err);
            });
    })
};

     
   

init();



// const fs = require ('fs'); 
// const inquirer = require ('inquirer');
// const axios = require('axios');
// let pdf = require('html-pdf');

// const generateHTML = require("./generateHTML");


// const questions = [
//     { 
//         type: 'input',
//         message: 'What is your GitHub user name?',
//         name: 'username'
//     },
//     {
//         type: 'list',
//         message: 'What is your favorite color?',
//         name: 'favColor',
//         choices: ['green', 'blue', 'pink', 'red']
//     }
// ];

// let favColor;

// function writeToFile(fileName, data) {
//     let html = fs.readFileSync("./index.html", "utf8");
//     let options = {fortmat: "letter"};

//     pdf.create(html, options).toFile("./user.pdf", function(err, result) {
//         if (err) throw err;
//         console.log("PDF file was created");
//     })
// };

//    async function getStars(username) {
//       console.log("username", username)
//         const queryUrl = `https://api.github.com/users/${username}/starred`;

//         return axios.get (queryUrl).then(function(response) {
//             const starCount = response.data.length;
//             console.log(starCount); 
//             return starCount;
//         }); 
//     };

//     function init() {
//     inquirer.prompt(questions)
//     .then(function(userResponses) {
//         // console.log(userResponses)
//         const username = userResponses.username;
//         favColor =  userResponses.favColor;
//         const queryUrl = `https://api.github.com/users/${username}`

//         getStars(username);
    
//         return axios.get (queryUrl)
//             // console.log(user);
//     })
//         .then(function(response) {
//             const data = response.data;
//             // console.log(data);
//             const user = {
//                 "favColor": favColor,
//                 "profileImg": data.avatar_url,
//                 "userName": data.name,
//                 "company": data.company,
//                 "location": data.location,
//                 "github": data.html_url,
//                 "blog": data.blog,
//                 "bio": data.bio,
//                 "repos": data.public_repos,
//                 "followers": data.followers,
//                 "following": data.following,
//                 "stars": new Promise((resolve, reject) {
//                     setTimeout(() => resolve("done!"), 1500);
//                 })
//             };
//             return generateHTML(user);
//         }) 
//         .then(function(htmlData) {
//             fs.writeFile("index.html", htmlData, function(err, result) {
//                 if (err) throw err;
//                 return writeToFile("index.html", htmlData);
//             })
//         })
//         .catch(function(err) {
//             console.log(err);
//         });
    
//     }

// init();

  
    


    