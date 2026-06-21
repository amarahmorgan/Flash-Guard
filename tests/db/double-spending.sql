SELECT
    a.id AS account_id,
    a.email,
    a.balance AS current_balance,
    SUM(CASE 
        WHEN t.status = 'completed' 
        THEN t.amount 
        ELSE 0 
    END) AS total_completed_debits
FROM dbo.accounts a
    LEFT JOIN dbo.transactions t
    ON a.id = t.sender_account_id
GROUP BY 
    a.id,
    a.email,
    a.balance
HAVING a.balance < 0;

SELECT
    id,
    email,
    balance
FROM dbo.accounts
WHERE balance < 0;

