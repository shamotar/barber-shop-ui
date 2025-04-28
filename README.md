# Barber Shop UI

This project is the user interface for the Barbershop application.

## Starting the Docker Containers

To run the Barber Shop API project using Docker, follow these steps:

### Prerequisites

Ensure you have the following installed on your system:
- [Docker](https://www.docker.com/products/docker-desktop/) (For containerization)
- [Docker Compose](https://docs.docker.com/compose/) (For managing multi-container applications)

### Steps to Start the Containers

1. **Clone the Repository**:
   If you haven't already, clone the repository to your local machine:
   ```bash
   git clone https://github.com/shamotar/barber-shop-ui.git
   cd barber-shop-ui
   ```
2. **Start the Containers**:
    Use Docker Compose to start all the services:
    ```bash
    docker-compose up --build
    ```

3. **Access the web app**:
    - The UI is located at <http://localhost:5173>

## Different Personas

- **Barber**:
    - To login as a barber use the following credentials:
        - **Username**: `john.doe@example.com`
        - **Password**: `hashedpassword1`

- **Client**:

    There are two different ways to impersonate a client:
    1. To login as a client use the following credentials:
        - **Username**: `jane.smith@example.com`
        - **Password**: `hashedpassword2`
    2. Sign up as a new user at <http://localhost:5173/signup>