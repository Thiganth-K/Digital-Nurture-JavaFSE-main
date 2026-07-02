-- =============================================================
-- Exercise3_StoredProcedures.sql
-- PL/SQL Programming - Exercise 3: Stored Procedures
-- =============================================================
-- Run schema_setup.sql before executing this file.
-- =============================================================

SET SERVEROUTPUT ON SIZE UNLIMITED;

-- =============================================================
-- SCENARIO 1:
-- ProcessMonthlyInterest — applies 1% interest to all Savings
-- account balances.
-- =============================================================

CREATE OR REPLACE PROCEDURE ProcessMonthlyInterest
AS
    v_interest_rate  CONSTANT NUMBER := 0.01;   -- 1% monthly interest
    v_updated_count  NUMBER := 0;
    v_total_interest NUMBER := 0;
    v_interest       NUMBER;

    CURSOR cur_savings IS
        SELECT AccountID, Balance
        FROM   Accounts
        WHERE  AccountType = 'Savings'
        FOR UPDATE;                             -- Lock rows for update

BEGIN
    DBMS_OUTPUT.PUT_LINE('==============================================');
    DBMS_OUTPUT.PUT_LINE(' Scenario 1: ProcessMonthlyInterest');
    DBMS_OUTPUT.PUT_LINE('==============================================');
    DBMS_OUTPUT.PUT_LINE('Interest Rate: ' || (v_interest_rate * 100) || '%');
    DBMS_OUTPUT.PUT_LINE('');

    FOR rec IN cur_savings LOOP
        v_interest := ROUND(rec.Balance * v_interest_rate, 2);

        UPDATE Accounts
        SET    Balance = Balance + v_interest
        WHERE  AccountID = rec.AccountID;

        v_updated_count  := v_updated_count + 1;
        v_total_interest := v_total_interest + v_interest;

        DBMS_OUTPUT.PUT_LINE(
            'Account ' || rec.AccountID ||
            ' | Old Balance: $' || TO_CHAR(rec.Balance, 'FM999,999.00') ||
            ' | Interest: $' || TO_CHAR(v_interest, 'FM999,990.00') ||
            ' | New Balance: $' || TO_CHAR(rec.Balance + v_interest, 'FM999,999.00')
        );
    END LOOP;

    COMMIT;
    DBMS_OUTPUT.PUT_LINE('----------------------------------------------');
    DBMS_OUTPUT.PUT_LINE('Accounts updated : ' || v_updated_count);
    DBMS_OUTPUT.PUT_LINE('Total interest   : $' || TO_CHAR(v_total_interest, 'FM999,999.00'));
    DBMS_OUTPUT.PUT_LINE('==============================================');

EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('ERROR in ProcessMonthlyInterest: ' || SQLERRM);
END ProcessMonthlyInterest;
/

-- Execute Scenario 1
BEGIN
    ProcessMonthlyInterest;
END;
/


-- =============================================================
-- SCENARIO 2:
-- UpdateEmployeeBonus — adds a bonus % to the salary of all
-- employees in a given department.
-- =============================================================

CREATE OR REPLACE PROCEDURE UpdateEmployeeBonus (
    p_department    IN  Employees.Department%TYPE,
    p_bonus_percent IN  NUMBER
)
AS
    v_updated_count   NUMBER := 0;
    v_dept_exists     NUMBER;

BEGIN
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('==============================================');
    DBMS_OUTPUT.PUT_LINE(' Scenario 2: UpdateEmployeeBonus');
    DBMS_OUTPUT.PUT_LINE('==============================================');
    DBMS_OUTPUT.PUT_LINE('Department   : ' || p_department);
    DBMS_OUTPUT.PUT_LINE('Bonus        : ' || p_bonus_percent || '%');
    DBMS_OUTPUT.PUT_LINE('');

    -- Validate bonus percentage
    IF p_bonus_percent <= 0 THEN
        RAISE_APPLICATION_ERROR(-20003, 'Bonus percentage must be greater than 0.');
    END IF;

    -- Check department exists
    SELECT COUNT(*)
    INTO   v_dept_exists
    FROM   Employees
    WHERE  Department = p_department;

    IF v_dept_exists = 0 THEN
        DBMS_OUTPUT.PUT_LINE('WARNING: No employees found in department "' || p_department || '".');
        RETURN;
    END IF;

    -- Loop and apply bonus to each employee in the department
    FOR rec IN (
        SELECT EmployeeID, Name, Salary
        FROM   Employees
        WHERE  Department = p_department
    ) LOOP
        DECLARE
            v_bonus      NUMBER;
            v_new_salary NUMBER;
        BEGIN
            v_bonus      := ROUND(rec.Salary * p_bonus_percent / 100, 2);
            v_new_salary := rec.Salary + v_bonus;

            UPDATE Employees
            SET    Salary = v_new_salary
            WHERE  EmployeeID = rec.EmployeeID;

            v_updated_count := v_updated_count + 1;

            DBMS_OUTPUT.PUT_LINE(
                'Employee: ' || rec.Name ||
                ' (ID: ' || rec.EmployeeID || ')' ||
                ' | Old Salary: $' || TO_CHAR(rec.Salary, 'FM999,999.00') ||
                ' | Bonus: $'     || TO_CHAR(v_bonus, 'FM999,990.00') ||
                ' | New Salary: $' || TO_CHAR(v_new_salary, 'FM999,999.00')
            );
        END;
    END LOOP;

    COMMIT;
    DBMS_OUTPUT.PUT_LINE('----------------------------------------------');
    DBMS_OUTPUT.PUT_LINE('Employees updated: ' || v_updated_count);
    DBMS_OUTPUT.PUT_LINE('==============================================');

EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('ERROR in UpdateEmployeeBonus: ' || SQLERRM);
END UpdateEmployeeBonus;
/

-- Execute Scenario 2
BEGIN
    -- Apply 15% bonus to IT department
    UpdateEmployeeBonus('IT', 15);

    -- Apply 10% bonus to Finance department
    UpdateEmployeeBonus('Finance', 10);

    -- Test with non-existent department
    UpdateEmployeeBonus('Marketing', 5);
END;
/


-- =============================================================
-- SCENARIO 3:
-- TransferFunds — transfers a specified amount from one account
-- to another, checking for sufficient balance first.
-- =============================================================

CREATE OR REPLACE PROCEDURE TransferFunds (
    p_from_account  IN  Accounts.AccountID%TYPE,
    p_to_account    IN  Accounts.AccountID%TYPE,
    p_amount        IN  NUMBER
)
AS
    v_from_balance   Accounts.Balance%TYPE;
    v_to_exists      NUMBER;
    e_insufficient   EXCEPTION;
    e_invalid_from   EXCEPTION;
    e_invalid_to     EXCEPTION;
    e_same_account   EXCEPTION;

BEGIN
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('==============================================');
    DBMS_OUTPUT.PUT_LINE(' Scenario 3: TransferFunds');
    DBMS_OUTPUT.PUT_LINE('==============================================');
    DBMS_OUTPUT.PUT_LINE('From Account : ' || p_from_account);
    DBMS_OUTPUT.PUT_LINE('To Account   : ' || p_to_account);
    DBMS_OUTPUT.PUT_LINE('Amount       : $' || TO_CHAR(p_amount, 'FM999,999.00'));

    -- Guard: same account
    IF p_from_account = p_to_account THEN
        RAISE e_same_account;
    END IF;

    -- Guard: amount must be positive
    IF p_amount <= 0 THEN
        RAISE_APPLICATION_ERROR(-20004, 'Transfer amount must be greater than zero.');
    END IF;

    -- Fetch and lock source account
    BEGIN
        SELECT Balance
        INTO   v_from_balance
        FROM   Accounts
        WHERE  AccountID = p_from_account
        FOR UPDATE;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN RAISE e_invalid_from;
    END;

    -- Check destination account exists
    SELECT COUNT(*)
    INTO   v_to_exists
    FROM   Accounts
    WHERE  AccountID = p_to_account;

    IF v_to_exists = 0 THEN
        RAISE e_invalid_to;
    END IF;

    -- Check sufficient balance
    IF v_from_balance < p_amount THEN
        RAISE e_insufficient;
    END IF;

    -- Debit source, credit destination
    UPDATE Accounts SET Balance = Balance - p_amount WHERE AccountID = p_from_account;
    UPDATE Accounts SET Balance = Balance + p_amount WHERE AccountID = p_to_account;

    COMMIT;
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('SUCCESS: $' || TO_CHAR(p_amount, 'FM999,999.00') ||
                         ' transferred from Account ' || p_from_account ||
                         ' to Account ' || p_to_account);

    -- Display updated balances
    FOR rec IN (
        SELECT AccountID, Balance
        FROM   Accounts
        WHERE  AccountID IN (p_from_account, p_to_account)
    ) LOOP
        DBMS_OUTPUT.PUT_LINE(
            'Account ' || rec.AccountID || ' new balance: $' ||
            TO_CHAR(rec.Balance, 'FM999,999.00')
        );
    END LOOP;
    DBMS_OUTPUT.PUT_LINE('==============================================');

EXCEPTION
    WHEN e_same_account THEN
        DBMS_OUTPUT.PUT_LINE('ERROR: Source and destination accounts are the same.');

    WHEN e_invalid_from THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('ERROR: Source Account ' || p_from_account || ' not found.');

    WHEN e_invalid_to THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('ERROR: Destination Account ' || p_to_account || ' not found.');

    WHEN e_insufficient THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE(
            'ERROR: Insufficient funds in Account ' || p_from_account ||
            '. Available: $' || TO_CHAR(v_from_balance, 'FM999,999.00') ||
            ', Requested: $' || TO_CHAR(p_amount, 'FM999,999.00')
        );

    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('ERROR: Unexpected error - ' || SQLERRM);
END TransferFunds;
/

-- Execute Scenario 3
BEGIN
    -- Test A: Valid transfer
    TransferFunds(2001, 2002, 1000);

    -- Test B: Insufficient funds
    TransferFunds(2007, 2001, 50000);

    -- Test C: Invalid source account
    TransferFunds(9999, 2001, 100);

    -- Test D: Invalid destination account
    TransferFunds(2001, 8888, 100);

    -- Test E: Same account
    TransferFunds(2001, 2001, 100);
END;
/
