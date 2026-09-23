# ESG Company Dashboard

## Overview

The ESG Company Dashboard is a full-stack web application that lets users explore, compare, and track environmental, social, and governance (ESG) metrics for major companies. Users can browse a curated dataset of company ESG data, search and filter by industry, add their own companies for side-by-side comparison, and save companies to a personal favorites list for quick reference. The project is built with a React frontend and a Spring Boot/MySQL backend, communicating over a REST API.

## Features

- **Browse ESG data:** View a curated dataset of major companies with key ESG metrics, including net zero target year, renewable energy usage, women in leadership representation, and CEO pay ratio.
- **Search and filter:** Search for a company by name, or filter the list by industry to narrow down results.
- **View detailed company profiles:** Click any company card to see its full ESG metrics, notes, and a link to its original data source.
- **Compare companies side by side:** Add up to two companies to a comparison panel to view their metrics next to each other.
- **Add your own companies:** Submit a company not already in the database (with your own ESG data) to include it in your comparisons and browsing.
- **Save favorites:** Mark companies as favorites for quick access later, and view your full favorites list on a dedicated page.


## Tech Stack

- **Frontend:** React, Vite, React Router
- **Backend:** Java, Spring Boot, Spring Data JPA
- **Database:** MySQL
- **Testing:** Postman
- **Version Control:** GitHub

## Installation

### Prerequisites
- Java 17+
- Node.js and npm
- MySQL Server
- An IDE (IntelliJ recommended for backend, VS Code recommended for frontend)

### Backend Setup
1. Clone this repository: git clone https://github.com/gibsonhannah07/esg-company-dashboard-backend.git

2. Create a MySQL database named `esg_dashboard`:
```sql
   CREATE DATABASE esg_dashboard;
```
3. In `java-spring-boot-back-end-app/src/main/resources/application.properties`, set your database credentials:
spring.datasource.url=jdbc:mysql://localhost:3306/esg_dashboard
spring.datasource.username=[your MySQL username]
spring.datasource.password=[your MySQL password]

4. Open the `java-spring-boot-back-end-app` folder in IntelliJ.
5. Run `EsgCompanyDashboardApplication.java`. Hibernate will automatically create the required tables.

### Frontend Setup
1. Open the `react-front-end-app` folder in VS Code.
2. Install dependencies:
npm install
3. Start the development server:
npm run dev
4. Visit `http://localhost:5173` in your browser (with the backend already running).

## Wireframes
https://drive.google.com/file/d/1jv9u95xI5FuUg0pwM4jX2QCpDJEtEkGz/view?usp=sharing

## ER Diagram
https://dbdiagram.io/d/Unit-2-ESG-Dashboard-6a864d38fd15a881e5bcc9cf

## Unsolved Problems / Future Features

- **User authentication:** The app currently uses a single placeholder user rather than individual logins. Favorites and user-added companies are not yet tied to distinct accounts. Implementing real signup/login (and matching each user to their own data) is the top priority for a future iteration.
- **Deployment:** The app currently runs locally only; deploying the frontend and backend to a live hosting environment is a planned next step in project developmment. 
