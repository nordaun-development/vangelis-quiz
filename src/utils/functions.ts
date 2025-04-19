import { Quiz } from "./types";
import { quizContent } from "@/components/quiz";

export async function getQuestions({ type }: { type: "short" | "long" }): Promise<Quiz[]> {
  let questions: Quiz[] = [];
  if (type === "short") {
    const selected = new Set<number>();
    while (questions.length < 10) {
      const random = Math.floor(Math.random() * quizContent.length);
      if (!selected.has(quizContent[random].id)) {
        questions.push(quizContent[random]);
        selected.add(quizContent[random].id);
      }
    }
  } else {
    questions = quizContent;
  }
  return questions;
}