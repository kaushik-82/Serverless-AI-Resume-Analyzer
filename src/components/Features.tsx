import { Card } from "@/components/ui/card";
import { Database, Zap, FileText, Brain, Lock, Cloud } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "AWS Textract",
    description: "Advanced text extraction from PDF and DOCX files with high accuracy, preserving document structure and formatting."
  },
  
  {
    icon: Zap,
    title: "AWS Lambda",
    description: "Serverless backend logic that scales automatically with demand, ensuring fast processing without infrastructure management."
  },
  {
    icon: Database,
    title: "AWS S3",
    description: "Reliable cloud storage for resume files and analysis results, with high availability and durability."
  },
  {
    icon: Brain,
    title: "OpenAI",
    description: "Natural language processing for intelligent entity recognition, extracting skills, experience, and organizations."
  },
  {
    icon: Lock,
    title: "Secure & Private",
    description: "Enterprise-grade security with encrypted storage and processing. Your data remains confidential and protected."
  },
  {
    icon: Cloud,
    title: "Scalable Architecture",
    description: "Built on AWS serverless infrastructure to handle any workload, from single uploads to enterprise-scale processing."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powered by <span className="bg-gradient-primary bg-clip-text text-transparent">AWS Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade AI technology for accurate and reliable resume analysis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 border border-border bg-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
