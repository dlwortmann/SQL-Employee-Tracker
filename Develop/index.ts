import inquirer from "inquirer";
//import db from "/dist/connection.js";
//import express from 'express';
import connectToDb from "./connection.js";



var employee_tracker =  async function () {
    const db =  await connectToDb()
    inquirer.prompt ([
        {
          type: 'list',
          name: 'prompt',
          message: 'What would you like to do?',
          choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Log out'
          ]
    }]).then((answers) => {
        if (answers.prompt === 'View all departments') {
            db.query(`SELECT * FROM departments`, (err, result) => {
                if (err) throw err;
                console.log('Viewing all departments:');
                console.table(result);
                employee_tracker();
            })
        } else if (answers.prompt === 'View all roles') {
            db.query(`SELECT * FROM roles`, (err, result) => {
                if (err) throw err;
                console.log('Viewing all roles:');
                console.table(result);
                employee_tracker();
        })
        } else if (answers.prompt === 'View all employees') {
            db.query(`SELECT * FROM employees`, (err, result) => {
                if (err) throw err;
                console.log('Viewing all employees:');
                console.table(result);
                employee_tracker();
        })
        } else if (answers.prompt === 'Add a department') {
            inquirer.prompt ([{
                type: 'input',
                name: 'department',
                message: 'What department would you like to add?',
                validate: addedDepartment => {
                    if (addedDepartment) {
                        return true;
                    } else {
                        console.log('Please input a department.');
                        return false;
                    }
                }
            }]).then((answers) => {
                db.query(`INSERT INTO departments (name) VALUES (?)`, [answers.department], (err, result) => {
                    if (err) throw err;
                    console.log(`Added ${answers.department} to the database.`)
                    employee_tracker();
                })
            })
        } else if (answers.prompt === 'Add a role') {
            db.query(`SELECT * FROM departments`, (err, result) => {
                if (err) throw err;
                inquirer.prompt([{
                    type: 'input',
                    name: 'role',
                    message: 'What role would you like to add?',
                    validate: addedRole => {
                        if (addedRole) {
                            return true;
                        } else {
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
                        } else {
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
                    } db.query(`INSERT INTO role (title, salary, department_id) VALUES ( ?, ?, ?)`, [answers.role, answers.salary, department.id], (err, result) => {
                        if (err) throw err;
                        console.log(`Added ${answers.role} to the database.`);
                        employee_tracker();
                    })
                })
            })
        } else {
            console.log("test")
        }
    })
}
employee_tracker()