# Sequence Diagrams for API Calls

## 1. User Registration

### Description

A new user registers an account. The system validates the data, creates a User object, stores it in the database, and returns a success response.

```mermaid
sequenceDiagram
    actor User
    participant API
    participant Facade
    participant UserModel
    participant Database

    User->>API: POST /users
    API->>Facade: register_user(data)

    Facade->>UserModel: validate(data)
    UserModel-->>Facade: valid

    Facade->>Database: save(User)
    Database-->>Facade: user_id

    Facade-->>API: User created
    API-->>User: 201 Created
```

---

## 2. Place Creation

### Description

An authenticated user creates a new place listing. The application validates ownership and stores the place in the database.

```mermaid
sequenceDiagram
    actor User
    participant API
    participant Facade
    participant PlaceModel
    participant Database

    User->>API: POST /places
    API->>Facade: create_place(data)

    Facade->>PlaceModel: validate(data)
    PlaceModel-->>Facade: valid

    Facade->>Database: save(Place)
    Database-->>Facade: place_id

    Facade-->>API: Place created
    API-->>User: 201 Created
```

---

## 3. Review Submission

### Description

A user submits a review for an existing place. The system verifies the user and place before saving the review.

```mermaid
sequenceDiagram
    actor User
    participant API
    participant Facade
    participant ReviewModel
    participant Database

    User->>API: POST /reviews
    API->>Facade: create_review(data)

    Facade->>Database: verify User
    Database-->>Facade: User exists

    Facade->>Database: verify Place
    Database-->>Facade: Place exists

    Facade->>ReviewModel: create review
    ReviewModel-->>Facade: review object

    Facade->>Database: save(Review)
    Database-->>Facade: review_id

    Facade-->>API: Review created
    API-->>User: 201 Created
```

---

## 4. Fetching a List of Places

### Description

A user requests a list of places. The system retrieves matching places from the database and returns them.

```mermaid
sequenceDiagram
    actor User
    participant API
    participant Facade
    participant PlaceModel
    participant Database

    User->>API: GET /places

    API->>Facade: get_places(filters)

    Facade->>Database: query places
    Database-->>Facade: places data

    Facade->>PlaceModel: build objects
    PlaceModel-->>Facade: place list

    Facade-->>API: list of places
    API-->>User: 200 OK + JSON
```

---

# Layer Interaction Summary

## Presentation Layer

Responsible for:

* Receiving HTTP requests
* Validating request format
* Returning HTTP responses

Components:

* API Endpoints
* Services

## Business Logic Layer

Responsible for:

* Applying business rules
* Validating entities
* Managing Users, Places, Reviews, and Amenities

Components:

* User Model
* Place Model
* Review Model
* Amenity Model
* Facade

## Persistence Layer

Responsible for:

* Storing data
* Retrieving data
* Updating and deleting records

Components:

* Repository Layer
* Database

## Role of the Facade Pattern

The Facade acts as the single entry point to the Business Logic Layer.

Benefits:

* Simplifies communication between layers
* Reduces coupling
* Hides implementation details
* Centralizes business operations

All API requests pass through the Facade before reaching the business models and persistence layer.

```
```
