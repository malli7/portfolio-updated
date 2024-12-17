import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface ResumePopupProps {
  isOpen: boolean
  onClose: () => void
}

export function ResumePopup({ isOpen, onClose }: ResumePopupProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Resume</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex-grow p-4 overflow-auto">
          
          <iframe 
            src="/resume.pdf#toolbar=0" 
            className="w-full h-full"
            title="Resume"
            loading='lazy'
          />
        </div>
        <div className="p-4 border-t">
          <Button asChild className="w-full">
            <a href="/resume.pdf" download>Download Resume</a>
          </Button>
        </div>
      </div>
    </div>
  )
}

