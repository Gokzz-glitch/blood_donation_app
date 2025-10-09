import { useState, useEffect } from 'react';
import { Users, Droplet, Activity, AlertCircle, Plus, X } from 'lucide-react';
import { StatCard } from './components/StatCard';
import { DonorCard } from './components/DonorCard';
import { RequestCard } from './components/RequestCard';
import { DonorForm } from './components/DonorForm';
import { BloodRequestForm } from './components/BloodRequestForm';
import { api } from './services/api';
import type { Donor, BloodRequest } from './types';

type View = 'dashboard' | 'donors' | 'requests';
type Modal = 'none' | 'donor-form' | 'request-form';

function App() {
  const [view, setView] = useState<View>('dashboard');
  const [modal, setModal] = useState<Modal>('none');
  const [donors, setDonors] = useState<Donor[]>([]);
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [donorsData, requestsData] = await Promise.all([
        api.donors.getAll(),
        api.bloodRequests.getAll(),
      ]);
      setDonors(donorsData);
      setRequests(requestsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDonor = async (donorData: Omit<Donor, 'id' | 'createdAt'>) => {
    try {
      const newDonor = await api.donors.create(donorData);
      setDonors([...donors, newDonor]);
      setModal('none');
    } catch (error) {
      console.error('Error adding donor:', error);
    }
  };

  const handleAddRequest = async (requestData: Omit<BloodRequest, 'id' | 'createdAt' | 'requestDate'>) => {
    try {
      const newRequest = await api.bloodRequests.create(requestData);
      setRequests([...requests, newRequest]);
      setModal('none');
    } catch (error) {
      console.error('Error adding request:', error);
    }
  };

  const handleUpdateRequestStatus = async (id: string, status: 'fulfilled' | 'cancelled') => {
    try {
      const updated = await api.bloodRequests.update(id, { status });
      setRequests(requests.map(r => r.id === id ? updated : r));
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  const stats = {
    totalDonors: donors.length,
    eligibleDonors: donors.filter(d => d.isEligible).length,
    pendingRequests: requests.filter(r => r.status === 'pending').length,
    criticalRequests: requests.filter(r => r.urgencyLevel === 'critical' && r.status === 'pending').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <Droplet className="w-7 h-7 text-white" fill="white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Blood Donation System</h1>
                <p className="text-sm text-gray-600">Save lives, donate blood</p>
              </div>
            </div>
            <nav className="flex gap-2">
              <button
                onClick={() => setView('dashboard')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  view === 'dashboard'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setView('donors')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  view === 'donors'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Donors
              </button>
              <button
                onClick={() => setView('requests')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  view === 'requests'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Requests
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <>
            {view === 'dashboard' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard
                    title="Total Donors"
                    value={stats.totalDonors}
                    icon={Users}
                    color="bg-blue-600"
                    subtitle="Registered in system"
                  />
                  <StatCard
                    title="Eligible Donors"
                    value={stats.eligibleDonors}
                    icon={Activity}
                    color="bg-green-600"
                    subtitle="Ready to donate"
                  />
                  <StatCard
                    title="Pending Requests"
                    value={stats.pendingRequests}
                    icon={Droplet}
                    color="bg-orange-600"
                    subtitle="Awaiting fulfillment"
                  />
                  <StatCard
                    title="Critical Requests"
                    value={stats.criticalRequests}
                    icon={AlertCircle}
                    color="bg-red-600"
                    subtitle="Urgent attention needed"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">Recent Donors</h2>
                      <button
                        onClick={() => setView('donors')}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        View All →
                      </button>
                    </div>
                    <div className="space-y-4">
                      {donors.slice(0, 3).map(donor => (
                        <DonorCard key={donor.id} donor={donor} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">Active Requests</h2>
                      <button
                        onClick={() => setView('requests')}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        View All →
                      </button>
                    </div>
                    <div className="space-y-4">
                      {requests
                        .filter(r => r.status === 'pending')
                        .slice(0, 3)
                        .map(request => (
                          <RequestCard
                            key={request.id}
                            request={request}
                            onUpdateStatus={handleUpdateRequestStatus}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {view === 'donors' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">All Donors ({donors.length})</h2>
                  <button
                    onClick={() => setModal('donor-form')}
                    className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    Add Donor
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {donors.map(donor => (
                    <DonorCard key={donor.id} donor={donor} />
                  ))}
                </div>
              </div>
            )}

            {view === 'requests' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Blood Requests ({requests.length})</h2>
                  <button
                    onClick={() => setModal('request-form')}
                    className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    Create Request
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {requests.map(request => (
                    <RequestCard
                      key={request.id}
                      request={request}
                      onUpdateStatus={handleUpdateRequestStatus}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {modal !== 'none' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModal('none')}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            {modal === 'donor-form' && (
              <DonorForm
                onSubmit={handleAddDonor}
                onCancel={() => setModal('none')}
              />
            )}
            {modal === 'request-form' && (
              <BloodRequestForm
                onSubmit={handleAddRequest}
                onCancel={() => setModal('none')}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
