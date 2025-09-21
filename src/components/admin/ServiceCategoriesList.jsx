"use client"
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Shield, ToggleLeft, ToggleRight } from 'lucide-react';
import ServiceCategoryForm from './ServiceCategoryForm';

export default function ServiceCategoriesList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/service-categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching service categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this category? This will affect all services using this category.')) return;
    
    try {
      const response = await fetch(`/api/admin/service-categories/${id}`, {
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
      const response = await fetch(`/api/admin/service-categories/${id}`, {
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

  if (loading) {
    return (
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-10">
          <div className="w-full sm:w-auto">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-10 w-full sm:w-48 bg-gray-200 rounded-lg animate-pulse mt-4 sm:mt-0"></div>
        </div>
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Desktop Table Skeleton */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['Category', 'Description', 'Services Count', 'Status', 'Display Order', 'Actions'].map((header, index) => (
                    <th key={index} className="px-4 sm:px-6 py-4">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg mr-3"></div>
                        <div>
                          <div className="h-5 w-32 bg-gray-200 rounded mb-1"></div>
                          <div className="h-4 w-24 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="h-4 w-48 bg-gray-200 rounded"></div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="h-4 w-16 bg-gray-200 rounded"></div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="h-5 w-20 bg-gray-200 rounded"></div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="h-4 w-12 bg-gray-200 rounded"></div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex space-x-3">
                        <div className="h-6 w-6 bg-gray-200 rounded"></div>
                        <div className="h-6 w-6 bg-gray-200 rounded"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile Card Skeleton */}
          <div className="block sm:hidden space-y-4 p-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200 animate-pulse">
                <div className="flex items-center justify-between mb-2">
                  <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-5 w-16 bg-gray-200 rounded"></div>
                </div>
                <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-1/3 bg-gray-200 rounded mb-2"></div>
                <div className="flex space-x-3">
                  <div className="h-8 w-8 bg-gray-200 rounded"></div>
                  <div className="h-8 w-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-10">
        <div className="w-full sm:w-auto text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">Service Categories</h1>
          <p className="mt-1 text-sm text-gray-500">Manage insurance service categories and classifications</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="group relative inline-flex items-center px-4 sm:px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md mt-4 sm:mt-0 w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
          Add New Category
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Services Count
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Display Order
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.map((category) => (
                <tr key={category._id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${category.bgGradient || 'bg-gray-100'}`}>
                        <Shield className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{category.name || 'Untitled'}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{category.slug || 'N/A'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">{category.description || 'No description'}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{category.serviceCount || 0} services</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
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
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {category.displayOrder || 0}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEdit(category)}
                        className="text-blue-600 hover:text-blue-800 p-2 rounded hover:bg-blue-50 transition-colors duration-150"
                        title="Edit category"
                        aria-label="Edit category"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="text-red-600 hover:text-red-900 p-2 rounded hover:bg-red-50 transition-colors duration-150"
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

        {/* Mobile Card View */}
        <div className="block sm:hidden space-y-4 p-4">
          {categories.map((category) => (
            <div key={category._id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-2 ${category.bgGradient || 'bg-gray-100'}`}>
                    <Shield className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="text-sm font-medium text-gray-900">{category.name || 'Untitled'}</div>
                </div>
                <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                  category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {category.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="text-xs text-gray-500 mb-2 truncate">{category.description || 'No description'}</div>
              <div className="text-xs text-gray-500 mb-2">Slug: {category.slug || 'N/A'}</div>
              <div className="text-xs text-gray-500 mb-2">Services: {category.serviceCount || 0}</div>
              <div className="text-xs text-gray-500 mb-2">Display Order: {category.displayOrder || 0}</div>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleEdit(category)}
                  className="text-blue-600 hover:text-blue-800 p-2 rounded hover:bg-blue-50 transition-colors duration-150"
                  aria-label="Edit category"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="text-red-600 hover:text-red-900 p-2 rounded hover:bg-red-50 transition-colors duration-150"
                  aria-label="Delete category"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleToggleStatus(category._id, category.isActive)}
                  className="flex items-center p-2 rounded hover:bg-gray-50 transition-colors duration-150"
                  aria-label={category.isActive ? 'Deactivate category' : 'Activate category'}
                >
                  {category.isActive ? (
                    <ToggleRight className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <ToggleLeft className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {categories.length === 0 && !loading && (
          <div className="text-center py-12">
            <Shield className="mx-auto h-10 sm:h-12 w-10 sm:w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No Service Categories</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new service category.</p>
            <div className="mt-6">
              <button
                onClick={() => setShowForm(true)}
                className="group inline-flex items-center px-4 sm:px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md w-full sm:w-auto"
              >
                <Plus className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                Add Category
              </button>
            </div>
          </div>
        )}
      </div>

      {showForm && (
        <ServiceCategoryForm
          category={editingCategory}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}