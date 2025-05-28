
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
              <h1 className="text-2xl font-bold text-gray-900">Trang chủ</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Hồ sơ
              </Button>
              <Button variant="outline" size="sm">
                Đăng xuất
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 rounded-lg p-1">
          {[
            { id: 'overview', label: 'Tổng quan', icon: Calendar },
            { id: 'search', label: 'Tìm bác sĩ', icon: Search },
            { id: 'appointments', label: 'Lịch hẹn của tôi', icon: Clock },
            { id: 'chatbot', label: 'Trợ lý sức khỏe AI', icon: MessageSquare },
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
                  <span>Lịch hẹn sắp tới</span>
                </CardTitle>
                <CardDescription>Các lần khám đã lên lịch tiếp theo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">BS. Smith</p>
                      <p className="text-sm text-gray-600">Khám tổng quát</p>
                    </div>
                    <Badge variant="outline">Ngày mai 14:00</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium">BS. Johnson</p>
                      <p className="text-sm text-gray-600">Tim mạch</p>
                    </div>
                    <Badge variant="outline">Tuần sau</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                  <span>Thông tin sức khỏe</span>
                </CardTitle>
                <CardDescription>Đánh giá sức khỏe AI gần đây</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm font-medium">Phân tích triệu chứng</p>
                    <p className="text-xs text-gray-600">Đau đầu nhẹ - Có thể do căng thẳng</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Bắt đầu đánh giá mới
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-purple-600" />
                  <span>Hành động nhanh</span>
                </CardTitle>
                <CardDescription>Các tác vụ thường dùng</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Đặt lịch hẹn mới
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Xem lịch sử khám bệnh
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Cập nhật hồ sơ
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
