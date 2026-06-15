# Robl​oc Username Scraper

A **dark‑mode first**, responsive web tool that helps you generate possible usernames from a base name and a list of keywords, then checks (simulated) whether each candidate is available.

## ✨ Features

- **Mobile‑first responsive layout** – works on phones, tablets, and desktops.  
- **Dark theme as default** with CSS custom properties for easy theming.  
- Smooth CSS transitions and a subtle loading spinner.  
- Generates combinations:
  - Base name alone & with numeric suffixes (`base1`, `base2` …).  
  - Base + keyword (`basekeyword`, `keywordbase`).  
  - Underscore variations (`base_keyword`, `keyword_base`).  
- **Asynchronous availability check** (currently mocked; replace `fakeAvailabilityCheck` with a real API).  
- Clean, semantic HTML5 markup and well‑commented JavaScript.

## 📂 Project Structure

```
/ (root)
│
├── index.html      # Main page, includes form and result area
├── styles.css      # Dark‑mode default CSS with responsive rules
├── script.js       # UI logic, username generation, mock API calls
└── README.md       # This documentation
```

## 🚀 Getting Started

1. **Clone / download** the repository.
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).
3. No build step or server is required – everything runs client‑side.

### Using a Real Availability API

Replace the `fakeAvailabilityCheck` function in **script.js** with a real `fetch` call, e.g.:

```js
function checkUsername(username) {
    return fetch(`https://your-api.com/check?username=${encodeURIComponent(username)}`)
        .then(res => res.json())
        .then(data => ({ username, available: data.available }));
}
```

Then use `checkUsername` inside the form submit handler.

## 🎨 Customising the Theme

All colours are defined as CSS variables at the top of `styles.css`.  
Edit the `--bg-color`, `--surface-color`, `--primary-color`, etc., to match your brand.

## 🛠️ Development Tips

- The site is completely static – you can host it on GitHub Pages, Netlify, Vercel, or any static file server.  
- For accessibility, the form uses native HTML validation (`required`).  
- Animations are kept minimal to maintain performance on low‑end devices.

## 📄 License

This project is released under the MIT License. Feel free to use, modify, and distribute it as you wish.

--- 

*Built with ❤️ by an AI assistant.*