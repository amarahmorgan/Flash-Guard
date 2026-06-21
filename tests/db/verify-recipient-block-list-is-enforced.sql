SELECT
    r.id,
    r.sender_account_id,
    r.recipient_account_id,
    r.blacklist_status
FROM dbo.recipients r
WHERE r.blacklist_status = 'blocked';