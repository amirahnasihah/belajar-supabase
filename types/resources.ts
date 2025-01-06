interface Resource {
  type: "video" | "audio" | "document" | "infographic";
  title: string;
  description: string;
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  language: string;
  url: string;
}
