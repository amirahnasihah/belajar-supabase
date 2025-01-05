"use client";

import { useEffect, useRef } from "react";
import { marked } from "marked";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import DOMPurify from "dompurify";

interface LessonContentProps {
  content: string;
}

export default function LessonContent({ content }: LessonContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const html = marked.parse(content);
      const sanitizedHtml = DOMPurify.sanitize(html as string);
      contentRef.current.innerHTML = sanitizedHtml;
    }
  }, [content]);

  return <div ref={contentRef} />;
}

export function LessonCard() {
  return (
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
  );
}
