"use client"
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, CreditCard, ToggleLeft, ToggleRight } from 'lucide-react';
import LoanCategoryForm from './LoanCategoryForm';

export default function LoanCategoriesList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/loan-categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching loan categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this category? This will affect all loan products using this category.')) return;
    
    try {
      const response = await fetch(`/api/admin/loan-categories/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        fetchCategories();
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const response = await fetch(`/api/admin/loan-categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      
      if (response.ok) {
        fetchCategories();
      }
    } catch (error) {
      console.error('Error updating category status:', error);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingCategory(null);
    fetchCategories();
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-lg font-medium text-gray-600">Loading...</div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Loan Categories</h1>
          <p className="mt-1 text-sm text-gray-500">Manage loan product categories and types</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="group relative inline-flex items-center px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md"
        >
          <Plus className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
          Add New Category
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Products Count
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Display Order
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.map((category) => (
                <tr key={category._id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${category.bgColor || 'bg-gray-100'}`}>
                        <CreditCard className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{category.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{category.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">{category.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{category.productCount || 0} products</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleStatus(category._id, category.isActive)}
                      className="flex items-center"
                      aria-label={category.isActive ? 'Deactivate category' : 'Activate category'}
                    >
                      {category.isActive ? (
                        <>
                          <ToggleRight className="h-5 w-5 text-emerald-600 mr-1.5" />
                          <span className="text-sm font-medium text-emerald-600">Active</span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="h-5 w-5 text-gray-400 mr-1.5" />
                          <span className="text-sm font-medium text-gray-400">Inactive</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {category.displayOrder || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEdit(category)}
                        className="text-blue-600 hover:text-blue-800 p-1.5 rounded hover:bg-blue-50 transition-colors duration-150"
                        title="Edit category"
                        aria-label="Edit category"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="text-red-600 hover:text-red-900 p-1.5 rounded hover:bg-red-50 transition-colors duration-150"
                        title="Delete category"
                        aria-label="Delete category"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {categories.length === 0 && !loading && (
          <div className="text-center py-12">
            <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No Loan Categories</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new loan category.</p>
            <div className="mt-6">
              <button
                onClick={() => setShowForm(true)}
                className="group inline-flex items-center px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Plus className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                Add Category
              </button>
            </div>
          </div>
        )}
      </div>

      {showForm && (
        <LoanCategoryForm
          category={editingCategory}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}