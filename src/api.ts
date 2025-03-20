import { Category, Paginated, Question } from './types.js';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:5000/';

export class QuestionsApi {
    async fetchFromApi<T>(url: string): Promise<T | null> {
        let response: Response | undefined;
        try {
        response = await fetch(url);
        } catch (e) {
        console.error('error fetching from api', url, e);
        return null;
        }

        if (!response.ok) {
        console.error('non 2xx status from API', url);
        return null;
        }

        if (response.status === 404) {
        console.error('404 from API', url);
        return null;
        }

        let json: unknown;
        try {
        json = await response.json();
        } catch (e) {
        console.error('error parsing json', url, e);
        return null;
        }

        return json as T;
    }

    async getCategory(slug: string): Promise<Category | null> {
        const url = BASE_URL + `/categories/${slug}`;

        const response = await this.fetchFromApi<Category | null>(url);

        return response;
    }

    async getCategories(): Promise<Paginated<Category> | null> {
        const url = BASE_URL + '/categories';

        const response = await this.fetchFromApi<Category[]>(url);

        if (!response) return null;

        return {
            data: response.map(item => ({
              id: String(item.id), // Breyta í string til að passa í framenda type
              name: item.name,
              slug: item.slug
            })),
            total: response.length,
            limit: response.length,
            offset: 0
          };
    }

    async getQuestions(
        categorySlug: string,
    ): Promise<Paginated<Question> | null> {
        const url = BASE_URL + `/questions?category=${categorySlug}`;
        // new URL()

        const response = await this.fetchFromApi<Paginated<Question>>(url);

        return response;
    }
}