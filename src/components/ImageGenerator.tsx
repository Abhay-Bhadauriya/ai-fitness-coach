"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ImageIcon, Loader2 } from "lucide-react"
import Image from "next/image"

interface ImageGeneratorProps {
    prompt: string
    alt: string
}

export function ImageGenerator({ prompt, alt }: ImageGeneratorProps) {
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const generateImage = async () => {
        setIsLoading(true)
        try {
            const response = await fetch("/api/generate-image", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            })

            if (!response.ok) {
                throw new Error("Failed to generate image")
            }

            const data = await response.json()
            setImageUrl(data.imageUrl)
        } catch (error) {
            console.error("Error generating image:", error)
            // Fallback to placeholder
            const seed = prompt.length
            setImageUrl(`https://picsum.photos/seed/${seed}/400/300`)
        } finally {
            setIsLoading(false)
        }
    }

    if (imageUrl) {
        return (
            <div className="relative w-full h-48 mt-2 rounded-md overflow-hidden group">
                <Image
                    src={imageUrl}
                    alt={alt}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    unoptimized
                />
                <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setImageUrl(null)}
                >
                    <span className="sr-only">Close</span>
                    ×
                </Button>
            </div>
        )
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            className="w-full mt-2 text-xs text-muted-foreground hover:text-primary"
            onClick={generateImage}
            disabled={isLoading}
        >
            {isLoading ? (
                <Loader2 className="h-3 w-3 animate-spin mr-1" />
            ) : (
                <ImageIcon className="h-3 w-3 mr-1" />
            )}
            {isLoading ? "Generating..." : "Visualize"}
        </Button>
    )
}
