# Election Process Education Assistant

A fully interactive, single-file HTML widget designed to educate users about democratic election processes. Built as a seamless frontend application without external dependencies (aside from the Anthropic AI integration).

## Features

- **Overview Dashboard:** Provides a quick statistical snapshot of elections worldwide.
- **Interactive Timeline:** A dynamic, filterable timeline detailing the 10 distinct phases of a standard election from pre-election announcements to post-election certification.
- **Key Topics Breakdown:** Deep-dive cards explaining core concepts like Voter Registration, Ballot Types, Voting Systems, and the Electoral College.
- **Knowledge Quiz:** A built-in assessment tool to test users' understanding of electoral systems, complete with progress tracking and feedback.
- **Searchable Glossary:** Instant lookup for 20+ common political and electoral terms.
- **AI Education Assistant:** Integrated chat interface powered by Anthropic's Claude API. Ask any election-related question and get instant, non-partisan, educational answers.

## Setup & Usage

Because this widget is entirely self-contained within a single HTML file, there is no build process or backend required to run it locally.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/omjadhav9641/Election-Process-Education.git
   ```

2. **Open the widget:**
   Open `election_widget.html` directly in your favorite web browser, or use a local development server like VS Code Live Server for the best experience.

3. **Using the AI Chat:**
   - Navigate to the **Ask AI** tab.
   - Enter your personal **Anthropic API Key** in the provided input box to activate the chat.
   - Click "Save" and start asking questions! (Note: The API key is not stored permanently and will reset when the page refreshes for your security).

## Technologies Used

- **HTML5 & CSS3:** Semantic structure and custom responsive styling using Flexbox and CSS Variables. Full support for system-based Dark/Light modes.
- **Vanilla JavaScript (ES6+):** Complete logic management for the SPA (Single Page Application) feel, including DOM manipulation, quiz state management, and asynchronous API calls.
- **Anthropic Claude API:** Uses the `claude-3-5-sonnet-20241022` model to power the educational chat capabilities.

## Note on Security

The HTML file uses the `anthropic-dangerous-direct-browser-access` header to allow CORS bypass for demonstration purposes. In a production environment, API calls should be routed through a secure backend to prevent exposing the raw API key to the client.
