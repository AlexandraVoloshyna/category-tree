import React, { memo } from 'react';
import { Category } from '../../types';

interface TreeNodeProps {
  category: Category;
  addCategory: (parentId: number) => void;
  renameCategory: (id: number, newName: string) => void;
  deleteCategory: (id: number) => void;
  toggleExpand: (id: number) => void;
}

export const TreeNode: React.FC<TreeNodeProps> = memo(({ category, addCategory, renameCategory, deleteCategory, toggleExpand }) => {
  return (
    <li className="category-item">
      <div>
        <button onClick={() => toggleExpand(category.id)}>{category.expanded ? '-' : '+'}</button>
        <span>{category.name}</span>
        <button onClick={() => renameCategory(category.id, prompt('New name') || category.name)}>Rename</button>
        <button onClick={() => deleteCategory(category.id)}>Delete</button>
        <button onClick={() => addCategory(category.id)}>Add Subcategory</button>
      </div>
      {category.expanded && category.children.length > 0 && (
        <ul>
          {category.children.map(subcategory => (
            <TreeNode 
              key={subcategory.id} 
              category={subcategory} 
              addCategory={addCategory} 
              renameCategory={renameCategory} 
              deleteCategory={deleteCategory} 
              toggleExpand={toggleExpand} 
            />
          ))}
        </ul>
      )}
    </li>
  );
});

