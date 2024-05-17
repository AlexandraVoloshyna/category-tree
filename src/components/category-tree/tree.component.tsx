import React, { useState, useCallback } from 'react';
import { TreeNode } from '../tree-node/tree-node.component';
import { Category } from '../../types';

export const Tree: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const addCategory = useCallback((parentId: number | null) => {
    const newCategory: Category = { id: Date.now(), name: 'Name', children: [], expanded: true };
    setCategories(prevCategories => {
      const addNode = (cats: Category[]): Category[] => cats.map(cat => 
        cat.id === parentId ? { ...cat, children: [...cat.children, newCategory] } : { ...cat, children: addNode(cat.children) }
      );
      return parentId === null ? [...prevCategories, newCategory] : addNode(prevCategories);
    });
  }, []);

  const renameCategory = useCallback((id: number, newName: string) => {
    setCategories(prevCategories => {
      const renameNode = (cats: Category[]): Category[] => cats.map(cat => 
        cat.id === id ? { ...cat, name: newName } : { ...cat, children: renameNode(cat.children) }
      );
      return renameNode(prevCategories);
    });
  }, []);

  const deleteCategory = useCallback((id: number) => {
    setCategories(prevCategories => {
      const deleteNode = (cats: Category[]): Category[] => 
        cats.filter(cat => cat.id !== id).map(cat => ({ ...cat, children: deleteNode(cat.children) }));
      return deleteNode(prevCategories);
    });
  }, []);

  const toggleExpand = useCallback((id: number) => {
    setCategories(prevCategories => {
      const toggleNode = (cats: Category[]): Category[] => cats.map(cat => 
        cat.id === id ? { ...cat, expanded: !cat.expanded } : { ...cat, children: toggleNode(cat.children) }
      );
      return toggleNode(prevCategories);
    });
  }, []);

  return (
    <div>
      <button onClick={() => addCategory(null)}>Add Root Category</button>
      <ul className="category-tree" >
        {categories.map((category: Category) => (
          <TreeNode 
            key={category.id} 
            category={category} 
            addCategory={addCategory} 
            renameCategory={renameCategory} 
            deleteCategory={deleteCategory} 
            toggleExpand={toggleExpand} 
          />
        ))}
      </ul>
    </div>
  );
};
