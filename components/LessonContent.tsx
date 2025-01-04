'use client';

import { useEffect, useRef } from 'react';
import { marked } from 'marked';

interface LessonContentProps {
  content: string;
}

export default function LessonContent({ content }: LessonContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = marked(content);
    }
  }, [content]);

  return <div ref={contentRef} />;
}