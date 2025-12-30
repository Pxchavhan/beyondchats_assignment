📚 BeyondChats Assignment – Full Stack Article Processing System

This project is a 3-phase full-stack application built as part of the BeyondChats assignment.
It covers web scraping, AI-based article rewriting, backend API development, and frontend UI rendering.

🧩 Project Overview

The system performs the following tasks:

Phase 1 – Scrapes articles from given URLs and stores them as text files

Phase 2 – Rewrites scraped articles using an AI model and stores updated versions

Phase 3 – Displays original and updated articles in a ReactJS dashboard using Laravel APIs

Each phase builds upon the previous one.

✅ Phase 1: Article Scraping (Backend)
Objective

Scrape articles from provided URLs and store them locally in text format.

Key Features

Accepts a list of article URLs

Extracts article title and content

Saves each article as a .txt file

Handles invalid or unreachable URLs gracefully

Technologies Used

Node.js

Axios

Cheerio

File System (fs)


✅ Phase 2: Article Rewriting using AI
Objective

Rewrite the scraped articles using an AI model and store updated versions.

Key Features

Reads original article text files

Sends content to AI rewriting API

Generates rewritten versions

Saves rewritten articles separately

Preserves article structure and readability

Technologies Used

Node.js

AI Text Rewriting API

dotenv for environment variables

File System (fs)



✅ Phase 3: Frontend Dashboard (React + Laravel)
Objective

Display original articles and rewritten articles in a professional UI.

🖥 Backend (Laravel API)
Features

REST APIs to fetch articles

Separate endpoints for:

Original articles

Updated (rewritten) articles

CORS enabled for frontend access

API Endpoints
Method	Endpoint	Description
GET	/api/articles	Fetch original articles
GET	/api/articles/updated	Fetch rewritten articles
Technologies Used

Laravel

PHP

REST API

CORS configuration

🎨 Frontend (ReactJS)
Features

Single-page React dashboard

Fetches data from Laravel APIs

Tab-based navigation:

Original Articles

Updated Articles

Responsive and clean UI

Graceful error handling

Technologies Used

React (Vite)

Axios

JSX + CSS in a single file

JavaScript
