-- =============================================================
-- schema_setup.sql
-- PL/SQL Programming - Bank Database Schema & Sample Data
--
-- Run this script FIRST before executing any exercise files.
-- Compatible with Oracle Database.
-- =============================================================

-- ── Drop tables if they already exist (clean slate) ──────────
BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Loans CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/
BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Accounts CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/
BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Customers CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/
BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Employees CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/
BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE ErrorLog CASCADE CONSTRAINTS';
EXCEPTION WHEN OTHERS THEN NULL;
END;
/

-- ── CREATE: Customers ─────────────────────────────────────────
CREATE TABLE Customers (
    CustomerID  NUMBER(10)      PRIMARY KEY,
    Name        VARCHAR2(100)   NOT NULL,
    DOB         DATE            NOT NULL,          -- Date of Birth (used to calculate age)
    Balance     NUMBER(15, 2)   DEFAULT 0,
    IsVIP       VARCHAR2(5)     DEFAULT 'FALSE'    -- 'TRUE' or 'FALSE'
);

-- ── CREATE: Accounts ──────────────────────────────────────────
CREATE TABLE Accounts (
    AccountID   NUMBER(10)      PRIMARY KEY,
    CustomerID  NUMBER(10)      REFERENCES Customers(CustomerID),
    AccountType VARCHAR2(20)    NOT NULL,          -- 'Savings', 'Checking'
    Balance     NUMBER(15, 2)   DEFAULT 0
);

-- ── CREATE: Loans ─────────────────────────────────────────────
CREATE TABLE Loans (
    LoanID          NUMBER(10)      PRIMARY KEY,
    CustomerID      NUMBER(10)      REFERENCES Customers(CustomerID),
    LoanAmount      NUMBER(15, 2)   NOT NULL,
    InterestRate    NUMBER(5, 2)    NOT NULL,       -- e.g. 8.50 means 8.5%
    DueDate         DATE            NOT NULL
);

-- ── CREATE: Employees ─────────────────────────────────────────
CREATE TABLE Employees (
    EmployeeID  NUMBER(10)      PRIMARY KEY,
    Name        VARCHAR2(100)   NOT NULL,
    Department  VARCHAR2(50)    NOT NULL,
    Salary      NUMBER(12, 2)   NOT NULL
);

-- ── CREATE: ErrorLog (for Exercise 2 error handling) ─────────
CREATE TABLE ErrorLog (
    LogID       NUMBER(10)      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    LogTime     TIMESTAMP       DEFAULT SYSTIMESTAMP,
    Procedure   VARCHAR2(100),
    Message     VARCHAR2(500)
);

-- =============================================================
-- SAMPLE DATA
-- =============================================================

-- Customers (mix of ages: some above 60, some below)
INSERT INTO Customers VALUES (1001, 'Alice Johnson',  DATE '1955-03-15', 15000.00, 'FALSE');  -- Age ~71, Balance > 10k
INSERT INTO Customers VALUES (1002, 'Bob Smith',      DATE '1990-07-22',  8500.00, 'FALSE');  -- Age ~35
INSERT INTO Customers VALUES (1003, 'Carol White',    DATE '1948-11-30', 22000.00, 'FALSE');  -- Age ~77, Balance > 10k
INSERT INTO Customers VALUES (1004, 'David Brown',    DATE '1985-05-10',  3200.00, 'FALSE');  -- Age ~40
INSERT INTO Customers VALUES (1005, 'Eva Green',      DATE '1950-08-25', 11500.00, 'FALSE');  -- Age ~75, Balance > 10k
INSERT INTO Customers VALUES (1006, 'Frank Lee',      DATE '2000-01-12',   450.00, 'FALSE');  -- Age ~25
INSERT INTO Customers VALUES (1007, 'Grace Hall',     DATE '1960-09-05',  9800.00, 'FALSE');  -- Age ~64
INSERT INTO Customers VALUES (1008, 'Henry Clark',    DATE '1975-04-18',  5500.00, 'FALSE');  -- Age ~50

-- Accounts
INSERT INTO Accounts VALUES (2001, 1001, 'Savings',  15000.00);
INSERT INTO Accounts VALUES (2002, 1002, 'Savings',   8500.00);
INSERT INTO Accounts VALUES (2003, 1003, 'Checking', 22000.00);
INSERT INTO Accounts VALUES (2004, 1003, 'Savings',   5000.00);
INSERT INTO Accounts VALUES (2005, 1004, 'Savings',   3200.00);
INSERT INTO Accounts VALUES (2006, 1005, 'Savings',  11500.00);
INSERT INTO Accounts VALUES (2007, 1006, 'Checking',    450.00);
INSERT INTO Accounts VALUES (2008, 1007, 'Savings',   9800.00);
INSERT INTO Accounts VALUES (2009, 1008, 'Savings',   5500.00);

-- Loans (some due within 30 days of SYSDATE, some not)
INSERT INTO Loans VALUES (3001, 1001, 50000.00,  8.50, SYSDATE + 10);  -- Due in 10 days
INSERT INTO Loans VALUES (3002, 1002, 20000.00,  9.00, SYSDATE + 25);  -- Due in 25 days
INSERT INTO Loans VALUES (3003, 1003, 75000.00,  7.75, SYSDATE + 5);   -- Due in 5 days
INSERT INTO Loans VALUES (3004, 1004, 15000.00, 10.00, SYSDATE + 60);  -- Due in 60 days (not urgent)
INSERT INTO Loans VALUES (3005, 1005, 30000.00,  8.00, SYSDATE + 15);  -- Due in 15 days
INSERT INTO Loans VALUES (3006, 1007, 10000.00,  9.50, SYSDATE + 90);  -- Due in 90 days (not urgent)

-- Employees
INSERT INTO Employees VALUES (4001, 'John Adams',    'IT',      65000.00);
INSERT INTO Employees VALUES (4002, 'Sarah Connor',  'IT',      72000.00);
INSERT INTO Employees VALUES (4003, 'Mike Torres',   'HR',      55000.00);
INSERT INTO Employees VALUES (4004, 'Lisa Ray',      'HR',      58000.00);
INSERT INTO Employees VALUES (4005, 'Tom Wright',    'Finance', 80000.00);
INSERT INTO Employees VALUES (4006, 'Nancy Drew',    'Finance', 77000.00);

COMMIT;

-- Verify data
SELECT 'Customers' AS TableName, COUNT(*) AS Rows FROM Customers UNION ALL
SELECT 'Accounts',  COUNT(*) FROM Accounts  UNION ALL
SELECT 'Loans',     COUNT(*) FROM Loans     UNION ALL
SELECT 'Employees', COUNT(*) FROM Employees;
