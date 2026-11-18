# Full-Stack Music Library Application

A full-stack app for managing a music library: Artists → Albums → Songs.

## Features
- Relational SQLite schema with foreign keys and ON DELETE CASCADE
- REST API (GET/POST/PUT/DELETE) built with Express
- Vanilla JavaScript frontend using fetch() to consume the API
- CRUD across three linked entities, with live table updates

## Tech
JavaScript, Node.js, Express.js, SQLite, HTML/CSS

## Structure
- `backend/` Express API, SQLite database setup, routes and controllers
- `frontend/` HTML/CSS/JS pages for artists, albums and songs
- `Screenshots/` screenshots of the app working

## Run it
```bash
cd backend
npm install
npm start
```
Then open the pages in `frontend/` in your browser. The server prints its address when it starts.