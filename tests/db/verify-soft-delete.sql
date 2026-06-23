--soft delete Id 8
Update dbo.accounts
set is_active=0
where id=8;

-- verify id data is stills hown 

select * 
from dbo.transactions 
where is_active =0