SELECT
    id,
    email,
    full_name,
    balance,
    is_active
FROM dbo.accounts
WHERE is_active = 0;
