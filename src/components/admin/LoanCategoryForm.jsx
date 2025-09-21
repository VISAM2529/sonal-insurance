"use client"
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function LoanCategoryForm({ category, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    icon: 'Home',
    description: '',
    color: 'blue-600',
    bgColor: 'bg-blue-50',
    iconBg: 'bg-blue-100',
    isActive: true,
    displayOrder: 0
  });
  const [loading, setLoading] = useState(false);

  const iconOptions = [
    'Home', 'Car', 'GraduationCap', 'Building2', 'CreditCard', 'DollarSign', 'Briefcase'
  ];

  const colorOptions = [
    { 
      name: 'Blue', 
      color: 'blue-600', 
      bgColor: 'bg-blue-50', 
      iconBg: 'bg-blue-100',
      preview: 'bg-blue-50 border-blue-200'
    },
    { 
      name: 'Emerald', 
      color: 'emerald-600', 
      bgColor: 'bg-emerald-50', 
      iconBg: 'bg-emerald-100',
      preview: 'bg-emerald-50 border-emerald-200'
    },
    { 
      name: 'Purple', 
      color: 'purple-600', 
      bgColor: 'bg-purple-50', 
      iconBg: 'bg-purple-100',
      preview: 'bg-purple-50 border-purple-200'
    },
    { 
      name: 'Orange', 
      color: 'orange-600', 
      bgColor: 'bg-orange-50', 
      iconBg: 'bg-orange-100',
      preview: 'bg-orange-50 border-orange-200'
    }
  ];

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        slug: category.slug || '',
        icon: category.icon || 'Home',
        description: category.description || '',
        color: category.color || 'blue-600',
        bgColor: category.bgColor || 'bg-blue-50',
        iconBg: category.iconBg || 'bg-blue-100',
        isActive: category.isActive ?? true,
        displayOrder: category.displayOrder || 0
      });
    }
  }, [category]);

  const handleNameChange = (e) => {
    const name = e.target.value;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setFormData({ ...formData, name, slug });
  };

  const handleColorChange = (colorOption) => {
    setFormData({
      ...formData,
      color: colorOption.color,
      bgColor: colorOption.bgColor,
      iconBg: colorOption.iconBg
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = category 
        ? `/api/admin/loan-categories/${category._id}` 
        : '/api/admin/loan-categories';
      
      const method = category ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onClose();
      }
    } catch (error) {
      console.error('Error saving category:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white rounded-xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
            {category ? 'Edit Loan Category' : 'Add New Loan Category'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
            aria-label="Close form"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Category Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={handleNameChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 bg-gray-50"
              required
              placeholder="e.g., Home Loans"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Slug
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 bg-gray-50"
              required
              placeholder="home-loans"
            />
            <p className="text-xs text-gray-500 mt-1">URL-friendly version of the name</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 bg-gray-50"
              required
              placeholder="Brief description of this loan category..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Icon
            </label>
            <select
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 bg-gray-50"
            >
              {iconOptions.map((icon) => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color Theme
            </label>
            <div className="grid grid-cols-2 gap-3">
              {colorOptions.map((colorOption) => (
                <button
                  key={colorOption.name}
                  type="button"
                  onClick={() => handleColorChange(colorOption)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    formData.color === colorOption.color 
                      ? 'border-emerald-500 shadow-sm' 
                      : 'border-gray-200 hover:border-gray-300'
                  } ${colorOption.preview}`}
                >
                  <div className="text-xs font-medium text-center text-gray-800">{colorOption.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Display Order
            </label>
            <input
              type="number"
              value={formData.displayOrder}
              onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 bg-gray-50"
              min="0"
              placeholder="0"
            />
            <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="ml-2 text-sm font-medium text-gray-700">
              Active (visible to users)
            </label>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-200 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? 'Saving...' : (category ? 'Update Category' : 'Create Category')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}