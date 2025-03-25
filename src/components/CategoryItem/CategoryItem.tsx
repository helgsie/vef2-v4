interface Category {
    id: string;
    name: string;
    slug: string;
}
  
interface Props {
    category: Category;
    editingCategory: string | null;
    editName: string;
    setEditingCategory: (id: string | null) => void;
    setEditName: (name: string) => void;
    updateCategory: (slug: string) => void;
    deleteCategory: (slug: string) => void;
}

export default function CategoryItem({ 
    category,
    editingCategory,
    editName,
    setEditingCategory,
    setEditName,
    updateCategory,
    deleteCategory
    }: Props) {
    return (
        <li className="flex items-center justify-between bg-neutral-100 p-2 rounded">
        {editingCategory === category.id ? (
            <div className="flex items-center space-x-2 w-full">
                <input
                    className="flex-grow bg-white px-2 py-1 rounded border"
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => {
                    if (e.key === 'Enter') updateCategory(category.slug);
                    if (e.key === 'Escape') setEditingCategory(null);
                    }}
                    autoFocus
                />
                <button 
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => updateCategory(category.slug)}
                >
                    Vista
                </button>
                <button 
                    className="bg-neutral-300 px-2 py-1 rounded"
                    onClick={() => setEditingCategory(null)}
                >
                    Hætta við
                </button>
            </div>
        ) : (
            <div className="flex items-center justify-between w-full">
                <span>{category.name}</span>
                <div className="space-x-2">
                    <button 
                        className="text-blue-500 hover:underline"
                        onClick={() => { 
                            setEditingCategory(category.id); 
                            setEditName(category.name); 
                        }}
                    >
                    Breyta
                    </button>
                    <button 
                        className="text-red-500 hover:underline"
                        onClick={() => deleteCategory(category.slug)}
                    >
                    Eyða
                    </button>
                </div>
            </div>
        )}
        </li>
    );
}  