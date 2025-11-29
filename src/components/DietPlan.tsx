"use client"

import { DailyDiet, Meal } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Utensils } from "lucide-react"
import { ImageGenerator } from "@/components/ImageGenerator"

interface DietPlanProps {
    plan: DailyDiet
}

function MealCard({ title, meal }: { title: string; meal: Meal }) {
    return (
        <div className="border rounded-lg p-4 space-y-2">
            <h4 className="font-semibold text-primary">{title}</h4>
            <div className="font-medium">{meal.name}</div>
            <p className="text-sm text-muted-foreground">{meal.description}</p>
            <div className="text-xs grid grid-cols-4 gap-1 mt-2 bg-muted p-2 rounded">
                <div className="text-center">
                    <div className="font-bold">{meal.calories}</div>
                    <div className="text-[10px]">Kcal</div>
                </div>
                <div className="text-center">
                    <div className="font-bold">{meal.protein}</div>
                    <div className="text-[10px]">Prot</div>
                </div>
                <div className="text-center">
                    <div className="font-bold">{meal.carbs}</div>
                    <div className="text-[10px]">Carbs</div>
                </div>
                <div className="text-center">
                    <div className="font-bold">{meal.fats}</div>
                    <div className="text-[10px]">Fats</div>
                </div>
            </div>
            <ImageGenerator
                prompt={`${meal.name} food photography, delicious ${meal.name}, professional food styling, appetizing meal`}
                alt={meal.name}
            />
        </div>
    )
}

export function DietPlan({ plan }: DietPlanProps) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Utensils className="h-6 w-6 text-primary" />
                    Your Diet Plan
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <MealCard title="Breakfast" meal={plan.breakfast} />
                    <MealCard title="Lunch" meal={plan.lunch} />
                    <MealCard title="Dinner" meal={plan.dinner} />
                    <div className="border rounded-lg p-4 space-y-2">
                        <h4 className="font-semibold text-primary">Snacks</h4>
                        {plan.snacks.map((snack, i) => (
                            <div key={i} className="mb-2 last:mb-0">
                                <div className="font-medium">{snack.name}</div>
                                <p className="text-sm text-muted-foreground">{snack.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
