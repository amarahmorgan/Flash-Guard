--First we check that the transaction is pending
SELECT * FROM transactions
Where status = 'pending'

--Now the transaction in the database after it has been approved on the mobile app
SELECT * From transactions
Where status = 'completed'
