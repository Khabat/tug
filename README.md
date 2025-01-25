# Product Management System (PMS)

## Overview
The Product Management System API is a tool for managing products and companies. Each company can only have one associated product. I have designed this application for assessment purposes and have included other key features, such as logging, exception handling. PMS contains also  a partial implemention of category and subcategory services.

## Features

### APIs
- **Product API**: List and craete, update, find, and delete products.
- **Company API**: List and craete, update, find, and delete companies.
- **Constraint**: Each company can be associated with only one product.
                  Barcode of product must be unique.
                  Product must have a category.
### Database
- **Database**: MySQL
- **ORM**: TypeORM
- **Configuration**: Database credentials (username, password, address) are configured in `typeorm.provider.ts`. Currently, these values are hardcoded but will be migrated to environment variables in the next version.

### Category and Subcategory Services
- **Implemented Features**: `findOne` and `findAll` methods.
- **Database Population**: Database is populated during module initialization (`moduleinit`). This feature is marked for removal before deploying to production.

### Logging
- Logs are sent to the console for debugging and monitoring purposes.

- I have implemented an injectable logger service, utilized by the logger middle-ware, to capture and log both incoming and outgoing REST messages.

- Sensitive data is never logged to the console, ensuring the security of all confidential information.


### Filters
PMS returns error messages in a unified form.
- **DatabaseExceptionFilter**: Handles `QueryFailedError` exceptions. Specifically, for duplicate record errors, it returns the message:
  > "A record with the same unique field already exists."
- **BaseExceptionFilter**: Generic exception handling for other errors.


### Validation
I have implemented validation for all input data to ensure data integrity and prevent invalid requests. This App is using the NestJS validation pipe and class-validator decorators and global validation to cover validation and transformation for **Body**, **Parameters**, and **Queries**.

### CI/CD
PMS has a CI actions file that contains the build and test steps. Currently, the GitHub Actions workflow automatically runs unit tests after each push. Integration tests and continuous deployment (CD) are not yet implemented but will be added in future versions.


### API Documentation
- **Swagger**: Comprehensive API documentation, including endpoint details and DTO formats, is available at:
  > [http://localhost:3000/api](http://localhost:3000/api)

### Testing
- **Unit Tests**: Includes tests for product and company services.
  - Run all tests:
    ```bash
    npm run test
    ```
  - Run product tests:
    ```bash
    npm run test:product
    ```
  - Run company tests:
    ```bash
    npm run test:company
    ```


## Installation

### Prerequisites
- Node.js (version >= 16.x)
- MySQL database

### Steps
1. Clone the repository:
   ```bash
   git clone git@github.com:Khabat/tug.git
   ```
2. Navigate to the project directory:
   ```bash
   cd tug
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
1. Start the server:
   ```bash
   npm run start:dev
   ```
2. Access the Swagger UI at:
   > [http://localhost:3000/api](http://localhost:3000/api)

## Known Issues
- Database credentials are hardcoded and need to be moved to environment variables.
- Category and Subcategory services are only partially implemented and should not be used in production. 


## License
This project is licensed under the MIT License.

