export interface Exercise {
    name: string
    sets: string
    reps: string
    rest: string
    description: string
}

export interface DayPlan {
    day: string
    focus: string
    exercises: Exercise[]
}

export interface Meal {
    name: string
    calories: string
    protein: string
    carbs: string
    fats: string
    description: string
}

export interface DailyDiet {
    breakfast: Meal
    lunch: Meal
    dinner: Meal
    snacks: Meal[]
}

export interface GeneratedPlan {
    workoutPlan: DayPlan[]
    dietPlan: DailyDiet
    tips: string[]
    motivation: string
}
