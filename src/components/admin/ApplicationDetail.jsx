// src/components/admin/ApplicationDetail.jsx
"use client"
import { useState } from 'react';
import { X, User, DollarSign, FileText, Calendar, Phone, Mail, MapPin } from 'lucide-react';

export default function ApplicationDetail({ application, onClose, onStatusUpdate }) {
  const [status, setStatus] = useState(application.status);
  const [remarks, setRemarks] = useState(application.remarks || '');
  const [approvedAmount, setApprovedAmount] = useState(application.approvedAmount || application.loanDetails?.requestedAmount);
  const [approvedRate, setApprovedRate] = useState(application.approvedRate || 0);

  const handleStatusChange = async () => {
    try {
      const updateData = {
        status,
        remarks,
        approvedAmount: status === 'approved' ? approvedAmount : null,
        approvedRate: status === 'approved' ? approvedRate : null,
      };

      const response = await fetch(`/api/admin/loan-applications/${application._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        onStatusUpdate(application._id, status);
        onClose();
      }
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-screen overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Application Details</h2>
            <p className="text-gray-600">{application.applicationNumber}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Personal Details */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Full Name</label>
                <p className="text-gray-900">{application.personalDetails?.firstName} {application.personalDetails?.lastName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Date of Birth</label>
                <p className="text-gray-900">{application.personalDetails?.dateOfBirth ? formatDate(application.personalDetails.dateOfBirth) : 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Email</label>
                <p className="text-gray-900 flex items-center">
                  <Mail className="h-4 w-4 mr-1" />
                  {application.personalDetails?.email}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Phone</label>
                <p className="text-gray-900 flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  {application.personalDetails?.phone}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">PAN Number</label>
                <p className="text-gray-900">{application.personalDetails?.panNumber || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Aadhar Number</label>
                <p className="text-gray-900">{application.personalDetails?.aadharNumber || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Loan Details */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Loan Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Loan Product</label>
                <p className="text-gray-900">{application.loanProductId?.title}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Requested Amount</label>
                <p className="text-gray-900 font-semibold">{formatCurrency(application.loanDetails?.requestedAmount)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Tenure</label>
                <p className="text-gray-900">{application.loanDetails?.tenure} years</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Purpose</label>
                <p className="text-gray-900">{application.loanDetails?.purpose || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Monthly Income</label>
                <p className="text-gray-900">{application.loanDetails?.monthlyIncome ? formatCurrency(application.loanDetails.monthlyIncome) : 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Employment Type</label>
                <p className="text-gray-900 capitalize">{application.loanDetails?.employmentType}</p>
              </div>
            </div>
          </div>

          {/* Address Details */}
          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Address Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Current Address</label>
                <p className="text-gray-900">{application.addressDetails?.currentAddress || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Permanent Address</label>
                <p className="text-gray-900">{application.addressDetails?.permanentAddress || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">City</label>
                <p className="text-gray-900">{application.addressDetails?.city || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">State</label>
                <p className="text-gray-900">{application.addressDetails?.state || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Pincode</label>
                <p className="text-gray-900">{application.addressDetails?.pincode || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Documents */}
          {application.documentsUploaded && application.documentsUploaded.length > 0 && (
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Uploaded Documents
              </h3>
              <div className="space-y-2">
                {application.documentsUploaded.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
                    <div>
                      <p className="font-medium text-gray-900">{doc.documentType}</p>
                      <p className="text-sm text-gray-500">{doc.fileName}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(doc.uploadedAt)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Application Timeline */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Application Timeline
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-gray-700">Application submitted on {formatDate(application.submittedAt)}</span>
              </div>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${application.status !== 'pending' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className="text-gray-700">Current status: {application.status.replace('-', ' ').toUpperCase()}</span>
              </div>
            </div>
          </div>

          {/* Status Update Section */}
          <div className="bg-yellow-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Application Status</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="pending">Pending</option>
                  <option value="under-review">Under Review</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="disbursed">Disbursed</option>
                </select>
              </div>

              {status === 'approved' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Approved Amount</label>
                    <input
                      type="number"
                      value={approvedAmount}
                      onChange={(e) => setApprovedAmount(parseInt(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Approved Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={approvedRate}
                      onChange={(e) => setApprovedRate(parseFloat(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Add any remarks or notes..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
          <button
            onClick={handleStatusChange}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
}