# DDD architecture

The Clean Architecture + DDD breakdown for implementing a Logger Module in NestJS

- Logging logic is decouped from the framework (Nestjs)
- You can easily swap the logging library (Winston, Pino)
- Logging becone a cross-cutting concern, usable across the system (Application, Domain, Infrastructure, ...)

## 🔧 Clean Architecture + DDD Overview

### 1. Domain Layer

- Should not contain logging logic
- Can define a `ILogger` interface if domain logic ever needs to emmit domain event (rare).

### 2. Application Layer

- Depends on ILogger for logging.
- Does not care how logs are written - just call info/error/debug/...

### 3. Infrastructure

- Implement the `ILogger` interface.
- Handles formatting, file rotation, transport to external systems (Kafka, slack, etc...)

### 4. Interface Layer

- Uses the logger for logging HTTP requests/responses, trace IDs, etc.
