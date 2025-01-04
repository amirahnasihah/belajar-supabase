/*
  # Initial Tajweed Learning App Schema

  1. New Tables
    - `lessons`
      - `id` (uuid, primary key)
      - `title` (text) - Title of the lesson
      - `description` (text) - Description of the lesson
      - `content` (text) - Lesson content in Malay
      - `order` (integer) - Order of lessons
      - `created_at` (timestamp)
      
    - `tajweed_rules`
      - `id` (uuid, primary key)
      - `name` (text) - Name of the rule
      - `description` (text) - Description in Malay
      - `arabic_example` (text) - Arabic text example
      - `transliteration` (text) - Transliteration
      - `audio_url` (text) - URL to audio example
      - `lesson_id` (uuid) - Reference to lesson
      
    - `user_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid) - Reference to auth.users
      - `lesson_id` (uuid) - Reference to lessons
      - `completed` (boolean)
      - `completed_at` (timestamp)
      
    - `quizzes`
      - `id` (uuid, primary key)
      - `lesson_id` (uuid) - Reference to lessons
      - `question` (text)
      - `options` (jsonb) - Multiple choice options
      - `correct_answer` (text)
      
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  content text NOT NULL,
  "order" integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create tajweed_rules table
CREATE TABLE IF NOT EXISTS tajweed_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  arabic_example text NOT NULL,
  transliteration text NOT NULL,
  audio_url text,
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Create quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE,
  question text NOT NULL,
  options jsonb NOT NULL,
  correct_answer text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE tajweed_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Lessons are viewable by authenticated users"
  ON lessons FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Tajweed rules are viewable by authenticated users"
  ON tajweed_rules FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view their own progress"
  ON user_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON user_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON user_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Quizzes are viewable by authenticated users"
  ON quizzes FOR SELECT
  TO authenticated
  USING (true);