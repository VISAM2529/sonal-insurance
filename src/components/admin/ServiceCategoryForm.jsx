"use client"
import { useState, useEffect } from 'react';
import { X, Plus, Image as ImageIcon, Upload as UploadIcon } from 'lucide-react';
import Image from "next/image";

export default function ServiceCategoryForm({ category, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    icon: 'Shield',
    description: '',
    color: 'blue',
    bgGradient: 'from-blue-50 to-blue-100',
    image: '',
    isActive: true,
    displayOrder: 0
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageError, setImageError] = useState('');

  const iconOptions = [
    'Shield', 'Heart', 'Car', 'Home', 'Building', 'Plane', 'Users', 'Briefcase'
  ];

  const colorOptions = [
    { name: 'Blue', value: 'blue', gradient: 'from-blue-50 to-blue-100' },
    { name: 'Emerald', value: 'emerald', gradient: 'from-emerald-50 to-emerald-100' },
    { name: 'Purple', value: 'purple', gradient: 'from-purple-50 to-purple-100' },
    { name: 'Orange', value: 'orange', gradient: 'from-orange-50 to-orange-100' },
    { name: 'Red', value: 'red', gradient: 'from-red-50 to-red-100' },
    { name: 'Pink', value: 'pink', gradient: 'from-pink-50 to-pink-100' }
  ];

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        slug: category.slug || '',
        icon: category.icon || 'Shield',
        description: category.description || '',
        color: category.color || 'blue',
        bgGradient: category.bgGradient || 'from-blue-50 to-blue-100',
        image: category.image || '',
        isActive: category.isActive ?? true,
        displayOrder: category.displayOrder || 0
      });
      setImagePreview(category.image || null);
    }
  }, [category]);

  // Auto-generate slug from name
  const handleNameChange = (e) => {
    const name = e.target.value;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    setFormData({ ...formData, name, slug });
  };

  // Handle color selection
  const handleColorChange = (colorOption) => {
    setFormData({
      ...formData,
      color: colorOption.value,
      bgGradient: colorOption.gradient
    });
  };

  // Handle image selection and upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setImageError('Please select a valid image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setImageError('Image size should be less than 5MB');
      return;
    }

    setImageError('');
    setUploading(true);

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    // Upload to Cloudinary
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('image', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await response.json();

      if (data.success) {
        setFormData({ ...formData, image: data.url });
        console.log('Image uploaded successfully:', data.url);
      } else {
        setImageError('Failed to upload image. Please try again.');
        setImagePreview(null);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setImageError('Error uploading image. Please try again.');
      setImagePreview(null);
    } finally {
      setUploading(false);
    }
  };

  // Remove image
  const removeImage = () => {
    setFormData({ ...formData, image: '' });
    setImagePreview(null);
    setImageError('');
    // Clear file input
    const fileInput = document.getElementById('image-upload');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setImageError('');

    try {
      const url = category 
        ? `/api/admin/service-categories/${category._id}` 
        : '/api/admin/service-categories';
      
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
      } else {
        const errorData = await response.json();
        console.error('Submit error:', errorData);
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
            {category ? 'Edit Service Category' : 'Add New Service Category'}
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
            />
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
            />
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Category Image
            </label>
            <div className="space-y-3">
              {/* Preview Image */}
              {imagePreview && (
                <div className="relative group">
                  <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={imagePreview}
                      alt="Category preview"
                      width={400}
                      height={192}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors duration-150 opacity-0 group-hover:opacity-100"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}

              {/* Upload Input */}
              <div className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center transition-all duration-200 hover:border-gray-400 ${
                uploading ? 'border-blue-500 bg-blue-50' : ''
              }`}>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={uploading}
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center justify-center"
                >
                  <UploadIcon className={`h-8 w-8 mb-2 ${uploading ? 'text-blue-500' : 'text-gray-400'}`} />
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    {uploading ? 'Uploading...' : 'Upload Image'}
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG up to 5MB
                  </p>
                </label>
              </div>

              {/* Error Message */}
              {imageError && (
                <p className="text-red-600 text-sm mt-2">{imageError}</p>
              )}

              {/* Current Image URL (for editing) */}
              {formData.image && !imagePreview && (
                <div className="text-xs text-gray-500">
                  Current: {formData.image}
                </div>
              )}
            </div>
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
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Color Theme
            </label>
            <div className="grid grid-cols-3 gap-3">
              {colorOptions.map((colorOption) => (
                <button
                  key={colorOption.name}
                  type="button"
                  onClick={() => handleColorChange(colorOption)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    formData.color === colorOption.value 
                      ? 'border-emerald-500 shadow-sm' 
                      : 'border-gray-200 hover:border-gray-300'
                  } ${colorOption.gradient}`}
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
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm font-medium text-gray-700">Active</label>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              disabled={loading || uploading}
              className="px-5 py-2.5 border border-gray-200 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition-all duration-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || uploading}
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