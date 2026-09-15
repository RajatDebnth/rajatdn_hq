import type { ResumeContent } from "@/types/resume";

// Positioning and focus are user-provided. Experience and education remain
// empty until Rajat supplies verified role and credential details.
export const resumeContent: ResumeContent = {
  summary: "AI Systems & Infrastructure Engineer focused on the architecture and engineering of production AI systems for advanced manufacturing. The work direction connects industrial data, models, infrastructure, deployment, monitoring, and operational decisions.",
  positioning: "Production AI systems for advanced manufacturing, with emphasis on reliable deployment rather than isolated model demonstrations.",
  capabilityFocus: [
    { area: "AI/ML systems", description: "Prediction, optimization, anomaly detection, automation, and operational intelligence." },
    { area: "Industrial data", description: "Data ingestion, contextualization, pipeline design, and decision-ready data products." },
    { area: "AI infrastructure", description: "Model serving, edge/cloud placement, versioned artifacts, and deployment boundaries." },
    { area: "MLOps and observability", description: "Release controls, monitoring, drift investigation, reliability, and failure response." },
    { area: "Edge AI and computer vision", description: "Areas of technical focus for industrial inference and visual inspection systems." },
  ],
  experience: [],
  education: [],
};
