# BeyondChats Assignment – Full Stack Project

This project was developed as part of the BeyondChats technical assignment.  
It is a three-phase full-stack project where each phase builds on the previous one, starting from data collection and ending with a frontend dashboard.

The purpose of this assignment is to demonstrate how different parts of a real-world system work together, including scraping, AI-based processing, backend APIs, and frontend rendering.

---

## Phase 1 – Article Scraping

The first phase focuses on collecting article data from the provided BeyondChats blog URLs.

A Node.js script is used to scrape content from the web pages. Only the relevant article text is extracted, while unnecessary elements such as scripts, styles, navigation bars, and embedded components are removed.

Each article is saved as a plain text file for further processing.

### What this phase does
- Accepts article URLs as input  
- Scrapes article titles and main content  
- Cleans the extracted text  
- Saves the content into `.txt` files  

### Technologies used
- Node.js  
- Axios  
- Cheerio  

---

## Phase 2 – Article Rewriting (LLM-Based)

In the second phase, the articles scraped in Phase 1 are rewritten using a Large Language Model (LLM).

This phase demonstrates how AI can be integrated to rewrite or improve existing content. The rewritten articles are stored separately so that original and updated versions can be compared.

Error handling is implemented to ensure the application continues running even if the AI service fails or returns an empty response.

### What this phase does
- Reads original article text files  
- Sends content to an LLM for rewriting  
- Generates rewritten versions of each article  
- Stores rewritten articles separately  

### Technologies used
- Node.js  
- LLM API  
- dotenv  

---

## Phase 3 – Frontend Article Dashboard

The final phase focuses on displaying the articles using a frontend application.

A Laravel backend exposes APIs for:
- Original articles  
- Rewritten articles  

A ReactJS frontend fetches this data and displays it in a clean, responsive, and professional UI. Users can switch between original and rewritten versions of articles easily.

The frontend also handles loading states and API errors properly.

### What this phase does
- Fetches data from Laravel APIs  
- Displays original and rewritten articles  
- Provides a responsive and professional UI  
- Handles loading and error states  

### Technologies used
- Laravel (API backend)  
- ReactJS (Vite)  
- Axios  
- JSX and CSS in a single file  

---

## Project Overview

This project demonstrates an end-to-end workflow involving:
- Web scraping  
- AI-based content rewriting  
- API development  
- Frontend data visualization  

Together, these phases show how multiple technologies can be combined to build a complete full-stack application.
