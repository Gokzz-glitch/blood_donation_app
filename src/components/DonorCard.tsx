import { User, Phone, Mail, Droplet, Calendar } from 'lucide-react';
import type { Donor } from '../types';

interface DonorCardProps {
  donor: Donor;
}

export function DonorCard({ donor }: DonorCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-red-500">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{donor.name}</h3>
            <p className="text-sm text-gray-500">Age: {donor.age}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full">
          <Droplet className="w-5 h-5 text-red-600" />
          <span className="font-bold text-red-600">{donor.bloodType}</span>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <span>{donor.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          <span>{donor.phone}</span>
        </div>
        {donor.address && (
          <div className="flex items-start gap-2">
            <svg className="w-4 h-4 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="flex-1">{donor.address}</span>
          </div>
        )}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
          <Calendar className="w-4 h-4" />
          <span>Last Donation: {formatDate(donor.lastDonationDate)}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            donor.isEligible
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {donor.isEligible ? 'Eligible' : 'Not Eligible'}
        </span>
      </div>
    </div>
  );
}
