import { KuizContent } from "@/components/kuiz/KuizContent";

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Kuiz Tajwid</h1>
        <KuizContent />
      </div>
    </div>
  );
}
