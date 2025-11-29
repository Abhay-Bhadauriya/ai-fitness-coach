# How to Deploy AI Fitness Coach to Vercel

## Prerequisites
- A [GitHub](https://github.com) account
- A [Vercel](https://vercel.com) account

## Step 1: Push to GitHub
1. Create a new repository on GitHub (e.g., `ai-fitness-coach`).
2. Run the following commands in your terminal to push your code:

```bash
git add .
git commit -m "Ready for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-fitness-coach.git
git push -u origin main
```
*(Replace `YOUR_USERNAME` with your actual GitHub username)*

## Step 2: Deploy on Vercel
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **"Add New..."** -> **"Project"**.
3. Import your `ai-fitness-coach` repository.
4. In the **Configure Project** screen, find the **Environment Variables** section.
5. Add the following variables (copy them from your `.env.local` file):
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `UNSPLASH_ACCESS_KEY`: Your Unsplash Access Key
6. Click **"Deploy"**.

## Step 3: Verify
- Wait for the deployment to finish (about 1-2 minutes).
- Click the domain link provided by Vercel (e.g., `ai-fitness-coach.vercel.app`).
- Test the app!

> **Note:** Since we disabled local storage persistence, the app will always start fresh when you visit the link.
