import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, GraduationCap, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Belajar Tajwid</h1>
          <p className="text-xl text-muted-foreground">
            Pelajari cara membaca Al-Quran dengan tajwid yang betul
          </p>
        </div>

        <Link href="/test">Test</Link>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <BookOpen className="w-12 h-12 mb-4 text-primary" />
              <h2 className="text-xl font-semibold mb-2">Pelajaran</h2>
              <p className="text-muted-foreground mb-4">
                Pelajari asas-asas tajwid dengan pelajaran interaktif
              </p>
              <Button asChild>
                <Link href="/lessons">Mula Belajar</Link>
              </Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <GraduationCap className="w-12 h-12 mb-4 text-primary" />
              <h2 className="text-xl font-semibold mb-2">Kuiz</h2>
              <p className="text-muted-foreground mb-4">
                Uji pemahaman anda dengan kuiz interaktif
              </p>
              <Button asChild>
                <Link href="/quizzes">Cuba Kuiz</Link>
              </Button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center">
              <Users className="w-12 h-12 mb-4 text-primary" />
              <h2 className="text-xl font-semibold mb-2">Komuniti</h2>
              <p className="text-muted-foreground mb-4">
                Sertai komuniti untuk berkongsi dan belajar bersama
              </p>
              <Button asChild>
                <Link href="/community">Sertai Sekarang</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
