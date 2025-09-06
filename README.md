# About Project

This project is an API that was built using the grok-sdk. For the tests, the **llama-3.1-8b-instant** model was used, with the **Brazilian cuisine** domain as the subject for the LLM. These variables can be modified in the `.env` file. For an example of how to setup your `.env` file see `.env.example` file

The project uses Docker to provide a consistent development and testing environment. Follow the steps below to get started.

## Prerequisites

Make sure you have [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine.

## Setup and Running (with Docker)

### 1. Environment Variables

Create a file named `.env` in the root of the project. A sample file named `.env.example` should be available to guide you.

### 2. Get Your Groq API Key

To set the `LL_API_KEY`, you will first have to create your api key at [Grok](https://console.groq.com/keys), If you do not have an account, you will need to create one, and then press the `Create API Key` button. 

### 3. Install Dependencies

Install the project's dependencies using npm within the `app` service.

```bash
docker compose run --rm app npm install
```
### 3. Start the Development Server
Start all services in detached mode. This will build the Docker images and run the application and testing containers. The app service is configured to restart automatically on changes and sync your local code with the container.

```Bash

docker compose up -d
```
The application will be accessible at `http://localhost:3000`.

### 4. Running Tests
The test service runs tests in a separate container, ensuring a clean and isolated testing environment.

```Bash

docker compose up test
Key Commands
```
```bash
docker compose up -d: Starts the development server in the background.

docker compose up test: Runs the test suite once.

docker compose down: Stops and removes all containers, networks, and volumes.

docker compose run --rm app npm install: Installs npm dependencies. The --rm flag removes the temporary container after the command completes.

docker compose logs -f: Follows the logs of all running services.
```

### Service Descriptions

1. app: The main application container. It's configured to auto-restart and sync code changes from your host machine, providing a smooth development experience.

2. test: A dedicated container for running the test suite. It's isolated from the main application to avoid conflicts and ensure test reliability.

## Alternative Setup (Without Docker)

If you prefer to run the project without Docker, you can do so by following these steps.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

### 1. Install Dependencies

Navigate to the project directory and install the dependencies.

```Bash
npm install
```

### 2. Start the Development Server

```Bash
npm run start:dev
```
