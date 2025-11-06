import { Card } from "@/components/ui/card";
import { Upload, FileText, Brain, Download } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Resume",
    description: "Upload your PDF or DOCX resume file through our secure interface. Files are encrypted and stored in AWS S3.",
    aws: "AWS S3"
  },
  {
    number: "02",
    icon: FileText,
    title: "Extract Text",
    description: "AWS Textract analyzes the document, extracting all text while preserving structure and formatting with high accuracy.",
    aws: "AWS Textract"
  },
  {
    number: "03",
    icon: Brain,
    title: "AI Analysis",
    description: "OpenAI processes the extracted text, identifying skills, experience, organizations, and other key entities.",
    aws: "OpenAI"
  },
  {
    number: "04",
    icon: Download,
    title: "Get Results",
    description: "Receive structured, actionable insights instantly. All processing is handled by AWS Lambda for optimal performance.",
    aws: "AWS Lambda"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 px-4 bg-gradient-hero">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple, secure, and powered by industry-leading AWS technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="p-6 h-full bg-card border border-border hover:shadow-card transition-all duration-300">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg shadow-elegant">
                  {step.number}
                </div>
                
                <div className="mb-4 mt-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground mb-4">{step.description}</p>
                
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-xs text-primary font-medium">
                  {step.aws}
                </div>
              </Card>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary to-secondary" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
