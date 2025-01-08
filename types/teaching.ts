export interface Review {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  date: Date;
}

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
