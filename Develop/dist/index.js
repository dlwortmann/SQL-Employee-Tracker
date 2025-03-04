import inquirer from "inquirer";
//import db from "/dist/connection.js";
//import express from 'express';
import connectToDb from "./connection.js";
var employee_tracker = async function () {
    const db = await connectToDb();
    inquirer.prompt([
        {
            type: 'list',
            name: 'prompt',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Log out'
            ]
        }
    ]).then((answers) => {
        if (answers.prompt === 'View all departments') {
            db.query(`SELECT * FROM departments`, (err, result) => {
                if (err)
                    throw err;
                console.log('Viewing all departments:');
                console.table(result);
                employee_tracker();
            });
        }
        else if (answers.prompt === 'View all roles') {
            db.query(`SELECT * FROM roles`, (err, result) => {
                if (err)
                    throw err;
                console.log('Viewing all roles:');
                console.table(result);
                employee_tracker();
            });
        }
        else if (answers.prompt === 'View all employees') {
            db.query(`SELECT * FROM employees`, (err, result) => {
                if (err)
                    throw err;
                console.log('Viewing all employees:');
                console.table(result);
                employee_tracker();
            });
        }
        else if (answers.prompt === 'Add a department') {
            inquirer.prompt([{
                    type: 'input',
                    name: 'department',
                    message: 'What department would you like to add?',
                    validate: addedDepartment => {
                        if (addedDepartment) {
                            return true;
                        }
                        else {
                            console.log('Please input a department.');
                            return false;
                        }
                    }
                }]).then((answers) => {
                db.query(`INSERT INTO departments (name) VALUES (?)`, [answers.department], (err, result) => {
                    if (err)
                        throw err;
                    console.log(`Added ${answers.department} to the database.`);
                    employee_tracker();
                });
            });
        }
        else if (answers.prompt === 'Add a role') {
            db.query(`SELECT * FROM departments`, (err, result) => {
                if (err)
                    throw err;
                inquirer.prompt([{
                        type: 'input',
                        name: 'role',
                        message: 'What role would you like to add?',
                        validate: addedRole => {
                            if (addedRole) {
                                return true;
                            }
                            else {
                                console.log('Please input a role.');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'Please input the salary',
                        validate: addedSalary => {
                            if (addedSalary) {
                                return true;
                            }
                            else {
                                console.log('Please input a salary for the role.');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'list',
                        name: 'department',
                        message: 'Which department does this role belong to?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.rows.length; i++) {
                                //@ts-ignore
                                array.push({ name: result.rows[i].name });
                            }
                            return array;
                        }
                    }]).then((answers) => {
                    for (var i = 0; i < result.rows.length; i++) {
                        if (result[i].name === answers.department) {
                            var department = result[i];
                        }
                    }
                    db.query(`INSERT INTO roles (title, salary, department_id) VALUES ( ?, ?, ?)`, [answers.role, answers.salary, department.id], (err, result) => {
                        if (err)
                            throw err;
                        console.log(`Added ${answers.role} to the database.`);
                        employee_tracker();
                    });
                });
            });
        } else if (answers.prompt === 'Add an employee') {
            db.query(`SELECT * FROM employees, roles`, (err, result) => {
                if (err) throw err;
                inquirer.prompt ([{
                    type: 'input',
                    name: 'firstName',
                    message: 'What is the new employees first name?',
                    validate: addedFirstName => {
                        if (addedFirstName) {
                            return true;
                        } else {
                            console.log('Please input a first name.');
                            return false;
                        }
                    }
                },
                { 
                    type: 'input',
                    name: 'lastName',
                    message: 'What is the new employees last name?',
                    validate: addedLastName => {
                        if (addedLastName) {
                            return true;
                        } else {
                            console.log('Please input a last name.');
                            return false;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'What is the new employees role?',
                    choices: () => {
                        var array = [];
                        for (var i = 0; i < result.rows.length; i++) {
                            array.push(result.rows[i].title);
                        }
                        var newArray = [...new Set(array)];
                        return newArray
                    }
                },
                {
                    type: 'input',
                    name: 'manager',
                    message: 'Who is the manager for this employee?',
                    validate: addedManager => {
                        if (addedManager) {
                            return true;
                        } else {
                            console.log('Please add employee manager.');
                            return false;
                        }
                    }
                }]).then((answers) => {
                    for (var i = 0; i < result.rows.length; i++) {
                        if (result[i].title === answers.role) {
                            var role = result[i];
                        }
                    }
                    db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.firstName, answers.lastName, role.id, answers.manager.id], (err, result) => {
                        if (err) throw err;
                        console.log(`${answers.firstName} ${answers.lastName} has been added to the database.`)
                        employee_tracker();
                    })
                })
            })
        } else if (answers.prompt === 'Update an employee role') {
            db.query(`SELECT * FROM employees, roles`, (err, result) => {
                if (err) throw err;
                
            })
        }
    });
};
employee_tracker();
