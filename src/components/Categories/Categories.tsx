'use client';

import { QuestionsApi } from '@/api';
import { Category, Paginated, UiState } from '@/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Props = {
  title: string;
  tag?: string;
  popular?: boolean;
};

export default function Categories({ title }: Props) {
  const [uiState, setUiState] = useState<UiState>('initial');
  const [categories, setCategories] = useState<Paginated<Category> | null>(null);

  useEffect(() => {
    async function fetchData() {
      setUiState('loading');

      const api = new QuestionsApi();
      const categoriesResponse = await api.getCategories();

      console.log("categoriesResponse:", categoriesResponse);
      console.log("JSON.stringify(categoriesResponse):", JSON.stringify(categoriesResponse))

      if (!categoriesResponse) {
        setUiState('error');
      } else {
        setUiState('data');
        setCategories(categoriesResponse);
      }
    }
    fetchData();
  }, []);

  console.log(categories);

  return (
    <div className="">
      <h2>{title}</h2>

      {uiState === 'loading' && <p>Sæki flokka</p>}
      {uiState === 'error' && <p>Villa við að sækja flokka</p>}
      {uiState === 'data' && categories?.data && (
        <ul>
          {categories.data.map((category) => (
            <li key={category.id}>
              <Link href={`/flokkar/${category.slug}`}>{category.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}