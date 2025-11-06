import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, CheckCircle2, Loader2, Brain } from "lucide-react";
import { toast } from "sonner";

const API_BASE = "https://4zu9dqy3jh.execute-api.ap-south-1.amazonaws.com/prod";

interface EducationItem {
  institution: string;
  location?: string;
  duration?: string;
  degree?: string;
  cgpa?: string;
}

interface ResumeResults {
  name: string;
  email: string;
  phone: string;
  skills: string[];
  experience: { role: string; company: string; duration: string; details: string }[];
  education: EducationItem[] | string;
  projects: { title: string; description: string }[];
  organizations: { name: string; details: string }[];
}

const UploadSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingText, setLoadingText] = useState(""); // ADDED
  const [results, setResults] = useState<ResumeResults | null>(null);
  const pollRef = useRef<number | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword"
    ];

    if (!validTypes.includes(selectedFile.type)) {
      toast.error("Upload PDF or DOCX only!");
      return;
    }

    setFile(selectedFile);
    toast.success("File selected");
  };

  const parseUploadResKey = async (res: Response) => {
    const raw = await res.json().catch(() => null);
    let body = raw?.body;
    try { if (typeof body === "string") body = JSON.parse(body); } catch {}
    return body?.file_key || body?.fileName || body?.key || null;
  };

  const handleAnalyze = async () => {
    if (!file) return toast.error("Upload file first!");
    setIsAnalyzing(true);
    setResults(null);

    try {
      setLoadingText("Uploading to S3...");

      const form = new FormData();
      form.append("resume", file, file.name);

      const upload = await fetch(`${API_BASE}/analyze`, { method: "POST", body: form });
      const fileKey = await parseUploadResKey(upload);
      if (!fileKey) throw new Error("Missing S3 key");

      setLoadingText("Starting Textract job..."); 

      const start = await fetch(`${API_BASE}/process`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file_name: fileKey })
      });

      const startData = await start.json();
      const job_id = startData.job_id;
      if (!job_id) throw new Error("Missing job id");

      setLoadingText("Processing resume with AI..."); 
      poll(job_id);
    } catch (err) {
      console.error(err);
      toast.error("Failed to start analysis");
      setIsAnalyzing(false);
    }
  };

  const poll = (job_id: string) => {
    let tries = 0;
    const max = 40;

    pollRef.current && clearInterval(pollRef.current);
    pollRef.current = window.setInterval(async () => {
      tries++;

      const res = await fetch(`${API_BASE}/result`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_id })
      });

      const data = await res.json().catch(() => null);
      if (!data || data.status === "processing") return;

      clearInterval(pollRef.current!);
      setIsAnalyzing(false);

      if (data.structured) {
        const ex = data.structured;
        setResults({
          name: ex.name,
          email: ex.email,
          phone: ex.phone,
          skills: ex.skills || [],
          experience: Array.isArray(ex.experience) ? ex.experience : [],
          education: Array.isArray(ex.education) ? ex.education : ex.education || "Not detected",
          projects: Array.isArray(ex.projects) ? ex.projects : [],
          organizations: Array.isArray(ex.organizations) ? ex.organizations : []
        });
        toast.success("Resume analyzed!");
      }
    }, 3000);
  };

  return (
    <section id="upload-section" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        
        {/*  LOADING MESSAGE BLOCK */}
        {isAnalyzing && (
          <div className="mb-4 flex flex-col items-center text-sm text-gray-600">
            <Loader2 className="w-5 h-5 animate-spin mb-1" />
            <span className="font-medium">{loadingText}</span>
          </div>
        )}

        <Card className="p-8">
          {!results ? (
            <>
              <div className="border border-dashed p-10 rounded text-center">
                <input type="file" id="file" onChange={handleFileChange} className="hidden" accept=".pdf,.docx" />
                <label htmlFor="file" className="cursor-pointer">
                  <Upload className="w-10 h-10 mb-3 mx-auto text-primary" />
                  <p className="font-semibold">{file?.name || "Click to upload resume"}</p>
                </label>
              </div>

              {file && (
                <Button className="w-full mt-6" onClick={handleAnalyze} disabled={isAnalyzing}>
                  {isAnalyzing ? <Loader2 className="animate-spin mr-2" /> : <Brain className="mr-2" />}
                  Analyze Resume
                </Button>
              )}
            </>
          ) : (
            <>
              <div className="flex justify-between items-center pb-4 border-b">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-primary" size={30} />
                  <h3 className="font-bold text-xl">Analysis Complete</h3>
                </div>
                <Button onClick={() => { setFile(null); setResults(null); }}>Analyze Another</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
                <div className="bg-muted p-3 rounded font-semibold">{results.name}</div>
                <div className="bg-muted p-3 rounded font-semibold">{results.email}</div>
                <div className="bg-muted p-3 rounded font-semibold">{results.phone}</div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {results.skills.map((s, i) => (
                    <span key={i} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">{s}</span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-2">Experience</h4>
                {results.experience.length ? results.experience.map((e, i) => (
                  <div key={i} className="bg-muted p-4 rounded mb-2">
                    <p className="font-bold">{e.role} — {e.company}</p>
                    <p className="text-xs text-muted-foreground">{e.duration}</p>
                    <p className="text-sm whitespace-pre-line mt-1">{e.details}</p>
                  </div>
                )) : <div className="bg-muted p-4 rounded text-sm">Not detected</div>}
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-2">Education</h4>
                {Array.isArray(results.education) ? (
                  results.education.map((edu, i) => (
                    <div key={i} className="bg-muted p-4 rounded mb-2">
                      <p className="font-bold">{edu.institution}</p>
                      <p className="text-xs">{edu.degree} — {edu.duration}</p>
                      {edu.cgpa && <p className="text-xs">CGPA: {edu.cgpa}</p>}
                    </div>
                  ))
                ) : (
                  <div className="bg-muted p-4 rounded">{results.education}</div>
                )}
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-2">Projects</h4>
                {results.projects.length ? results.projects.map((p, i) => (
                  <div key={i} className="bg-muted p-4 rounded mb-2">
                    <p className="font-semibold">{p.title}</p>
                    <p className="text-sm whitespace-pre-line">{p.description}</p>
                  </div>
                )) : <div className="bg-muted p-4 rounded text-sm">Not detected</div>}
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-2">Organizations / Certifications</h4>
                {results.organizations.length ? results.organizations.map((o, i) => (
                  <div key={i} className="bg-muted p-4 rounded mb-2">
                    <p className="font-semibold">{o.name}</p>
                    <p className="text-sm whitespace-pre-line">{o.details}</p>
                  </div>
                )) : <div className="bg-muted p-4 rounded text-sm">Not detected</div>}
              </div>
            </>
          )}
        </Card>
      </div>
    </section>
  );
};

export default UploadSection;