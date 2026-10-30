# IamIndependent.com - Modern Static Website

Modern, responsive, high-converting static website for **iamindependent, inc.** (IAI).
Designed specifically to be deployed directly on **GitHub Pages**.

## Key Features & Improvements
- **Tech Contractor Centric:** Positioned for software engineers, DevOps, and technical professionals transitioning from full-time W-2 to contracting.
- **Pure Static Architecture:** Zero build steps, zero node_modules dependencies. Fast, accessible, and lightweight.
- **Interactive Take-Home Estimator:** A visual slider tool demonstrating pre-tax business expense savings.
- **Conversion Focused:** High-visibility booking CTAs ("Book 15-Min Free Assessment"), modal scheduler, direct click-to-call (`201-567-2434`), and advisor email.
- **100% Content Parity:** Retains all factual heritage, founder backgrounds (Steven Wasserstrom CFA/CPA, Nathan Fink Esq./CPA), corporate address, and services.

## Directory Structure
```
├── index.html            # Main landing page with comparison, calculator, & CTAs
├── services.html         # Detailed umbrella and back-office services breakdown
├── how-it-works.html     # W-2 to Independent transition guide for engineers
├── about.html            # Founders & 25-year company history
├── faq.html              # Plain-English FAQ addressing contractor doubts
├── book.html             # Free assessment booking & direct contact page
├── .nojekyll             # Tells GitHub Pages to serve static files directly
├── assets/
│   ├── css/
│   │   └── styles.css    # Clean, responsive CSS with slate & emerald design system
│   ├── js/
│   │   └── main.js       # Mobile navigation, calculator math, modals, FAQ accordion
│   └── images/
│       ├── logo.png      # Original IAI logo
│       └── iai-badge.jpg # IAI badge graphic
└── README.md
```

## How to Deploy on GitHub Pages

1. **Push this directory to your GitHub repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of modern static IamIndependent website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Navigate to **Settings** &rarr; **Pages**.
   - Under **Build and deployment** &rarr; **Source**, select **Deploy from a branch**.
   - Under **Branch**, select `main` and folder `/ (root)`.
   - Click **Save**.
   - Your site will be live at `https://<your-username>.github.io/<your-repo-name>/` (or on your custom domain `iamindependent.com` if configured in GitHub Pages custom domain settings).

3. **Connecting a Live Calendar (Calendly / Cal.com / Wix Bookings)**:
   - In `index.html` and `book.html`, the booking buttons open an appointment modal or consultation form. If you prefer to embed an external booking widget (e.g. Calendly or Cal.com), you can simply paste your embed code inside the modal in `index.html` or on `book.html`.

