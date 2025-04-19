import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex w-full h-full justify-center items-center px-4 py-8">
      <div className="flex flex-col w-full h-full items-center justify-center gap-4 max-w-[800px] text-center">
        <div className="animated-spin">
            <Image src={"/disc.png"} alt="Vangelis´ China Disc" width={140} height={140}/>
        </div>
        <h1 className="font-bold text-3xl my-4">
          Vangelis Quiz
        </h1>
        <p>
          This quiz has been created by Zoltán Horváth to celebrate Vangelis´
          music. It was published on 17 May 2025, on the third anniversary of
          our Maestro´ decease.
        </p>

        <p>
          The quiz covers the entire career of Vangelis, from his early creative
          years to the last works. I hope that both the occasional listeners and
          the long-time fans will find it appealing.
        </p>
        <p>
          You can choose from two versions of the quiz. The long version
          contains all 100 questions. The short version contains a randomly
          selected 10 questions.
        </p>
        <strong className="mb-4">Enjoy!</strong>
        <div className="flex flex-col gap-4 items-center justify-center text-center w-full">
          <Link href="/quiz/short" className="w-full">
            <Button variant={"default"} className="flex-1 w-full">
              Take the short quiz
            </Button>
          </Link>
          <Link href="/quiz/long" className="w-full">
            <Button variant={"default"} className="flex-1 w-full">
              Take the long quiz
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
