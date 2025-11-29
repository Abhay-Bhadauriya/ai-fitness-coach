# 💪 AI Fitness Coach

An AI-powered fitness assistant that generates personalized workout and diet plans using Google Gemini AI. Built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- 🤖 **AI-Powered Plan Generation** - Uses Google Gemini 2.0 Flash to create customized workout and diet plans
- 🖼️ **Real Photo Integration** - Fetches high-quality images from Unsplash for exercises and meals
- 🔊 **Voice Reading** - Listen to your plan using browser's built-in text-to-speech
- 📄 **PDF Export** - Download your plan as a PDF for offline access
- 🌓 **Dark/Light Mode** - Toggle between themes for comfortable viewing
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Google Gemini API key ([Get it here](https://aistudio.google.com/app/apikey))
- Unsplash Access Key ([Get it here](https://unsplash.com/developers))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/ai-fitness-coach.git
cd ai-fitness-coach
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI + shadcn/ui
- **AI:** Google Generative AI SDK
- **Images:** Unsplash API
- **PDF Export:** html2canvas + jsPDF
- **Animations:** Framer Motion

## 🌐 Deployment

This app is optimized for deployment on Vercel. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 📝 How It Works

1. **Fill the Form** - Enter your personal details (age, weight, goals, dietary preferences, etc.)
2. **AI Generation** - Google Gemini analyzes your data and creates a 7-day workout plan and daily diet plan
3. **View & Customize** - Review your plan with exercise details, meal breakdowns, and AI tips
4. **Export & Share** - Download as PDF or listen to it using voice reading

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key for plan generation | Yes |
| `UNSPLASH_ACCESS_KEY` | Unsplash API key for real photos | Optional* |

*Without Unsplash key, the app will use placeholder images.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Google Gemini for AI plan generation
- Unsplash for high-quality fitness photos
- shadcn/ui for beautiful UI components
