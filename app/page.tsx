import { LessonCard } from "@/components/pelajaran/LessonContent";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Belajar Supabase</h1>
          <p className="text-xl text-muted-foreground">
            Pelajari cara Supabase bekerja
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <LessonCard />
        </div>
      </div>
    </div>
  );
}
