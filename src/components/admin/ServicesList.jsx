"use client"
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Star, Shield } from 'lucide-react';
import ServiceForm from './ServiceForm';

export default function ServicesList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/admin/services');
      const data = await response.json();
      if (data.success) {
        setServices(data.data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    
    try {
      const response = await fetch(`/api/admin/services/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        fetchServices();
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingService(null);
    fetchServices();
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
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['Service', 'Category', 'Rating', 'Status', 'Actions'].map((header, index) => (
                    <th key={index} className="px-6 py-4">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-5 w-32 bg-gray-200 rounded mb-1"></div>
                        <div className="h-4 w-48 bg-gray-200 rounded mt-1"></div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-5 w-24 bg-gray-200 rounded"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-5 w-20 bg-gray-200 rounded"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-5 w-16 bg-gray-200 rounded"></div>
                    </td>
                    <td className="px-6 py-4">
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
          <div className="block sm:hidden space-y-4 p-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200 animate-pulse">
                <div className="h-5 w-3/4 bg-gray-200 rounded mb-2"></div>
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
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">Insurance Services</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your insurance products and plans with ease</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="group relative inline-flex items-center px-4 sm:px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md mt-4 sm:mt-0 w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
          Add New Service
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {services.map((service) => (
                <tr key={service._id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{service.title || 'Untitled'}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{service.subtitle || 'No subtitle'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      {service.categoryId?.name || 'N/A'}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1.5" />
                      <span className="text-sm font-medium text-gray-900">{service.rating || 0}</span>
                      <span className="text-xs text-gray-500 ml-1.5">({service.reviewCount || 0})</span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                      service.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {service.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEdit(service)}
                        className="text-blue-600 hover:text-blue-800 p-2 rounded hover:bg-blue-50 transition-colors duration-150"
                        aria-label="Edit service"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(service._id)}
                        className="text-red-600 hover:text-red-900 p-2 rounded hover:bg-red-50 transition-colors duration-150"
                        aria-label="Delete service"
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
          {services.map((service) => (
            <div key={service._id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-gray-900">{service.title || 'Untitled'}</div>
                <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                  service.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {service.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="text-xs text-gray-500 mb-2">{service.subtitle || 'No subtitle'}</div>
              <div className="text-xs text-gray-500 mb-2">
                <span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  {service.categoryId?.name || 'N/A'}
                </span>
              </div>
              <div className="flex items-center mb-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1.5" />
                <span className="text-sm font-medium text-gray-900">{service.rating || 0}</span>
                <span className="text-xs text-gray-500 ml-1.5">({service.reviewCount || 0})</span>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleEdit(service)}
                  className="text-blue-600 hover:text-blue-800 p-2 rounded hover:bg-blue-50 transition-colors duration-150"
                  aria-label="Edit service"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="text-red-600 hover:text-red-900 p-2 rounded hover:bg-red-50 transition-colors duration-150"
                  aria-label="Delete service"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {services.length === 0 && !loading && (
          <div className="text-center py-12">
            <Shield className="mx-auto h-10 sm:h-12 w-10 sm:w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No Services</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new service.</p>
            <div className="mt-6">
              <button
                onClick={() => setShowForm(true)}
                className="group inline-flex items-center px-4 sm:px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md w-full sm:w-auto"
              >
                <Plus className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                Add Service
              </button>
            </div>
          </div>
        )}
      </div>

      {showForm && (
        <ServiceForm
          service={editingService}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}