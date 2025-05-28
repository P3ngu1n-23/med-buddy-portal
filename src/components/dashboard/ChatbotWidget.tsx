import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, User } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatbotWidget = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Xin chào! Tôi là Trợ lý Sức khỏe AI. Hãy mô tả triệu chứng của bạn để tôi có thể hỗ trợ.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Gọi API BE để lấy phản hồi AI
      const res = await fetch('/api/chatbot/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputText })
      });
      if (!res.ok) throw new Error('Lỗi kết nối máy chủ');
      const data = await res.json();
      const botResponse: Message = {
        id: messages.length + 2,
        text: data.reply || "Xin lỗi, tôi chưa thể trả lời câu hỏi này. Vui lòng thử lại sau.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: messages.length + 2,
          text: "Đã xảy ra lỗi khi kết nối tới máy chủ. Vui lòng thử lại sau.",
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickSymptoms = [
    'Đau đầu', 'Sốt', 'Ho', 'Đau họng', 'Đau bụng', 'Mệt mỏi'
  ];

  const handleQuickSymptom = (symptom: string) => {
    setInputText(`Tôi bị ${symptom.toLowerCase()}`);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>Trợ lý Sức khỏe AI</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Triệu chứng nhanh */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Triệu chứng thường gặp:</p>
            <div className="flex flex-wrap gap-2">
              {quickSymptoms.map((symptom) => (
                <Button
                  key={symptom}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickSymptom(symptom)}
                >
                  {symptom}
                </Button>
              ))}
            </div>
          </div>

          {/* Tin nhắn chat */}
          <div className="h-96 overflow-y-auto space-y-4 p-4 bg-gray-50 rounded-lg mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border shadow-sm'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border shadow-sm px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Khu vực nhập liệu */}
          <div className="flex space-x-2">
            <Input
              placeholder="Mô tả triệu chứng của bạn..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={isLoading || !inputText.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">
              <strong>Lưu ý:</strong> Trợ lý AI này chỉ cung cấp thông tin sức khỏe tổng quát và không thay thế cho tư vấn y tế chuyên môn. Luôn tham khảo ý kiến bác sĩ để được chẩn đoán và điều trị chính xác.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatbotWidget;
