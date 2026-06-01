# Inventory Management System

A simple, Dockerized Inventory Management System with basic CRUD operations.

## Features
- Add, Edit, Update Quantity, and Delete products.
- Tabular listing of all products.
- Responsive, premium Glassmorphism UI.
- Fully dockerized (PostgreSQL + Node.js/Express + Nginx).

## Prerequisites
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Local Setup

1. Clone or navigate to the repository directory.
2. Run the following command to start the application:
   ```bash
   docker compose up -d --build
   ```
3. Open your browser and navigate to `http://localhost`.

## Tech Stack
- **Database**: PostgreSQL (Auto-seeded with dummy data)
- **Backend**: Node.js & Express.js
- **Frontend**: HTML5, CSS3 (Glassmorphism), Vanilla JavaScript
- **Web Server / Reverse Proxy**: Nginx

## Deployment
