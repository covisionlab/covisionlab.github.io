# Covision Lab White Papers

A static, dependency-free white-paper library for Covision Lab, designed for direct hosting on GitHub Pages.

## Add a paper

1. Add a new `article.paper` block in `index.html`.
2. Set its `data-category` and lowercase `data-search` values so filtering works.
3. Link the **Open PDF** action to the hosted PDF or publisher URL.
4. Update the archive statistics in the hero.

## Run locally

Open `index.html` directly, or serve the repository with any static file server:

```powershell
npx serve .
```

## Publish

In the GitHub repository, open **Settings > Pages**, select **Deploy from a branch**, then choose the `main` branch and `/ (root)` folder.