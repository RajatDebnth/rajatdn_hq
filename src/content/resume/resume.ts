import type { ResumeContent } from "@/types/resume";

// Facts below are transcribed from Rajat Debnath's LinkedIn-generated resume,
// supplied on 2026-09-17. Keep claims aligned with that source.
export const resumeContent: ResumeContent = {
  about: [
    "I am Rajat Debnath, an AI Engineer based in Agartala, Tripura, India. I build the systems around artificial intelligence: data pipelines, integrations, automation, deployment workflows, and the infrastructure that turns operational data into decisions. My focus is not limited to training a model in a notebook. I am interested in the full path from raw data and business context to a dependable product that people can use.",
    "My engineering path began in software development. During a remote internship with Yupcha, I designed and built a reusable component library that was published as an npm package. That work took me through design, testing, versioning, deployment, and team integration. It gave me an early appreciation for shared infrastructure and maintainable systems instead of isolated features.",
    "I later joined Techno Electric & Engineering Co. Ltd. as a Graduate Engineer Trainee and worked on a smart meter project. My responsibilities centered on data handling, analysis, processing, and operational reporting. Working close to industrial data exposed the practical importance of data quality, reporting reliability, and analysis at scale. It also strengthened my interest in the systems behind predictive maintenance, anomaly detection, and operational intelligence.",
    "I am currently an AI Engineer with Kyma AI Innovations. My work includes production-oriented AI products, RAG pipelines, AI systems such as EduRAG, SaaS product development, and the infrastructure connecting prototypes to launch. Across these roles, the recurring theme has been building reliable paths between data, software, models, and users.",
    "My technical interests include machine learning, Python, system architecture, AI infrastructure, data pipelines, RAG systems, MLOps, automation, and industrial AI. I am completing a Bachelor of Technology in Electrical Engineering at the National Institute of Technology Agartala, with the program spanning 2022 to 2026. Alongside engineering work, I managed and published daily opportunity updates through the NSP community, helping maintain an active network of more than 3,500 students and alumni. I use this portfolio to document what I build, explain how systems work, and connect with teams working on meaningful data and automation problems.",
  ],
  summary: "AI Engineer building AI products, software, websites and automations that turn operational data into clear action.",
  positioning: "Production-oriented AI systems, data infrastructure, and automation for operational environments.",
  capabilityFocus: [
    { area: "AI systems", description: "RAG pipelines, machine learning workflows, AI product integration, and production-oriented delivery." },
    { area: "Data infrastructure", description: "Data handling, processing, reporting, pipelines, and decision-ready operational data." },
    { area: "Software engineering", description: "Python, reusable components, testing, versioning, deployment, and integration patterns." },
    { area: "Industrial AI", description: "Predictive maintenance, anomaly detection, automation, and operational intelligence." },
    { area: "System architecture", description: "Connecting data, applications, models, infrastructure, and users through maintainable boundaries." },
  ],
  experience: [
    {
      role: "AI Engineer",
      organization: "Kyma AI Innovations",
      location: "Agartala",
      startDate: "May 2026",
      endDate: "Present",
      summary: "Part of the team building production-grade AI products and product infrastructure.",
      highlights: [
        "Work on RAG pipelines and AI systems, including EduRAG, an AI-powered academic knowledge engine.",
        "Contribute to SaaS product development from prototype to launch.",
        "Focus on pipelines, integration, deployment, and AI systems infrastructure.",
      ],
    },
    {
      role: "Graduate Engineer Trainee",
      organization: "Techno Electric & Engineering Co. Ltd.",
      location: "Agartala",
      startDate: "January 2026",
      endDate: "June 2026",
      summary: "Worked on a smart meter project with a focus on data handling, analysis, processing, and operational reporting.",
      highlights: [
        "Supported data processing for operational reporting.",
        "Gained exposure to industrial data quality, reporting reliability, and analysis at scale.",
      ],
    },
    {
      role: "Software Developer Intern",
      organization: "Yupcha",
      location: "Agartala, India — Remote",
      startDate: "January 2025",
      endDate: "April 2025",
      summary: "Designed and built a reusable component library that was published as an npm package.",
      highlights: [
        "Worked across design, testing, versioning, and deployment.",
        "Collaborated on integration patterns and reusable software infrastructure.",
      ],
    },
    {
      role: "Community Distribution",
      organization: "NSP",
      location: "Tripura, India",
      startDate: "November 2022",
      endDate: "January 2025",
      summary: "Managed and published daily job updates across LinkedIn and WhatsApp for an active network of more than 3,500 students and alumni.",
    },
  ],
  education: [
    {
      institution: "National Institute of Technology Agartala",
      credential: "Bachelor of Technology",
      field: "Electrical Engineering",
      startDate: "August 2022",
      endDate: "June 2026",
    },
    {
      institution: "Belonia Vidyapith HS School",
      credential: "Science",
      startDate: "January 2014",
      endDate: "July 2021",
    },
  ],
};
