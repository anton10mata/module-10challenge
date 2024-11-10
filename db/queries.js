const pool = require('./db');

// View all departments
const viewDepartments = () => pool.query('SELECT * FROM department');

// View all roles with department name
const viewRoles = () => pool.query(`
    SELECT role.id, role.title, department.name AS department, role.salary
    FROM role
    JOIN department ON role.department_id = department.id
`);

// View all employees with role, department, salary, and manager
const viewEmployees = () => pool.query(`
    SELECT e.id, e.first_name, e.last_name, role.title AS job_title, department.name AS department, role.salary,
           CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    LEFT JOIN role ON e.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee m ON e.manager_id = m.id
`);

// Add a new department
const addDepartment = (name) => pool.query('INSERT INTO department (name) VALUES ($1)', [name]);

// Add a new role
const addRole = (title, salary, department_id) => pool.query(
    'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
    [title, salary, department_id]
);

// Add a new employee
const addEmployee = (first_name, last_name, role_id, manager_id) => pool.query(
    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
    [first_name, last_name, role_id, manager_id]
);

// Update an employee's role
const updateEmployeeRole = (employeeId, roleId) => pool.query(
    'UPDATE employee SET role_id = $1 WHERE id = $2',
    [roleId, employeeId]
);

// Update an employee's manager
const updateEmployeeManager = (employeeId, managerId) => pool.query(
    'UPDATE employee SET manager_id = $1 WHERE id = $2',
    [managerId, employeeId]
);

// View employees by manager
const viewEmployeesByManager = (managerId) => pool.query(`
    SELECT e.id, e.first_name, e.last_name, role.title AS job_title
    FROM employee e
    LEFT JOIN role ON e.role_id = role.id
    WHERE e.manager_id = $1
`, [managerId]);

// View employees by department
const viewEmployeesByDepartment = (departmentId) => pool.query(`
    SELECT e.id, e.first_name, e.last_name, role.title AS job_title
    FROM employee e
    LEFT JOIN role ON e.role_id = role.id
    LEFT JOIN department d ON role.department_id = d.id
    WHERE d.id = $1
`, [departmentId]);

// Delete a department and all associated roles
const deleteDepartment = async (departmentId) => {
    // First, delete roles associated with this department
    await pool.query('DELETE FROM role WHERE department_id = $1', [departmentId]);
    // Then, delete the department itself
    return pool.query('DELETE FROM department WHERE id = $1', [departmentId]);
};

// Delete a role by ID
const deleteRole = (roleId) => pool.query('DELETE FROM role WHERE id = $1', [roleId]);

// Delete an employee by ID
const deleteEmployee = (employeeId) => pool.query('DELETE FROM employee WHERE id = $1', [employeeId]);

// View total utilized budget of a department
const viewDepartmentBudget = (departmentId) => pool.query(`
    SELECT SUM(role.salary) AS total_budget
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    WHERE role.department_id = $1
`, [departmentId]);

module.exports = {
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
};
