"use client"
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, DollarSign, Star } from 'lucide-react';
import LoanForm from './LoanForm';

const SkeletonLoader = () => (
  <div className="p-6 max-w-7xl mx-auto">
    <div className="flex justify-between items-center mb-10">
      <div>
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-64 bg-gray-200 rounded mt-2 animate-pulse"></div>
      </div>
      <div className="h-10 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
    </div>
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </th>
              <th className="px-6 py-4">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </th>
              <th className="px-6 py-4">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </th>
              <th className="px-6 py-4">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </th>
              <th className="px-6 py-4">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </th>
              <th className="px-6 py-4">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className="animate-pulse">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div>
                      <div className="h-5 w-32 bg-gray-200 rounded mb-1"></div>
                      <div className="h-4 w-48 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-5 w-24 bg-gray-200 rounded"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-5 w-20 bg-gray-200 rounded mb-1"></div>
                  <div className="h-4 w-28 bg-gray-200 rounded"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-5 w-20 bg-gray-200 rounded mb-1"></div>
                  <div className="h-4 w-28 bg-gray-200 rounded"></div>
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
    </div>
  </div>
);

export default function LoansList() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingLoan, setEditingLoan] = useState(null);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await fetch('/api/admin/loan-products');
      const data = await response.json();
      if (data.success) {
        setLoans(data.data);
      }
    } catch (error) {
      console.error('Error fetching loans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this loan product?')) return;
    
    try {
      const response = await fetch(`/api/admin/loan-products/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        fetchLoans();
      }
    } catch (error) {
      console.error('Error deleting loan:', error);
    }
  };

  const handleEdit = (loan) => {
    setEditingLoan(loan);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingLoan(null);
    fetchLoans();
  };

  if (loading) return <SkeletonLoader />;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Loan Products</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your loan offerings and rates</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="group relative inline-flex items-center px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md"
        >
          <Plus className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
          Add New Loan Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Interest Rate
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Max Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loans.map((loan) => (
                <tr key={loan._id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{loan.title || 'Untitled'}</div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {loan.description?.substring(0, 50) || 'No description'}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      {loan.categoryId?.name || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{loan.interestRate?.display || 'N/A'}</div>
                    <div className="text-xs text-gray-500">
                      {loan.interestRate?.min}% - {loan.interestRate?.max}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{loan.loanAmount?.display || 'N/A'}</div>
                    <div className="text-xs text-gray-500">Max Tenure: {loan.tenure?.display || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                        loan.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {loan.isActive ? 'Active' : 'Inactive'}
                      </span>
                      {loan.isFeatured && (
                        <Star className="h-4 w-4 text-yellow-400 fill-current ml-2" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEdit(loan)}
                        className="text-blue-600 hover:text-blue-800 p-1.5 rounded hover:bg-blue-50 transition-colors duration-150"
                        title="Edit loan"
                        aria-label="Edit loan"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(loan._id)}
                        className="text-red-600 hover:text-red-900 p-1.5 rounded hover:bg-red-50 transition-colors duration-150"
                        title="Delete loan"
                        aria-label="Delete loan"
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

        {loans.length === 0 && !loading && (
          <div className="text-center py-12">
            <DollarSign className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No Loan Products</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new loan product.</p>
            <div className="mt-6">
              <button
                onClick={() => setShowForm(true)}
                className="group inline-flex items-center px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Plus className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                Add Loan Product
              </button>
            </div>
          </div>
        )}
      </div>

      {showForm && (
        <LoanForm
          loan={editingLoan}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}