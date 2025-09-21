"use client"
import { useState, useEffect } from 'react';
import { X, Plus, Image as ImageIcon, Upload as UploadIcon } from 'lucide-react';
import Image from 'next/image';

export default function ServiceForm({ service, onClose }) {
  const [formData, setFormData] = useState({
    categoryId: '',
    title: '',
    subtitle: '',
    description: '',
    shortDescription: '',
    heroImage: '',
    rating: 0,
    reviewCount: 0,
    keyFeatures: [''],
    benefits: [{ title: '', description: '', icon: '' }],
    eligibility: [''],
    documents: [{ name: '', description: '', required: false }],
    faqs: [{ question: '', answer: '' }],
    stats: [{ label: '', value: '', growth: '' }],
    processSteps: [{ step: 1, title: '', description: '', icon: '' }],
    isActive: true,
    isFeatured: false,
    displayOrder: 0,
    metaTitle: '',
    metaDescription: '',
    tags: ['']
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageError, setImageError] = useState('');

  const iconOptions = [
    'Shield', 'Heart', 'Car', 'Home', 'Building', 'Plane', 'Users', 'Briefcase', 'CreditCard', 'FileText', 'Upload', 'CheckCircle', 'Search'
  ];

  useEffect(() => {
    fetchCategories();
    if (service) {
      setFormData({
        categoryId: service.categoryId?._id || '',
        title: service.title || '',
        subtitle: service.subtitle || '',
        description: service.description || '',
        shortDescription: service.shortDescription || '',
        heroImage: service.heroImage || '',
        rating: service.rating || 0,
        reviewCount: service.reviewCount || 0,
        keyFeatures: service.keyFeatures || [''],
        benefits: service.benefits || [{ title: '', description: '', icon: '' }],
        eligibility: service.eligibility || [''],
        documents: service.documents || [{ name: '', description: '', required: false }],
        faqs: service.faqs || [{ question: '', answer: '' }],
        stats: service.stats || [{ label: '', value: '', growth: '' }],
        processSteps: service.processSteps || [{ step: 1, title: '', description: '', icon: '' }],
        isActive: service.isActive ?? true,
        isFeatured: service.isFeatured ?? false,
        displayOrder: service.displayOrder || 0,
        metaTitle: service.metaTitle || '',
        metaDescription: service.metaDescription || '',
        tags: service.tags || ['']
      });
      setImagePreview(service.heroImage || null);
    }
  }, [service]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/service-categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.keyFeatures];
    newFeatures[index] = value;
    setFormData({ ...formData, keyFeatures: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, keyFeatures: [...formData.keyFeatures, ''] });
  };

  const removeFeature = (index) => {
    const newFeatures = formData.keyFeatures.filter((_, i) => i !== index);
    setFormData({ ...formData, keyFeatures: newFeatures });
  };

  const handleBenefitChange = (index, field, value) => {
    const newBenefits = [...formData.benefits];
    newBenefits[index] = { ...newBenefits[index], [field]: value };
    setFormData({ ...formData, benefits: newBenefits });
  };

  const addBenefit = () => {
    setFormData({ ...formData, benefits: [...formData.benefits, { title: '', description: '', icon: '' }] });
  };

  const removeBenefit = (index) => {
    const newBenefits = formData.benefits.filter((_, i) => i !== index);
    setFormData({ ...formData, benefits: newBenefits });
  };

  const handleEligibilityChange = (index, value) => {
    const newEligibility = [...formData.eligibility];
    newEligibility[index] = value;
    setFormData({ ...formData, eligibility: newEligibility });
  };

  const addEligibility = () => {
    setFormData({ ...formData, eligibility: [...formData.eligibility, ''] });
  };

  const removeEligibility = (index) => {
    const newEligibility = formData.eligibility.filter((_, i) => i !== index);
    setFormData({ ...formData, eligibility: newEligibility });
  };

  const handleDocumentChange = (index, field, value) => {
    const newDocuments = [...formData.documents];
    newDocuments[index] = { ...newDocuments[index], [field]: value };
    setFormData({ ...formData, documents: newDocuments });
  };

  const addDocument = () => {
    setFormData({ ...formData, documents: [...formData.documents, { name: '', description: '', required: false }] });
  };

  const removeDocument = (index) => {
    const newDocuments = formData.documents.filter((_, i) => i !== index);
    setFormData({ ...formData, documents: newDocuments });
  };

  const handleFaqChange = (index, field, value) => {
    const newFaqs = [...formData.faqs];
    newFaqs[index] = { ...newFaqs[index], [field]: value };
    setFormData({ ...formData, faqs: newFaqs });
  };

  const addFaq = () => {
    setFormData({ ...formData, faqs: [...formData.faqs, { question: '', answer: '' }] });
  };

  const removeFaq = (index) => {
    const newFaqs = formData.faqs.filter((_, i) => i !== index);
    setFormData({ ...formData, faqs: newFaqs });
  };

  const handleStatChange = (index, field, value) => {
    const newStats = [...formData.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setFormData({ ...formData, stats: newStats });
  };

  const addStat = () => {
    setFormData({ ...formData, stats: [...formData.stats, { label: '', value: '', growth: '' }] });
  };

  const removeStat = (index) => {
    const newStats = formData.stats.filter((_, i) => i !== index);
    setFormData({ ...formData, stats: newStats });
  };

  const handleProcessStepChange = (index, field, value) => {
    const newSteps = [...formData.processSteps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    if (field === 'step') {
      newSteps[index].step = parseInt(value) || 0;
    }
    setFormData({ ...formData, processSteps: newSteps });
  };

  const addProcessStep = () => {
    const lastStep = formData.processSteps.length > 0 ? formData.processSteps[formData.processSteps.length - 1].step : 0;
    setFormData({ ...formData, processSteps: [...formData.processSteps, { step: lastStep + 1, title: '', description: '', icon: '' }] });
  };

  const removeProcessStep = (index) => {
    const newSteps = formData.processSteps.filter((_, i) => i !== index);
    setFormData({ ...formData, processSteps: newSteps.map((step, i) => ({ ...step, step: i + 1 })) });
  };

  const handleTagChange = (index, value) => {
    const newTags = [...formData.tags];
    newTags[index] = value;
    setFormData({ ...formData, tags: newTags });
  };

  const addTag = () => {
    setFormData({ ...formData, tags: [...formData.tags, ''] });
  };

  const removeTag = (index) => {
    const newTags = formData.tags.filter((_, i) => i !== index);
    setFormData({ ...formData, tags: newTags });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setImageError('Please select a valid image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError('Image size should be less than 5MB');
      return;
    }

    setImageError('');
    setUploading(true);

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('image', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await response.json();

      if (data.success) {
        setFormData({ ...formData, heroImage: data.url });
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

  const removeImage = () => {
    setFormData({ ...formData, heroImage: '' });
    setImagePreview(null);
    setImageError('');
    const fileInput = document.getElementById('image-upload');
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setImageError('');

    try {
      const url = service 
        ? `/api/admin/services/${service._id}` 
        : '/api/admin/services';
      
      const method = service ? 'PUT' : 'POST';

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
      console.error('Error saving service:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white rounded-xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
            {service ? 'Edit Service' : 'Add New Service'}
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
              Category
            </label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 bg-gray-50"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 bg-gray-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Subtitle
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 bg-gray-50"
                required
              />
            </div>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Short Description
            </label>
            <input
              type="text"
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 bg-gray-50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Hero Image
            </label>
            <div className="space-y-3">
              {imagePreview && (
                <div className="relative group">
                  <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={imagePreview}
                      alt="Hero image preview"
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
              <div className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center transition-all duration-200 hover:border-gray-400 ${uploading ? 'border-blue-500 bg-blue-50' : ''}`}>
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
                    {uploading ? 'Uploading...' : 'Upload Hero Image'}
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG up to 5MB
                  </p>
                </label>
              </div>
              {imageError && (
                <p className="text-red-600 text-sm mt-2">{imageError}</p>
              )}
              {formData.heroImage && !imagePreview && (
                <div className="text-xs text-gray-500">
                  Current: {formData.heroImage}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Rating
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Review Count
              </label>
              <input
                type="number"
                value={formData.reviewCount}
                onChange={(e) => setFormData({ ...formData, reviewCount: parseInt(e.target.value) || 0 })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 bg-gray-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Key Features
            </label>
            {formData.keyFeatures.map((feature, index) => (
              <div key={index} className="flex items-center mb-3">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 bg-gray-50"
                  placeholder="Enter feature"
                />
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="ml-2 text-red-500 hover:text-red-700 transition-colors duration-150"
                  aria-label="Remove feature"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addFeature}
              className="inline-flex items-center text-emerald-600 hover:text-emerald-800 text-sm font-medium transition-colors duration-150"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Feature
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Benefits
            </label>
            {formData.benefits.map((benefit, index) => (
              <div key={index} className="mb-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={benefit.title}
                      onChange={(e) => handleBenefitChange(index, 'title', e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 bg-white"
                      placeholder="Enter benefit title"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Icon
                    </label>
                    <select
                      value={benefit.icon}
                      onChange={(e) => handleBenefitChange(index, 'icon', e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 bg-white"
                    >
                      <option value="">Select Icon</option>
                      {iconOptions.map((icon) => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={benefit.description}
                    onChange={(e) => handleBenefitChange(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 bg-white"
                    placeholder="Enter benefit description"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeBenefit(index)}
                  className="mt-2 text-red-500 hover:text-red-700 text-sm font-medium transition-colors duration-150"
                >
                  Remove Benefit
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addBenefit}
              className="inline-flex items-center text-emerald-600 hover:text-emerald-800 text-sm font-medium transition-colors duration-150"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Benefit
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Eligibility
            </label>
            {formData.eligibility.map((item, index) => (
              <div key={index} className="flex items-center mb-3">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleEligibilityChange(index, e.target.value)}
                  className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 bg-gray-50"
                  placeholder="Enter eligibility criterion"
                />
                <button
                  type="button"
                  onClick={() => removeEligibility(index)}
                  className="ml-2 text-red-500 hover:text-red-700 transition-colors duration-150"
                  aria-label="Remove eligibility"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addEligibility}
              className="inline-flex items-center text-emerald-600 hover:text-emerald-800 text-sm font-medium transition-colors duration-150"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Eligibility
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Documents
            </label>
            {formData.documents.map((doc, index) => (
              <div key={index} className="mb-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={doc.name}
                      onChange={(e) => handleDocumentChange(index, 'name', e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 bg-white"
                      placeholder="Enter document name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Required
                    </label>
                    <input
                      type="checkbox"
                      checked={doc.required}
                      onChange={(e) => handleDocumentChange(index, 'required', e.target.checked)}
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={doc.description}
                    onChange={(e) => handleDocumentChange(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 bg-white"
                    placeholder="Enter document description"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeDocument(index)}
                  className="mt-2 text-red-500 hover:text-red-700 text-sm font-medium transition-colors duration-150"
                >
                  Remove Document
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addDocument}
              className="inline-flex items-center text-emerald-600 hover:text-emerald-800 text-sm font-medium transition-colors duration-150"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Document
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              FAQs
            </label>
            {formData.faqs.map((faq, index) => (
              <div key={index} className="mb-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Question
                  </label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 bg-white"
                    placeholder="Enter FAQ question"
                  />
                </div>
                <div className="mt-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Answer
                  </label>
                  <textarea
                    value={faq.answer}
                    onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 bg-white"
                    placeholder="Enter FAQ answer"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeFaq(index)}
                  className="mt-2 text-red-500 hover:text-red-700 text-sm font-medium transition-colors duration-150"
                >
                  Remove FAQ
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addFaq}
              className="inline-flex items-center text-emerald-600 hover:text-emerald-800 text-sm font-medium transition-colors duration-150"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add FAQ
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Stats
            </label>
            {formData.stats.map((stat, index) => (
              <div key={index} className="mb-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Label
                    </label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 bg-white"
                      placeholder="Enter stat label"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Value
                    </label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 bg-white"
                      placeholder="Enter stat value"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Growth
                    </label>
                    <input
                      type="text"
                      value={stat.growth}
                      onChange={(e) => handleStatChange(index, 'growth', e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 bg-white"
                      placeholder="Enter growth (e.g., +10%)"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeStat(index)}
                  className="mt-2 text-red-500 hover:text-red-700 text-sm font-medium transition-colors duration-150"
                >
                  Remove Stat
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addStat}
              className="inline-flex items-center text-emerald-600 hover:text-emerald-800 text-sm font-medium transition-colors duration-150"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Stat
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Process Steps
            </label>
            {formData.processSteps.map((step, index) => (
              <div key={index} className="mb-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Step Number
                    </label>
                    <input
                      type="number"
                      value={step.step}
                      onChange={(e) => handleProcessStepChange(index, 'step', e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 bg-white"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Icon
                    </label>
                    <select
                      value={step.icon}
                      onChange={(e) => handleProcessStepChange(index, 'icon', e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 bg-white"
                    >
                      <option value="">Select Icon</option>
                      {iconOptions.map((icon) => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => handleProcessStepChange(index, 'title', e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 bg-white"
                    placeholder="Enter step title"
                  />
                </div>
                <div className="mt-3">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={step.description}
                    onChange={(e) => handleProcessStepChange(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 bg-white"
                    placeholder="Enter step description"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeProcessStep(index)}
                  className="mt-2 text-red-500 hover:text-red-700 text-sm font-medium transition-colors duration-150"
                >
                  Remove Step
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addProcessStep}
              className="inline-flex items-center text-emerald-600 hover:text-emerald-800 text-sm font-medium transition-colors duration-150"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Process Step
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Tags
            </label>
            {formData.tags.map((tag, index) => (
              <div key={index} className="flex items-center mb-3">
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => handleTagChange(index, e.target.value)}
                  className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 bg-gray-50"
                  placeholder="Enter tag"
                />
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="ml-2 text-red-500 hover:text-red-700 transition-colors duration-150"
                  aria-label="Remove tag"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addTag}
              className="inline-flex items-center text-emerald-600 hover:text-emerald-800 text-sm font-medium transition-colors duration-150"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Tag
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Meta Title
            </label>
            <input
              type="text"
              value={formData.metaTitle}
              onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 bg-gray-50"
              placeholder="Enter meta title for SEO"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Meta Description
            </label>
            <textarea
              value={formData.metaDescription}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 bg-gray-50"
              placeholder="Enter meta description for SEO"
            />
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

          <div className="flex items-center space-x-6">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="mr-2 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              Active
            </label>
            <label className="flex items-center text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="mr-2 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              Featured
            </label>
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
              {loading ? 'Saving...' : (service ? 'Update Service' : 'Create Service')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}