# The Movie DB Coding Challenge

This project is a movie database application that includes both a frontend and a backend service. The frontend is built with React using Vite, and the backend is built with NestJS and TypeORM. The application is deployed on Vercel at [cristiantovar.com](https://inlaze.cristiantovar.com/). **Beware** that it takes while to load the initial data.

## Table of Contents

- [Project Structure](#project-structure)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Running the Project](#running-the-project)
- [Project tasks checklist](#Project tasks Checklist)

## Project Structure

The project is organized into two main directories:
- `./frontend` - Contains the React frontend.
- `./backend` - Contains the NestJS backend.

## Frontend Setup

1. Clone the project:
```bash
git clone git@github.com:arepaFlipper/inlaze_films.git
cd ./inlaze_films
```
1. **Create the `.env` files**
Add your credentials in these files:
```bash
cp ./frontend/.env.example ./frontend/.env
cp ./backend/.env.example ./backend/.env
```
2. **Install Dependencies**

   Navigate to the `frontend` directory and install the dependencies:

   ```bash
   cd frontend
   npm install
   ```

2. **Run the Development Server**

   Start the Vite development server:

   ```bash
   npm run dev
   ```

   This will start the frontend application and make it available at `http://localhost:3000`.

3. **Build the Project**

   Build the frontend application for production:

   ```bash
   npm run build
   ```

4. **Preview the Production Build**

   Preview the production build locally:

   ```bash
   npm run preview
   ```

5. **Linting**

   Run ESLint to check for code quality issues:

   ```bash
   npm run lint
   ```

## Backend Setup

1. **Install Dependencies**

   Navigate to the `backend` directory and install the dependencies:

   ```bash
   cd backend
   npm install
   ```

2. **Configure Docker**

   The backend uses PostgreSQL, which is configured through `docker-compose`. Ensure Docker and Docker Compose are installed. Start the PostgreSQL service:

   ```bash
   docker-compose up -d
   ```

3. **Run the Development Server**

   Start the NestJS server:

   ```bash
   npm run start
   ```

There is no production backend yet. 😔

4. I wrote some python scripts to make requests to the endpoints as Postman does:
```bash
python3 -m venv env
source env/bin/activate
pip3 install requests

python3 ./backend/test/register.spec.py

python3 ./backend/test/verify_email.spec.py
```


7. **Testing**

   Run tests:

   ```bash
   npm test
   ```

   Watch for changes and re-run tests:

  ```bash
   npm run test:watch
  ```

## Project tasks Checklist

### Front-End (Next.js or React)
- [ ] Movie Pages
  - [ ] Popular, Now Playing, Upcoming, Top Rated, Favorites
    - [ ] Show a list of movies with title, release date, rating, image, and add to favorites button
    - [ ] Implement pagination or infinite loading for large datasets
  - [ ] Basic Filters
    - [ ] Search by Keywords
      - [ ] Implement a search field to filter movies by keywords
    - [ ] Search by Rating
      - [ ] Allow users to filter movies by rating
    - [ ] Filter by Genres
      - [ ] Implement genre filters to categorize movies
    - [ ] Sort by
      - [ ] Provide options to sort movies by title A-Z, popularity (ascending and descending), rating (ascending and descending), release date (ascending and descending)
- [ ] Movie Details Page
  - [ ] Show poster image, title, release date, genres, rating, and summary
  - [ ] Allow users to add movies to their favorites list
- [ ] Registration and Login
  - [ ] Implement functionalities for users to register, log in, and manage their session
- [ ] Password Reset
  - [ ] Implement functionality for users to reset their password if forgotten
- [ ] Styles and Responsiveness
  - [ ] Use CSS Modules to handle styles locally
  - [ ] Ensure application is responsive and accessible on different devices and browsers
- [ ] Validations and Error Handling
  - [ ] Validate user inputs and API responses correctly
  - [ ] Handle errors and exceptions appropriately
- [ ] Deployment
  - [ ] Deploy the application on Vercel, Netlify, GitHub Pages, or Cloudflare Pages

### Back-End (NestJS)
- [ ] User Authentication and Management
  - [ ] User Registration and Authentication
    - [ ] Register new users
    - [ ] Login with JWT and refresh tokens
    - [ ] Email verification
  - [ ] Password Reset
    - [ ] Password reset with secure tokens
- [ ] Movie Ratings Management
  - [ ] Allow users to rate movies
  - [ ] Get average ratings per movie
  - [ ] Implement additional validations
- [ ] Favorites Management
  - [ ] Allow users to mark movies as favorites
  - [ ] Get and display a user's favorite movies list
  - [ ] Implement pagination and recommendations based on favorites
- [ ] Caching and Performance Optimization
  - [ ] Implement caching using Redis to improve frequent query performance
  - [ ] Optimize queries and use indexes in the database
- [ ] API Documentation
  - [ ] Provide interactive API documentation using Swagger
  - [ ] Include clear descriptions and examples of requests and responses

### Extra Points
- [ ] Advanced Features
  - [ ] Add functionalities like light mode, internationalization (i18n), or social media integration for sharing movies
- [ ] Performance Optimization
  - [ ] Optimize application loading, use lazy loading for images, and improve load time
  - [ ] Implement caching to reduce server load and improve response speed
  - [ ] Implement a queue system using Redis, Kafka, RabbitMQ, or another technology for background tasks and scalability
- [ ] Enhanced Accessibility
  - [ ] Ensure the application meets WCAG accessibility standards
- [ ] Authentication
  - [ ] Implement multi-factor authentication (MFA) for enhanced security
  - [ ] Add account recovery and email verification functionalities

### Documentation Skills
- [ ] Clear and concise writing
  - [ ] Write standard operating procedures (SOP) clearly, concisely, and easy to follow
- [ ] Logical structure
  - [ ] Organize information logically and sequentially
- [ ] Architecture modeling
  - [ ] Diagram the solution approach

### Continuous Improvement Focus
- [ ] Identify improvement opportunities
  - [ ] Analyze current processes and identify areas for improvement
- [ ] Propose effective solutions
  - [ ] Develop and implement practical and scalable solutions

### Effective Communication of Proposals
- [ ] Present proposals clearly and convincingly
  - [ ] Highlight benefits and positive impact on the organization

### Technical Expectations
- [ ] Mastery of technologies: Next.js, React.js, and NestJS
- [ ] Functionality
- [ ] Clarity and quality of code
- [ ] Performance efficiency and system scalability
- [ ] Components
- [ ] Validations

