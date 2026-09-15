export type ResumeExperience = {
  role: string;
  organization: string;
  location?: string;
  startDate: string;
  endDate?: string;
  summary?: string;
};

export type ResumeEducation = {
  institution: string;
  credential: string;
  field?: string;
  startDate?: string;
  endDate?: string;
};

export type ResumeContent = {
  summary: string;
  positioning: string;
  capabilityFocus: readonly { area: string; description: string }[];
  experience: readonly ResumeExperience[];
  education: readonly ResumeEducation[];
};
