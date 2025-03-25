import CategoryItem from "../CategoryItem/CategoryItem";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Props {
  categories: Category[];
  editingCategory: string | null;
  editName: string;
  setEditingCategory: (id: string | null) => void;
  setEditName: (name: string) => void;
  updateCategory: (slug: string) => void;
  deleteCategory: (slug: string) => void;
}

export default function CategoryList({ 
  categories, 
  editingCategory, 
  editName, 
  setEditingCategory, 
  setEditName, 
  updateCategory, 
  deleteCategory 
}: Props) {
  return (
    <ul className="space-y-2 mb-4">
      {categories.map(category => (
        <CategoryItem 
          key={category.id} 
          category={category}
          editingCategory={editingCategory}
          editName={editName}
          setEditingCategory={setEditingCategory}
          setEditName={setEditName}
          updateCategory={updateCategory}
          deleteCategory={deleteCategory}
        />
      ))}
    </ul>
  );
}