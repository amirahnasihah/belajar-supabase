interface LessonModule {
  id: string;
  title: string;
  level: "beginner" | "intermediate" | "advanced";
  lessons: {
    id: string;
    title: string;
    content: string;
    audioUrl?: string;
    examples: {
      arabic: string;
      transliteration: string;
      translation: string;
    }[];
    practice: {
      questions: QuizQuestion[];
    };
  }[];
}

const modules = [
  {
    id: "makharij",
    title: "Makharij Al-Huruf",
    level: "beginner",
    lessons: [
      {
        id: "throat-letters",
        title: "Huruf Halqiyyah (Throat Letters)",
        // ... content
      },
    ],
  },
  // More modules...
];
