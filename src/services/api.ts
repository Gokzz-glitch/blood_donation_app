import type { Donor, BloodRequest, Donation } from '../types';

let donors: Donor[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1-555-0101',
    bloodType: 'O+',
    age: 28,
    address: '123 Main St, New York, NY',
    lastDonationDate: '2024-07-15',
    isEligible: true,
    createdAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1-555-0102',
    bloodType: 'A+',
    age: 32,
    address: '456 Oak Ave, Boston, MA',
    lastDonationDate: '2024-08-20',
    isEligible: true,
    createdAt: new Date('2024-02-10').toISOString(),
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'mchen@email.com',
    phone: '+1-555-0103',
    bloodType: 'B-',
    age: 45,
    address: '789 Pine Rd, Seattle, WA',
    lastDonationDate: '2024-06-10',
    isEligible: true,
    createdAt: new Date('2024-01-20').toISOString(),
  },
];

let bloodRequests: BloodRequest[] = [
  {
    id: '1',
    patientName: 'Emily Williams',
    hospitalName: 'City General Hospital',
    bloodType: 'O+',
    unitsNeeded: 2,
    urgencyLevel: 'critical',
    contactNumber: '+1-555-1001',
    requestDate: new Date().toISOString(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    patientName: 'David Brown',
    hospitalName: 'St. Mary Medical Center',
    bloodType: 'A+',
    unitsNeeded: 3,
    urgencyLevel: 'urgent',
    contactNumber: '+1-555-1002',
    requestDate: new Date().toISOString(),
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
];

let donations: Donation[] = [
  {
    id: '1',
    donorId: '1',
    donationDate: '2024-07-15',
    unitsDonated: 1,
    donationCenter: 'Red Cross Blood Center',
    notes: 'Regular donation',
    createdAt: new Date('2024-07-15').toISOString(),
  },
  {
    id: '2',
    donorId: '2',
    donationDate: '2024-08-20',
    unitsDonated: 1,
    donationCenter: 'City Blood Bank',
    notes: 'First time donor',
    createdAt: new Date('2024-08-20').toISOString(),
  },
];

export const api = {
  donors: {
    getAll: async (): Promise<Donor[]> => {
      await delay(300);
      return [...donors];
    },
    getById: async (id: string): Promise<Donor | undefined> => {
      await delay(200);
      return donors.find(d => d.id === id);
    },
    create: async (donor: Omit<Donor, 'id' | 'createdAt'>): Promise<Donor> => {
      await delay(400);
      const newDonor: Donor = {
        ...donor,
        id: generateId(),
        createdAt: new Date().toISOString(),
      };
      donors.push(newDonor);
      return newDonor;
    },
    update: async (id: string, updates: Partial<Donor>): Promise<Donor> => {
      await delay(400);
      const index = donors.findIndex(d => d.id === id);
      if (index === -1) throw new Error('Donor not found');
      donors[index] = { ...donors[index], ...updates };
      return donors[index];
    },
    delete: async (id: string): Promise<void> => {
      await delay(300);
      donors = donors.filter(d => d.id !== id);
    },
  },

  bloodRequests: {
    getAll: async (): Promise<BloodRequest[]> => {
      await delay(300);
      return [...bloodRequests];
    },
    getById: async (id: string): Promise<BloodRequest | undefined> => {
      await delay(200);
      return bloodRequests.find(r => r.id === id);
    },
    create: async (request: Omit<BloodRequest, 'id' | 'createdAt' | 'requestDate'>): Promise<BloodRequest> => {
      await delay(400);
      const newRequest: BloodRequest = {
        ...request,
        id: generateId(),
        requestDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };
      bloodRequests.push(newRequest);
      return newRequest;
    },
    update: async (id: string, updates: Partial<BloodRequest>): Promise<BloodRequest> => {
      await delay(400);
      const index = bloodRequests.findIndex(r => r.id === id);
      if (index === -1) throw new Error('Request not found');
      bloodRequests[index] = { ...bloodRequests[index], ...updates };
      return bloodRequests[index];
    },
    delete: async (id: string): Promise<void> => {
      await delay(300);
      bloodRequests = bloodRequests.filter(r => r.id !== id);
    },
  },

  donations: {
    getAll: async (): Promise<Donation[]> => {
      await delay(300);
      return [...donations];
    },
    getByDonor: async (donorId: string): Promise<Donation[]> => {
      await delay(300);
      return donations.filter(d => d.donorId === donorId);
    },
    create: async (donation: Omit<Donation, 'id' | 'createdAt'>): Promise<Donation> => {
      await delay(400);
      const newDonation: Donation = {
        ...donation,
        id: generateId(),
        createdAt: new Date().toISOString(),
      };
      donations.push(newDonation);
      return newDonation;
    },
  },
};

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
