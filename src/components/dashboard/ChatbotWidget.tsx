
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
      text: "Hello! I'm your AI Health Assistant. I can help you understand your symptoms and provide preliminary health insights. Please describe your symptoms.",
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

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: generateBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('headache') || input.includes('head pain')) {
      return "Based on your symptoms of headache, this could be due to several factors like stress, dehydration, or lack of sleep. I recommend: 1) Rest in a quiet, dark room 2) Stay hydrated 3) Apply a cold compress. If symptoms persist for more than 24 hours or worsen, please consult a doctor.";
    }
    
    if (input.includes('fever') || input.includes('temperature')) {
      return "Fever can indicate your body is fighting an infection. Monitor your temperature and: 1) Rest and stay hydrated 2) Take fever-reducing medication if needed 3) Wear light clothing. Seek immediate medical attention if fever exceeds 103°F (39.4°C) or persists for more than 3 days.";
    }
    
    if (input.includes('cough') || input.includes('cold')) {
      return "For cough and cold symptoms, try: 1) Warm saltwater gargling 2) Honey and warm water 3) Adequate rest 4) Stay hydrated. If symptoms persist beyond a week or you experience difficulty breathing, please consult a healthcare provider.";
    }

    return "Thank you for sharing your symptoms. Based on the information provided, I recommend monitoring your condition closely. If symptoms worsen or persist, please consult with a healthcare professional for proper diagnosis and treatment. Would you like to book an appointment with a doctor?";
  };

  const quickSymptoms = [
    'Headache', 'Fever', 'Cough', 'Sore throat', 'Stomach pain', 'Fatigue'
  ];

  const handleQuickSymptom = (symptom: string) => {
    setInputText(`I have ${symptom.toLowerCase()}`);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5" />
            <span>AI Health Assistant</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Quick Symptoms */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Common symptoms:</p>
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

          {/* Chat Messages */}
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

          {/* Input Area */}
          <div className="flex space-x-2">
            <Input
              placeholder="Describe your symptoms..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={isLoading || !inputText.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">
              <strong>Disclaimer:</strong> This AI assistant provides general health information only and should not replace professional medical advice. Always consult with a qualified healthcare provider for proper diagnosis and treatment.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatbotWidget;
