-- Create the Department table
CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

-- Create the Faculty table
CREATE TABLE faculty (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    dept VARCHAR(255) NOT NULL,
    FOREIGN KEY (dept) REFERENCES department(name) ON DELETE CASCADE
);

-- Create the Admin table (HODs)
CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    dept VARCHAR(255) NOT NULL,
    FOREIGN KEY (dept) REFERENCES department(name) ON DELETE CASCADE
);

-- Create the Company table
CREATE TABLE company (
    name VARCHAR(255) PRIMARY KEY
);

-- Create the Student table
CREATE TABLE student (
    reg_no VARCHAR(20) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    mail VARCHAR(255) UNIQUE NOT NULL,
    dept VARCHAR(255) NOT NULL,
    company_name VARCHAR(255),
    stipend NUMERIC(10,2),
    ppo_i BOOLEAN DEFAULT FALSE,
    ppo BOOLEAN DEFAULT FALSE,
    i BOOLEAN DEFAULT FALSE,
    
    FOREIGN KEY (company_name) REFERENCES company(name) ON DELETE SET NULL,
    FOREIGN KEY (dept) REFERENCES department(name) ON DELETE CASCADE
);

-- Mapping table for students selected by companies (for tracking student placement)
CREATE TABLE company_student (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    reg_no VARCHAR(20) NOT NULL,
    student_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    stipend NUMERIC(10,2),
    ppo_i BOOLEAN DEFAULT FALSE,
    ppo BOOLEAN DEFAULT FALSE,
    i BOOLEAN DEFAULT FALSE,

    FOREIGN KEY (company_name) REFERENCES company(name) ON DELETE CASCADE,
    FOREIGN KEY (reg_no) REFERENCES student(reg_no) ON DELETE CASCADE
);


ALTER TABLE student RENAME COLUMN mail TO email;
ALTER TABLE student RENAME COLUMN dept TO department;

-- Correct column names (separate columns for each company)
ALTER TABLE student ADD COLUMN company_1 VARCHAR(255);
ALTER TABLE student ADD COLUMN company_2 VARCHAR(255);
ALTER TABLE student ADD COLUMN company_3 VARCHAR(255);


--adding department to company_student table
ALTER TABLE company_student ADD COLUMN department VARCHAR(100);
UPDATE company_student
SET department = s.department
FROM student s
WHERE company_student.reg_no = s.reg_no;
ALTER TABLE company_student ALTER COLUMN department SET NOT NULL;




