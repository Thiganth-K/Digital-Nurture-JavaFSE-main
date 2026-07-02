-- =============================================================
-- Exercise1_ControlStructures.sql
-- PL/SQL Programming - Exercise 1: Control Structures
-- =============================================================
-- Run schema_setup.sql before executing this file.
-- =============================================================

SET SERVEROUTPUT ON SIZE UNLIMITED;

-- =============================================================
-- SCENARIO 1:
-- Apply a 1% discount to loan interest rates for customers
-- who are above 60 years of age.
-- =============================================================

DECLARE
    -- Cursor to loop through all customers with their loan data
    CURSOR cur_customer_loans IS
        SELECT c.CustomerID,
               c.Name,
               TRUNC(MONTHS_BETWEEN(SYSDATE, c.DOB) / 12) AS Age,
               l.LoanID,
               l.InterestRate
        FROM   Customers c
        JOIN   Loans l ON c.CustomerID = l.CustomerID;

    v_new_rate  Loans.InterestRate%TYPE;
    v_count     NUMBER := 0;

BEGIN
    DBMS_OUTPUT.PUT_LINE('==============================================');
    DBMS_OUTPUT.PUT_LINE(' Scenario 1: Loan Interest Discount (Age > 60)');
    DBMS_OUTPUT.PUT_LINE('==============================================');

    FOR rec IN cur_customer_loans LOOP

        IF rec.Age > 60 THEN
            -- Apply 1% discount
            v_new_rate := rec.InterestRate - 1;

            UPDATE Loans
            SET    InterestRate = v_new_rate
            WHERE  LoanID = rec.LoanID;

            v_count := v_count + 1;

            DBMS_OUTPUT.PUT_LINE(
                'Customer: ' || rec.Name ||
                ' | Age: ' || rec.Age ||
                ' | Loan ID: ' || rec.LoanID ||
                ' | Old Rate: ' || rec.InterestRate || '%' ||
                ' | New Rate: ' || v_new_rate || '%'
            );
        ELSE
            DBMS_OUTPUT.PUT_LINE(
                'Customer: ' || rec.Name ||
                ' | Age: ' || rec.Age ||
                ' | No discount applied (age <= 60)'
            );
        END IF;

    END LOOP;

    COMMIT;
    DBMS_OUTPUT.PUT_LINE('----------------------------------------------');
    DBMS_OUTPUT.PUT_LINE('Total loans discounted: ' || v_count);
    DBMS_OUTPUT.PUT_LINE('==============================================');

EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('ERROR in Scenario 1: ' || SQLERRM);
END;
/


-- =============================================================
-- SCENARIO 2:
-- Set IsVIP = 'TRUE' for customers whose balance is over $10,000.
-- =============================================================

DECLARE
    CURSOR cur_customers IS
        SELECT CustomerID, Name, Balance
        FROM   Customers;

    v_vip_count  NUMBER := 0;

BEGIN
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('==============================================');
    DBMS_OUTPUT.PUT_LINE(' Scenario 2: VIP Status Promotion');
    DBMS_OUTPUT.PUT_LINE('==============================================');

    FOR rec IN cur_customers LOOP

        IF rec.Balance > 10000 THEN
            UPDATE Customers
            SET    IsVIP = 'TRUE'
            WHERE  CustomerID = rec.CustomerID;

            v_vip_count := v_vip_count + 1;

            DBMS_OUTPUT.PUT_LINE(
                'Customer: ' || rec.Name ||
                ' | Balance: $' || TO_CHAR(rec.Balance, 'FM999,999.00') ||
                ' | Status: Promoted to VIP'
            );
        ELSE
            DBMS_OUTPUT.PUT_LINE(
                'Customer: ' || rec.Name ||
                ' | Balance: $' || TO_CHAR(rec.Balance, 'FM999,999.00') ||
                ' | Status: Not VIP (balance <= $10,000)'
            );
        END IF;

    END LOOP;

    COMMIT;
    DBMS_OUTPUT.PUT_LINE('----------------------------------------------');
    DBMS_OUTPUT.PUT_LINE('Total customers promoted to VIP: ' || v_vip_count);
    DBMS_OUTPUT.PUT_LINE('==============================================');

EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('ERROR in Scenario 2: ' || SQLERRM);
END;
/


-- =============================================================
-- SCENARIO 3:
-- Fetch all loans due in the next 30 days and print a
-- reminder message for each customer.
-- =============================================================

DECLARE
    -- Cursor fetching loans due within 30 days from today
    CURSOR cur_due_loans IS
        SELECT c.Name         AS CustomerName,
               l.LoanID,
               l.LoanAmount,
               l.DueDate,
               TRUNC(l.DueDate - SYSDATE) AS DaysLeft
        FROM   Loans l
        JOIN   Customers c ON l.CustomerID = c.CustomerID
        WHERE  l.DueDate BETWEEN SYSDATE AND SYSDATE + 30
        ORDER BY l.DueDate;

    v_count  NUMBER := 0;

BEGIN
    DBMS_OUTPUT.PUT_LINE('');
    DBMS_OUTPUT.PUT_LINE('==============================================');
    DBMS_OUTPUT.PUT_LINE(' Scenario 3: Loan Due Reminders (Next 30 Days)');
    DBMS_OUTPUT.PUT_LINE('==============================================');

    FOR rec IN cur_due_loans LOOP
        v_count := v_count + 1;

        DBMS_OUTPUT.PUT_LINE(
            'REMINDER >> Dear ' || rec.CustomerName ||
            ', your Loan (ID: ' || rec.LoanID || ')' ||
            ' of $' || TO_CHAR(rec.LoanAmount, 'FM999,999.00') ||
            ' is due on ' || TO_CHAR(rec.DueDate, 'DD-MON-YYYY') ||
            ' (' || rec.DaysLeft || ' day(s) remaining). Please make payment.'
        );
    END LOOP;

    IF v_count = 0 THEN
        DBMS_OUTPUT.PUT_LINE('No loans are due in the next 30 days.');
    ELSE
        DBMS_OUTPUT.PUT_LINE('----------------------------------------------');
        DBMS_OUTPUT.PUT_LINE('Total reminders sent: ' || v_count);
    END IF;

    DBMS_OUTPUT.PUT_LINE('==============================================');

EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('ERROR in Scenario 3: ' || SQLERRM);
END;
/
