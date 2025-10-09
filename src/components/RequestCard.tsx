import { Building2, Phone, Droplet, AlertCircle, Clock } from 'lucide-react';
import type { BloodRequest } from '../types';

interface RequestCardProps {
  request: BloodRequest;
  onUpdateStatus?: (id: string, status: 'fulfilled' | 'cancelled') => void;
}

export function RequestCard({ request, onUpdateStatus }: RequestCardProps) {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'urgent':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'fulfilled':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-red-500">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{request.patientName}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <Building2 className="w-4 h-4" />
            <span>{request.hospitalName}</span>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium border-2 ${getUrgencyColor(request.urgencyLevel)}`}>
          <div className="flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {request.urgencyLevel.toUpperCase()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Droplet className="w-5 h-5 text-red-600" />
          <div>
            <p className="text-xs text-gray-500">Blood Type</p>
            <p className="font-bold text-red-600">{request.bloodType}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <div>
            <p className="text-xs text-gray-500">Units Needed</p>
            <p className="font-bold text-gray-900">{request.unitsNeeded}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          <span>{request.contactNumber}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>Requested: {formatDate(request.requestDate)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
          {request.status.toUpperCase()}
        </span>

        {request.status === 'pending' && onUpdateStatus && (
          <div className="flex gap-2">
            <button
              onClick={() => onUpdateStatus(request.id, 'fulfilled')}
              className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors"
            >
              Mark Fulfilled
            </button>
            <button
              onClick={() => onUpdateStatus(request.id, 'cancelled')}
              className="px-3 py-1 bg-gray-600 text-white text-xs rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
