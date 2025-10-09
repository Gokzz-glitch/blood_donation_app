export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type UrgencyLevel = 'critical' | 'urgent' | 'normal';
export type RequestStatus = 'pending' | 'fulfilled' | 'cancelled';

export interface Donor {
  id: string;
  name: string;
  email: string;
  phone: string;
  bloodType: BloodType;
  age: number;
  address?: string;
  lastDonationDate?: string;
  isEligible: boolean;
  createdAt: string;
}

export interface BloodRequest {
  id: string;
  patientName: string;
  hospitalName: string;
  bloodType: BloodType;
  unitsNeeded: number;
  urgencyLevel: UrgencyLevel;
  contactNumber: string;
  requestDate: string;
  status: RequestStatus;
  createdAt: string;
}

export interface Donation {
  id: string;
  donorId: string;
  requestId?: string;
  donationDate: string;
  unitsDonated: number;
  donationCenter?: string;
  notes?: string;
  createdAt: string;
}
