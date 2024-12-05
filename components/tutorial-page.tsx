'use client'


import { Button } from "@/components/ui/button"
import { useState, useRef } from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Download, Play } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
export default function TutorialPage() {
  const [open, setOpen] = useState(false)
  const steps = [
    {
      title: "Step 1: Download DMI",
      description: "You can download the DMI Software by selecting the 'Download Assets' button located at the bottom of the page.",
      videoUrl: "/assets/step1.mp4"
    },
    {
      title: "Step 2: Unpack DMI and run it as administrator",
      description: "Administrator privileges are required for DMI to function properly.",
      videoUrl: "/assets/step2.mp4"
    },
    {
      title: "Step 3: Change your HWID",
      description: "You can make your own HWID or use the DMI feature to generate a random HWID for you",
      videoUrl: "/assets/step3.mp4"
    },
    {
      title: "Step 4: Save and Quit",
      description: "Click Update and SAVE ALL to make sure everything is set up as it should be.",
      videoUrl: "/assets/step4.mp4"
    }
  ]
  const VideoPlayer = ({ src }: { src: string }) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const togglePlay = () => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause()
        } else {
          videoRef.current.play()
        }
        setIsPlaying(!isPlaying)
      }
    }

    return (
      <div className="relative rounded-md overflow-hidden">
        <video
          ref={videoRef}
          src={src}
          loop
          muted
          playsInline
          className="w-full"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        <button
          onClick={togglePlay}
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 transition-opacity duration-300 hover:bg-opacity-50"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {!isPlaying && (
            <Play className="w-16 h-16 text-white opacity-80" />
          )}
        </button>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      <div id="animated-bg" className="fixed inset-0 z-0"></div>
      <div className="relative z-10 container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-16 text-center">
          😍 HWID Tutorial for Vacban.wtf 😍
        </h1>
        
        <div className="space-y-24 mb-16">
          {steps.map((step, index) => (
            <div key={index} className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                <h2 className="text-2xl font-semibold mb-4">{step.title}</h2>
                <p className="text-gray-300 mb-6">{step.description}</p>
              </div>
              
              <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <VideoPlayer src={step.videoUrl} />
              </div>
            </div>
          ))}
        </div>
        <Alert  className="mb-8 bg-yellow-900/50 border-yellow-500/50">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle className='text-white'>Warning</AlertTitle>
          <AlertDescription className='text-white'>
          Using the DMI software to modify your HWID may violate the terms of service of certain applications or games. Additionally, some motherboards automatically reset the HWID each time the system is powered on, requiring you to reconfigure the HWID after every restart.
          </AlertDescription>
        </Alert>
        <div className="text-center">
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button className="btn-download py-6  transition duration-300 ease-in-out transform hover:scale-105">
            <Download className="w-5 h-5 mr-2" />
            <a>Download Assets</a>
          </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>Important Information</DialogTitle>
                <DialogDescription className="text-gray-300">
                  The Creator of the page is not responsible for maintenance of the app provided and is not responsible for any damages caused by this software.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 flex justify-end">
                <Button
                  className="bg-yellow-600 hover:bg-yellow-700 text-white"
                  onClick={() => setOpen(false)}
                >
                  <a href='../assets/DMI.rar'>Download Anyway</a>
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <p className='text-center text-xs py-4'>By <a className='text-green-400' href='https://vacban.wtf/members/8587/' target='_blank'>Xander1337</a> for Vacban.wtf</p>
      </div>
    </div>
  )
}

