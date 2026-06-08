# CashGap Primary Site

CashGap is a static product-directory homepage for a collection of fintech lead-gen tools, calculators, widgets, and simulators.

## Files

```txt
index.html
styles.css
script.js
README.md
```

## Recommended Repo Structure

```txt
cashgap/
  index.html
  styles.css
  script.js
  README.md

  products/
    viral-curse-predictor/
      index.html
      styles.css
      script.js
      README.md

    inventory-funding-calculator/
      index.html
      styles.css
      script.js
      README.md

    payout-delay-simulator/
      index.html
      styles.css
      script.js
      README.md
```

## Routes

When deployed to Vercel as a static site:

```txt
cashgap.vercel.app/
cashgap.vercel.app/products/viral-curse-predictor/
cashgap.vercel.app/products/inventory-funding-calculator/
cashgap.vercel.app/products/payout-delay-simulator/
```

## Adding a Product

1. Create a new folder under `/products/product-slug/`.
2. Add the product's `index.html`, `styles.css`, `script.js`, and `README.md`.
3. Add a new card to the homepage tool grid in `index.html`.
4. Update the product count if you choose not to let JavaScript calculate it.

## Design Direction

Theme blend:

- Neo-brutalist layout
- Futurist fintech positioning
- Cyberpunk hustler energy
- High-contrast vivid color system
- Static-first, Vercel-friendly architecture

## Deployment

Upload the repo to GitHub, then import it into Vercel.

No build command required.
No framework required.
Output directory can remain blank.
