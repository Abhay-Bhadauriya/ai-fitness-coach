"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Volume2, StopCircle, Loader2 } from "lucide-react"

interface VoicePlayerProps {
    text: string
    label?: string
}

export function VoicePlayer({ text, label = "Read Plan" }: VoicePlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handlePlay = async () => {
        setIsLoading(true)
        try {
            // Try ElevenLabs if API key is available (mocked check here)
            // For this demo, we'll use browser's built-in TTS as a reliable fallback
            // without needing API keys.

            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(text)
                utterance.onend = () => setIsPlaying(false)
                utterance.onstart = () => setIsPlaying(true)
                window.speechSynthesis.speak(utterance)
            } else {
                alert("Text-to-speech not supported in this browser.")
            }
        } catch (error) {
            console.error("Error playing audio:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleStop = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel()
            setIsPlaying(false)
        }
    }

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={isPlaying ? handleStop : handlePlay}
            disabled={isLoading}
        >
            {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : isPlaying ? (
                <StopCircle className="h-4 w-4 mr-2" />
            ) : (
                <Volume2 className="h-4 w-4 mr-2" />
            )}
            {isPlaying ? "Stop Reading" : label}
        </Button>
    )
}
