'use client';

import { QuestionsApi } from '@/api';
import { Question as TQuestion, UiState } from '@/types';
import { JSX, useEffect, useState } from 'react';
import { Question } from '../Question/Question';

interface BackendAnswer {
  id: number;
  answer?: string;
  text?: string;
  isCorrect?: boolean;
  correct?: boolean;
  questionId: number;
}

interface BackendCategory {
  id: number | string;
  name: string;
  slug: string;
}

interface BackendQuestion {
  id: number;
  questionText?: string;
  text?: string;
  categoryId?: number;
  category?: BackendCategory;
  answers: BackendAnswer[];
}

export function Category({ slug }: { slug: string }): JSX.Element {
  const [uiState, setUiState] = useState<UiState>('initial');
  const [questions, setQuestions] = useState<TQuestion[]>([]);

  useEffect(() => {
    async function fetchData() {
      setUiState('loading');
      const api = new QuestionsApi();
      const response = await api.getQuestions(slug);

      if (!response) {
        setUiState('error');
        return;
      }

      console.log(response);

      let questionsToProcess: Partial<BackendQuestion>[] = [];

      if (Array.isArray(response)) {
        questionsToProcess = response as Partial<BackendQuestion>[];
      } else if (response.data && Array.isArray(response.data)) {
        questionsToProcess = response.data as Partial<BackendQuestion>[];
      }
      
      if (questionsToProcess.length === 0) {
        setUiState('empty');
      } else {
        setUiState('data');

        const mappedQuestions = questionsToProcess.map((q): TQuestion => ({
          id: q.id ?? 0,
          text: q.questionText || q.text || '',
          answers: (q.answers || []).map((a: Partial<BackendAnswer>) => ({
            id: a.id ?? 0,
            text: a.answer || a.text || '',
            correct: Boolean(a.isCorrect ?? a.correct ?? false)
          })),
          category: {
            id: String(q.category?.id || q.categoryId || ''),
            name: q.category?.name || '',
            slug: q.category?.slug || slug
          }
        }));
        
        setQuestions(mappedQuestions);
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
          <h2 className="font-bold text-xl text-center">{questions[0].category.name}</h2>
          {questions.map((question) => (
            <Question key={question.id} question={question} />
          ))}
        </div>
      );
    case 'initial':
      return <p>Þú hefur ekki valið flokk</p>;
  }
}