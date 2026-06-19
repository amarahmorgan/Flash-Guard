SELECT
	email,
	COUNT(*) AS email_count
FROM dbo.accounts
GROUP BY email
HAVING COUNT(*) > 1;
