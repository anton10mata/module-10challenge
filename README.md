# Module 10 Challenge: Employee Tracker Application


## Description
The Employee Tracker Application is a command-line interface (CLI) tool that allows business owners to view and manage departments, roles, and employees within a company. It provides a comprehensive way to organize a company's structure and budget using a PostgreSQL database.

## Table of Contents
- [Walkthrough Video](#walkthroughvideo)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

# Walkthrough Video

[Click here to view the walkthrough video](https://youtu.be/YU5lxXbEa3k)

# Installation

## 1. Clone the repository:

git clone https://github.com/anton10mata/module-10challenge.git

cd module-10challenge

## 2. Install dependencies:

npm install

## 3. Set up the PostgreSQL database:

- Open PostgreSQL and create a new database:

CREATE DATABASE company_db;

- Run the schema and seeds files:

psql -U postgres -d company_db -f path/to/db/schema.sql

psql -U postgres -d company_db -f path/to/db/seeds.sql

## 4. Configure the database connection in db/db.js:

const pool = new Pool({

    user: 'your_username',
    host: 'localhost',
    database: 'company_db',
    password: 'your_password',
    port: 5432,
});

## Usage

## 1. Start the application:

node index.js

## 2. Navigate through the menu to:

- View, add, update, and delete departments, roles, and employees.
- View employees by manager and department.
- Calculate the department budget.

# License
This project is licensed under the MIT license.

# Contributing
Fork the repo, create a feature branch, and submit a pull request.

# Questions
If you have any questions, feel free to reach out:

GitHub: antonio10mata
Email: antoniomatallc@gmail.com

