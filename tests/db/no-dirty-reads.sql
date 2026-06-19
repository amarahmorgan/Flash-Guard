
--BEGIN TRAN;
	
UPDATE dbo.accounts
SET balance = balance + 500
WHERE id = 1;
	
--Keep transaction open (do NOT commit)

WAITFOR DELAY '00:00:30';

-- verify transaction 

SELECT balance
FROM dbo.accounts
WHERE id = 1;
