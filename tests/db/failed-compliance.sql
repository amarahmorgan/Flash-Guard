-- Verifying that failed compliance checks prevent transaction. 
-- failed compliance check does not prevent the transaction

SELECT service_phone_number, service_type, id, [status]
FROM transactions
WHERE service_phone_number LIKE '%[^0-9]%';
