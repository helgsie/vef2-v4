import { Category, Paginated, Question } from './types.js';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000/';

export class QuestionsApi {
    async fetchFromApi<T>(url: string): Promise<T | null> {
        let response: Response | undefined;
        try {
            response = await fetch(url);
        } catch (e) {
            console.error('villa við að sækja gögn úr api', url, e);
            return null;
        }

        if (!response.ok) {
            console.error('ekki 2xx status frá API', url);
            return null;
        }

        if (response.status === 404) {
            console.error('404 villa frá API', url);
            return null;
        }

        let json: unknown;
        try {
            json = await response.json();
        } catch (e) {
            console.error('villa við að túlka json', url, e);
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
                slug: item.slug,
                questions: item.questions
            })),
            total: response.length,
            limit: response.length,
            offset: 0
        };
    }

    async getQuestions(categorySlug: string): Promise<Question[] | null> {
        const url = BASE_URL + `/categories/${categorySlug}`;
        const response = await this.fetchFromApi<Question[]>(url);
        return response;
    }
}