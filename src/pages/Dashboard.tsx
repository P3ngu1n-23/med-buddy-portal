
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, MessageSquare, Search } from 'lucide-react';
import DoctorSearch from '@/components/dashboard/DoctorSearch';
import AppointmentsList from '@/components/dashboard/AppointmentsList';
import ChatbotWidget from '@/components/dashboard/ChatbotWidget';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-gray-900">Patient Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Button variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 rounded-lg p-1">
          {[
            { id: 'overview', label: 'Overview', icon: Calendar },
            { id: 'search', label: 'Find Doctors', icon: Search },
            { id: 'appointments', label: 'My Appointments', icon: Clock },
            { id: 'chatbot', label: 'Health Assistant', icon: MessageSquare },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span>Upcoming Appointments</span>
                </CardTitle>
                <CardDescription>Your next scheduled visits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">Dr. Smith</p>
                      <p className="text-sm text-gray-600">General Checkup</p>
                    </div>
                    <Badge variant="outline">Tomorrow 2PM</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium">Dr. Johnson</p>
                      <p className="text-sm text-gray-600">Cardiology</p>
                    </div>
                    <Badge variant="outline">Next Week</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                  <span>Health Insights</span>
                </CardTitle>
                <CardDescription>Recent AI health assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm font-medium">Symptom Analysis</p>
                    <p className="text-xs text-gray-600">Mild headache - Likely stress related</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Start New Assessment
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-purple-600" />
                  <span>Quick Actions</span>
                </CardTitle>
                <CardDescription>Common tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Book New Appointment
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  View Medical History
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'search' && <DoctorSearch />}
        {activeTab === 'appointments' && <AppointmentsList />}
        {activeTab === 'chatbot' && <ChatbotWidget />}
      </div>
    </div>
  );
};

export default Dashboard;
