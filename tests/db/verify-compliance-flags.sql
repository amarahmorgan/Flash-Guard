SELECT
    id,
    sender_account_id,
    recipient_account_id,
    amount,
    compliance_flag,
    status,
    created_at
FROM dbo.transactions
WHERE compliance_flag IS NOT NULL;