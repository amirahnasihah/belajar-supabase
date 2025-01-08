interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  deadline?: Date;
}

interface GameElements {
  points: number;
  level: number;
  badges: string[];
  streaks: {
    current: number;
    longest: number;
  };
  challenges: {
    daily: Challenge[];
    weekly: Challenge[];
  };
}
