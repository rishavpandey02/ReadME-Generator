const fs = require('fs');
const inquirer = require('inquirer');

// Function to generate the README content
function generateREADME(data) {
  return `# ${data.title}

## Description
${data.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation
${data.installation}

## Usage
${data.usage}

## License
[![License](https://img.shields.io/badge/License-${data.license}-blue.svg)](https://opensource.org/licenses/${data.license})
${data.licenseExplanation}

## Contributing
${data.contributing}


## Questions
For additional questions, please contact ${data.name} via:
- Email: ${data.email}
- GitHub: [${data.github}](https://github.com/${data.github})
`;
}

// Function to prompt user for input
function promptUser() {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of your project:',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Enter a description of your project:',
    },
    {
      type: 'input',
      name: 'installation',
      message: 'Enter installation instructions:',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Enter usage information:',
    },
    {
      type: 'input',
      name: 'contributing',
      message: 'Enter contribution guidelines:',
    },
   
    {
      type: 'list',
      name: 'license',
      message: 'Choose a license for your application:',
      choices: ['MIT', 'Apache-2.0', 'GPL-3.0', 'BSD-3-Clause', 'None'],
    },
    {
      type: 'input',
      name: 'name',
      message: 'Enter your name:',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter your email address:',
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub username:',
    },
  ]);
}

// Function to write the generated README to a file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('README.md has been generated successfully!');
    }
  });
}

// Main function to run the application
async function init() {
  try {
    const userInput = await promptUser();
    userInput.licenseExplanation =
      userInput.license !== 'None'
        ? `This application is covered under the ${userInput.license} license.`
        : 'This application does not have a license.';
    const readmeContent = generateREADME(userInput);
    writeToFile('README.md', readmeContent);
  } catch (err) {
    console.error('Error:', err);
  }
}

// Call the main function to start the application
init();
