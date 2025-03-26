'use client';
import { useState, useEffect } from 'react';
import CategoryList from '../CategoryList/CategoryList';
import CategoryForm from '../CategoryForm/CategoryForm';

const API_URL = 'https://vef2-v3-thb0.onrender.com/categories';

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function CategoryManagement() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategory, setNewCategory] = useState('');
    const [editingCategory, setEditingCategory] = useState<string | null>(null);
    const [editName, setEditName] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    // Sækja flokka
    async function fetchCategories() {
        try {
            const response = await fetch(API_URL);
            
            if (!response.ok) throw new Error('Mistókst að sækja flokka');
            
            const data: Category[] = await response.json();
            setCategories(data);
            setError(null);
            } catch (err) {
            console.error('Villa við að sækja flokka:', err);
            setError(err instanceof Error ? err.message : 'Óþekkt villa átti sér stað');
        }
    }

    // Búa til flokk
    async function createCategory() {
        if (!newCategory.trim()) {
        setError('Flokkur þarf að hafa nafn');
        return;
        }

        try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                name: newCategory.trim(),
                slug: newCategory
                    .toLowerCase()
                    .replace(/[^\w ]+/g, '')
                    .replace(/ +/g, '-') 
            })
        });

        fetchCategories();
        setNewCategory('');
        setError(null);
        } catch (err) {
        console.error('Villa við að búa til flokk:', err);
        setError(err instanceof Error ? err.message : 'Óþekkt villa átti sér stað');
        }
    }

    // Breyta flokki
    async function updateCategory(slug: string) {
        if (!editName.trim()) {
            setError('Flokkur þarf að hafa nafn');
            return;
        }

        try {
            await fetch(`${API_URL}/${slug}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    name: editName.trim(),
                    slug: editName
                        .toLowerCase()
                        .replace(/[^\w ]+/g, '')
                        .replace(/ +/g, '-') 
                })
            });

            fetchCategories();
            setEditingCategory(null);
            setEditName('');
            setError(null);
        } catch (err) {
        console.error('Villa við að breyta flokknum:', err);
        setError(err instanceof Error ? err.message : 'Óþekkt villa átti sér stað');
        }
    }

    // Eyða flokki
    async function deleteCategory(slug: string) {
        try {
        await fetch(`${API_URL}/${slug}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        fetchCategories();
        setError(null);
        } catch (err) {
        console.error('Villa við að eyða flokki:', err);
        setError(err instanceof Error ? err.message : 'Óþekkt villa átti sér stað');
        }
    }

    return (
        <div className="p-4 max-w-md mx-auto">
        <h1 className="text-xl font-bold mb-4">Flokkar</h1>
        {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</div>}
        <CategoryList {...{ categories, editingCategory, editName, setEditingCategory, setEditName, updateCategory, deleteCategory }} />
        <CategoryForm {...{ newCategory, setNewCategory, createCategory }} />
        </div>
    );
}