-- =============================================================
-- Exercise2_ErrorHandling.sql
-- PL/SQL Programming - Exercise 2: Error Handling
-- =============================================================
-- Run schema_setup.sql before executing this file.
-- =============================================================

SET SERVEROUTPUT ON SIZE UNLIMITED;

-- =============================================================
-- SCENARIO 1:
-- SafeTransferFunds — transfers funds between two accounts.
-- Rolls back and logs an error if anything goes wrong
-- (e.g., insufficient funds).
-- =============================================================

CREATE OR REPLACE PROCEDURE SafeTransferFunds (
    p_from_account  IN  Accounts.AccountID%TYPE,
    p_to_account    IN  Accounts.AccountID%TYPE,
    p_amount        IN  NUMBER
)
AS
    v_from_balance  Accounts.Balance%TYPE;
    v_to_balance    Accounts.Balance%TYPE;
    e_insufficient  EXCEPTION;
    e_invalid_acct  EXCEPTION;

BEGIN
    DBMS_OUTPUT.PUT_LINE('-- SafeTransferFunds --');
    DBMS_OUTPUT.PUT_LINE('From Account : ' || p_from_account);
    DBMS_OUTPUT.PUT_LINE('To Account   : ' || p_to_account);
    DBMS_OUTPUT.PUT_LINE('Amount       : $' || p_amount);

    -- Validate transfer amount
    IF p_amount <= 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Transfer amount must be positive.');
    END IF;

    -- Lock and fetch the source account balance
    BEGIN
        SELECT Balance
        INTO   v_from_balance
        FROM   Accounts
        WHERE  AccountID = p_from_account
        FOR UPDATE;                             -- Lock row during transaction
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE e_invalid_acct;
    END;

    -- Check for sufficient funds
    IF v_from_balance < p_amount THEN
        RAISE e_insufficient;
    END IF;

    -- Lock and fetch destination account
    BEGIN
        SELECT Balance
        INTO   v_to_balance
        FROM   Accounts
        WHERE  AccountID = p_to_account
        FOR UPDATE;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE e_invalid_acct;
    END;

    -- Perform the transfer
    UPDATE Accounts SET Balance = Balance - p_amount WHERE AccountID = p_from_account;
    UPDATE Accounts SET Balance = Balance + p_amount WHERE AccountID = p_to_account;

    COMMIT;
    DBMS_OUTPUT.PUT_LINE('SUCCESS: Transfer of $' || p_amount || ' completed.');

EXCEPTION
    WHEN e_insufficient THEN
        ROLLBACK;
        INSERT INTO ErrorLog (Procedure, Message)
        VALUES ('SafeTransferFunds',
                'Insufficient funds in Account ' || p_from_account ||
                '. Available: $' || v_from_balance || ', Requested: $' || p_amount);
        COMMIT;
        DBMS_OUTPUT.PUT_LINE('ERROR: Insufficient funds. Transaction rolled back.');

    WHEN e_invalid_acct THEN
        ROLLBACK;
        INSERT INTO ErrorLog (Procedure, Message)
        VALUES ('SafeTransferFunds',
                'Invalid account ID: ' || p_from_account || ' or ' || p_to_account);
        COMMIT;
        DBMS_OUTPUT.PUT_LINE('ERROR: One or both account IDs are invalid. Transaction rolled back.');

    WHEN OTHERS THEN
        ROLLBACK;
        INSERT INTO ErrorLog (Procedure, Message)
        VALUES ('SafeTransferFunds', 'Unexpected error: ' || SQLERRM);
        COMMIT;
        DBMS_OUTPUT.PUT_LINE('ERROR: ' || SQLERRM || '. Transaction rolled back.');
END SafeTransferFunds;
/

-- Test Scenario 1
BEGIN
    DBMS_OUTPUT.PUT_LINE('==============================================');
    DBMS_OUTPUT.PUT_LINE(' Scenario 1: SafeTransferFunds Tests');
    DBMS_OUTPUT.PUT_LINE('==============================================');

    -- Test A: Valid transfer
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('[Test A] Valid transfer: $500 from 2001 to 2002');
    SafeTransferFunds(2001, 2002, 500);

    -- Test B: Insufficient funds
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('[Test B] Insufficient funds: $999999 from 2007 to 2001');
    SafeTransferFunds(2007, 2001, 999999);

    -- Test C: Invalid account
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('[Test C] Invalid account: Account 9999');
    SafeTransferFunds(9999, 2001, 100);

    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('Error Log:');
    FOR rec IN (SELECT * FROM ErrorLog ORDER BY LogTime) LOOP
        DBMS_OUTPUT.PUT_LINE('  [' || rec.LogID || '] ' || rec.Procedure || ': ' || rec.Message);
    END LOOP;
    DBMS_OUTPUT.PUT_LINE('==============================================');
END;
/


-- =============================================================
-- SCENARIO 2:
-- UpdateSalary — increases an employee's salary by a given %.
-- If employee ID does not exist, logs the error gracefully.
-- =============================================================

CREATE OR REPLACE PROCEDURE UpdateSalary (
    p_employee_id   IN  Employees.EmployeeID%TYPE,
    p_percentage    IN  NUMBER
)
AS
    v_current_salary  Employees.Salary%TYPE;
    v_new_salary      Employees.Salary%TYPE;

BEGIN
    DBMS_OUTPUT.PUT_LINE('-- UpdateSalary --');

    -- Validate percentage
    IF p_percentage <= 0 THEN
        RAISE_APPLICATION_ERROR(-20002, 'Percentage must be a positive number.');
    END IF;

    -- Fetch current salary — raises NO_DATA_FOUND if employee missing
    SELECT Salary
    INTO   v_current_salary
    FROM   Employees
    WHERE  EmployeeID = p_employee_id;

    v_new_salary := v_current_salary * (1 + p_percentage / 100);

    UPDATE Employees
    SET    Salary = v_new_salary
    WHERE  EmployeeID = p_employee_id;

    COMMIT;
    DBMS_OUTPUT.PUT_LINE(
        'SUCCESS: Employee ' || p_employee_id ||
        ' salary updated from $' || TO_CHAR(v_current_salary, 'FM999,999.00') ||
        ' to $' || TO_CHAR(v_new_salary, 'FM999,999.00') ||
        ' (+' || p_percentage || '%)'
    );

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        INSERT INTO ErrorLog (Procedure, Message)
        VALUES ('UpdateSalary',
                'Employee ID ' || p_employee_id || ' not found. Salary update aborted.');
        COMMIT;
        DBMS_OUTPUT.PUT_LINE('ERROR: Employee ID ' || p_employee_id || ' does not exist.');

    WHEN OTHERS THEN
        ROLLBACK;
        INSERT INTO ErrorLog (Procedure, Message)
        VALUES ('UpdateSalary', 'Unexpected error for Employee ' || p_employee_id || ': ' || SQLERRM);
        COMMIT;
        DBMS_OUTPUT.PUT_LINE('ERROR: ' || SQLERRM);
END UpdateSalary;
/

-- Test Scenario 2
BEGIN
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('==============================================');
    DBMS_OUTPUT.PUT_LINE(' Scenario 2: UpdateSalary Tests');
    DBMS_OUTPUT.PUT_LINE('==============================================');

    -- Test A: Valid employee
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('[Test A] Valid employee ID 4001 - 10% raise');
    UpdateSalary(4001, 10);

    -- Test B: Employee does not exist
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('[Test B] Non-existent employee ID 9999');
    UpdateSalary(9999, 10);

    DBMS_OUTPUT.PUT_LINE('==============================================');
END;
/


-- =============================================================
-- SCENARIO 3:
-- AddNewCustomer — inserts a new customer.
-- If CustomerID already exists, logs the error and skips insert.
-- =============================================================

CREATE OR REPLACE PROCEDURE AddNewCustomer (
    p_customer_id  IN  Customers.CustomerID%TYPE,
    p_name         IN  Customers.Name%TYPE,
    p_dob          IN  Customers.DOB%TYPE,
    p_balance      IN  Customers.Balance%TYPE DEFAULT 0
)
AS
    v_existing  NUMBER;

BEGIN
    DBMS_OUTPUT.PUT_LINE('-- AddNewCustomer --');
    DBMS_OUTPUT.PUT_LINE('Customer ID: ' || p_customer_id || ' | Name: ' || p_name);

    -- Check if customer already exists
    SELECT COUNT(*)
    INTO   v_existing
    FROM   Customers
    WHERE  CustomerID = p_customer_id;

    IF v_existing > 0 THEN
        -- Duplicate found — log and abort
        INSERT INTO ErrorLog (Procedure, Message)
        VALUES ('AddNewCustomer',
                'Duplicate CustomerID ' || p_customer_id ||
                '. Customer "' || p_name || '" was NOT inserted.');
        COMMIT;
        DBMS_OUTPUT.PUT_LINE(
            'ERROR: Customer ID ' || p_customer_id || ' already exists. Insertion prevented.'
        );
    ELSE
        INSERT INTO Customers (CustomerID, Name, DOB, Balance, IsVIP)
        VALUES (p_customer_id, p_name, p_dob, p_balance, 'FALSE');

        COMMIT;
        DBMS_OUTPUT.PUT_LINE('SUCCESS: Customer "' || p_name || '" added successfully.');
    END IF;

EXCEPTION
    WHEN DUP_VAL_ON_INDEX THEN
        -- Safety net: catches PK violation if concurrent insert slips through
        ROLLBACK;
        INSERT INTO ErrorLog (Procedure, Message)
        VALUES ('AddNewCustomer',
                'DUP_VAL_ON_INDEX: CustomerID ' || p_customer_id || ' already exists.');
        COMMIT;
        DBMS_OUTPUT.PUT_LINE('ERROR: Duplicate primary key. Insertion rolled back.');

    WHEN OTHERS THEN
        ROLLBACK;
        INSERT INTO ErrorLog (Procedure, Message)
        VALUES ('AddNewCustomer', 'Unexpected error: ' || SQLERRM);
        COMMIT;
        DBMS_OUTPUT.PUT_LINE('ERROR: ' || SQLERRM);
END AddNewCustomer;
/

-- Test Scenario 3
BEGIN
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('==============================================');
    DBMS_OUTPUT.PUT_LINE(' Scenario 3: AddNewCustomer Tests');
    DBMS_OUTPUT.PUT_LINE('==============================================');

    -- Test A: New customer (should succeed)
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('[Test A] New customer ID 1009');
    AddNewCustomer(1009, 'Oliver Stone', DATE '1992-06-10', 2500.00);

    -- Test B: Duplicate customer (should log error)
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('[Test B] Duplicate customer ID 1001');
    AddNewCustomer(1001, 'Duplicate Alice', DATE '1980-01-01', 100.00);

    -- Test C: Another new customer
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('[Test C] New customer ID 1010');
    AddNewCustomer(1010, 'Diana Prince', DATE '1988-12-20', 7500.00);

    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('Full Error Log:');
    FOR rec IN (SELECT * FROM ErrorLog ORDER BY LogTime) LOOP
        DBMS_OUTPUT.PUT_LINE('  [' || rec.LogID || '] ' || rec.Procedure || ': ' || rec.Message);
    END LOOP;
    DBMS_OUTPUT.PUT_LINE('==============================================');
END;
/
