import { createClient } from "@supabase/supabase-js";
import { Database } from "@/lib/supabase/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import LessonContent from "@/components/pelajaran/LessonContent";

export default async function LessonPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: lesson } = await supabase
    .from("lessons")
    .select(
      `
      *,
      tajweed_rules (*)
    `
    )
    .eq("id", params.id)
    .single();

  if (!lesson) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{lesson.title}</h1>

        <Card className="p-6 mb-8">
          <div className="prose dark:prose-invert max-w-none">
            <LessonContent content={lesson.content} />
          </div>
        </Card>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Supabase</h2>
          {lesson.tajweed_rules.map((rule: any) => (
            <Card key={rule.id} className="p-6">
              <h3 className="text-xl font-semibold mb-4">{rule.name}</h3>
              <p className="text-muted-foreground mb-4">{rule.description}</p>

              <div className="bg-muted p-4 rounded-lg mb-4">
                <p className="text-2xl text-center font-arabic mb-2" dir="rtl">
                  {rule.arabic_example}
                </p>
                <p className="text-center text-muted-foreground">
                  {rule.transliteration}
                </p>
              </div>

              {rule.audio_url && (
                <audio controls className="w-full">
                  <source src={rule.audio_url} type="audio/mpeg" />
                </audio>
              )}
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/lessons">Kembali ke Senarai</Link>
          </Button>
          <Button asChild>
            <Link href={`/quizzes/${lesson.id}`}>Cuba Kuiz</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
