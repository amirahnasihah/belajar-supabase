interface Post {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
  likes: number;
  replies?: Post[];
}

interface StudyGroup {
  id: string;
  name: string;
  level: string;
  schedule: {
    day: string;
    time: string;
    topic: string;
  }[];
  members: {
    userId: string;
    role: "student" | "teacher" | "moderator";
  }[];
  discussions: {
    id: string;
    topic: string;
    posts: Post[];
  }[];
}
