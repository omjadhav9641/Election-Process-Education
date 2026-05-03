const fs = require('fs');

const fileContent = `<meta http-equiv="Content-Security-Policy" content="default-src 'self' https://api.anthropic.com https://www.gstatic.com https://fonts.googleapis.com https://translate.google.com; script-src 'self' 'unsafe-inline' https://www.gstatic.com https://translate.google.com 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https://www.gstatic.com https://translate.google.com https://translate.googleapis.com data:;">
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
<script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
<script src="https://www.gstatic.com/charts/loader.js"></script>

<style>
body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #e5e7eb; box-sizing: border-box; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0; }
.skip-link { position: absolute; top: -40px; left: 0; background: #185FA5; color: white; padding: 8px; z-index: 100; transition: top 0.2s; text-decoration: none; font-family: sans-serif; font-weight: 500;}
.skip-link:focus { top: 0; }

.ep-widget {
  --font-sans: 'Roboto', system-ui, -apple-system, sans-serif;
  --color-text-primary: #1e293b;
  --color-text-secondary: #475569;
  --color-background-primary: #ffffff;
  --color-background-secondary: #f8fafc;
  --color-border-tertiary: #e2e8f0;
  --color-border-secondary: #cbd5e1;
  --color-background-info: #eff6ff;
  --color-text-info: #2563eb;
  --color-background-success: #f0fdf4;
  --color-text-success: #16a34a;
  --color-background-danger: #fef2f2;
  --color-text-danger: #dc2626;
  --border-radius-md: 8px;
  --border-radius-lg: 16px;
  --color-blue-accent: #3b82f6;
  --color-blue-gradient: linear-gradient(135deg, #2563eb, #3b82f6);
  --color-chip-hover-bg: #eff6ff;
  --color-chip-hover-border: #bfdbfe;
  --color-chip-hover-text: #1d4ed8;
  
  display: flex; width: 100%; max-width: 100%; height: 100vh; max-height: 100vh;
  font-family: var(--font-sans); color: var(--color-text-primary);
  background: var(--color-background-primary); border: none; border-radius: 0;
  overflow: hidden; box-sizing: border-box; overflow-wrap: break-word; position: relative;
}

@media (prefers-color-scheme: dark) {
  body { background-color: #0f172a; }
  .ep-widget {
    --color-text-primary: #f8fafc;
    --color-text-secondary: #94a3b8;
    --color-background-primary: #1e293b;
    --color-background-secondary: #0f172a;
    --color-border-tertiary: #334155;
    --color-border-secondary: #475569;
    --color-background-info: #1e3a8a;
    --color-text-info: #bfdbfe;
    --color-background-success: #064e3b;
    --color-text-success: #86efac;
    --color-background-danger: #7f1d1d;
    --color-text-danger: #fca5a5;
    --color-blue-accent: #3b82f6;
    --color-blue-gradient: linear-gradient(135deg, #3b82f6, #60a5fa);
    --color-chip-hover-bg: #1e3a8a;
    --color-chip-hover-border: #3b82f6;
    --color-chip-hover-text: #eff6ff;
  }
}

.ep-widget b, .ep-widget strong { font-weight: 500; }
svg { pointer-events: none; }

.ep-sidebar { width: 220px; flex-shrink: 0; z-index: 10; background: var(--color-background-secondary); border-right: 0.5px solid var(--color-border-tertiary); display: flex; flex-direction: column; }
.ep-main { flex: 1; min-width: 0; display: flex; flex-direction: column; background: var(--color-background-primary); position: relative;}
.ep-topbar { padding: 16px; border-bottom: 0.5px solid var(--color-border-tertiary); display: flex; justify-content: space-between; align-items: center; }
.ep-topbar-left { display: flex; flex-direction: column; }
.ep-topbar-right { display: flex; align-items: center; gap: 12px; }
.ep-content-area { flex: 1; display: flex; flex-direction: column; padding: 16px 12px 16px 16px; box-sizing: border-box; overflow: hidden; }

.ep-nav { padding: 8px 0; flex: 1; }
.ep-nav-item { display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 10px 16px; font-size: 13px; font-weight: 400; color: var(--color-text-secondary); background: transparent; border: none; border-left: 3px solid transparent; cursor: pointer; text-align: left; transition: all 0.15s ease; box-sizing: border-box; }
.ep-nav-item-content { display: flex; align-items: center; gap: 10px; }
.ep-nav-item:hover { background: var(--color-background-secondary); }
.ep-nav-item.active { color: var(--color-blue-accent); border-left-color: var(--color-blue-accent); background: var(--color-chip-hover-bg); }
.ep-nav-item svg { width: 16px; height: 16px; fill: currentColor; }
.ep-nav-check { color: var(--color-text-success); display: none; font-weight: bold; }
.ep-nav-item.visited .ep-nav-check { display: block; }

.ep-section { display: none; width: 100%; height: 100%; }
.ep-section.active { display: block; overflow-y: auto; padding-right: 4px; }
#sec-askai.active { display: flex; flex-direction: column; overflow-y: hidden; }

.ep-card { background: var(--color-background-primary); border: 1px solid var(--color-border-tertiary); border-radius: var(--border-radius-lg); padding: 16px 20px; margin-bottom: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); transition: transform 0.2s ease, box-shadow 0.2s ease; }
.ep-card:hover { transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
.ep-card-title { font-size: 15px; font-weight: 600; margin-bottom: 8px; }
.ep-card-body { font-size: 14px; color: var(--color-text-secondary); line-height: 1.6; }

.ep-stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 12px; }
.ep-stat-card { background: var(--color-background-secondary); border-radius: var(--border-radius-md); padding: 12px; text-align: center; }
.ep-stat-num { font-size: 22px; color: var(--color-blue-accent); font-weight: 500; }
.ep-stat-label { font-size: 11px; color: var(--color-text-secondary); font-weight: 500; margin-top: 4px; }

.ep-btn-primary { background: var(--color-blue-gradient, var(--color-blue-accent)); color: #ffffff; border: none; border-radius: var(--border-radius-md); padding: 10px 18px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s ease; display: block; text-align: center; width: 100%; box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2); }
.ep-btn-primary:hover { opacity: 0.95; transform: translateY(-1px); box-shadow: 0 6px 8px -1px rgba(37, 99, 235, 0.3); }

.ep-chip-group { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
.ep-chip { padding: 6px 12px; font-size: 13px; font-weight: 400; color: var(--color-text-secondary); background: var(--color-background-secondary); border: 0.5px solid var(--color-border-secondary); border-radius: var(--border-radius-md); cursor: pointer; transition: all 0.15s ease; }
.ep-chip:hover, .ep-chip.selected { background: var(--color-chip-hover-bg); border-color: var(--color-chip-hover-border); color: var(--color-chip-hover-text); }

.ep-timeline { position: relative; padding-left: 24px; margin-top: 16px; }
.ep-timeline::before { content: ''; position: absolute; left: 11px; top: 8px; bottom: 8px; width: 2px; background: var(--color-border-tertiary); }
.ep-tl-item { position: relative; margin-bottom: 20px; }
.ep-tl-node { position: absolute; left: -24px; top: 2px; width: 24px; height: 24px; border-radius: 50%; background: var(--color-background-primary); border: 2px solid var(--color-blue-accent); color: var(--color-blue-accent); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 500; z-index: 1; }
.ep-tl-node.filled { background: var(--color-blue-accent); color: #ffffff; }
.ep-tl-node.teal { border-color: #0D9488; color: #0D9488; }
.ep-tl-node.teal.filled { background: #0D9488; color: #ffffff; }

.ep-tl-content { padding-left: 12px; }
.ep-tl-title { font-size: 14px; font-weight: 500; margin-bottom: 4px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.ep-tl-desc { font-size: 13px; color: var(--color-text-secondary); margin-bottom: 6px; }
.ep-badge { display: inline-flex; align-items: center; font-size: 12px; padding: 2px 8px; border-radius: 10px; font-weight: 500; }
.ep-badge.blue { background: var(--color-background-info); color: var(--color-text-info); }
.ep-badge.teal { background: #E0F2FE; color: #0369A1; } 
.ep-badge.amber { background: #FEF3C7; color: #B45309; }
.ep-badge.green { background: var(--color-background-success); color: var(--color-text-success); }
.ep-badge.filled-blue { background: var(--color-blue-accent); color: #ffffff; }

.ep-quiz-progress { height: 6px; background: var(--color-border-tertiary); border-radius: 3px; overflow: hidden; margin-bottom: 16px; }
.ep-quiz-bar { height: 100%; background: var(--color-blue-accent); width: 0%; transition: width 0.3s ease; }
.ep-quiz-header { display: flex; justify-content: space-between; font-size: 12px; color: var(--color-text-secondary); margin-bottom: 16px; font-weight: 500; }
.ep-quiz-question { font-size: 14px; font-weight: 500; margin-bottom: 16px; }
.ep-quiz-option { width: 100%; text-align: left; padding: 12px 16px; font-size: 13px; font-weight: 400; background: var(--color-background-primary); border: 0.5px solid var(--color-border-secondary); border-radius: var(--border-radius-md); margin-bottom: 8px; cursor: pointer; transition: all 0.15s ease; color: var(--color-text-primary); display: block; }
.ep-quiz-option:hover:not(:disabled) { background: var(--color-background-secondary); }
.ep-quiz-option.correct { background: var(--color-background-success); border-color: var(--color-text-success); color: var(--color-text-success); }
.ep-quiz-option.wrong { background: var(--color-background-danger); border-color: var(--color-text-danger); color: var(--color-text-danger); }
.ep-quiz-feedback { padding: 12px; border-radius: var(--border-radius-md); font-size: 13px; margin-top: 16px; display: none; }
.ep-quiz-feedback.success { background: var(--color-background-success); color: var(--color-text-success); border: 0.5px solid var(--color-text-success); }
.ep-quiz-feedback.danger { background: var(--color-background-danger); color: var(--color-text-danger); border: 0.5px solid var(--color-text-danger); }

.ep-search { width: 100%; padding: 8px 12px; font-size: 13px; font-weight: 400; border: 0.5px solid var(--color-border-secondary); border-radius: var(--border-radius-md); background: var(--color-background-primary); color: var(--color-text-primary); margin-bottom: 16px; box-sizing: border-box; font-family: var(--font-sans); }
.ep-search:focus { outline: 1px solid var(--color-blue-accent); }
.ep-term { font-size: 13px; margin-bottom: 12px; line-height: 1.5; }
.ep-term-name { color: var(--color-blue-accent); font-weight: 500; }
.ep-term-def { color: var(--color-text-secondary); }

.ep-chat-container { display: flex; flex-direction: column; height: 100%; width: 100%; }
.ep-chat-messages { flex: 1; overflow-y: auto; margin-bottom: 16px; display: flex; flex-direction: column; gap: 16px; padding-right: 8px; }
.ep-message { display: flex; gap: 12px; animation: epFadeIn 0.25s ease-out forwards; }
@keyframes epFadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
.ep-avatar { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 500; flex-shrink: 0; }
.ep-avatar-ai { background: var(--color-background-info); color: var(--color-text-info); }
.ep-avatar-user { background: var(--color-background-secondary); color: var(--color-text-secondary); }
.ep-msg-bubble { background: var(--color-background-primary); border: 0.5px solid var(--color-border-tertiary); border-radius: var(--border-radius-lg); padding: 10px 14px; font-size: 13px; line-height: 1.5; color: var(--color-text-primary); overflow-wrap: break-word; }
.ep-msg-bubble ol, .ep-msg-bubble ul { margin: 8px 0; padding-left: 20px; }
.ep-chat-input-area { position: relative; display: flex; align-items: flex-end; gap: 8px; background: var(--color-background-primary); border: 0.5px solid var(--color-border-secondary); border-radius: var(--border-radius-md); padding: 8px; }
.ep-chat-textarea { flex: 1; border: none; resize: none; max-height: 100px; min-height: 20px; font-size: 13px; font-weight: 400; font-family: var(--font-sans); background: transparent; color: var(--color-text-primary); outline: none; }
.ep-chat-send { width: 28px; height: 28px; border-radius: 50%; background: var(--color-blue-accent); color: #ffffff; border: 0.5px solid var(--color-border-secondary); display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; transition: opacity 0.15s ease; }
.ep-chat-send:hover { opacity: 0.9; }
.ep-chat-send:disabled { opacity: 0.5; cursor: not-allowed; }
.ep-typing { display: flex; gap: 4px; padding: 10px 14px; }
.ep-dot { width: 6px; height: 6px; background: var(--color-text-secondary); border-radius: 50%; animation: epPulse 1.4s infinite both; }
.ep-dot:nth-child(1) { animation-delay: -0.32s; }
.ep-dot:nth-child(2) { animation-delay: -0.16s; }
@keyframes epPulse { 0%, 80%, 100% { transform: scale(0); opacity: 0.5; } 40% { transform: scale(1); opacity: 1; } }

.ep-section::-webkit-scrollbar, .ep-chat-messages::-webkit-scrollbar { width: 6px; }
.ep-section::-webkit-scrollbar-track, .ep-chat-messages::-webkit-scrollbar-track { background: transparent; }
.ep-section::-webkit-scrollbar-thumb, .ep-chat-messages::-webkit-scrollbar-thumb { background: var(--color-border-tertiary); border-radius: 3px; }

/* Test Panel Styles */
.ep-test-panel { position: absolute; top: 0; right: 0; bottom: 0; width: 350px; background: var(--color-background-primary); border-left: 1px solid var(--color-border-secondary); z-index: 1000; display: none; flex-direction: column; box-shadow: -4px 0 15px rgba(0,0,0,0.1); }
.ep-test-panel.open { display: flex; }
.ep-test-header { padding: 16px; border-bottom: 1px solid var(--color-border-tertiary); display: flex; justify-content: space-between; align-items: center; }
.ep-test-body { flex: 1; overflow-y: auto; padding: 16px; }
.ep-test-item { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid var(--color-border-tertiary); font-size: 13px; }
.ep-test-status { font-weight: bold; }
.ep-test-pass { color: var(--color-text-success); }
.ep-test-fail { color: var(--color-text-danger); }
.ep-test-summary { margin-top: 16px; padding: 12px; border-radius: var(--border-radius-md); font-weight: bold; text-align: center; }
.ep-test-summary.all-pass { background: var(--color-background-success); color: var(--color-text-success); border: 1px solid var(--color-text-success); }
.ep-test-summary.some-fail { background: var(--color-background-danger); color: var(--color-text-danger); border: 1px solid var(--color-text-danger); }

/* Country Select */
.country-select { padding: 6px; border-radius: var(--border-radius-md); border: 1px solid var(--color-border-secondary); background: var(--color-background-primary); color: var(--color-text-primary); font-size: 13px; font-family: var(--font-sans); }

/* Charts */
.ep-chart-container { width: 100%; height: 250px; margin-bottom: 16px; }
.ep-ext-link { color: var(--color-text-info); text-decoration: underline; font-size: 12px; display: inline-block; margin-top: 8px;}
</style>

<a href="#main-content" class="skip-link">Skip to main content</a>
<h2 class="sr-only">Election Process Education Assistant</h2>
<div class="ep-widget">
  <div class="ep-sidebar" role="navigation" aria-label="Main Navigation">
    <div style="padding: 16px; border-bottom: 0.5px solid var(--color-border-tertiary);">
       <div style="font-weight: 500; font-size: 15px; display: flex; align-items: center; gap: 8px;">
          <svg viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: var(--color-blue-accent);" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
          ElectionEdu
       </div>
       <div style="font-size: 11px; color: var(--color-text-secondary); margin-top: 4px;">Education Assistant</div>
    </div>
    <nav class="ep-nav" id="main-nav">
       <button class="ep-nav-item active visited" data-target="overview" aria-current="page">
          <div class="ep-nav-item-content">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg> Overview
          </div>
          <span class="ep-nav-check" aria-hidden="true" aria-label="Completed">✔</span>
       </button>
       <button class="ep-nav-item" data-target="timeline">
          <div class="ep-nav-item-content">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/><path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg> Timeline
          </div>
          <span class="ep-nav-check" aria-hidden="true" aria-label="Completed">✔</span>
       </button>
       <button class="ep-nav-item" data-target="topics">
          <div class="ep-nav-item-content">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z"/></svg> Key Topics
          </div>
          <span class="ep-nav-check" aria-hidden="true" aria-label="Completed">✔</span>
       </button>
       <button class="ep-nav-item" data-target="quiz">
          <div class="ep-nav-item-content">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> Quiz
          </div>
          <span class="ep-nav-check" aria-hidden="true" aria-label="Completed">✔</span>
       </button>
       <button class="ep-nav-item" data-target="glossary">
          <div class="ep-nav-item-content">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg> Glossary
          </div>
          <span class="ep-nav-check" aria-hidden="true" aria-label="Completed">✔</span>
       </button>
       <button class="ep-nav-item" data-target="askai">
          <div class="ep-nav-item-content">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z"/></svg> Ask AI
          </div>
          <span class="ep-nav-check" aria-hidden="true" aria-label="Completed">✔</span>
       </button>
    </nav>
  </div>
  
  <div class="ep-main" role="main" id="main-content">
    <div class="ep-topbar">
       <div class="ep-topbar-left">
         <div id="ep-page-title" style="font-weight: 500; font-size: 15px;">Overview</div>
         <div id="ep-page-subtitle" style="font-size: 12px; color: var(--color-text-secondary); margin-top: 2px;">Your guide to democratic processes</div>
       </div>
       <div class="ep-topbar-right">
         <div id="google_translate_element" style="display:inline-block; margin-right: 8px;"></div>
         <select id="country-select" class="country-select" aria-label="Select Country Context">
           <option value="General">General</option>
           <option value="India">India</option>
           <option value="USA">USA</option>
           <option value="UK">UK</option>
           <option value="Germany">Germany</option>
           <option value="Australia">Australia</option>
           <option value="France">France</option>
           <option value="Brazil">Brazil</option>
         </select>
         <button id="btn-run-tests" class="ep-btn-primary" style="width: auto;">Run Tests</button>
       </div>
    </div>
    <div class="ep-content-area">
       
       <!-- OVERVIEW -->
       <div id="sec-overview" class="ep-section active" role="region" aria-label="Overview Section">
         <div style="display: flex; gap: 16px;">
           <div id="chart-phases" class="ep-chart-container" style="flex: 1;" aria-label="Election Phases Chart"></div>
           <div id="chart-topics" class="ep-chart-container" style="flex: 1;" aria-label="Quiz Topics Distribution Chart"></div>
         </div>
         <div class="ep-card">
           <div class="ep-card-title">What is an election?</div>
           <div class="ep-card-body" id="overview-desc-1">A formal group decision-making process by which a population chooses an individual or multiple individuals to hold public office. Elections have been the usual mechanism by which modern representative democracy has operated since the 17th century.</div>
         </div>
         <div class="ep-card">
           <div class="ep-card-title">6 phases of every election</div>
           <div class="ep-card-body" id="overview-desc-2"><b>1. Announcement</b> &rarr; <b>2. Nomination</b> &rarr; <b>3. Campaign</b> &rarr; <b>4. Voting</b> &rarr; <b>5. Counting</b> &rarr; <b>6. Certification</b></div>
         </div>
         <div class="ep-card">
           <div class="ep-card-title">5 types of elections</div>
           <div class="ep-card-body">
             • <b>General:</b> Regular election for candidates<br>
             • <b>Primary:</b> Internal party selection<br>
             • <b>Local:</b> Municipal or regional offices<br>
             • <b>Referendum:</b> Direct vote on a proposal<br>
             • <b>By-election:</b> Filling a sudden vacancy
           </div>
         </div>
         <button id="btn-explore-timeline" class="ep-btn-primary">Explore the full timeline &rarr;</button>
       </div>

       <!-- TIMELINE -->
       <div id="sec-timeline" class="ep-section" role="region" aria-label="Timeline Section">
         <div class="ep-chip-group" id="timeline-filters">
           <!-- Rendered via JS -->
         </div>
         <div class="ep-timeline" id="timeline-list">
            <!-- Rendered via JS -->
         </div>
       </div>

       <!-- KEY TOPICS -->
       <div id="sec-topics" class="ep-section" role="region" aria-label="Key Topics Section">
         <div class="ep-chip-group" id="topic-chips">
           <!-- Rendered via JS -->
         </div>
         <div id="topic-content" class="ep-card" style="margin-top: 16px;">
           <!-- JS will populate this -->
         </div>
       </div>

       <!-- QUIZ -->
       <div id="sec-quiz" class="ep-section" role="region" aria-label="Quiz Section">
         <div id="quiz-active">
           <div class="ep-quiz-progress">
             <div id="quiz-progress-bar" class="ep-quiz-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
           </div>
           <div class="ep-quiz-header">
             <span id="quiz-status">Question 1 of 8</span>
             <span>Score: <span id="quiz-score-count">0</span></span>
           </div>
           <div id="quiz-q-text" class="ep-quiz-question"></div>
           <div id="quiz-options"></div>
           <div id="quiz-feedback" class="ep-quiz-feedback" aria-live="assertive"></div>
           <button id="quiz-next" class="ep-btn-primary" style="display: none; margin-top: 16px;">Next question &rarr;</button>
         </div>
         <div id="quiz-done" style="display: none; text-align: center; margin-top: 40px;">
           <div class="ep-stat-num" id="quiz-final-score" style="font-size: 36px;"></div>
           <div id="quiz-final-msg" style="font-weight: 500; margin: 12px 0;"></div>
           <button id="quiz-retake" class="ep-btn-primary" style="margin: 24px auto; width: auto;">Retake quiz</button>
         </div>
       </div>

       <!-- GLOSSARY -->
       <div id="sec-glossary" class="ep-section" role="region" aria-label="Glossary Section">
         <input type="text" id="glossary-search" class="ep-search" placeholder="Search terms..." aria-label="Search Glossary">
         <div id="glossary-list"></div>
       </div>

       <!-- ASK AI -->
       <div id="sec-askai" class="ep-section" role="region" aria-label="Ask AI Section">
         <div class="ep-chat-container">
           <div style="background: var(--color-background-info); color: var(--color-text-info); padding: 8px 12px; font-size: 12px; border-radius: var(--border-radius-md); margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
             <svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:currentColor;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
             Your API key is used locally in your browser only and is never stored or transmitted to any third party server.
           </div>
           <div id="api-key-container" style="display: flex; gap: 8px; margin-bottom: 12px; flex-shrink: 0;">
             <input type="password" id="api-key-input" class="ep-search" style="margin: 0; flex: 1;" placeholder="Enter Anthropic API Key" aria-label="Anthropic API Key">
             <button id="api-key-save" class="ep-btn-primary" style="margin: 0; width: auto;">Save</button>
           </div>
           <div id="ai-error-card" style="display:none; background: var(--color-background-danger); color: var(--color-text-danger); padding: 8px 12px; border-radius: var(--border-radius-md); font-size: 12px; margin-bottom: 12px; border: 1px solid var(--color-text-danger);"></div>
           <div class="ep-chip-group" style="margin-bottom: 12px; flex-shrink: 0;" id="ai-quick-chips">
             <!-- Rendered via JS -->
           </div>
           <div id="chat-messages" class="ep-chat-messages" aria-live="polite">
              <!-- Rendered via JS -->
           </div>
           <div class="ep-chat-input-area" style="flex-shrink: 0;">
             <textarea id="chat-input" class="ep-chat-textarea" placeholder="Ask about elections..." rows="1" aria-label="Type your message"></textarea>
             <button id="chat-send" class="ep-chat-send" aria-label="Send message">
                <svg viewBox="0 0 24 24" style="width:14px;height:14px;fill:white;" aria-hidden="true"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
             </button>
           </div>
         </div>
       </div>

    </div>
    
    <!-- Test Results Panel -->
    <div id="test-panel" class="ep-test-panel">
      <div class="ep-test-header">
        <div style="font-weight: 500;">Test Suite Results</div>
        <button id="close-tests" style="background:none;border:none;cursor:pointer;font-size:16px;" aria-label="Close test panel">&times;</button>
      </div>
      <div class="ep-test-body">
        <div id="test-results-list"></div>
        <div id="test-summary" class="ep-test-summary"></div>
      </div>
    </div>

  </div>
</div>

<script>
function googleTranslateElementInit() {
  if (window.google && google.translate) {
    new google.translate.TranslateElement({pageLanguage: 'en', includedLanguages: 'en,hi,es,fr,ar,ta'}, 'google_translate_element');
  }
}

(function() {
function initWidget() {
  /** Centralized application state */
  const AppState = {
    currentSection: 'overview',
    quizIndex: 0,
    quizScore: 0,
    chatHistory: [],
    rateLimitTimestamps: [],
    rendered: {
      timeline: false,
      topics: false,
      quiz: false,
      glossary: false
    },
    visited: new Set(['overview']),
    country: 'General'
  };

  /** Cached DOM elements */
  const DOM = {
    navItems: document.querySelectorAll('.ep-nav-item'),
    sections: document.querySelectorAll('.ep-section'),
    pageTitle: document.getElementById('ep-page-title'),
    pageSubtitle: document.getElementById('ep-page-subtitle'),
    timelineFilters: document.getElementById('timeline-filters'),
    timelineList: document.getElementById('timeline-list'),
    topicChips: document.getElementById('topic-chips'),
    topicContent: document.getElementById('topic-content'),
    quizQText: document.getElementById('quiz-q-text'),
    quizOptions: document.getElementById('quiz-options'),
    quizFeedback: document.getElementById('quiz-feedback'),
    quizNext: document.getElementById('quiz-next'),
    quizProgress: document.getElementById('quiz-progress-bar'),
    quizStatus: document.getElementById('quiz-status'),
    quizScoreCount: document.getElementById('quiz-score-count'),
    quizDone: document.getElementById('quiz-done'),
    quizActive: document.getElementById('quiz-active'),
    quizFinalScore: document.getElementById('quiz-final-score'),
    quizFinalMsg: document.getElementById('quiz-final-msg'),
    quizRetake: document.getElementById('quiz-retake'),
    glossaryList: document.getElementById('glossary-list'),
    glossarySearch: document.getElementById('glossary-search'),
    chatMessages: document.getElementById('chat-messages'),
    chatInput: document.getElementById('chat-input'),
    chatSend: document.getElementById('chat-send'),
    aiQuickChips: document.getElementById('ai-quick-chips'),
    apiKeyInput: document.getElementById('api-key-input'),
    apiKeySave: document.getElementById('api-key-save'),
    apiKeyContainer: document.getElementById('api-key-container'),
    aiErrorCard: document.getElementById('ai-error-card'),
    countrySelect: document.getElementById('country-select'),
    btnExplore: document.getElementById('btn-explore-timeline'),
    testPanel: document.getElementById('test-panel'),
    btnRunTests: document.getElementById('btn-run-tests'),
    closeTests: document.getElementById('close-tests'),
    testResultsList: document.getElementById('test-results-list'),
    testSummary: document.getElementById('test-summary'),
    chartPhases: document.getElementById('chart-phases'),
    chartTopics: document.getElementById('chart-topics'),
    overviewDesc1: document.getElementById('overview-desc-1'),
    overviewDesc2: document.getElementById('overview-desc-2')
  };

  /** Data stores separated from logic */
  const Data = {
    quizQuestions: [
      { q: "Electoral College votes needed to win US presidency", options: ["269", "270", "300", "538"], ans: 1, expl: "A majority of the 538 electoral votes (270) is needed to win." },
      { q: "Country with compulsory voting", options: ["United States", "India", "Australia", "United Kingdom"], ans: 2, expl: "Australia enforces compulsory voting for federal elections." },
      { q: "What is a primary election", options: ["The final election", "Party's internal candidate selection", "A local election only", "Voting by mail"], ans: 1, expl: "Primaries are used by political parties to choose their candidates for the general election." },
      { q: "What is gerrymandering", options: ["Voter fraud", "Campaign financing", "Drawing district boundaries to favor a party", "A type of ballot"], ans: 2, expl: "Gerrymandering manipulates district boundaries to create an electoral advantage." },
      { q: "Which system allocates seats by vote %", options: ["Proportional representation", "First-past-the-post", "Electoral College", "Two-round system"], ans: 0, expl: "Proportional representation ensures seats closely match the percentage of votes received." },
      { q: "What is a provisional ballot", options: ["A test ballot", "Issued when registration can't be verified", "An early ballot", "A digital ballot"], ans: 1, expl: "Provisional ballots are kept separate and counted only after the voter's eligibility is confirmed." },
      { q: "What does 'canvassing' mean post-election", options: ["Campaigning", "Official ballot review", "Calling voters", "Swearing in"], ans: 1, expl: "Post-election canvassing is the official tally and review of election results." },
      { q: "India uses which voting method", options: ["Ranked-choice", "Mail-in only", "Electronic Voting Machines (EVMs)", "Caucus"], ans: 2, expl: "India uses EVMs to handle its massive electorate efficiently." }
    ],
    glossaryTerms: [
      { term: "Ballot", def: "The official device (paper or electronic) used to cast a vote." },
      { term: "By-election", def: "An election held to fill a political office that has become vacant between general elections." },
      { term: "Canvassing", def: "The official post-election review of ballots to ensure accuracy before certification." },
      { term: "Caucus", def: "A local meeting where registered members of a political party gather to vote for their preferred candidate." },
      { term: "Certification", def: "The official sign-off on election results, confirming the winners." },
      { term: "Coalition government", def: "A government formed jointly by more than one political party, common in PR systems." },
      { term: "Electoral College", def: "The body of electors that officially elects the US president." },
      { term: "Franchise", def: "The legal right to vote." },
      { term: "General election", def: "A regular election involving all or most constituencies of a state or nation." },
      { term: "Gerrymandering", def: "Manipulating electoral district boundaries to give an unfair advantage to a political party." },
      { term: "Incumbent", def: "The current holder of a political office." },
      { term: "Mandate", def: "The authority granted by a constituency to act as its representative." },
      { term: "Polling station", def: "The location where voters go to cast their ballots." },
      { term: "Precinct", def: "One of several districts into which a city or town is divided for voting." },
      { term: "Primary election", def: "An election that narrows the field of candidates before a general election." },
      { term: "Proportional representation", def: "An electoral system in which parties gain seats in proportion to the number of votes cast for them." },
      { term: "Provisional ballot", def: "A ballot used when there are questions about a voter's eligibility." },
      { term: "Ranked-choice voting", def: "An electoral system in which voters rank candidates by preference." },
      { term: "Recount", def: "A repeat tabulation of votes cast in an election to ensure accuracy." },
      { term: "Referendum", def: "A direct vote by the electorate on a particular proposal or issue." },
      { term: "Runoff election", def: "A second election held to determine a winner when no candidate receives a required majority." },
      { term: "Suffrage", def: "The right to vote in political elections." },
      { term: "Swing state", def: "A US state where the two major political parties have similar levels of support among voters." },
      { term: "Voter suppression", def: "Strategy used to influence the outcome of an election by discouraging or preventing specific groups from voting." },
      { term: "Voter turnout", def: "The percentage of eligible voters who cast a ballot in an election." }
    ],
    topicsData: {
      voter_registration: { id: "voter_registration", title: 'Voter Registration', body: '<b>Auto registration:</b> Citizens are automatically registered upon turning 18.<br><b>Active registration:</b> Requires voters to submit forms themselves.<br><b>Same-day registration:</b> Allows registering at the polling place on election day.<br><br><b>Requirements:</b> Typically citizenship, age (18+), and residency.', link: 'https://en.wikipedia.org/wiki/Voter_registration' },
      ballot_types: { id: "ballot_types", title: 'Ballot Types', body: '<b>Paper:</b> Hand-marked, highly auditable.<br><b>EVM (Electronic Voting Machines):</b> Fast counting, used widely in India.<br><b>Mail-in/absentee:</b> Sent via post, broadens access.<br><b>Provisional:</b> Given when voter eligibility is uncertain, counted after verification.', link: 'https://en.wikipedia.org/wiki/Ballot' },
      voting_systems: { id: "voting_systems", title: 'Voting Systems', body: '<b>FPTP (First Past The Post):</b> Candidate with the most votes wins, even without a majority.<br><b>Proportional representation (PR):</b> Parties gain seats proportional to the number of votes cast for them.<br><b>Ranked-choice (RCV):</b> Voters rank candidates by preference.<br><b>Two-round:</b> Top two candidates face off if no one gets over 50%.', link: 'https://en.wikipedia.org/wiki/Electoral_system' },
      electoral_college: { id: "electoral_college", title: 'Electoral College', body: '<b>How it works:</b> Indirect election system used in the US.<br><b>Winner-takes-all:</b> In most states, the popular vote winner gets all electoral votes.<br><b>270 needed:</b> A majority of the 538 total votes is required to win.<br><b>Controversy:</b> Can result in the popular vote winner losing the election.', link: 'https://en.wikipedia.org/wiki/United_States_Electoral_College' },
      election_integrity: { id: "election_integrity", title: 'Election Integrity', body: '<b>Voter ID:</b> Requirements vary globally to prevent impersonation.<br><b>Chain of custody:</b> Secure handling of ballots from polling station to counting center.<br><b>Audits:</b> Verification of results against paper trails.<br><b>Observers:</b> Independent monitors who watch the voting and counting process.<br><b>Recounts:</b> Triggered when margins are extremely tight.', link: 'https://en.wikipedia.org/wiki/Election_integrity' },
      global_comparison: { id: "global_comparison", title: 'Global Comparison', body: '<b>India:</b> Uses EVMs, largest democracy with ~900M voters.<br><b>US:</b> Decentralized system, Electoral College for president.<br><b>UK:</b> First-past-the-post system for Parliament.<br><b>Germany:</b> Mixed-member proportional representation.<br><b>Australia:</b> Compulsory voting, Ranked-choice voting (RCV).', link: 'https://en.wikipedia.org/wiki/Comparative_politics' }
    },
    timelineSteps: [
      { phase: 'pre', node: '1', title: 'Election announcement', badgeClass: 'blue', badgeText: 'Months–years before', desc: 'The official declaration that an election will take place.' },
      { phase: 'pre', node: '2', title: 'Voter registration', badgeClass: 'teal', badgeText: 'Weeks before deadline', desc: 'Citizens ensure their names are on the electoral roll.' },
      { phase: 'pre', node: '3', title: 'Candidate nomination', badgeClass: 'amber', badgeText: 'Months before', desc: 'Individuals officially declare their intent to run for office.' },
      { phase: 'pre', node: '4', title: 'Primary / party selection', badgeClass: 'blue', badgeText: 'Months before general', desc: 'Parties choose their final candidate for the main election.' },
      { phase: 'pre', node: '5', title: 'Campaign period', badgeClass: 'amber', badgeText: 'Weeks to months', desc: 'Candidates hold rallies, debate, and share their platform.' },
      { phase: 'election', node: '6', nodeClass: 'filled', title: 'Election day voting', badgeClass: 'filled-blue', badgeText: 'Election day', desc: 'Voters cast their ballots at designated polling stations.' },
      { phase: 'election', node: '7', title: 'Early & absentee voting', badgeClass: 'blue', badgeText: 'Days to weeks before', desc: 'Voting options for those who cannot attend on election day.' },
      { phase: 'post', node: '8', title: 'Vote counting', badgeClass: 'green', badgeText: 'Election night / days after', desc: 'Officials tabulate the ballots to determine the winner.' },
      { phase: 'post', node: '9', title: 'Canvassing & audit', badgeClass: 'amber', badgeText: 'Days to weeks after', desc: 'Official review to verify the accuracy of the counted votes.' },
      { phase: 'post', node: '10', nodeClass: 'teal filled', title: 'Certification & inauguration', badgeClass: 'teal', badgeText: 'Weeks to months later', desc: 'Results are certified and the winner officially assumes office.' }
    ],
    aiQueries: [
      "Explain voter registration",
      "What happens on election day?",
      "How does vote counting work?",
      "What is gerrymandering?",
      "Explain the Electoral College"
    ]
  };

  /** Section Metadata */
  const sectionMeta = {
    overview: { title: 'Overview', sub: 'Your guide to democratic processes' },
    timeline: { title: 'Timeline', sub: 'Phases of an election' },
    topics: { title: 'Key Topics', sub: 'Deep dives into electoral concepts' },
    quiz: { title: 'Quiz', sub: 'Test your election knowledge' },
    glossary: { title: 'Glossary', sub: 'Electoral terms and definitions' },
    askai: { title: 'Ask AI', sub: 'Chat with our election expert' }
  };

  /** Cache for memoized topic cards */
  const topicCache = {};

  /**
   * Debounce utility
   * @param {Function} fn Function to execute
   * @param {number} delay Delay in ms
   * @returns {Function} Debounced function
   */
  function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  /**
   * Input sanitization utility
   * @param {string} str String to sanitize
   * @returns {string} Sanitized string
   */
  function sanitize(str) {
    return str.replace(/<[^>]*>/g, '').trim();
  }

  /**
   * Creates a chat message bubble element
   * @param {string} role 'user' or 'assistant'
   * @param {string} text Message text
   * @returns {HTMLElement} Message element
   */
  function createBubble(role, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'ep-message';
    
    const avatar = document.createElement('div');
    avatar.className = 'ep-avatar ' + (role === 'user' ? 'ep-avatar-user' : 'ep-avatar-ai');
    avatar.textContent = role === 'user' ? 'You' : 'AI';
    
    const bubble = document.createElement('div');
    bubble.className = 'ep-msg-bubble';
    
    if (role === 'user') {
      bubble.textContent = text;
    } else {
      const parts = text.split(/(\\*\\*.*?\\*\\*)/g);
      parts.forEach(part => {
        if (part.startsWith('**') && part.endsWith('**')) {
          const b = document.createElement('b');
          b.textContent = part.slice(2, -2);
          bubble.appendChild(b);
        } else {
          const lines = part.split('\\n');
          lines.forEach((line, idx) => {
            if (idx > 0) bubble.appendChild(document.createElement('br'));
            bubble.appendChild(document.createTextNode(line));
          });
        }
      });
    }
    
    msgDiv.appendChild(avatar);
    msgDiv.appendChild(bubble);
    return msgDiv;
  }

  /**
   * Creates a chip element
   * @param {string} label Text label
   * @param {Function} onClick Click handler
   * @param {boolean} isSelected Initial selected state
   * @returns {HTMLElement} Chip element
   */
  function createChip(label, onClick, isSelected = false) {
    const chip = document.createElement('div');
    chip.className = 'ep-chip' + (isSelected ? ' selected' : '');
    chip.textContent = label;
    chip.setAttribute('role', 'button');
    chip.setAttribute('tabindex', '0');
    chip.setAttribute('aria-pressed', isSelected.toString());
    chip.onclick = onClick;
    chip.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } };
    return chip;
  }

  /**
   * Creates a timeline item element
   * @param {Object} step Step data
   * @returns {HTMLElement} Timeline item element
   */
  function createTimelineItem(step) {
    const item = document.createElement('div');
    item.className = 'ep-tl-item';
    item.setAttribute('data-phase', step.phase);
    
    const node = document.createElement('div');
    node.className = 'ep-tl-node ' + (step.nodeClass || '');
    node.textContent = step.node;
    
    const content = document.createElement('div');
    content.className = 'ep-tl-content';
    
    const title = document.createElement('div');
    title.className = 'ep-tl-title';
    title.textContent = step.title + ' ';
    
    const badge = document.createElement('span');
    badge.className = 'ep-badge ' + step.badgeClass;
    badge.innerHTML = '<span class="sr-only">Phase time: </span>' + step.badgeText;
    title.appendChild(badge);
    
    const desc = document.createElement('div');
    desc.className = 'ep-tl-desc';
    desc.textContent = step.desc;
    
    content.appendChild(title);
    content.appendChild(desc);
    item.appendChild(node);
    item.appendChild(content);
    return item;
  }

  /** Initialize Navigation */
  function initNavigation() {
    DOM.navItems.forEach(item => {
      item.addEventListener('click', () => {
        const target = item.getAttribute('data-target');
        
        DOM.navItems.forEach(n => {
          n.classList.remove('active');
          n.removeAttribute('aria-current');
        });
        item.classList.add('active', 'visited');
        item.setAttribute('aria-current', 'page');
        
        DOM.sections.forEach(s => s.classList.remove('active'));
        document.getElementById('sec-' + target).classList.add('active');
        
        DOM.pageTitle.textContent = sectionMeta[target].title;
        DOM.pageSubtitle.textContent = sectionMeta[target].sub;
        
        AppState.currentSection = target;
        AppState.visited.add(target);
        
        // Lazy loading
        if (target === 'timeline' && !AppState.rendered.timeline) renderTimeline();
        if (target === 'topics' && !AppState.rendered.topics) renderTopics();
        if (target === 'quiz' && !AppState.rendered.quiz) { renderQuiz(); AppState.rendered.quiz = true; }
        if (target === 'glossary' && !AppState.rendered.glossary) renderGlossary();
      });
    });

    DOM.btnExplore.addEventListener('click', () => {
      document.querySelector('.ep-nav-item[data-target="timeline"]').click();
    });
  }

  /** Render Timeline */
  function renderTimeline() {
    DOM.timelineFilters.innerHTML = '';
    const phases = [
      { id: 'all', label: 'All phases' },
      { id: 'pre', label: 'Pre-election' },
      { id: 'election', label: 'Election day' },
      { id: 'post', label: 'Post-election' }
    ];
    
    phases.forEach((p, idx) => {
      const chip = createChip(p.label, () => {
        Array.from(DOM.timelineFilters.children).forEach(c => {
          c.classList.remove('selected');
          c.setAttribute('aria-pressed', 'false');
        });
        chip.classList.add('selected');
        chip.setAttribute('aria-pressed', 'true');
        
        const items = DOM.timelineList.querySelectorAll('.ep-tl-item');
        items.forEach(item => {
          if (p.id === 'all' || item.getAttribute('data-phase') === p.id) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      }, idx === 0);
      chip.setAttribute('data-phase', p.id);
      chip.classList.add('ep-tl-chip');
      DOM.timelineFilters.appendChild(chip);
    });

    DOM.timelineList.innerHTML = '';
    const frag = document.createDocumentFragment();
    Data.timelineSteps.forEach(step => {
      // Modify text based on country
      const s = {...step};
      if (AppState.country === 'USA' && s.title === 'Election announcement') s.title = 'Campaign Declaration';
      if (AppState.country === 'India' && s.title === 'Primary / party selection') s.title = 'Ticket Distribution';
      frag.appendChild(createTimelineItem(s));
    });
    DOM.timelineList.appendChild(frag);
    AppState.rendered.timeline = true;
  }

  /** Render Topics */
  function renderTopics() {
    DOM.topicChips.innerHTML = '';
    const keys = Object.keys(Data.topicsData);
    
    keys.forEach((key, idx) => {
      const chip = createChip(Data.topicsData[key].title, () => {
        Array.from(DOM.topicChips.children).forEach(c => {
          c.classList.remove('selected');
          c.setAttribute('aria-pressed', 'false');
        });
        chip.classList.add('selected');
        chip.setAttribute('aria-pressed', 'true');
        
        if (topicCache[key]) {
          DOM.topicContent.innerHTML = '';
          DOM.topicContent.appendChild(topicCache[key]);
        } else {
          const data = Data.topicsData[key];
          const frag = document.createDocumentFragment();
          
          const title = document.createElement('div');
          title.className = 'ep-card-title';
          title.textContent = data.title;
          
          const body = document.createElement('div');
          body.className = 'ep-card-body';
          body.innerHTML = data.body; // Trusted data
          
          const link = document.createElement('a');
          link.className = 'ep-ext-link';
          link.href = data.link;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.textContent = 'Learn more on Wikipedia';
          
          frag.appendChild(title);
          frag.appendChild(body);
          frag.appendChild(link);
          
          topicCache[key] = frag.cloneNode(true);
          DOM.topicContent.innerHTML = '';
          DOM.topicContent.appendChild(frag);
        }
      }, idx === 0);
      chip.setAttribute('data-topic', key);
      chip.classList.add('ep-topic-chip');
      DOM.topicChips.appendChild(chip);
    });
    
    if (DOM.topicChips.children.length > 0) DOM.topicChips.children[0].click();
    AppState.rendered.topics = true;
  }

  /** Quiz Logic */
  function loadQuestion() {
    const q = Data.quizQuestions[AppState.quizIndex];
    DOM.quizQText.textContent = q.q;
    DOM.quizOptions.innerHTML = '';
    DOM.quizFeedback.style.display = 'none';
    DOM.quizNext.style.display = 'none';
    DOM.quizStatus.textContent = 'Question ' + (AppState.quizIndex + 1) + ' of 8';
    
    const pct = (AppState.quizIndex / 8) * 100;
    DOM.quizProgress.style.width = pct + '%';
    DOM.quizProgress.setAttribute('aria-valuenow', pct.toString());
    
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'ep-quiz-option';
      btn.textContent = opt;
      btn.onclick = () => selectOption(idx, btn);
      DOM.quizOptions.appendChild(btn);
    });
  }

  function selectOption(idx, btn) {
    const q = Data.quizQuestions[AppState.quizIndex];
    const btns = DOM.quizOptions.querySelectorAll('button');
    btns.forEach(b => b.disabled = true);
    
    DOM.quizFeedback.style.display = 'block';
    DOM.quizNext.style.display = 'block';
    DOM.quizFeedback.innerHTML = '';
    
    const fbText = document.createTextNode(q.expl);
    const b = document.createElement('b');
    
    if (idx === q.ans) {
      btn.classList.add('correct');
      DOM.quizFeedback.className = 'ep-quiz-feedback success';
      b.textContent = 'Correct! ';
      AppState.quizScore++;
      DOM.quizScoreCount.textContent = AppState.quizScore;
    } else {
      btn.classList.add('wrong');
      btns[q.ans].classList.add('correct');
      DOM.quizFeedback.className = 'ep-quiz-feedback danger';
      b.textContent = 'Incorrect. ';
    }
    DOM.quizFeedback.appendChild(b);
    DOM.quizFeedback.appendChild(fbText);
  }

  function renderQuiz() {
    AppState.quizIndex = 0;
    AppState.quizScore = 0;
    DOM.quizScoreCount.textContent = AppState.quizScore;
    DOM.quizActive.style.display = 'block';
    DOM.quizDone.style.display = 'none';
    loadQuestion();
  }

  DOM.quizNext.onclick = () => {
    AppState.quizIndex++;
    if (AppState.quizIndex < Data.quizQuestions.length) {
      loadQuestion();
    } else {
      showQuizDone();
    }
  };

  function showQuizDone() {
    DOM.quizActive.style.display = 'none';
    DOM.quizDone.style.display = 'block';
    DOM.quizFinalScore.textContent = AppState.quizScore + '/8';
    DOM.quizProgress.style.width = '100%';
    DOM.quizProgress.setAttribute('aria-valuenow', '100');
    
    let msg = '';
    if (AppState.quizScore <= 1) msg = "Keep studying";
    else if (AppState.quizScore <= 3) msg = "Good start";
    else if (AppState.quizScore <= 5) msg = "Solid knowledge";
    else if (AppState.quizScore <= 7) msg = "Excellent!";
    else msg = "Perfect score!";
    DOM.quizFinalMsg.textContent = msg;
  }

  DOM.quizRetake.onclick = renderQuiz;

  /** Glossary Logic */
  function performGlossaryRender(filter = '') {
    DOM.glossaryList.innerHTML = '';
    const termLower = filter.toLowerCase();
    const frag = document.createDocumentFragment();
    
    Data.glossaryTerms.forEach(item => {
      if (item.term.toLowerCase().includes(termLower) || item.def.toLowerCase().includes(termLower)) {
        const div = document.createElement('div');
        div.className = 'ep-term';
        const tSpan = document.createElement('span');
        tSpan.className = 'ep-term-name';
        tSpan.textContent = item.term + ': ';
        const dSpan = document.createElement('span');
        dSpan.className = 'ep-term-def';
        dSpan.textContent = item.def;
        div.appendChild(tSpan);
        div.appendChild(dSpan);
        frag.appendChild(div);
      }
    });
    DOM.glossaryList.appendChild(frag);
  }

  const renderGlossary = () => {
    performGlossaryRender(DOM.glossarySearch.value);
    AppState.rendered.glossary = true;
  };
  
  DOM.glossarySearch.addEventListener('input', debounce((e) => performGlossaryRender(e.target.value), 200));

  /** Ask AI Logic */
  let ANTHROPIC_API_KEY = "";
  DOM.apiKeySave.addEventListener('click', () => {
    if (DOM.apiKeyInput.value.trim()) {
      ANTHROPIC_API_KEY = DOM.apiKeyInput.value.trim();
      DOM.apiKeyContainer.style.display = 'none';
    }
  });

  Data.aiQueries.forEach(query => {
    const chip = createChip(query, () => {
      document.querySelector('.ep-nav-item[data-target="askai"]').click();
      sendAI(query);
    });
    DOM.aiQuickChips.appendChild(chip);
  });

  // Initial greeting
  DOM.chatMessages.appendChild(createBubble('assistant', "Hello! I'm your election education assistant. Ask me anything about democratic processes!"));

  function checkRateLimit() {
    const now = Date.now();
    AppState.rateLimitTimestamps = AppState.rateLimitTimestamps.filter(t => now - t < 60000);
    if (AppState.rateLimitTimestamps.length >= 5) return false;
    AppState.rateLimitTimestamps.push(now);
    return true;
  }

  async function sendAI(text) {
    const safeText = sanitize(text);
    if (!safeText) return;
    
    DOM.aiErrorCard.style.display = 'none';
    
    if (!ANTHROPIC_API_KEY) {
      DOM.aiErrorCard.textContent = "Please enter and save your Anthropic API Key first.";
      DOM.aiErrorCard.style.display = 'block';
      return;
    }
    
    if (!checkRateLimit()) {
      DOM.aiErrorCard.textContent = "Rate limit: please wait before sending more messages.";
      DOM.aiErrorCard.style.display = 'block';
      return;
    }
    
    DOM.chatMessages.appendChild(createBubble('user', safeText));
    AppState.chatHistory.push({ role: 'user', content: safeText });
    DOM.chatMessages.scrollTop = DOM.chatMessages.scrollHeight;
    
    DOM.chatInput.value = '';
    DOM.chatSend.disabled = true;
    DOM.chatInput.disabled = true;
    
    const typingDiv = createBubble('assistant', "...");
    DOM.chatMessages.appendChild(typingDiv);
    DOM.chatMessages.scrollTop = DOM.chatMessages.scrollHeight;
    
    try {
      const sysPrompt = "You are a friendly, expert election process educator. Help users understand elections, voting, democratic processes, timelines, and civic participation worldwide. Be clear, educational, and nonpartisan. Keep responses under 200 words. Focus on the country context: " + AppState.country;
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 1000,
          system: sysPrompt,
          messages: AppState.chatHistory
        })
      });
      
      if (!response.ok) {
        throw new Error("API Error: " + response.status);
      }
      
      const data = await response.json();
      const aiText = data.content[0].text;
      
      typingDiv.remove();
      DOM.chatMessages.appendChild(createBubble('assistant', aiText));
      AppState.chatHistory.push({ role: 'assistant', content: aiText });
      
    } catch (err) {
      typingDiv.remove();
      DOM.aiErrorCard.textContent = "Error connecting to AI: " + err.message;
      DOM.aiErrorCard.style.display = 'block';
    } finally {
      DOM.chatSend.disabled = false;
      DOM.chatInput.disabled = false;
      DOM.chatInput.focus();
      DOM.chatMessages.scrollTop = DOM.chatMessages.scrollHeight;
    }
  }

  DOM.chatSend.addEventListener('click', () => sendAI(DOM.chatInput.value));
  DOM.chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendAI(DOM.chatInput.value);
    }
  });

  /** Country Context Logic */
  DOM.countrySelect.addEventListener('change', (e) => {
    AppState.country = e.target.value;
    if(AppState.rendered.timeline) renderTimeline();
    
    // Update Overview stats/descriptions based on country
    if(AppState.country === 'India') {
      DOM.overviewDesc1.textContent = "India is the world's largest democracy. Elections are managed by the Election Commission of India.";
      DOM.overviewDesc2.innerHTML = "<b>1. Delimitation</b> &rarr; <b>2. Registration</b> &rarr; <b>3. Nomination</b> &rarr; <b>4. Polling</b> &rarr; <b>5. Counting</b> &rarr; <b>6. Declaration</b>";
    } else if (AppState.country === 'USA') {
      DOM.overviewDesc1.textContent = "The US uses a federal system where the president is elected indirectly via the Electoral College.";
      DOM.overviewDesc2.innerHTML = "<b>1. Primaries</b> &rarr; <b>2. Conventions</b> &rarr; <b>3. Campaign</b> &rarr; <b>4. Election Day</b> &rarr; <b>5. Electoral College</b> &rarr; <b>6. Inauguration</b>";
    } else {
      DOM.overviewDesc1.textContent = "A formal group decision-making process by which a population chooses individuals to hold public office.";
      DOM.overviewDesc2.innerHTML = "<b>1. Announcement</b> &rarr; <b>2. Nomination</b> &rarr; <b>3. Campaign</b> &rarr; <b>4. Voting</b> &rarr; <b>5. Counting</b> &rarr; <b>6. Certification</b>";
    }
  });

  /** Google Charts Setup */
  function drawCharts() {
    if (!google || !google.visualization) return;
    
    const dataPhases = google.visualization.arrayToDataTable([
      ['Phase', 'Steps'],
      ['Pre-election', 5],
      ['Election Day', 2],
      ['Post-election', 3]
    ]);
    const optionsPhases = { title: 'Election Timeline Breakdown', pieHole: 0.4, chartArea: {width: '90%', height: '80%'}, legend: {position: 'bottom'}, colors: ['#1D4ED8', '#0D9488', '#15803D'] };
    const chartPhases = new google.visualization.PieChart(DOM.chartPhases);
    chartPhases.draw(dataPhases, optionsPhases);

    const dataTopics = google.visualization.arrayToDataTable([
      ['Topic', 'Questions'],
      ['Systems', 3],
      ['Processes', 2],
      ['Types', 2],
      ['Integrity', 1]
    ]);
    const optionsTopics = { title: 'Quiz Topic Distribution', legend: {position: 'none'}, chartArea: {width: '80%', height: '70%'}, colors: ['#185FA5'] };
    const chartTopics = new google.visualization.BarChart(DOM.chartTopics);
    chartTopics.draw(dataTopics, optionsTopics);
  }
  
  if (window.google && google.charts) {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawCharts);
  }

  /** Test Suite */
  const tests = [
    {
      name: "Navigation test",
      run: () => {
        const item = document.querySelector('.ep-nav-item[data-target="glossary"]');
        item.click();
        return document.getElementById('sec-glossary').classList.contains('active') && item.classList.contains('active');
      }
    },
    {
      name: "Quiz logic test",
      run: () => {
        renderQuiz();
        const startScore = AppState.quizScore;
        const q = Data.quizQuestions[0];
        const btns = DOM.quizOptions.querySelectorAll('button');
        btns[q.ans].click(); // Click correct
        return AppState.quizScore === startScore + 1;
      }
    },
    {
      name: "Quiz progression test",
      run: () => {
        renderQuiz();
        DOM.quizNext.click();
        return AppState.quizIndex === 1;
      }
    },
    {
      name: "Glossary filter test",
      run: () => {
        renderGlossary();
        performGlossaryRender("ballot");
        const terms = DOM.glossaryList.querySelectorAll('.ep-term');
        return terms.length > 0 && terms[0].textContent.toLowerCase().includes('ballot');
      }
    },
    {
      name: "Timeline filter test",
      run: () => {
        renderTimeline();
        document.querySelector('.ep-tl-chip[data-phase="pre"]').click();
        const firstVisible = DOM.timelineList.querySelector('.ep-tl-item[style*="display: block"]');
        return firstVisible && firstVisible.getAttribute('data-phase') === 'pre';
      }
    },
    {
      name: "Topic switcher test",
      run: () => {
        renderTopics();
        const chips = DOM.topicChips.querySelectorAll('.ep-chip');
        if (chips.length > 1) chips[1].click();
        return DOM.topicContent.innerHTML.includes(Data.topicsData[Object.keys(Data.topicsData)[1]].title);
      }
    },
    {
      name: "AI history test",
      run: () => {
        const len = AppState.chatHistory.length;
        DOM.chatInput.value = "Test Message";
        sendAI(DOM.chatInput.value);
        return AppState.chatHistory.length === len + 1 && AppState.chatHistory[len].content === "Test Message";
      }
    },
    {
      name: "Quiz reset test",
      run: () => {
        DOM.quizRetake.click();
        return AppState.quizIndex === 0 && AppState.quizScore === 0;
      }
    },
    {
      name: "Score display test",
      run: () => {
        AppState.quizScore = 7;
        showQuizDone();
        return DOM.quizFinalScore.textContent === "7/8";
      }
    },
    {
      name: "Input validation test",
      run: () => {
        const len = AppState.chatHistory.length;
        DOM.chatInput.value = "   "; // Empty/spaces
        sendAI(DOM.chatInput.value);
        return AppState.chatHistory.length === len; // Should not trigger API
      }
    }
  ];

  DOM.btnRunTests.addEventListener('click', () => {
    DOM.testPanel.classList.add('open');
    DOM.testResultsList.innerHTML = '';
    let passed = 0;
    
    tests.forEach(test => {
      let result = false;
      try {
        result = test.run();
      } catch(e) { result = false; console.error(e); }
      
      const div = document.createElement('div');
      div.className = 'ep-test-item';
      div.innerHTML = \`<span>\${test.name}</span> <span class="ep-test-status \${result ? 'ep-test-pass' : 'ep-test-fail'}">\${result ? 'PASS' : 'FAIL'}</span>\`;
      DOM.testResultsList.appendChild(div);
      if (result) passed++;
    });
    
    DOM.testSummary.textContent = \`\${passed}/\${tests.length} Tests Passed\`;
    DOM.testSummary.className = 'ep-test-summary ' + (passed === tests.length ? 'all-pass' : 'some-fail');
    
    // Restore UI state
    document.querySelector('.ep-nav-item[data-target="overview"]').click();
  });
  
  DOM.closeTests.addEventListener('click', () => DOM.testPanel.classList.remove('open'));

  // Init
  initNavigation();
}
if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', initWidget); } else { initWidget(); }
})();
</script>`;

fs.writeFileSync('election_widget.html', fileContent);
