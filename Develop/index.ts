import inquirer from "inquirer";
//import express from 'express';
import { closeDb, connectToDb } from "./connection.js";
import { debugPort, title } from "process";



var employee_tracker = async function () {
    const db = await connectToDb()
    inquirer.prompt([
        {
            type: 'list',
            name: 'prompt',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Log out'
            ]
        }]).then(async (answers) => {
            if (answers.prompt === 'View all departments') {
                db.query(`SELECT * FROM department`, (err, res) => {
                    if (err) throw err;
                    console.log('Viewing all departments:');
                    console.table(res.rows);
                    employee_tracker();
                })
            } else if (answers.prompt === 'View all roles') {
                db.query(`SELECT * FROM role`, (err, res) => {
                    if (err) throw err;
                    console.log('Viewing all roles:');
                    console.table(res.rows);
                    employee_tracker();
                })
            } else if (answers.prompt === 'View all employees') {
                db.query(`SELECT * FROM employee`, (err, res) => {
                    if (err) throw err;
                    console.log('Viewing all employees:');
                    console.table(res.rows);
                    employee_tracker();
                })
            } else if (answers.prompt === 'Add a department') {
                inquirer.prompt([{
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
                    db.query(`INSERT INTO department (name) VALUES ($1)`, [answers.department], (err, res) => {
                        if (err) throw err;
                        console.log(`Added ${answers.department} to the database.`)
                        employee_tracker();
                    })
                })
            } else if (answers.prompt === 'Add a role') {
                db.query(`SELECT * FROM department`, (err, res) => {
                    if (err) throw err;
                    inquirer.prompt([{
                        type: 'input',
                        name: 'title',
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
                            for (var i = 0; i < res.rows.length; i++) {
                                //@ts-ignore
                                array.push({ name: res.rows[i].name });
                            }
                            return array;
                        }
                    }]).then((answers) => {
                        for (var i = 0; i < res.rows.length; i++) {
                            if (res.rows[i].name === answers.department) {
                                var department = res.rows[i];
                            }
                        }
                        db.query(`INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`, [answers.title, answers.salary, department.id], (err, res) => {
                            if (err) throw err;
                            console.log(`Added ${answers.title} to the database.`);
                            employee_tracker();
                        })
                    })
                })
            } else if (answers.prompt === 'Add an employee') {
                let employeeData = await db.query(`SELECT id, CONCAT(first_name, last_name) AS name FROM employee`)
                db.query(`SELECT id, title FROM role`, (err, result) => {
                    if (err) throw err;
                    inquirer.prompt([{
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
                                //@ts-ignore
                                array.push(result.rows[i].title);
                            }
                            var newArray = [...new Set(array)];
                            return newArray
                        }
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        message: 'Who is the manager for this employee?',
                        choices: function () {
                            return employeeData.rows.map(element => {
                                return {
                                    name: element.name,
                                    value: element.id
                                }
                            })
                        }

                    }]).then((answers) => {
                        for (var i = 0; i < result.rows.length; i++) {
                            if (result.rows[i].title === answers.role) {
                                var role = result.rows[i];
                                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`, [answers.firstName, answers.lastName, role.id, answers.manager], (err, result) => {
                                    if (err)
                                        throw err;
                                    console.log(`${answers.firstName} ${answers.lastName} has been added to the database.`);
                                    employee_tracker();
                                })

                            }
                        }
                    })
                })
            } else if (answers.prompt === 'Update an employee role') {
                db.query(`SELECT employee.last_name, role.id AS role_id, role.title FROM employee Join role ON employee.role_id = role.id`, (err, result) => {
                    if (err) throw err;
                    inquirer.prompt([{
                        type: 'list',
                        name: 'employee',
                        message: 'Which employees role would you like to update?',
                        choices: () => {
                            const employeeArray = [...new Set(result.rows.map(row => row.last_name))]
                            return employeeArray;
                        }
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: 'What is the new role for the employee?',
                        choices: () => {
                            const roleArray = [...new Set(result.rows.map(row => row.title))]
                            return roleArray;
                        }
                    }
                    ]).then((answers) => {
                        const selectedEmployee = result.rows.find(row => row.last_name === answers.employee)
                        const newRole = result.rows.find(row => row.title === answers.role)
                        if (selectedEmployee && newRole) {
                            db.query(`UPDATE employee SET role_id = $1 WHERE last_name = $2`, [newRole.role_id, answers.employee], (err, result) => {
                                if (err) throw err;
                                console.log(`${answers.employee}'s role updated in the datatbase.`)
                                employee_tracker();
                            })
                        } else {
                            console.log('Employee or role not found.')
                        }
                    })
                })
            } else if (answers.prompt === 'Log out') {
                closeDb()
                console.log("Good-bye!");
            }
        })
}
employee_tracker()