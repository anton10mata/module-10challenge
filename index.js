const inquirer = require('inquirer');
const {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    viewEmployeesByManager,
    viewEmployeesByDepartment,
    deleteDepartment,
    deleteRole,
    deleteEmployee,
    viewDepartmentBudget
} = require('./db/queries');

function mainMenu() {
    inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'Choose an action:',
        choices: [
            'View All Departments',
            'Add Department',
            'Delete Department',
            'View All Roles',
            'Add Role',
            'Delete Role',
            'View All Employees',
            'Add Employee',
            'Update Employee Role',
            'Update Employee Manager',
            'View Employees by Manager',
            'View Employees by Department',
            'View Department Budget',
            'Delete Employee',
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
            case 'Add Department':
                inquirer.prompt({
                    type: 'input',
                    name: 'name',
                    message: 'Enter the department name:'
                }).then(departmentAnswer => {
                    addDepartment(departmentAnswer.name).then(() => {
                        console.log('Department added successfully!');
                        mainMenu();
                    });
                });
                break;
            case 'Delete Department':
                inquirer.prompt({
                    type: 'input',
                    name: 'id',
                    message: 'Enter the department ID to delete:'
                }).then(answer => {
                    deleteDepartment(answer.id).then(() => {
                        console.log('Department deleted successfully!');
                        mainMenu();
                    });
                });
                break;
            case 'View All Roles':
                viewRoles().then(res => {
                    console.table(res.rows);
                    mainMenu();
                });
                break;
            case 'Add Role':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'title',
                        message: 'Enter the role title:'
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'Enter the role salary:'
                    },
                    {
                        type: 'input',
                        name: 'department_id',
                        message: 'Enter the department ID for this role:'
                    }
                ]).then(roleAnswers => {
                    addRole(roleAnswers.title, roleAnswers.salary, roleAnswers.department_id).then(() => {
                        console.log('Role added successfully!');
                        mainMenu();
                    });
                });
                break;
            case 'Delete Role':
                inquirer.prompt({
                    type: 'input',
                    name: 'id',
                    message: 'Enter the role ID to delete:'
                }).then(answer => {
                    deleteRole(answer.id).then(() => {
                        console.log('Role deleted successfully!');
                        mainMenu();
                    });
                });
                break;
            case 'View All Employees':
                viewEmployees().then(res => {
                    console.table(res.rows);
                    mainMenu();
                });
                break;
            case 'Add Employee':
                promptAddEmployee();
                break;
            case 'Update Employee Role':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'employeeId',
                        message: 'Enter the employee ID:'
                    },
                    {
                        type: 'input',
                        name: 'roleId',
                        message: 'Enter the new role ID:'
                    }
                ]).then(answers => {
                    updateEmployeeRole(answers.employeeId, answers.roleId).then(() => {
                        console.log('Employee role updated successfully!');
                        mainMenu();
                    });
                });
                break;
            case 'Update Employee Manager':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'employeeId',
                        message: 'Enter the employee ID:'
                    },
                    {
                        type: 'input',
                        name: 'managerId',
                        message: 'Enter the new manager ID:'
                    }
                ]).then(answers => {
                    updateEmployeeManager(answers.employeeId, answers.managerId).then(() => {
                        console.log('Employee manager updated successfully!');
                        mainMenu();
                    });
                });
                break;
            case 'View Employees by Manager':
                inquirer.prompt({
                    type: 'input',
                    name: 'managerId',
                    message: 'Enter the manager ID to view their employees:'
                }).then(answer => {
                    viewEmployeesByManager(answer.managerId).then(res => {
                        console.table(res.rows);
                        mainMenu();
                    });
                });
                break;
            case 'View Employees by Department':
                inquirer.prompt({
                    type: 'input',
                    name: 'departmentId',
                    message: 'Enter the department ID to view employees:'
                }).then(answer => {
                    viewEmployeesByDepartment(answer.departmentId).then(res => {
                        console.table(res.rows);
                        mainMenu();
                    });
                });
                break;
            case 'View Department Budget':
                inquirer.prompt({
                    type: 'input',
                    name: 'departmentId',
                    message: 'Enter the department ID to view the budget:'
                }).then(answer => {
                    viewDepartmentBudget(answer.departmentId).then(res => {
                        console.table(res.rows);
                        mainMenu();
                    });
                });
                break;
            case 'Delete Employee':
                inquirer.prompt({
                    type: 'input',
                    name: 'id',
                    message: 'Enter the employee ID to delete:'
                }).then(answer => {
                    deleteEmployee(answer.id).then(() => {
                        console.log('Employee deleted successfully!');
                        mainMenu();
                    });
                });
                break;
            case 'Exit':
                console.log("Goodbye!");
                process.exit();
                break;
        }
    });
}

// Add Employee with dynamic role choices
function promptAddEmployee() {
    viewRoles().then(res => {
        const roleChoices = res.rows.map(role => ({
            name: role.title,
            value: role.id
        }));

        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Enter the employee’s first name:'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Enter the employee’s last name:'
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'Choose the role for this employee:',
                choices: roleChoices
            },
            {
                type: 'input',
                name: 'manager_id',
                message: 'Enter the manager ID for this employee (or leave blank):',
                default: null
            }
        ]).then(employeeAnswers => {
            addEmployee(
                employeeAnswers.first_name,
                employeeAnswers.last_name,
                employeeAnswers.role_id,
                employeeAnswers.manager_id || null
            ).then(() => {
                console.log('Employee added successfully!');
                mainMenu();
            });
        });
    });
}

mainMenu();
