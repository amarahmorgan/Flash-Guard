-- verify if there are any transaction to the blocked user with id 3(charlie frozen)
SELECT *
FROM transactions
WHERE id = 3
AND status = 'COMPLETED';