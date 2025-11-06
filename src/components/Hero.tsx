import { Button } from "@/components/ui/button";
import { Upload, Zap, Shield } from "lucide-react";
import heroImage from "@/assets/hero-resume.jpg";

const Hero = () => {
  const scrollToUpload = () => {
    document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="AI-powered resume analysis" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm text-primary mb-4">
            <Zap className="w-4 h-4" />
            <span>Powered by AWS AI Services</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Serverless AI
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Resume Analyzer</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Extract key information from resumes with unmatched accuracy. Powered by AWS Textract, Lambda, and S3 and OpenAI for reliable, scalable AI analysis.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={scrollToUpload}
              className="text-lg"
            >
              <Upload className="w-5 h-5" />
              Try It Now
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
            >
              Learn More
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>Enterprise-grade Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <span>Lightning Fast Processing</span>
            </div>
            <div className="flex items-center gap-2">
              <Upload className="w-4 h-4 text-primary" />
              <span>PDF & DOCX Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
