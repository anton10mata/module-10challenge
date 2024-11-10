const pool = require('./db');

// View all departments
const viewDepartments = () => pool.query('SELECT * FROM department');

// View all roles
const viewRoles = () => {
    return pool.query(`
        SELECT role.id, role.title, department.name AS department, role.salary
        FROM role
        JOIN department ON role.department_id = department.id
    `);
};

// View all employees with manager and department info
const viewEmployees = () => {
    return pool.query(`
        SELECT e.id, e.first_name, e.last_name, role.title AS job_title, department.name AS department, role.salary, 
               CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        LEFT JOIN role ON e.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee m ON e.manager_id = m.id
    `);
};

// Add department, role, employee, and update role (simplified, more functions may be added similarly)
const addDepartment = (name) => pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
const addRole = (title, salary, department_id) => pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
const addEmployee = (first_name, last_name, role_id, manager_id) => pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);

// Bonus functions (e.g., delete, view by manager, view by department)
const viewEmployeesByManager = (manager_id) => pool.query(`SELECT * FROM employee WHERE manager_id = $1`, [manager_id]);

module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    viewEmployeesByManager,
};
