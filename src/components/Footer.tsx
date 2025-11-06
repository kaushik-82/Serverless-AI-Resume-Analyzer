import { Cloud } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-border bg-muted/30">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Cloud className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">Resume Analyzer</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground mb-2">
              Powered by OpenAI and AWS Services: S3, Lambda, Textract
            </p>
            <p className="text-xs text-muted-foreground">
              © 2025 Serverless AI Resume Analyzer. Built with modern cloud technology.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
