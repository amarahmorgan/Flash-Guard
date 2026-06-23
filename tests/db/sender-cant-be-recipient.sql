SELECT id,
       sender_account_id,
       recipient_account_id
FROM transactions
WHERE sender_account_id = recipient_account_id;