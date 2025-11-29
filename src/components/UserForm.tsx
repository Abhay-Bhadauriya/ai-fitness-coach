"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export interface UserData {
    name: string
    age: string
    gender: string
    height: string
    weight: string
    goal: string
    level: string
    location: string
    diet: string
    medical: string
}

interface UserFormProps {
    onSubmit: (data: UserData) => void
    isLoading: boolean
}

export function UserForm({ onSubmit, isLoading }: UserFormProps) {
    const [formData, setFormData] = useState<UserData>({
        name: "",
        age: "",
        gender: "male",
        height: "",
        weight: "",
        goal: "weight_loss",
        level: "beginner",
        location: "home",
        diet: "veg",
        medical: "",
    })

    const handleChange = (field: keyof UserData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Tell us about yourself</CardTitle>
                    <CardDescription>
                        We'll use this information to create your personalized plan.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                    required
                                    value={formData.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="age">Age</Label>
                                <Input
                                    id="age"
                                    type="number"
                                    placeholder="25"
                                    required
                                    value={formData.age}
                                    onChange={(e) => handleChange("age", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="gender">Gender</Label>
                                <Select
                                    value={formData.gender}
                                    onValueChange={(value) => handleChange("gender", value)}
                                >
                                    <SelectTrigger id="gender">
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="height">Height (cm)</Label>
                                <Input
                                    id="height"
                                    type="number"
                                    placeholder="175"
                                    required
                                    value={formData.height}
                                    onChange={(e) => handleChange("height", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="weight">Weight (kg)</Label>
                                <Input
                                    id="weight"
                                    type="number"
                                    placeholder="70"
                                    required
                                    value={formData.weight}
                                    onChange={(e) => handleChange("weight", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="goal">Fitness Goal</Label>
                                <Select
                                    value={formData.goal}
                                    onValueChange={(value) => handleChange("goal", value)}
                                >
                                    <SelectTrigger id="goal">
                                        <SelectValue placeholder="Select goal" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="weight_loss">Weight Loss</SelectItem>
                                        <SelectItem value="muscle_gain">Muscle Gain</SelectItem>
                                        <SelectItem value="endurance">Endurance</SelectItem>
                                        <SelectItem value="flexibility">Flexibility</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Current Fitness Level</Label>
                            <RadioGroup
                                value={formData.level}
                                onValueChange={(value) => handleChange("level", value)}
                                className="flex flex-col md:flex-row gap-4"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="beginner" id="beginner" />
                                    <Label htmlFor="beginner">Beginner</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="intermediate" id="intermediate" />
                                    <Label htmlFor="intermediate">Intermediate</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="advanced" id="advanced" />
                                    <Label htmlFor="advanced">Advanced</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="space-y-2">
                            <Label>Workout Location</Label>
                            <RadioGroup
                                value={formData.location}
                                onValueChange={(value) => handleChange("location", value)}
                                className="flex flex-col md:flex-row gap-4"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="home" id="home" />
                                    <Label htmlFor="home">Home</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="gym" id="gym" />
                                    <Label htmlFor="gym">Gym</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="outdoor" id="outdoor" />
                                    <Label htmlFor="outdoor">Outdoor</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="diet">Dietary Preferences</Label>
                            <Select
                                value={formData.diet}
                                onValueChange={(value) => handleChange("diet", value)}
                            >
                                <SelectTrigger id="diet">
                                    <SelectValue placeholder="Select diet" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="veg">Vegetarian</SelectItem>
                                    <SelectItem value="non_veg">Non-Vegetarian</SelectItem>
                                    <SelectItem value="vegan">Vegan</SelectItem>
                                    <SelectItem value="keto">Keto</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="medical">Medical History / Injuries (Optional)</Label>
                            <Textarea
                                id="medical"
                                placeholder="Any injuries or medical conditions we should know about?"
                                value={formData.medical}
                                onChange={(e) => handleChange("medical", e.target.value)}
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating Plan...
                                </>
                            ) : (
                                "Generate My Plan"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    )
}
