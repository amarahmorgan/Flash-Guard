SELECT
    t.id AS transaction_id,
    t.recipient_account_id,
    le.account_id AS credited_account,
    le.entry_type,
    le.amount
FROM dbo.transactions t
LEFT JOIN dbo.ledger_entries le
    ON t.id = le.transaction_id
    AND le.account_id = t.recipient_account_id
    AND le.entry_type = 'credit'
WHERE
    t.status = 'completed'
    AND le.id IS NULL;