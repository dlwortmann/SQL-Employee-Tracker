# SQL Employee Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

 * [Description](#description)
 * [Installation](#installation)
 * [Usage Information](#usage-information)
 * [Contribution Guidelines](#contribution-guidelines)
 * [Test Instructions](#test-instructions)
 * [Credits](#credits)
 * [License](#license)
 * [Questions](#questions)

## Description
This is a command-line application that can be used to manage a company's employee database. This project uses PostgresSQL to create a database for the tracker ad then seed the database with data for the created tables. Using Inquirer, this project allows a user to view tables and perform a number of actions to edit the data in the database. The application is ran using Node.js.

## Link to Walkthrough Video

[Link to Walk Through Video] (https://drive.google.com/file/d/1mZ7bsyv7yXzRlNLSVNGi5vq4hbee8u_r/view)

## Installation
1. Clone the repo onto your machine using the command "git clone" using the SSH key from the repository.
2. Open respository in VS code (download this if necessary). 
3. Install necessary packages by running "npm install". 
4. Make sure that PostgresSQL is also installed on your machine.

## Usage Information
1. Intialize SQL by running the command psql -U postgres in the terminal and log in.
2. Run the command \i db/schema.sql to create the database and tables.
3. Run the command \i db/seeds.sql to seed data into the tables.
4. Run the command npm start to initialize the application and begin selecting prompts from the list provided.

## Contribution Guidelines
I am open to collaborations. Any changes should made on a feature branch and pull requests will need to be reviewed before being added to the main branch.

## Test Instructions
Tests can be run in your own terminal.

## Credits
My tutor Charlie assisted in working out some of the syntax errors I was getting when trying to run the add role and employee commands. The Xpert Learning Assistant on BootCampSpot was able to suggest solutions to some bugs within the update employee role command.

## License
This application is covered under the [MIT License](https://opensource.org/licenses/MIT).

## Questions?
Follow the link below to see my Github account and additional respositories. Click on my email address to send me a message if you have any questions!.

[Link to Github](http://github.com/dlwortmann)

<a href="mailto:dannywortmann@gmail.com">dannywortmann@gmail.com</a>

