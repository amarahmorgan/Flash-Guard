SELECT
   id,
    status,
    created_at,
    authorized_at,
    settled_at
FROM dbo.transactions
WHERE id = 100;
