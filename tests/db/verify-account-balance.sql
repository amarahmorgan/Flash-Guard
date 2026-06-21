SELECT
    a.id AS account_id,
    a.email,
    a.balance AS stored_balance,
    ISNULL(SUM(CASE WHEN le.entry_type = 'credit' THEN le.amount ELSE 0 END), 0) -
    ISNULL(SUM(CASE WHEN le.entry_type = 'debit' THEN le.amount ELSE 0 END), 0)
    AS calculated_balance
FROM dbo.accounts a
LEFT JOIN dbo.ledger_entries le
    ON a.id = le.account_id
GROUP BY
    a.id,
    a.email,
    a.balance
HAVING
    a.balance <>
    (
        ISNULL(SUM(CASE WHEN le.entry_type = 'credit' THEN le.amount ELSE 0 END), 0) -
        ISNULL(SUM(CASE WHEN le.entry_type = 'debit' THEN le.amount ELSE 0 END), 0)
    );