-- Drop the old Admin table since we are merging to a unified users table
DROP TABLE IF EXISTS admin CASCADE;

-- Create Session table
CREATE TABLE session (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

-- Create unified Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) NOT NULL, -- 'admin', 'faculty', 'placement_team', 'fpc', 'dean', 'vc'
    department VARCHAR(255),   -- NULL for dean, vc
    session_id INT REFERENCES session(id) ON DELETE CASCADE,
    status BOOLEAN DEFAULT TRUE,            -- active by default
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create Student Placements table for final statuses
CREATE TABLE student_placements (
    id SERIAL PRIMARY KEY,
    reg_no VARCHAR(20) NOT NULL,
    name VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mobile_no VARCHAR(20),
    session_id INT REFERENCES session(id) ON DELETE CASCADE,

    placement_status VARCHAR(50), -- 'Placed', 'Higher Study', 'Entrepreneur', 'Family Business'

    -- Placed related
    company_name VARCHAR(255),
    on_campus BOOLEAN,
    offer_type VARCHAR(10), -- 'I', 'P', 'I+P'
    stipend NUMERIC(10,2),
    package NUMERIC(10,2),

    -- Higher Study related
    higher_study_college VARCHAR(255),
    higher_study_degree VARCHAR(255),
    higher_study_country VARCHAR(255),

    -- Entrepreneur / Family Business related
    firm_name VARCHAR(255),
    firm_reg_no VARCHAR(255),
    gst_no VARCHAR(255),
    role_in_firm VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (reg_no) REFERENCES student(reg_no) ON DELETE CASCADE
);

-- Optional: Remove duplicate data from company_student.department if no longer needed, or normalize session-wise data there too if necessary

-- Clean indexes if any on admin
DROP INDEX IF EXISTS admin_email_key;

-- bool to string conversion for status
ALTER TABLE users ALTER COLUMN status TYPE VARCHAR(50);

-- Add package to company_student table
ALTER TABLE company_student ADD COLUMN package NUMERIC(10,2) DEFAULT 0;
