SELECT
    t.id AS transaction_id,
    t.amount AS transaction_amount,
    SUM(CASE WHEN le.entry_type = 'debit' THEN le.amount ELSE 0 END) AS total_debit,
    SUM(CASE WHEN le.entry_type = 'credit' THEN le.amount ELSE 0 END) AS total_credit
FROM dbo.transactions t
INNER JOIN dbo.ledger_entries le
    ON t.id = le.transaction_id
GROUP BY
    t.id,
    t.amount
HAVING
    t.amount <>
        SUM(CASE WHEN le.entry_type = 'debit' THEN le.amount ELSE 0 END)
    OR
    t.amount <>
        SUM(CASE WHEN le.entry_type = 'credit' THEN le.amount ELSE 0 END);