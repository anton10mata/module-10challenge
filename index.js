const inquirer = require('inquirer');
const { viewDepartments, addDepartment, viewRoles, addRole, addEmployee, viewEmployees, viewEmployeesByManager } = require('./db/queries');

const mainMenu = () => {
    inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'Choose an action:',
        choices: [
            'View All Departments',
            'Add Department',
            'View All Roles',
            'Add Role',
            'View All Employees',
            'Add Employee',
            'View Employees by Manager',
            'Exit'
        ]
    }).then(answer => {
        switch (answer.action) {
            case 'View All Departments':
                viewDepartments().then(res => {
                    console.table(res.rows);
                    mainMenu();
                });
                break;
            // Similar cases for each function
            case 'Exit':
                pool.end();
                break;
        }
    });
};

mainMenu();
