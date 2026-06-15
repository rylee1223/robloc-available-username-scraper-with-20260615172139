// Robl​oc Username Scraper – Front‑end logic
// ----------------------------------------------------
// This script generates candidate usernames based on a
// base name and optional keywords, then simulates an
// availability check (randomised). All UI updates are
// performed with smooth transitions.
//
// Author: OpenAI ChatGPT
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('scrapeForm');
    const resultsSection = document.getElementById('resultsSection');
    const resultsList = document.getElementById('resultsList');
    const loader = document.getElementById('loader');

    // -----------------------------------------------------------------
    // Helper: Simulate async availability check (replace with real API)
    // -----------------------------------------------------------------
    function fakeAvailabilityCheck(username) {
        // Simulate network latency between 300‑800ms
        const latency = 300 + Math.random() * 500;
        return new Promise(resolve => {
            setTimeout(() => {
                // 60% chance the name is available
                const isAvailable = Math.random() < 0.6;
                resolve({ username, available: isAvailable });
            }, latency);
        });
    }

    // -----------------------------------------------------------------
    // Generate candidate usernames
    // -----------------------------------------------------------------
    function generateCandidates(base, keywordsArray) {
        const candidates = new Set();

        // Base alone
        candidates.add(base);

        // Base + number suffixes (1‑5)
        for (let i = 1; i <= 5; i++) {
            candidates.add(`${base}${i}`);
        }

        // Keyword combos
        keywordsArray.forEach(kw => {
            const clean = kw.trim();
            if (!clean) return;
            candidates.add(`${base}${clean}`);
            candidates.add(`${clean}${base}`);
            candidates.add(`${base}_${clean}`);
            candidates.add(`${clean}_${base}`);
        });

        return Array.from(candidates);
    }

    // -----------------------------------------------------------------
    // Render a single result item
    // -----------------------------------------------------------------
    function renderResult(item) {
        const li = document.createElement('li');
        li.textContent = item.username;
        li.classList.add(item.available ? 'available' : 'taken');

        const statusSpan = document.createElement('span');
        statusSpan.textContent = item.available ? 'Available' : 'Taken';
        statusSpan.style.fontWeight = '600';
        li.appendChild(statusSpan);

        resultsList.appendChild(li);
    }

    // -----------------------------------------------------------------
    // Main form submit handler
    // -----------------------------------------------------------------
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Reset UI
        resultsList.innerHTML = '';
        resultsSection.hidden = false;
        loader.hidden = false;

        const base = form.baseUsername.value.trim();
        const keywordsRaw = form.keywords.value;
        const keywords = keywordsRaw ? keywordsRaw.split(',') : [];

        if (!base) {
            alert('Please enter a base username.');
            loader.hidden = true;
            return;
        }

        const candidates = generateCandidates(base, keywords);

        // Perform checks sequentially to keep UI simple; can be parallelised.
        for (const username of candidates) {
            const result = await fakeAvailabilityCheck(username);
            renderResult(result);
        }

        loader.hidden = true;
    });
});