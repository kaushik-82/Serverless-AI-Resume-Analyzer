import { Helmet } from "react-helmet-async"; //  Use react-helmet-async
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import UploadSection from "@/components/UploadSection";
import Footer from "@/components/Footer";

const Index = () => {
  const title = "Extract key information from resumes with unmatched accuracy. Powered by AWS Textract, Comprehend, Lambda, and S3 and OpenAI for reliable, scalable AI analysis";
  const description = "Extract key information from resumes with unmatched accuracy. Powered by AWS Textract, Comprehend, Lambda, and S3 and OpenAI for reliable, scalable AI analysis.";
  const image = "https://lovable.dev/opengraph-image-p98pqg.png";

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={image} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@lovable_dev" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Helmet>

      <Hero />
      <Features />
      <HowItWorks />
      <UploadSection />
      <Footer />
    </div>
  );
};

export default Index;



