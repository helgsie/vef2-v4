import React, { JSX } from 'react';
import { Question as QuestionType } from '../../types';

export function Question({question}: {question: QuestionType}): JSX.Element {
  const [answerId, setAnswerId] = React.useState<number | null>(null);
  const [submitted, setSubmitted] = React.useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('submit, valið svar:', answerId);
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col gap-1">
      <h2 className="font-bold">{question.questionText}</h2>
      <form onSubmit={onSubmit} className="flex flex-col gap-3 items-start">
        <ul className="flex flex-col gap-2">
          {question.answers.map((answer) => {
            const isSelected = answerId === answer.id;
            const showResult = submitted && isSelected;
            const isCorrect = showResult && answer.isCorrect;
            return (
              <li key={answer.id} className={`${isCorrect ? 'bg-lime-200' : showResult ? 'bg-red-200' : ''} flex gap-2 rounded-xl p-2 items-center`}>
                <input
                  type="radio"
                  name="answer"
                  value={answer.id}
                  checked={isSelected}
                  onChange={() => setAnswerId(answer.id)}
                  disabled={submitted}
                />
                {answer.answer}
              </li>
            );
          })}
        </ul>
        <button 
          type="submit"
          disabled={answerId === null || submitted}
          className="bg-neutral-100 hover:bg-neutral-200 transition ease-in-out border border-neutral-400 px-2 rounded">Svara</button>
      </form>
    </div>
  );
}