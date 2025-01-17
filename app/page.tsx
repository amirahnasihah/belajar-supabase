import { LessonCard } from "@/components/pelajaran/LessonContent";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Belajar Supabase</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Pelajari cara Supabase bekerja
          </p>

          <Link
            href="/login"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-500 transition-colors"
          >
            Login untuk Akses
          </Link>
        </div>
      </div>
    </div>
  );
}
