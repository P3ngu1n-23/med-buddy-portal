
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Star, Calendar } from 'lucide-react';

const DoctorSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  // Mock doctors data
  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Smith',
      specialty: 'Cardiology',
      rating: 4.8,
      reviews: 156,
      experience: '10+ years',
      hospital: 'City Medical Center',
      availableToday: true,
      nextAvailable: 'Today 3:00 PM'
    },
    {
      id: 2,
      name: 'Dr. Michael Johnson',
      specialty: 'Dermatology',
      rating: 4.9,
      reviews: 203,
      experience: '8+ years',
      hospital: 'Health Plus Clinic',
      availableToday: false,
      nextAvailable: 'Tomorrow 10:00 AM'
    },
    {
      id: 3,
      name: 'Dr. Emily Davis',
      specialty: 'General Medicine',
      rating: 4.7,
      reviews: 89,
      experience: '12+ years',
      hospital: 'Prime Healthcare',
      availableToday: true,
      nextAvailable: 'Today 5:30 PM'
    }
  ];

  const specialties = ['all', 'Cardiology', 'Dermatology', 'General Medicine', 'Pediatrics', 'Orthopedics'];

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Find the Right Doctor</CardTitle>
          <CardDescription>Search by name, specialty, or location</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search doctors, specialties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {specialties.map((specialty) => (
                <Button
                  key={specialty}
                  variant={selectedSpecialty === specialty ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSpecialty(specialty)}
                  className="capitalize"
                >
                  {specialty}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Doctor Results */}
      <div className="grid gap-4">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg">
                    {doctor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <h3 className="text-xl font-semibold">{doctor.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{doctor.rating}</span>
                      <span className="text-gray-500">({doctor.reviews} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{doctor.specialty}</Badge>
                    <Badge variant="outline">{doctor.experience}</Badge>
                    {doctor.availableToday && (
                      <Badge className="bg-green-100 text-green-800">Available Today</Badge>
                    )}
                  </div>

                  <p className="text-gray-600">{doctor.hospital}</p>
                  <p className="text-sm text-gray-500">Next available: {doctor.nextAvailable}</p>
                </div>

                <div className="flex flex-col gap-2 md:items-end">
                  <Button className="w-full md:w-auto">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                  <Button variant="outline" size="sm" className="w-full md:w-auto">
                    View Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DoctorSearch;
