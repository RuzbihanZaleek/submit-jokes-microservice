# Submit Jokes Microservice

The **Submit Jokes Microservice** is a REST API built with Node.js and Express that enables users to submit jokes without authentication. Users can categorize their jokes based on available joke types, which are periodically updated. This service is part of a larger microservice architecture involving the **Deliver Jokes** and **Moderate Jokes** microservices.

## Features

- Accepts joke submissions from the public.
- Allows categorization of jokes by available joke types.
- Communicates with the **Moderate Jokes Microservice** for joke moderation and **Deliver Jokes Microservice** for joke types.
- Utilizes MongoDB as the database for storing jokes.

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (running locally or a cloud instance)

### Installation

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RuzbihanZaleek/submit-jokes-microservice.git
2. Navigate to the project directory:
   ```bash
   cd submit-jokes-microservice
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Configure environment variables:
   - Create a .env file and set the .env.example file variables
6. Set up the MongoDB database
8. Start the development server:
   ```bash
   npm start
   ```

## API Documentation

This service includes interactive API documentation powered by **Swagger**. You can view and test all available endpoints through the Swagger UI.

- **Swagger UI**: [http://localhost:3000/api](http://localhost:3000/api)

> Make sure the service is running locally on port 3000 to access the documentation.
