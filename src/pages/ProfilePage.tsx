import { useAuth } from '../contexts/AuthContext';
import { DashboardLayout } from '../components/DashboardLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { LogOut, Mail, Phone, MapPin, FileText, Download, Calendar } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function ProfilePage() {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (user) {
      updateProfile({
        ...user,
        ...formData,
      });
      setIsEditing(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const initials = (user?.name || 'User')
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Profile Settings</h1>
            <p className="text-slate-700">Manage your account information and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Card */}
            <div className="lg:col-span-1">
              <Card className="bg-white shadow-lg border-0 sticky top-8">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <Avatar className="h-24 w-24 bg-gradient-to-br from-yellow-400 to-orange-500 text-white text-xl">
                      <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white font-bold text-2xl">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="text-slate-900">{user?.name || 'User'}</CardTitle>
                  <CardDescription className="text-slate-600 mt-1">{user?.email || 'email@example.com'}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="pt-4 border-t border-slate-200">
                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">Account Info</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-slate-700">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        <span className="text-sm">
                          Joined {user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'Recently'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <FileText className="w-4 h-4 text-orange-500" />
                        <span className="text-sm">0 Resumes Created</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <Download className="w-4 h-4 text-orange-500" />
                        <span className="text-sm">0 Downloads</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 text-white gap-2 mt-4"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Profile Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white shadow-lg border-0">
                <CardHeader className="pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-slate-900">Profile Information</CardTitle>
                      <CardDescription className="text-slate-600 mt-1">
                        Update your personal details and information
                      </CardDescription>
                    </div>
                    <Button
                      onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                      className="gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-slate-900 font-semibold"
                    >
                      {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="md:col-span-2">
                      <Label htmlFor="name" className="text-slate-900 font-semibold mb-2 block">
                        Full Name
                      </Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-500 focus:ring-orange-500 focus:border-orange-500"
                        />
                      ) : (
                        <p className="text-slate-700 py-2 px-3 bg-slate-50 rounded-md border border-slate-200">
                          {formData.name || 'Not provided'}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="md:col-span-2">
                      <Label htmlFor="email" className="text-slate-900 font-semibold mb-2 block">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        {isEditing ? (
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-500 pl-10 focus:ring-orange-500 focus:border-orange-500"
                          />
                        ) : (
                          <p className="text-slate-700 py-2 px-3 bg-slate-50 rounded-md border border-slate-200 pl-10">
                            {formData.email || 'Not provided'}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Phone Field */}
                    <div>
                      <Label htmlFor="phone" className="text-slate-900 font-semibold mb-2 block">
                        Phone Number
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        {isEditing ? (
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-500 pl-10 focus:ring-orange-500 focus:border-orange-500"
                          />
                        ) : (
                          <p className="text-slate-700 py-2 px-3 bg-slate-50 rounded-md border border-slate-200 pl-10">
                            {formData.phone || 'Not provided'}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Location Field */}
                    <div>
                      <Label htmlFor="location" className="text-slate-900 font-semibold mb-2 block">
                        Location
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        {isEditing ? (
                          <Input
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Enter your location"
                            className="bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-500 pl-10 focus:ring-orange-500 focus:border-orange-500"
                          />
                        ) : (
                          <p className="text-slate-700 py-2 px-3 bg-slate-50 rounded-md border border-slate-200 pl-10">
                            {formData.location || 'Not provided'}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Bio Field */}
                    <div className="md:col-span-2">
                      <Label htmlFor="bio" className="text-slate-900 font-semibold mb-2 block">
                        Bio / About
                      </Label>
                      {isEditing ? (
                        <textarea
                          id="bio"
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          placeholder="Tell us about yourself"
                          rows={4}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      ) : (
                        <p className="text-slate-700 py-2 px-3 bg-slate-50 rounded-md border border-slate-200 min-h-[100px]">
                          {formData.bio || 'Not provided'}
                        </p>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mt-6 pt-6 border-t border-slate-200 flex gap-3">
                      <Button
                        onClick={handleSave}
                        className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-slate-900 font-semibold"
                      >
                        Save Profile
                      </Button>
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        className="flex-1 text-slate-900 border-slate-300 hover:bg-slate-100"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Resume History */}
              <Card className="bg-white shadow-lg border-0 mt-8">
                <CardHeader>
                  <CardTitle className="text-slate-900">Resume History</CardTitle>
                  <CardDescription className="text-slate-600 mt-1">Your previously created resumes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-600">No resumes created yet</p>
                      <p className="text-slate-500 text-sm">Start creating your first resume to see it here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ProfilePage;
