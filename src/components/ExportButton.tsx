"use client"

import { Button } from "@/components/ui/button"
import { FileDown, Loader2 } from "lucide-react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { useState } from "react"

interface ExportButtonProps {
    targetId: string
    filename?: string
}

export function ExportButton({ targetId, filename = "fitness-plan" }: ExportButtonProps) {
    const [isExporting, setIsExporting] = useState(false)

    const handleExport = async () => {
        setIsExporting(true)
        try {
            const element = document.getElementById(targetId)
            if (!element) {
                console.error("Target element not found")
                return
            }

            // Create a clone of the element to render it fully without scroll issues
            const clone = element.cloneNode(true) as HTMLElement

            // Style the clone to ensure it's fully visible and has correct background
            clone.style.position = "absolute"
            clone.style.top = "-9999px"
            clone.style.left = "-9999px"
            clone.style.width = "1000px" // Fixed width for consistent PDF
            clone.style.height = "auto"
            clone.style.zIndex = "-1"
            clone.style.background = "white" // Force white background
            clone.style.color = "black" // Force black text for readability

            // Remove any dark mode classes from the clone if needed
            clone.classList.remove("dark")

            document.body.appendChild(clone)

            // Wait a moment for images/fonts in clone to settle
            await new Promise(resolve => setTimeout(resolve, 500))

            const canvas = await html2canvas(clone, {
                scale: 2,
                useCORS: true,
                logging: true,
                backgroundColor: "#ffffff",
                windowWidth: 1000,
            })

            document.body.removeChild(clone)

            const imgData = canvas.toDataURL("image/png")
            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "mm",
                format: "a4",
            })

            const imgWidth = 210
            const pageHeight = 297
            const imgHeight = (canvas.height * imgWidth) / canvas.width
            let heightLeft = imgHeight
            let position = 0

            // Multi-page support
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
            heightLeft -= pageHeight

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight
                pdf.addPage()
                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
                heightLeft -= pageHeight
            }

            pdf.save(`${filename}.pdf`)
        } catch (error) {
            console.error("Error exporting PDF:", error)
        } finally {
            setIsExporting(false)
        }
    }

    return (
        <Button
            variant="outline"
            onClick={handleExport}
            disabled={isExporting}
        >
            {isExporting ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
                <FileDown className="h-4 w-4 mr-2" />
            )}
            Export PDF
        </Button>
    )
}
