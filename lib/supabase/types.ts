export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      lessons: {
        Row: {
          id: string
          title: string
          description: string
          content: string
          order: number
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          content: string
          order: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          content?: string
          order?: number
          created_at?: string
        }
      }
      tajweed_rules: {
        Row: {
          id: string
          name: string
          description: string
          arabic_example: string
          transliteration: string
          audio_url: string | null
          lesson_id: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          arabic_example: string
          transliteration: string
          audio_url?: string | null
          lesson_id: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          arabic_example?: string
          transliteration?: string
          audio_url?: string | null
          lesson_id?: string
          created_at?: string
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          completed: boolean
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          lesson_id?: string
          completed?: boolean
          completed_at?: string | null
          created_at?: string
        }
      }
      quizzes: {
        Row: {
          id: string
          lesson_id: string
          question: string
          options: Json
          correct_answer: string
          created_at: string
        }
        Insert: {
          id?: string
          lesson_id: string
          question: string
          options: Json
          correct_answer: string
          created_at?: string
        }
        Update: {
          id?: string
          lesson_id?: string
          question?: string
          options?: Json
          correct_answer?: string
          created_at?: string
        }
      }
    }
  }
}