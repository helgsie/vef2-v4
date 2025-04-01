'use client';

import { QuestionsApi } from '@/api';
import { Question as TQuestion, UiState, Category as TCategory } from '@/types';
import { JSX, useEffect, useState } from 'react';
import { Question } from '../Question/Question';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000/';

interface QuestionResponse {
  id: number;
  questionText: string;
  categoryId: number;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  answers: {
    id: number;
    answer: string;
    isCorrect: boolean;
    questionId: number;
  }[];
}

export function Category({ slug }: { slug: string }): JSX.Element {
  const [uiState, setUiState] = useState<UiState>('initial');
  const [questions, setQuestions] = useState<TQuestion[]>([]);
  const [category, setCategory] = useState<TCategory | null>(null);

  useEffect(() => {
    async function fetchData() {
      setUiState('loading');
      const api = new QuestionsApi();

      const categoryResponse = await api.getCategory(slug);

      if (!categoryResponse || !Array.isArray(categoryResponse.questions)) {
        setUiState('error');
        return;
      }
      
      setCategory(categoryResponse);

      try {
        const questionsWithAnswers = await Promise.all(
          categoryResponse.questions.map(async (q) => {
            const url = `${BASE_URL}/questions/${q.id}`;
            const response = await fetch(url);
            
            if (!response.ok) {
              console.error(`Failed to fetch question ${q.id}`);
              throw new Error(`Failed to fetch question ${q.id}`);
            }
            
            const questionData: QuestionResponse = await response.json();
            
            return {
              id: questionData.id,
              questionText: questionData.questionText,
              answers: questionData.answers.map(a => ({
                id: a.id,
                answer: a.answer,
                isCorrect: a.isCorrect
              })),
              category: {
                id: categoryResponse.id.toString(),
                name: categoryResponse.name,
                slug: categoryResponse.slug,
                questions: categoryResponse.questions
              }
            };
          })
        );
        
        setQuestions(questionsWithAnswers);
        setUiState('data');
      } catch (error) {
        console.error("Error fetching question answers:", error);
        setUiState('error');
      }
    }
    fetchData();
  }, [slug]);

  switch (uiState) {
    case 'loading':
      return <p>Sæki gögn...</p>;
    case 'error':
      return <p>Villa við að sækja gögn</p>;
    case 'empty':
      return <p>Engin gögn fundust</p>;
    case 'data':
      return (
        <div className="flex flex-col gap-6">
          <h2 className="font-bold text-xl text-center">{category?.name || 'Flokkur'}</h2>
          {questions.map((question) => (
            <Question key={question.id} question={question} />
          ))}
        </div>
      );
    case 'initial':
      return <p>Þú hefur ekki valið flokk</p>;
  }
}