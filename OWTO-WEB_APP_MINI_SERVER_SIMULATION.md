# Owto Web Application & Mini-Server Simulation and Testing

## Introduction

This document provides instructions for simulating the owto web application and mini-server. The simulation allows users to test the request booking functionality, including selecting passengers, representative passenger, location, estimate, schedule, employee passenger and submitting booking requests.

## Table of Contents

- [Simulation Steps](#simulation-steps)
  - [1. Run the Backend Server (mini-server)](#1-run-the-backend-server-mini-server)
  - [2. Run the Frontend Web Application (Owto Web App)](#2-run-the-frontend-web-application-owto-web-app)
  - [3. Simulating Booking Requests](#3-simulating-booking-requests)
- [What Happens During the Simulation Test](#what-happens-during-the-simulation-test)

  - [1. Starting the Backend Server (mini-server)](#1-starting-the-backend-server-mini-server)
  - [2. Starting the Frontend Web Application (Owto Web App)](#2-starting-the-frontend-web-application-owto-web-app)
  - [3. Submitting the Booking Request ](#3-submitting-the-booking-request)

## Simulation Steps

### 1. Run the Backend Server (mini-server)

To simulate the backend functionality:

1. Open your terminal.
2. Start the server:

   ```bash
   npm run start-dev
   ```

### 2. Run the Frontend Web Application (Owto Web App)

To simulate the user interface:

1. Open a new terminal window.
2. Start the web application:

   ```bash
   npm run dev
   ```

### 3. Simulating Booking Requests

Once both the frontend and backend are running:

1. Open your web browser and go to `http://localhost:8080/` (or the port you configured for the frontend).
2. Follow these steps to simulate a booking request:
   - **Select Number of Passengers**:
     - Choose the number of passengers for the booking.
   - **Select Representative Passenger**:
     - Select a representative passenger in the list.
   - **Select Locations**:
     - Enter the pickup and drop-off locations for the booking.
   - **Select Estimated/Variant**:
     - Select a variant for the booking.
   - **Schedule Booking**:
     - Select a date and time for the booking schedule.
   - **Select Employee or Guest**:
     - Choose an employee or guest passengers.
   - **Note (optional)**:
     - You can specify any additional instruction or message.
   - **Submit Booking**:
     - Click the "Proceed" button to send the booking request to the server.

## What Happens During the Simulation Test

During the simulation of the owto web application and mini-server, the following processes occur:

### 1. **Starting the Backend Server (mini-server)**

- When the backend server is initiated, it establishes a connection to the database.
- The server listens for incoming API requests related to booking operations.

### 2. **Starting the Frontend Web Application (Owto Web App)**

- The Owto Web Application is launched, allowing users to interact with the user interface.
- The application fetches initial data from the mini-server.

### 3. **Submitting the Booking Request**

- When the "Proceed" button is clicked, a booking request is successfully initiated, and the booking details are sent to the backend server (mini-server).
- The server processes the request, validates the information, and checks for availability.
- If the booking is successful, the server stores the booking details.
- In case of any errors (e.g., conflicting bookings, invalid data), the server returns an appropriate error message.
