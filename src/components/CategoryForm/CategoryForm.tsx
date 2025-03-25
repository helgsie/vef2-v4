interface Props {
    newCategory: string;
    setNewCategory: (name: string) => void;
    createCategory: () => void;
}

export default function CategoryForm({ newCategory, setNewCategory, createCategory }: Props) {
    return (
        <div className="flex space-x-2">
        <input
            className="flex-grow bg-neutral-100 px-2 py-1 rounded border"
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') createCategory();
            }}
            placeholder="Nafn á nýjum flokki"
        />
        <button 
            className="bg-green-500 text-white px-4 py-1 rounded"
            onClick={createCategory}
        >
            Bæta við
        </button>
        </div>
    );
}  