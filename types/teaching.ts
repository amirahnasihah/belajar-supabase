interface TeacherFeatures {
  sessions: {
    oneOnOne: boolean;
    groupClass: boolean;
    recorded: boolean;
  };
  availability: {
    days: string[];
    times: string[];
  };
  specializations: string[];
  reviews: Review[];
}
