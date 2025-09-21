"use client"
import { useState, useEffect } from 'react';
import { Eye, CheckCircle, XCircle, Clock, Filter, Download } from 'lucide-react';
import ApplicationDetail from './ApplicationDetail';

export default function ApplicationsList() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0
  });

  useEffect(() => {
    fetchApplications();
  }, [statusFilter, pagination.current]);

  const fetchApplications = async (page = 1) => {
    try {
      setLoading(true);
      let url = `/api/admin/loan-applications?page=${page}&limit=20`;
      if (statusFilter !== 'all') {
        url += `&status=${statusFilter}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setApplications(data.data.applications);
        setPagination(data.data.pagination);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    try {
      const response = await fetch(`/api/admin/loan-applications/${applicationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchApplications(pagination.current);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      'under-review': 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      disbursed: 'bg-purple-100 text-purple-800'
    };

    return (
      <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.replace('-', ' ').toUpperCase()}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleExport = () => {
    console.log('Exporting applications...');
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-lg font-medium text-gray-600">Loading applications...</div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Loan Applications</h1>
          <p className="mt-1 text-sm text-gray-500">Manage and review loan applications</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 bg-gray-50 appearance-none pr-8"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="under-review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="disbursed">Disbursed</option>
            </select>
            <Filter className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
          </div>
          <button 
            onClick={handleExport}
            className="group relative inline-flex items-center px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-all duration-200 ease-in-out shadow-sm hover:shadow-md"
          >
            <Download className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Application
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Loan Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applications.map((application) => (
                <tr key={application._id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{application.applicationNumber}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{application.loanProductId?.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {application.personalDetails?.firstName} {application.personalDetails?.lastName}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">{application.personalDetails?.email}</div>
                      <div className="text-xs text-gray-500">{application.personalDetails?.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(application.loanDetails?.requestedAmount)}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">{application.loanDetails?.tenure} years</div>
                      <div className="text-xs text-gray-500 capitalize">{application.loanDetails?.employmentType}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(application.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(application.submittedAt).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setSelectedApplication(application)}
                        className="text-blue-600 hover:text-blue-800 p-1.5 rounded hover:bg-blue-50 transition-colors duration-150"
                        title="View Details"
                        aria-label="View application details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {(application.status === 'pending' || application.status === 'under-review') && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(application._id, 'approved')}
                            className="text-green-600 hover:text-green-800 p-1.5 rounded hover:bg-green-50 transition-colors duration-150"
                            title="Approve"
                            aria-label="Approve application"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(application._id, 'rejected')}
                            className="text-red-600 hover:text-red-900 p-1.5 rounded hover:bg-red-50 transition-colors duration-150"
                            title="Reject"
                            aria-label="Reject application"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {applications.length === 0 && !loading && (
          <div className="text-center py-12">
            <Clock className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No Applications Found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {statusFilter !== 'all' ? 'Try changing the status filter' : 'Applications will appear here once submitted'}
            </p>
          </div>
        )}

        {pagination.pages > 1 && (
          <div className="bg-white px-6 py-4 flex items-center justify-between border-t border-gray-100 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => fetchApplications(pagination.current - 1)}
                disabled={!pagination.hasPrev}
                className="relative inline-flex items-center px-4 py-2 border border-gray-200 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Previous
              </button>
              <button
                onClick={() => fetchApplications(pagination.current + 1)}
                disabled={!pagination.hasNext}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-200 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  Showing page <span className="font-medium">{pagination.current}</span> of{' '}
                  <span className="font-medium">{pagination.pages}</span> ({pagination.total} total applications)
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px">
                  <button
                    onClick={() => fetchApplications(pagination.current - 1)}
                    disabled={!pagination.hasPrev}
                    className="relative inline-flex items-center px-3 py-2 rounded-l-lg border border-gray-200 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                    let pageNum;
                    if (pagination.pages <= 5) {
                      pageNum = i + 1;
                    } else if (pagination.current <= 3) {
                      pageNum = i + 1;
                    } else if (pagination.current >= pagination.pages - 2) {
                      pageNum = pagination.pages - 4 + i;
                    } else {
                      pageNum = pagination.current - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => fetchApplications(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          pageNum === pagination.current
                            ? 'z-10 bg-emerald-50 border-emerald-500 text-emerald-600'
                            : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                        } transition-all duration-200`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => fetchApplications(pagination.current + 1)}
                    disabled={!pagination.hasNext}
                    className="relative inline-flex items-center px-3 py-2 rounded-r-lg border border-gray-200 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedApplication && (
        <ApplicationDetail
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  );
}