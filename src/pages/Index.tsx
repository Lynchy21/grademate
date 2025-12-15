import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calculator, Github } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero text-foreground">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-purple rounded-xl flex items-center justify-center shadow-glow-purple">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold">GradeMate</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white/90 hover:bg-white/20 hover:text-white transition-all duration-300 shadow-lg fixed top-3 right-3 z-50 text-[10px] px-1.5 py-0.5 h-6 md:top-6 md:right-6 md:text-sm md:px-3 md:h-9 md:rounded-xl"
          onClick={() => window.open("https://github.com/Lynchy21/grademate", "_blank")}
        >
          <Github className="w-2.5 h-2.5 mr-0.5 md:w-4 md:h-4 md:mr-2" />
          View on GitHub
        </Button>
      </header>

      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-[80vh] px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Calculate Your{" "}
              <span className="bg-gradient-purple bg-clip-text text-transparent">
                CGPA & GPA
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
              Easily calculate your CGPA and GPA with our simple and intuitive
              tool. Stay on top of your academic progress, anytime,
              anywhere! Only for students of Sethu Institute of Technology.
            </p>
            <Button
              onClick={() => navigate("/calculator")}
              variant="hero"
              size="xl"
              className="text-lg px-12 py-4"
            >
              GET STARTED
            </Button>
          </div>

          {/* Right Calculator Icon */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Main calculator icon */}
              <div className="w-80 h-80 bg-gradient-purple rounded-3xl flex items-center justify-center shadow-glow-purple transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="grid grid-cols-2 gap-6">
                  {/* Plus */}
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                    <div className="w-8 h-2 bg-gray-800 rounded-full"></div>
                    <div className="w-2 h-8 bg-gray-800 rounded-full absolute"></div>
                  </div>
                  {/* Minus */}
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                    <div className="w-8 h-2 bg-gray-800 rounded-full"></div>
                  </div>
                  {/* Multiply */}
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                    <div className="w-6 h-6 relative">
                      <div className="w-6 h-2 bg-gray-800 rounded-full absolute top-2 rotate-45"></div>
                      <div className="w-6 h-2 bg-gray-800 rounded-full absolute top-2 -rotate-45"></div>
                    </div>
                  </div>
                  {/* Equals */}
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                    <div className="space-y-2">
                      <div className="w-8 h-2 bg-gray-800 rounded-full"></div>
                      <div className="w-8 h-2 bg-gray-800 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-purple rounded-2xl flex items-center justify-center shadow-glow-purple animate-pulse">
                <span className="text-white font-bold text-xl">A+</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-purple rounded-xl flex items-center justify-center shadow-glow-purple animate-pulse delay-1000">
                <span className="text-white font-bold">10</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-16 animate-fade-in-up border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
            {/* Left Branding */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-purple rounded-lg flex items-center justify-center shadow-glow-purple">
                  <Calculator className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-white">GradeMate</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white/90 transition-all duration-300 shadow-lg px-4 py-2 text-sm w-fit">
                Vibe Coded with 💜 by Abhishek Kumaran (CSE A - 23CS052)
              </div>
            </div>

            {/* Right Columns */}
            <div className="flex flex-col sm:flex-row gap-8 lg:gap-12">
              {/* Column 1 */}
              <div className="flex flex-col gap-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white/90 hover:text-white transition-all duration-300 w-fit justify-start"
                  onClick={() => navigate("/about")}
                >
                  About
                </Button>
                <a href="mailto:abhishekkumaran21@gmail.com">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white/90 hover:text-white transition-all duration-300 w-fit justify-start"
                >
                  Contact
                </Button>
                </a>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white/90 hover:text-white transition-all duration-300 w-fit justify-start"
                  onClick={() => window.open("https://lynchy21.github.io/gpa-calculator/", "_blank")}
                >
                  GradeMate v1
                </Button>
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white/90 hover:text-white transition-all duration-300 w-fit justify-start"
                  onClick={() => window.open("https://github.com/Lynchy21/grademate", "_blank")}
                >
                  Source
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white/90 hover:text-white transition-all duration-300 w-fit justify-start"
                >
                  Coming Soon
                </Button>
              </div>

              {/* Column 3 - Social Icons */}
              <div className="flex flex-col gap-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white/90 hover:text-white transition-all duration-300 w-12 h-12 rounded-full hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  onClick={() => window.open("https://github.com/Lynchy21", "_blank")}
                >
                  <Github className="w-5 h-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white/90 hover:text-white transition-all duration-300 w-12 h-12 rounded-full hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  onClick={() => window.open("https://instagram.com/abhishek.nvm", "_blank")}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
