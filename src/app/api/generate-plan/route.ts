import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = process.env.GEMINI_API_KEY
    ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    : null

export async function POST(req: Request) {
    try {
        const data = await req.json()

        if (!genAI) {
            return NextResponse.json(mockPlan)
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

        const prompt = `
      Generate a personalized workout and diet plan for the following user:
      Name: ${data.name}
      Age: ${data.age}
      Gender: ${data.gender}
      Height: ${data.height}cm
      Weight: ${data.weight}kg
      Goal: ${data.goal}
      Level: ${data.level}
      Location: ${data.location}
      Diet: ${data.diet}
      Medical History: ${data.medical || "None"}

      IMPORTANT: If diet is "vegetarian" or "vegan", DO NOT include any chicken, fish, seafood, or meat. Use plant-based proteins like lentils, chickpeas, tofu, paneer.

      Return ONLY a valid JSON object (no markdown, no code blocks) in the following format:
      {
        "workoutPlan": [
          {
            "day": "Monday",
            "focus": "Chest and Triceps",
            "exercises": [
              { "name": "Pushups", "sets": "3", "reps": "12", "rest": "60s", "description": "Standard pushups" }
            ]
          }
        ],
        "dietPlan": {
          "breakfast": { "name": "Oatmeal Bowl", "calories": "300", "protein": "10g", "carbs": "50g", "fats": "5g", "description": "Oats with fruits" },
          "lunch": { "name": "Vegetable Curry", "calories": "400", "protein": "15g", "carbs": "50g", "fats": "15g", "description": "Mixed vegetables in curry" },
          "dinner": { "name": "Lentil Dal", "calories": "350", "protein": "20g", "carbs": "40g", "fats": "10g", "description": "Red lentil dal with rice" },
          "snacks": [{ "name": "Almonds", "calories": "160", "protein": "6g", "carbs": "6g", "fats": "14g", "description": "Handful of almonds" }]
        },
        "tips": ["Tip 1", "Tip 2", "Tip 3"],
        "motivation": "Motivational quote"
      }
      
      Provide a 7-day workout plan with varied exercises based on the user's fitness level and location.
    `

        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()

        const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

        const plan = JSON.parse(cleanedText)
        return NextResponse.json(plan)
    } catch (error) {
        console.error("Error in generate-plan:", error)
        return NextResponse.json(mockPlan)
    }
}

const mockPlan = {
    workoutPlan: [
        {
            day: "Monday",
            focus: "Full Body Strength",
            exercises: [
                { name: "Pushups", sets: "3", reps: "10-12", rest: "60s", description: "Keep back straight, core engaged" },
                { name: "Bodyweight Squats", sets: "3", reps: "15", rest: "60s", description: "Go deep, knees behind toes" },
                { name: "Plank", sets: "3", reps: "30s", rest: "45s", description: "Full body tension" }
            ]
        },
        {
            day: "Tuesday",
            focus: "Cardio & Core",
            exercises: [
                { name: "Jumping Jacks", sets: "3", reps: "30", rest: "30s", description: "High intensity" },
                { name: "Mountain Climbers", sets: "3", reps: "20", rest: "45s", description: "Keep hips low" },
                { name: "Bicycle Crunches", sets: "3", reps: "15 each side", rest: "30s", description: "Slow and controlled" }
            ]
        },
        {
            day: "Wednesday",
            focus: "Active Recovery",
            exercises: [
                { name: "Yoga Flow", sets: "1", reps: "20 mins", rest: "0", description: "Gentle stretching" },
                { name: "Walking", sets: "1", reps: "30 mins", rest: "0", description: "Brisk pace" }
            ]
        },
        {
            day: "Thursday",
            focus: "Upper Body",
            exercises: [
                { name: "Pike Pushups", sets: "3", reps: "8-10", rest: "60s", description: "Target shoulders" },
                { name: "Tricep Dips", sets: "3", reps: "12", rest: "60s", description: "Use chair or bench" },
                { name: "Arm Circles", sets: "2", reps: "30s each direction", rest: "30s", description: "Full range of motion" }
            ]
        },
        {
            day: "Friday",
            focus: "Lower Body",
            exercises: [
                { name: "Lunges", sets: "3", reps: "10 each leg", rest: "60s", description: "Keep knee at 90 degrees" },
                { name: "Glute Bridges", sets: "3", reps: "15", rest: "45s", description: "Squeeze at the top" },
                { name: "Calf Raises", sets: "3", reps: "20", rest: "30s", description: "Full extension" }
            ]
        },
        {
            day: "Saturday",
            focus: "HIIT & Cardio",
            exercises: [
                { name: "Burpees", sets: "3", reps: "10", rest: "60s", description: "Full body explosive movement" },
                { name: "High Knees", sets: "3", reps: "30s", rest: "30s", description: "Drive knees up high" },
                { name: "Jump Squats", sets: "3", reps: "12", rest: "60s", description: "Land softly" }
            ]
        },
        {
            day: "Sunday",
            focus: "Rest & Stretch",
            exercises: [
                { name: "Full Body Stretching", sets: "1", reps: "30 mins", rest: "0", description: "Hold each stretch 30s" },
                { name: "Meditation", sets: "1", reps: "10 mins", rest: "0", description: "Focus on breathing" }
            ]
        }
    ],
    dietPlan: {
        breakfast: {
            name: "Protein Oatmeal Bowl",
            calories: "380",
            protein: "15g",
            carbs: "55g",
            fats: "8g",
            description: "Rolled oats with protein powder, banana, and berries"
        },
        lunch: {
            name: "Chickpea Salad",
            calories: "450",
            protein: "20g",
            carbs: "55g",
            fats: "15g",
            description: "Mixed greens with chickpeas, vegetables, and olive oil dressing"
        },
        dinner: {
            name: "Tofu Stir-Fry with Quinoa",
            calories: "520",
            protein: "25g",
            carbs: "60g",
            fats: "18g",
            description: "Stir-fried tofu with vegetables and quinoa"
        },
        snacks: [
            {
                name: "Greek Yogurt & Berries",
                calories: "180",
                protein: "12g",
                carbs: "20g",
                fats: "5g",
                description: "Plain Greek yogurt with mixed berries"
            },
            {
                name: "Almonds",
                calories: "160",
                protein: "6g",
                carbs: "6g",
                fats: "14g",
                description: "Handful of raw almonds (about 23 almonds)"
            }
        ]
    },
    tips: [
        "Stay hydrated - aim for 8-10 glasses of water daily",
        "Ensure 7-8 hours of quality sleep for muscle recovery",
        "Maintain good posture throughout the day, especially while working",
        "Always warm up before workouts and cool down after",
        "Listen to your body - rest if you feel excessive fatigue or pain"
    ],
    motivation: "The only bad workout is the one that didn't happen. Every step forward, no matter how small, is progress. You've got this!"
}
