# 99Tech Code Challenge #1 #

## Table of Contents

1.  [Problem 1 & 4: Three Ways to Sum to N](#problem-1--4-three-ways-to-sum-to-n)
2.  [Problem 2: Fancy Form (Currency Swap App)](#problem-2-fancy-form-currency-swap-app)
3.  [Problem 3: Messy React (Code Refactoring)](#problem-3-messy-react-code-refactoring)
4.  [Problem 5: A Crude Server (ExpressJS CRUD API)](#problem-5-a-crude-server-expressjs-crud-api)
5.  [Problem 6: Architecture (Live Scoreboard Service)](#problem-6-architecture-live-scoreboard-service)

---

### Problem 1 & 4: Three Ways to Sum to N

**Task**: Provide three unique implementations for a function that calculates the sum of integers from 1 to `n`. This task was completed in both JavaScript and TypeScript.

-   **JavaScript Solution**: [`src/problem1/sum_to_n.js`](src/problem1/sum_to_n.js)
-   **TypeScript Solution**: [`src/problem4/sum_to_n.ts`](src/problem4/sum_to_n.ts)

The three implementations showcase different approaches with varying performance characteristics:
1.  **Mathematical Formula**: `O(1)` time complexity.
2.  **Iterative Loop**: `O(n)` time complexity.
3.  **Tail Recursion**: `O(n)` time complexity.

Each function includes comments on its time and space complexity.

---

### Problem 2: Fancy Form (Currency Swap App)

**Task**: Create a visually appealing and intuitive currency swap form using React.

This project is a modern, responsive single-page application built with Vite, TypeScript, and Zustand for state management. It features a sleek dark/light mode, smooth animations with Framer Motion, and fetches real-time token prices.

-   **Source Code**: [`src/problem2/`](src/problem2/)
-   **Detailed Documentation**: [`src/problem2/README.md`](src/problem2/README.md)

#### How to Run

```bash
# Navigate to the project directory
cd src/problem2

# Install dependencies
npm install

# Start the development server
npm run dev
```
The application will be available at `http://localhost:5173`.

---

### Problem 3: Messy React (Code Refactoring)

**Task**: Identify computational inefficiencies and anti-patterns in a given React component and provide a refactored version.

The analysis identified critical issues including runtime errors, incorrect `useMemo` dependencies, flawed filter/sort logic, redundant processing, non-unique React keys, and poor type safety.

-   **Detailed Analysis**: A full breakdown of the issues can be found in [`src/problem3/README.md`](src/problem3/README.md).
-   **Refactored Code**: The clean, efficient, and type-safe version is located at [`src/problem3/src/component/wallet-page-refactored.component.tsx`](src/problem3/src/component/wallet-page-refactored.component.tsx).

#### How to Run the Demo

```bash
# Navigate to the project directory
cd src/problem3

# Install dependencies
npm install

# Start the React app
npm start
```

---

### Problem 5: A Crude Server (ExpressJS CRUD API)

**Task**: Develop a backend CRUD service using Express.js, TypeScript, and a database for persistence.

This solution provides a robust, containerized backend application with Docker and Docker Compose. It exposes a RESTful API to create, read, update, and delete resources, with data persisted in a PostgreSQL database.

-   **Source Code**: [`src/problem5/`](src/problem5/)
-   **Detailed Documentation**: The [`src/problem5/README.md`](src/problem5/README.md) contains API endpoint specifications and `curl` examples.

#### How to Run

1.  **Navigate to the project directory**:
    ```bash
    cd src/problem5
    ```

2.  **Create an environment file**:
    Copy the contents of `env.example` into a new `.env` file. The default values are configured for Docker Compose.
    ```bash
    cp env.example .env
    ```

3.  **Build and run with Docker Compose**:
    ```bash
    docker-compose up --build
    ```
The server will be running and accessible at `http://localhost:3000`.

---

### Problem 6: Architecture (Live Scoreboard Service)

**Task**: Write a detailed software specification for a backend module that provides a live-updating scoreboard.

This document outlines a high-reliability architecture for a real-time scoreboard service. It is designed to be scalable, secure, and resilient, ensuring no data is lost and updates are delivered efficiently to clients.

-   **Full Specification**: [`src/problem6/README.md`](src/problem6/README.md)

Key architectural patterns and technologies include:
-   **PostgreSQL** as the source of truth.
-   The **Outbox Pattern** for guaranteed, reliable event emission.
-   **Redis Streams** for durable, asynchronous message delivery.
-   **WebSockets** for pushing live updates to clients.
-   **JWT-based security** to prevent malicious score updates.

The document includes a system diagram, API specifications, data models, and operational considerations for a production-ready implementation.
