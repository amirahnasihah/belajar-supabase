"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "Apakah hukum bacaan nun mati (ن) bertemu dengan huruf ya (ي)؟",
    options: ["Izhar", "Idgham", "Iqlab", "Ikhfa"],
    correctAnswer: 1, // Index of correct answer (Idgham)
    explanation:
      "Ini adalah contoh Idgham Bighunnah kerana nun mati bertemu dengan huruf ya.",
  },
  {
    id: 2,
    question: "Manakah antara berikut yang merupakan huruf Qalqalah?",
    options: ["ق ط ب ج د", "ك ت ب ج د", "ق ط ب م د", "ق ص ب ج د"],
    correctAnswer: 0,
    explanation: "Huruf Qalqalah adalah ق ط ب ج د (Qaf, Ta, Ba, Jim, Dal)",
  },
  // Add more questions as needed
];

export function KuizContent() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (value: string) => {
    setSelectedAnswer(parseInt(value));
  };

  const handleNext = () => {
    if (selectedAnswer === sampleQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < sampleQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  if (showResult) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Keputusan Kuiz</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-2xl mb-4">
            Skor anda: {score} / {sampleQuestions.length}
          </p>
          <Button onClick={resetQuiz}>Cuba Lagi</Button>
        </CardContent>
      </Card>
    );
  }

  const question = sampleQuestions[currentQuestion];

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          Soalan {currentQuestion + 1} dari {sampleQuestions.length}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h2 className="text-xl mb-4">{question.question}</h2>
          <RadioGroup
            onValueChange={handleAnswer}
            value={selectedAnswer?.toString()}
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {selectedAnswer !== null && (
          <div className="mb-4 p-4 rounded-md bg-muted">
            <p className="font-semibold">
              {selectedAnswer === question.correctAnswer
                ? "✅ Betul!"
                : "❌ Salah!"}
            </p>
            <p className="mt-2">{question.explanation}</p>
          </div>
        )}

        <Button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className="w-full"
        >
          {currentQuestion + 1 === sampleQuestions.length
            ? "Tamat"
            : "Soalan Seterusnya"}
        </Button>
      </CardContent>
    </Card>
  );
}
