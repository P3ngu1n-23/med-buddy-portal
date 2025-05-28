
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AuthModal from '@/components/auth/AuthModal';
import { Heart, Calendar, MessageSquare, Star } from 'lucide-react';

const Index = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Y Tế Sức Khỏe</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={() => handleAuthClick('login')}
                className="hover:bg-blue-50"
              >
                Đăng nhập
              </Button>
              <Button 
                onClick={() => handleAuthClick('register')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Đăng ký
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Sức Khỏe Của Bạn, Ưu Tiên Của Chúng Tôi
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Kết nối với các bác sĩ có chuyên môn, quản lý cuộc hẹn và nhận thông tin sức khỏe tức thì 
            với nền tảng chăm sóc sức khỏe toàn diện của chúng tôi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => handleAuthClick('register')}
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
            >
              Bắt đầu ngay
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => handleAuthClick('login')}
              className="text-lg px-8 py-3 hover:bg-blue-50"
            >
              Tôi là Bác sĩ
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Tại Sao Chọn Nền Tảng Của Chúng Tôi?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Đặt Lịch Dễ Dàng</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Đặt lịch hẹn với các bác sĩ có chuyên môn theo thời gian thuận tiện cho bạn. 
                  Xem các khung giờ có sẵn và quản lý lịch chăm sóc sức khỏe của bạn.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Trợ Lý Y Tế AI</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Nhận thông tin sức khỏe tức thì với chatbot được hỗ trợ bởi AI. 
                  Mô tả triệu chứng của bạn và nhận chẩn đoán sơ bộ.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Star className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <CardTitle>Đánh Giá Đã Xác Thực</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Đọc các đánh giá và xếp hạng chân thực của bệnh nhân để giúp bạn 
                  chọn đúng nhà cung cấp dịch vụ chăm sóc sức khỏe cho nhu cầu của mình.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Sẵn Sàng Kiểm Soát Sức Khỏe Của Bạn?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Tham gia cùng hàng nghìn bệnh nhân và nhà cung cấp dịch vụ chăm sóc sức khỏe trên nền tảng của chúng tôi.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => handleAuthClick('register')}
            className="text-lg px-8 py-3"
          >
            Tham gia ngay
          </Button>
        </div>
      </section>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  );
};

export default Index;
