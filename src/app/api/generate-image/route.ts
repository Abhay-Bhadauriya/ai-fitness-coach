import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json()

        // Check for Unsplash API Key
        if (process.env.UNSPLASH_ACCESS_KEY) {
            try {
                // Search for a relevant photo on Unsplash
                // We clean the prompt to get better search keywords (e.g., "fitness exercise pushups" -> "pushups fitness")
                const searchTerms = prompt.replace(/fitness|exercise|workout|gym|person|doing|demonstration|photography/gi, "").trim() || "fitness"

                const response = await fetch(
                    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchTerms)}&per_page=1&orientation=landscape`,
                    {
                        headers: {
                            Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
                        }
                    }
                )

                if (response.ok) {
                    const data = await response.json()
                    if (data.results && data.results.length > 0) {
                        const imageUrl = data.results[0].urls.regular
                        // Trigger download event as per Unsplash API guidelines (optional but good practice)
                        // fetch(data.results[0].links.download_location, { headers: { Authorization: ... } }) 
                        return NextResponse.json({ imageUrl })
                    }
                } else {
                    console.error("Unsplash API error:", response.status, await response.text())
                }
            } catch (e) {
                console.error("Unsplash API failed, falling back to placeholder", e)
            }
        } else {
            console.log("No UNSPLASH_ACCESS_KEY found")
        }

        // Fallback if no key or API fails
        const seed = encodeURIComponent(prompt).length
        return NextResponse.json({
            imageUrl: `https://picsum.photos/seed/${seed}/800/600`
        })
    } catch (error) {
        console.error("Error generating image:", error)
        const seed = Math.random().toString(36).substring(7)
        return NextResponse.json({
            imageUrl: `https://picsum.photos/seed/${seed}/800/600`
        })
    }
}
