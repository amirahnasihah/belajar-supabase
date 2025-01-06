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
