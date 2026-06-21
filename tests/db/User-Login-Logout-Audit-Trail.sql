SELECT
    a.id,
    a.account_id,
    acc.email,
    a.action,
    a.metadata,
    a.created_at
FROM dbo.audit_log a
    INNER JOIN dbo.accounts acc
    ON a.account_id = acc.id
WHERE a.action IN ('login', 'logout')
ORDER BY a.created_at DESC;

