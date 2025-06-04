import { Mountain } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Header() {
  return (
    <nav className="sticky top-4 mx-auto transform  z-50 max-w-7xl">
      <div className="bg-white/90 backdrop-blur-xl border-2 border-green-100 rounded-full px-8 py-2 ">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-lg">
              <Mountain className="h-6 w-6 text-white" />
            </div>
            <span className="text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
              EcoWander
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#tours" className="text-gray-700 hover:text-green-600 transition-colors font-medium text-sm">
              Tours
            </a>
            <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors font-medium text-sm">
              About
            </a>
            <a href="#contact" className="text-gray-700 hover:text-green-600 transition-colors font-medium text-sm">
              Contact
            </a>
            <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 shadow-lg rounded-2xl px-4 py-2">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
