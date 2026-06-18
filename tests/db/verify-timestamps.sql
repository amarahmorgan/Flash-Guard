SELECT
    id,
    sender_account_id,
    recipient_account_id,
    amount,
    status,
    created_at,
    authorized_at,
    settled_at
FROM dbo.transactions
WHERE 
    authorized_at < created_at
    OR settled_at < created_at
    OR settled_at < authorized_at;