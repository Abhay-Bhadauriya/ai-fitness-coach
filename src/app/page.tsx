"use client"

import { useState, useEffect } from "react"
import { UserForm, UserData } from "@/components/UserForm"
import { WorkoutPlan } from "@/components/WorkoutPlan"
import { DietPlan } from "@/components/DietPlan"
import { VoicePlayer } from "@/components/VoicePlayer"
import { ExportButton } from "@/components/ExportButton"
import { GeneratedPlan } from "@/types"
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const [plan, setPlan] = useState<GeneratedPlan | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // useEffect removed to disable persistence

  const handleGeneratePlan = async (data: UserData) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to generate plan")
      }

      const generatedPlan = await response.json()
      setPlan(generatedPlan)
      // localStorage.setItem("fitnessPlan", JSON.stringify(generatedPlan)) // Persistence disabled
    } catch (error) {
      console.error("Error generating plan:", error)
      // Handle error (e.g., show toast)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setPlan(null)
    // localStorage.removeItem("fitnessPlan") // Persistence disabled
  }

  return (
    <main className="min-h-screen p-4 md:p-8 bg-background text-foreground">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center space-y-4 pt-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
          >
            AI Fitness Coach
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground"
          >
            Your personalized workout and diet plan generator
          </motion.p>
        </header>

        <AnimatePresence mode="wait">
          {!plan ? (
            <UserForm onSubmit={handleGeneratePlan} isLoading={isLoading} />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
              id="plan-container"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <WorkoutPlan plan={plan.workoutPlan} />
                <DietPlan plan={plan.dietPlan} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-card text-card-foreground rounded-lg p-6 shadow-sm border"
                >
                  <h3 className="text-xl font-bold mb-4 text-primary">AI Tips</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {plan.tips.map((tip, index) => (
                      <li key={index} className="text-muted-foreground">{tip}</li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-card text-card-foreground rounded-lg p-6 shadow-sm border flex flex-col justify-center items-center text-center"
                >
                  <h3 className="text-xl font-bold mb-4 text-primary">Daily Motivation</h3>
                  <blockquote className="text-lg italic font-medium">
                    "{plan.motivation}"
                  </blockquote>
                </motion.div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
                >
                  Generate New Plan
                </button>
                <VoicePlayer
                  text={`Here is your workout plan. ${plan.workoutPlan.map(d => `On ${d.day}, focus on ${d.focus}.`).join(" ")} And for your diet, breakfast is ${plan.dietPlan.breakfast.name}, lunch is ${plan.dietPlan.lunch.name}, and dinner is ${plan.dietPlan.dinner.name}.`}
                  label="Read Full Plan"
                />
                <ExportButton targetId="plan-container" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
