SELECT
    t.id AS transaction_id,
    t.sender_account_id,
    t.recipient_account_id,
    t.amount,
    t.status,
    t.created_at,
    a.id AS audit_log_id,
    a.action,
    a.metadata
FROM dbo.transactions t
    LEFT JOIN dbo.audit_log a
    ON a.metadata LIKE '%' + CAST(t.id AS VARCHAR(20)) + '%'
WHERE a.id IS NULL;