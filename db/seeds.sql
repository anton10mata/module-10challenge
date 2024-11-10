INSERT INTO department (name) VALUES ('Sales'), ('Engineering'), ('Finance'), ('Human Resources');

INSERT INTO role (title, salary, department_id) VALUES 
    ('Sales Lead', 75000, 1),
    ('Salesperson', 50000, 1),
    ('Engineer', 70000, 2),
    ('Accountant', 65000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Smith', 2, 1),
    ('Mark', 'Jones', 3, NULL),
    ('Sarah', 'Brown', 4, NULL);
