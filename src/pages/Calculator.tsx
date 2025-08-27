import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Download, Calculator as CalculatorIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { jsPDF } from 'jspdf';

interface Subject {
  id: string;
  name: string;
  grade: string;
  credits: number;
}

interface Semester {
  id: string;
  number: number;
  subjects: Subject[];
  gpa: number;
}

const gradePoints: Record<string, number> = {
  'O': 10, 'A+': 9, 'A': 8, 'B+': 7,
  'B': 6, 'C': 5, 'U': 0, 'SA': 0, 'W': 0
};

const Calculator = () => {
  const navigate = useNavigate();
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const { toast } = useToast();

  const calculateGPA = (subjects: Subject[]): number => {
    let totalPoints = 0;
    let totalCredits = 0;

    subjects.forEach(subject => {
      if (subject.grade && subject.credits > 0) {
        totalPoints += gradePoints[subject.grade] * subject.credits;
        totalCredits += subject.credits;
      }
    });

    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  };

  const calculateCGPA = (): number => {
    let totalGradePoints = 0;
    let totalCredits = 0;

    semesters.forEach(semester => {
      semester.subjects.forEach(subject => {
        if (subject.grade && subject.credits > 0) {
          totalGradePoints += gradePoints[subject.grade] * subject.credits;
          totalCredits += subject.credits;
        }
      });
    });

    return totalCredits > 0 ? totalGradePoints / totalCredits : 0;
  };

  const addSemester = () => {
    if (semesters.length >= 10) {
      toast({
        title: "Maximum limit reached",
        description: "You can only add up to 10 semesters.",
        variant: "destructive"
      });
      return;
    }

    const newSemester: Semester = {
      id: `semester-${Date.now()}`,
      number: semesters.length + 1,
      subjects: [],
      gpa: 0
    };

    setSemesters([...semesters, newSemester]);
  };

  const addSubject = (semesterId: string) => {
    setSemesters(semesters.map(semester => {
      if (semester.id === semesterId) {
        if (semester.subjects.length >= 20) {
          toast({
            title: "Maximum limit reached",
            description: "You can only add up to 20 subjects per semester.",
            variant: "destructive"
          });
          return semester;
        }

        const newSubject: Subject = {
          id: `subject-${Date.now()}`,
          name: "",
          grade: "",
          credits: 1
        };

        const updatedSubjects = [...semester.subjects, newSubject];
        return {
          ...semester,
          subjects: updatedSubjects,
          gpa: calculateGPA(updatedSubjects)
        };
      }
      return semester;
    }));
  };

  const updateSubject = (semesterId: string, subjectId: string, field: keyof Subject, value: string | number) => {
    setSemesters(semesters.map(semester => {
      if (semester.id === semesterId) {
        const updatedSubjects = semester.subjects.map(subject => {
          if (subject.id === subjectId) {
            return { ...subject, [field]: value };
          }
          return subject;
        });

        return {
          ...semester,
          subjects: updatedSubjects,
          gpa: calculateGPA(updatedSubjects)
        };
      }
      return semester;
    }));
  };

  const removeSubject = (semesterId: string, subjectId: string) => {
    setSemesters(semesters.map(semester => {
      if (semester.id === semesterId) {
        const updatedSubjects = semester.subjects.filter(subject => subject.id !== subjectId);
        return {
          ...semester,
          subjects: updatedSubjects,
          gpa: calculateGPA(updatedSubjects)
        };
      }
      return semester;
    }));
  };

  const removeSemester = (semesterId: string) => {
    setSemesters(semesters.filter(semester => semester.id !== semesterId));
  };

  const generatePageCanvas = (pageSemesters: Semester[], pageNumber: number, totalPages: number): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    
    // Set canvas size (landscape format)
    canvas.width = 1920;
    canvas.height = 1080;
    
    // Background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Header
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px Outfit, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Grade Report', canvas.width / 2, 60);
    
    ctx.font = '24px Outfit, Arial, sans-serif';
    ctx.fillStyle = '#cccccc';
    ctx.fillText('Generated by GradeMate CGPA Calculator', canvas.width / 2, 90);
    
    // Page indicator for multi-page PDFs
    if (totalPages > 1) {
      ctx.font = '18px Outfit, Arial, sans-serif';
      ctx.fillStyle = '#888888';
      ctx.textAlign = 'right';
      ctx.fillText(`Page ${pageNumber} of ${totalPages}`, canvas.width - 60, 90);
    }
    
    // Calculate grid layout - 2 columns for semesters
    const columnWidth = (canvas.width - 120) / 2; // 60px margin on each side, divide by 2 columns
    const startX1 = 60; // Left column
    const startX2 = 60 + columnWidth + 20; // Right column with 20px gap
    const startY = 120;
    
    // Function to draw a semester in a specific position
    const drawSemester = (semester: Semester, x: number, y: number, maxHeight: number) => {
      if (semester.subjects.length === 0) return y;
      
      let currentY = y;
      
      // Semester header
      ctx.fillStyle = '#4B0082';
      ctx.fillRect(x, currentY, columnWidth, 35);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px Outfit, Arial, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`Semester ${semester.number}`, x + 15, currentY + 25);
      
      ctx.textAlign = 'right';
      ctx.fillText(`GPA: ${semester.gpa.toFixed(2)}`, x + columnWidth - 15, currentY + 25);
      
      currentY += 35;
      
      // Table headers
      ctx.fillStyle = '#2D1B69';
      ctx.fillRect(x, currentY, columnWidth, 30);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px Outfit, Arial, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('Subject', x + 10, currentY + 20);
      ctx.textAlign = 'center';
      ctx.fillText('Grade', x + columnWidth * 0.65, currentY + 20);
      ctx.fillText('Credits', x + columnWidth * 0.85, currentY + 20);
      
      currentY += 30;
      
      // Subjects
      const maxSubjects = Math.floor((maxHeight - 65) / 25); // Calculate max subjects that fit
      const subjectsToShow = semester.subjects.slice(0, maxSubjects);
      
      subjectsToShow.forEach((subject, index) => {
        if (!subject.name || !subject.grade) return;
        
        const bgColor = index % 2 === 0 ? '#1a1a1a' : '#0f0f0f';
        ctx.fillStyle = bgColor;
        ctx.fillRect(x, currentY, columnWidth, 25);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '14px Outfit, Arial, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(subject.name.substring(0, 20), x + 10, currentY + 17);
        
        ctx.textAlign = 'center';
        ctx.fillText(subject.grade, x + columnWidth * 0.65, currentY + 17);
        ctx.fillText(subject.credits.toString(), x + columnWidth * 0.85, currentY + 17);
        
        currentY += 25;
      });
      
      return currentY;
    };
    
    // Calculate available height for semesters
    const availableHeight = canvas.height - 200; // Reserve space for header and footer
    const rowHeight = availableHeight / 2 - 20; // Two rows with 20px gap
    
    // Draw semesters in 2x2 grid
    if (pageSemesters.length > 0) {
      drawSemester(pageSemesters[0], startX1, startY, rowHeight);
    }
    if (pageSemesters.length > 1) {
      drawSemester(pageSemesters[1], startX2, startY, rowHeight);
    }
    if (pageSemesters.length > 2) {
      drawSemester(pageSemesters[2], startX1, startY + rowHeight + 20, rowHeight);
    }
    if (pageSemesters.length > 3) {
      drawSemester(pageSemesters[3], startX2, startY + rowHeight + 20, rowHeight);
    }
    
    // Overall CGPA section (bottom center) - only on last page
    if (pageNumber === totalPages) {
      const cgpaY = canvas.height - 120;
      const cgpaWidth = 400;
      const cgpaX = (canvas.width - cgpaWidth) / 2;
      
      ctx.fillStyle = '#4B0082';
      ctx.fillRect(cgpaX, cgpaY, cgpaWidth, 70);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px Outfit, Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Overall CGPA', canvas.width / 2, cgpaY + 25);
      
      ctx.font = 'bold 36px Outfit, Arial, sans-serif';
      ctx.fillText(calculateCGPA().toFixed(2), canvas.width / 2, cgpaY + 55);
    }
    
    // Footer
    ctx.fillStyle = '#888888';
    ctx.font = '18px Outfit, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Made with 💜 by Abhishek Kumaran CSE A [23CS052]', canvas.width / 2, canvas.height - 20);
    
    return canvas;
  };

  const generateGradeReportImage = (): string => {
    const canvas = generatePageCanvas(semesters.slice(0, 4), 1, 1);
    return canvas.toDataURL('image/png');
  };

  const generateGradeReportPDF = (): void => {
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [1920, 1080]
    });

    // Calculate number of pages needed (4 semesters per page)
    const totalPages = Math.ceil(semesters.length / 4);
    
    for (let i = 0; i < totalPages; i++) {
      const startIndex = i * 4;
      const endIndex = Math.min(startIndex + 4, semesters.length);
      const pageSemesters = semesters.slice(startIndex, endIndex);
      
      if (i > 0) {
        pdf.addPage();
      }
      
      const canvas = generatePageCanvas(pageSemesters, i + 1, totalPages);
      const imgData = canvas.toDataURL('image/png');
      
      // Add the canvas to PDF
      pdf.addImage(imgData, 'PNG', 0, 0, 1920, 1080);
    }
    
    // Download the PDF
    pdf.save('grade_report.pdf');
  };

  const exportResults = () => {
    try {
      if (semesters.length > 4) {
        // Use PDF for more than 4 semesters
        generateGradeReportPDF();
        toast({
          title: "Grade Report Downloaded",
          description: "Your complete grade report has been saved as grade_report.pdf",
        });
      } else {
        // Use PNG for 4 or fewer semesters
        const imageDataUrl = generateGradeReportImage();
        
        // Create download link
        const link = document.createElement('a');
        link.download = 'grade_report.png';
        link.href = imageDataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          title: "Grade Report Downloaded",
          description: "Your grade report has been saved as grade_report.png",
        });
      }
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error generating your grade report.",
        variant: "destructive"
      });
    }
  };

  const cgpa = calculateCGPA();

  return (
    <div className="min-h-screen bg-gradient-hero text-foreground p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="w-10 h-10 bg-gradient-purple rounded-xl flex items-center justify-center shadow-glow-purple">
                <CalculatorIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold">GradeMate</span>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-purple bg-clip-text text-transparent mb-4">
              CGPA & GPA Calculator
            </h1>
            <p className="text-muted-foreground text-lg">
              Calculate your CGPA and GPA with our intuitive tool
            </p>
          </div>
        </div>

        {/* Add Semester Button */}
        <div className="mb-8">
          <Card className="bg-card border-border shadow-card">
            <CardContent className="p-6">
              <Button
                onClick={addSemester}
                variant="purple"
                size="lg"
                className="w-full"
                disabled={semesters.length >= 10}
              >
                <Plus className="w-5 h-5" />
                Add Semester ({semesters.length}/10)
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Semesters */}
        <div className="space-y-6 mb-8">
          {semesters.map((semester) => (
            <Card key={semester.id} className="bg-card border-border shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold">
                  Semester {semester.number}
                </CardTitle>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    GPA: <span className="font-semibold text-primary">{semester.gpa.toFixed(2)}</span>
                  </span>
                  <Button
                    onClick={() => removeSemester(semester.id)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Subjects */}
                {semester.subjects.map((subject) => (
                  <div key={subject.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-secondary rounded-lg">
                    <div>
                      <Label htmlFor={`subject-${subject.id}`}>Subject Name</Label>
                      <Input
                        id={`subject-${subject.id}`}
                        placeholder="Enter subject name"
                        value={subject.name}
                        onChange={(e) => updateSubject(semester.id, subject.id, 'name', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`grade-${subject.id}`}>Grade</Label>
                      <Select
                        value={subject.grade}
                        onValueChange={(value) => updateSubject(semester.id, subject.id, 'grade', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(gradePoints).map(([grade, points]) => (
                            <SelectItem key={grade} value={grade}>
                              {grade} ({points} points)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor={`credits-${subject.id}`}>Credits</Label>
                      <Input
                        id={`credits-${subject.id}`}
                        type="number"
                        min="0.5"
                        max="5"
                        step="0.5"
                        value={subject.credits}
                        onChange={(e) => updateSubject(semester.id, subject.id, 'credits', parseFloat(e.target.value) || 1)}
                        className="mt-1"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button
                        onClick={() => removeSubject(semester.id, subject.id)}
                        variant="destructive"
                        size="sm"
                        className="w-full"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Add Subject Button */}
                <Button
                  onClick={() => addSubject(semester.id)}
                  variant="outline"
                  className="w-full"
                  disabled={semester.subjects.length >= 20}
                >
                  <Plus className="w-4 h-4" />
                  Add Subject ({semester.subjects.length}/20)
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CGPA Results */}
        {semesters.length > 0 && (
          <Card className="bg-card border-border shadow-card mb-8">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Final Results</h2>
              <div className="text-6xl font-bold bg-gradient-purple bg-clip-text text-transparent mb-4">
                {cgpa.toFixed(2)}
              </div>
              <p className="text-xl text-muted-foreground mb-6">Your CGPA</p>
              <Button
                onClick={exportResults}
                variant="hero"
                size="xl"
                className="w-full md:w-auto"
              >
                <Download className="w-5 h-5" />
                Download Results
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Calculator;