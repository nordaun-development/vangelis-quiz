"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getQuestions } from "@/utils/functions";
import { Quiz } from "@/utils/types";
import { useState } from "react";
import { Progress } from "./ui/progress";
import Link from "next/link";

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function QuizContent({ type }: { type: "short" | "long" }) {
  const [online, setOnline] = useState<boolean>(false);
  const [current, setCurrent] = useState<number>(0);
  const [answered, setAnswered] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [questions, setQuestions] = useState<Quiz[]>([]);
  const [finished, setFinished] = useState<boolean>(false);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const startQuiz = async () => {
    const fetchedQuestions: Quiz[] = await getQuestions({ type });

    const shuffledQuestions: Quiz[] = shuffleArray(
      fetchedQuestions.map((q) => ({
        ...q,
        options: shuffleArray(q.options),
      }))
    );

    setQuestions(shuffledQuestions);
    setOnline(true);
    setCurrent(0);
    setAnswered(0);
    setScore(0);
    setFinished(false);
    setShowFeedback(false);
    setSelectedAnswer(null);
  };

  const handleAnswer = (option: string) => {
    const correct: boolean = option === questions[current].answer;
    if (correct) setScore((prev) => prev + 1);
    setAnswered((prev) => prev + 1);
    setSelectedAnswer(option);
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
      setShowFeedback(false);
      setSelectedAnswer(null);
    } else {
      setFinished(true);
    }
  };

  const currentQuestion: Quiz = questions[current];

  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="max-w-[700px] w-[92vw]">
        {!online ? (
          <div className="flex flex-col gap-4 text-center justify-center items-center">
            <h1 className="font-bold text-2xl">
              Welcome to the {type === "short" ? "short" : "long"} quiz!
            </h1>
            <Button
              variant="default"
              onClick={startQuiz}
              className="max-w-[400px] w-full"
            >
              Start Quiz
            </Button>
          </div>
        ) : finished ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Finished!</h2>
            <p className="text-lg mb-8">
              You got <span className="font-semibold">{score}</span> out of{" "}
              <span className="font-semibold">{questions.length}</span> correct.
            </p>
            <Link href={`/quiz/${type === "short" ? "long" : "short"}`}>
              <Button variant={"default"} className="w-full mb-4">
                Take the {type === "short" ? "long" : "short"} quiz
              </Button>
            </Link>
            <Button
              variant={"secondary"}
              onClick={startQuiz}
              className="w-full"
            >
              Take the quiz again
            </Button>
          </div>
        ) : (
          <Card className="w-full lg:py-10 lg:px-4 py-8 px-2">
            <CardHeader>
              <div className="flex flex-row justify-between items-center w-full gap-4">
                <Progress value={(answered / questions.length) * 100} />
                <span className="min-w-fit text-right">
                  {answered} / {questions.length}
                </span>
              </div>
              <CardTitle className="text-xl font-bold mb-4 underline">
                Question {current + 1}:
              </CardTitle>
              <CardDescription className="mb-4 text-lg font-semibold">
                {currentQuestion.question}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-2 flex flex-col gap-2">
                {currentQuestion.options.map((option, idx) => {
                  const isCorrect = option === currentQuestion.answer;
                  const isSelected = option === selectedAnswer;

                  let variant: "default" | "secondary" = "secondary";
                  let customStyle = "";

                  if (showFeedback) {
                    if (isCorrect) {
                      customStyle = "bg-green-400/30 border-green-400 border";
                    } else if (isSelected) {
                      customStyle = "bg-red-400/30 border-red-400 border";
                    }
                  }

                  return (
                    <Button
                      key={idx}
                      variant={variant}
                      disabled={showFeedback}
                      onClick={() => handleAnswer(option)}
                      className={`w-full justify-center whitespace-normal break-words flex-1 ${customStyle} h-full`}
                    >
                      {option}
                    </Button>
                  );
                })}
              </div>

              {showFeedback && currentQuestion.reason && (
                <div
                  className={`border p-3 rounded-md mt-6 mb-2 text-sm break-words whitespace-pre-wrap flex-grow border-foreground bg-foreground/15`}
                >
                  {currentQuestion.reason}
                </div>
              )}

              {showFeedback && (
                <Button
                  variant="default"
                  onClick={nextQuestion}
                  className="w-full mt-4"
                >
                  Next
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
