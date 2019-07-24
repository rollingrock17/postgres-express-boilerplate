Install PostgreSQL locally and have a running instance  
https://www.postgresql.org/

Create a file called .env in the root directory with the following keys and put in the proper values:  

PGHOST=database_host  
PGUSER=database_user  
PGDATABASE=database_name  
PGPASSWORD=database_port  
PGPORT=database_port  
PORT=app_port (e.g. 4000)  
TOKENKEY=key to sign jwt token (can be anything)  

Once the .env is configured and the database server is running then
open a terminal in the app directory and run  

**npm install**  
**npm start**  

Endpoints can be tested with Postman/Insomnia  

**sample request:**  

endpoint: localhost:4000/register    
type: application/json  
data:  
{  
    "name": "name",  
    "email": "email",  
    "password": "password"  
}  