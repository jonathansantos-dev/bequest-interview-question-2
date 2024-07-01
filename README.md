# Jonathan Santos - Solution 

**To ensure that customer data was not tampered with, I implemented a mechanism using JSON Web Tokens (JWT). Here is a summary of the process:**

Token Generation: Whenever data is sent to the server, a JWT token is generated containing the data and a digital signature based on a secret key.
Integrity Check: When the client wants to check the integrity of the data, the JWT token is sent back to the server where the signature is verified. If the data has been tampered with, the verification will fail.
Using JWT ensures that any modification to the data will be detected, as the digital signature of the token will not match the changed data.

**To allow data recovery in the event of tampering, it would be necessary to implement a more complex backup and data recovery system. This system could include:**

Notifications via E-mail/SMS: Send notifications to the user containing secure links for data recovery.
Secure Backup Storage: Keep data backups in a secure location, with controlled access.
Data Recovery Flow: Implement a recovery flow that can restore data from backups, ensuring that only authenticated and authorized users can perform this operation.

## Implemented Code Structure
The solution was structured following the principles of Clean Architecture, with the following main folders:

controllers: Contains the controllers responsible for handling HTTP requests.
services: Implements business logic, such as data manipulation and token generation.
utils: Contains utilities such as JWT generation and verification functions.
middlewares: Includes middlewares for handling authentication and integrity checking.

### Testing Instructions
Implemented integration tests to verify the functionality of the main endpoints. To run the tests, use the command:
npm run test