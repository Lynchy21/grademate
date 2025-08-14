import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calculator, Github, ArrowLeft } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero text-foreground">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-10 h-10 bg-gradient-purple rounded-xl flex items-center justify-center shadow-glow-purple">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold">GradeMate</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white/90 hover:bg-white/20 hover:text-white transition-all duration-300 shadow-lg fixed top-6 right-6 z-50"
          onClick={() => window.open("https://github.com/Lynchy21", "_blank")}
        >
          <Github className="w-4 h-4 mr-2" />
          View on GitHub
        </Button>
      </header>

      {/* Back Button */}
      <div className="px-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white/90 hover:bg-white/20 hover:text-white transition-all duration-300 shadow-lg mb-8"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-xl">
          {/* Title */}
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-purple bg-clip-text text-transparent">
            How This Tool Works
          </h1>

          {/* Description */}
          <p className="text-lg text-white/90 text-center mb-12 leading-relaxed">
            This CGPA calculator uses a weighted average system based on your actual semester credits. When you enter 
            your GPA for each semester, the tool multiplies each GPA by the number of credits for that semester and then 
            divides the total by the sum of all credits.
          </p>

          {/* Technical Terms Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-purple bg-clip-text text-transparent">
              In technical terms: the CGPA is calculated as:
            </h2>
            
            {/* Formula */}
            <div className="bg-black/30 rounded-2xl p-6 mb-8 font-mono text-center">
              <code className="text-purple-300 text-lg">
                CGPA = ((GPA₁ × Credits₁) + (GPA₂ × Credits₂) + (GPA₃ × Credits₃)) ÷ (Credits₁ + Credits₂ + Credits₃)
              </code>
            </div>
          </div>

          {/* Example Section */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white/90">
              For example, for Semesters 1-3, we use:
            </h3>
            
            <ul className="space-y-3 text-white/80">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-gradient-purple rounded-full mr-4"></div>
                <span className="text-lg">Semester 1: 20 credits</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-gradient-purple rounded-full mr-4"></div>
                <span className="text-lg">Semester 2: 18 credits</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-gradient-purple rounded-full mr-4"></div>
                <span className="text-lg">Semester 3: 22 credits...</span>
              </li>
            </ul>
          </div>

          {/* Conclusion */}
          <div className="mt-12 p-6 bg-gradient-purple/10 rounded-2xl border border-purple-500/20">
            <p className="text-center text-lg text-white/90 font-medium">
              This ensures a more accurate CGPA that reflects the academic weight of each term.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Made with love text */}
          <div className="text-center text-white/70 text-sm">
            Made with 💜 by Abhishek Kumaran
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;