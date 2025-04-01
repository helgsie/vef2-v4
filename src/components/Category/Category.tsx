'use client';

import { QuestionsApi } from '@/api';
import { Question as TQuestion, UiState, Category as TCategory } from '@/types';
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
  const [category, setCategory] = useState<TCategory | null>(null);

  useEffect(() => {
    async function fetchData() {
      setUiState('loading');
      const api = new QuestionsApi();

      // Sækjum spurningar
      const questionsResponse = await api.getQuestions(slug);
      console.log("response:", questionsResponse);

      if (!questionsResponse || !questionsResponse.data || !Array.isArray(questionsResponse.data)) {
        setUiState('error');
        return;
      }

      let questionsToProcess: Partial<BackendQuestion>[] = [];

      if (Array.isArray(questionsResponse)) {
        questionsToProcess = questionsResponse as Partial<BackendQuestion>[];
      } else if (questionsResponse.data && Array.isArray(questionsResponse.data)) {
        questionsToProcess = questionsResponse.data as Partial<BackendQuestion>[];
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