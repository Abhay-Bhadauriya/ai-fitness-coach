"use client"

import { DayPlan } from "@/types"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dumbbell } from "lucide-react"
import { ImageGenerator } from "@/components/ImageGenerator"

interface WorkoutPlanProps {
    plan: DayPlan[]
}

export function WorkoutPlan({ plan }: WorkoutPlanProps) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Dumbbell className="h-6 w-6 text-primary" />
                    Your Workout Plan
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {plan.map((day, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger>
                                <div className="flex flex-col items-start text-left">
                                    <span className="font-bold">{day.day}</span>
                                    <span className="text-sm text-muted-foreground">{day.focus}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4 pt-2">
                                    {day.exercises.map((exercise, i) => (
                                        <div key={i} className="border-b last:border-0 pb-2 last:pb-0">
                                            <h4 className="font-semibold">{exercise.name}</h4>
                                            <div className="text-sm text-muted-foreground grid grid-cols-3 gap-2 mt-1">
                                                <span>Sets: {exercise.sets}</span>
                                                <span>Reps: {exercise.reps}</span>
                                                <span>Rest: {exercise.rest}</span>
                                            </div>
                                            <p className="text-sm mt-1 italic">{exercise.description}</p>
                                            <ImageGenerator
                                                prompt={`fitness exercise ${exercise.name} in gym, person doing ${exercise.name}, workout demonstration, fitness photography`}
                                                alt={exercise.name}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    )
}
