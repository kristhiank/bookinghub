"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogHeader, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectItem } from "@/components/ui/select";
import { 
  CalendarDays, 
  Clock, 
  User, 
  Mail, 
  Phone,
  CheckCircle,
  ArrowLeft,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { format, addMinutes, setHours, setMinutes, isBefore, isToday } from "date-fns";

// Tipos
interface Service {
  id: string;
  name: string;
  description: string | null;
  duration: number;
  price: number;
  color: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

// Demo data (while no auth)
const demoServices: Service[] = [
  { id: "1", name: "General Consultation", description: "General medical consultation", duration: 30, price: 50, color: "#3b82f6" },
  { id: "2", name: "Full Checkup", description: "Complete physical examination", duration: 60, price: 100, color: "#10b981" },
  { id: "3", name: "Specialist Consultation", description: "With specialist", duration: 45, price: 80, color: "#f59e0b" },
  { id: "4", name: "Follow-up", description: "Follow-up appointment", duration: 20, price: 30, color: "#8b5cf6" },
];

// Generar slots de tiempo
function generateTimeSlots(date: Date, duration: number): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const startHour = 9; // 9 AM
  const endHour = 18; // 6 PM
  const now = new Date();
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const slotTime = setMinutes(setHours(date, hour), minute);
      const endTime = addMinutes(slotTime, duration);
      
      // Don't show past slots if today
      if (isToday(date) && isBefore(slotTime, now)) {
        continue;
      }
      
      // Check that slot doesn't exceed closing time
      if (endTime.getHours() > endHour || (endTime.getHours() === endHour && endTime.getMinutes() > 0)) {
        continue;
      }
      
      slots.push({
        time: format(slotTime, "HH:mm"),
        available: Math.random() > 0.3, // Simulación de disponibilidad
      });
    }
  }
  
  return slots;
}

export default function BookingPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Client data
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  
  // Generate slots when date or service changes
  useEffect(() => {
    if (selectedDate && selectedService) {
      setTimeSlots(generateTimeSlots(selectedDate, selectedService.duration));
      setSelectedTime(null);
    }
  }, [selectedDate, selectedService]);
  
  // Handle booking
  const handleBooking = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId: selectedService?.id,
          date: selectedDate?.toISOString(),
          time: selectedTime,
          clientName: clientData.name,
          clientEmail: clientData.email,
          clientPhone: clientData.phone,
          notes: clientData.notes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error creating booking");
      }

      console.log("Booking created:", data);
      setShowConfirmation(true);
    } catch (error) {
      console.error("Error:", error);
      alert(error instanceof Error ? error.message : "Error creating booking");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Reset
  const handleReset = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedDate(undefined);
    setSelectedTime(null);
    setClientData({ name: "", email: "", phone: "", notes: "" });
    setShowConfirmation(false);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">BookingHub</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>Booking System</span>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    step >= s
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {step > s ? <CheckCircle className="h-5 w-5" /> : s}
                </div>
                {s < 4 && (
                  <div
                    className={`w-12 h-1 mx-1 rounded ${
                      step > s ? "bg-primary" : "bg-secondary"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-8 mt-2 text-xs text-muted-foreground">
            <span>Service</span>
            <span>Date</span>
            <span>Time</span>
            <span>Details</span>
          </div>
        </div>
        
        {/* Step 1: Select Service */}
        {step === 1 && (
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-6">Select a Service</h1>
            <div className="grid gap-4 md:grid-cols-2">
              {demoServices.map((service) => (
                <Card
                  key={service.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedService?.id === service.id
                      ? "ring-2 ring-primary"
                      : ""
                  }`}
                  onClick={() => setSelectedService(service)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: service.color }}
                      />
                      <span className="text-lg font-bold text-primary">
                        ${service.price}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{service.duration} minutes</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button
                size="lg"
                onClick={() => setStep(2)}
                disabled={!selectedService}
              >
                Continue
              </Button>
            </div>
          </div>
        )}
        
        {/* Step 2: Select Date */}
        {step === 2 && (
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-center mb-6">Select a Date</h1>
            <Card>
              <CardContent className="pt-6 flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => {
                    // Disable past dates and Sundays
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today || date.getDay() === 0;
                  }}
                />
              </CardContent>
            </Card>
            <div className="flex justify-center gap-4 mt-8">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={() => setStep(3)} disabled={!selectedDate}>
                Continue
              </Button>
            </div>
          </div>
        )}
        
        {/* Step 3: Select Time */}
        {step === 3 && (
          <div className="max-w-xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-2">Select a Time</h1>
            <p className="text-center text-muted-foreground mb-6">
              {selectedDate && format(selectedDate, "EEEE, MMMM d")}
            </p>
            <Card>
              <CardContent className="pt-6">
                {timeSlots.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot.time}
                        variant={selectedTime === slot.time ? "default" : "outline"}
                        className={`${
                          !slot.available
                            ? "opacity-50 cursor-not-allowed line-through"
                            : ""
                        }`}
                        disabled={!slot.available}
                        onClick={() => setSelectedTime(slot.time)}
                      >
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No available time slots for this date
                  </p>
                )}
              </CardContent>
            </Card>
            <div className="flex justify-center gap-4 mt-8">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button onClick={() => setStep(4)} disabled={!selectedTime}>
                Continue
              </Button>
            </div>
          </div>
        )}
        
        {/* Step 4: Client Details */}
        {step === 4 && (
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-center mb-6">Your Details</h1>
            
            {/* Summary */}
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-normal text-muted-foreground">
                  Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Service:</span>
                  <span className="font-medium">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium">
                    {selectedDate && format(selectedDate, "MMM d, yyyy")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>Total:</span>
                  <span className="font-bold text-primary">${selectedService?.price}</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Form */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <User className="h-4 w-4" /> Full Name
                  </label>
                  <Input
                    placeholder="Your name"
                    value={clientData.name}
                    onChange={(e) =>
                      setClientData({ ...clientData, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Mail className="h-4 w-4" /> Email
                  </label>
                  <Input
                    type="email"
                    placeholder="you@email.com"
                    value={clientData.email}
                    onChange={(e) =>
                      setClientData({ ...clientData, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Phone className="h-4 w-4" /> Phone
                  </label>
                  <Input
                    type="tel"
                    placeholder="+1 234 567 890"
                    value={clientData.phone}
                    onChange={(e) =>
                      setClientData({ ...clientData, phone: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Notes (optional)</label>
                  <textarea
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Any additional information..."
                    value={clientData.notes}
                    onChange={(e) =>
                      setClientData({ ...clientData, notes: e.target.value })
                    }
                  />
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-center gap-4 mt-8">
              <Button variant="outline" onClick={() => setStep(3)}>
                Back
              </Button>
              <Button
                onClick={handleBooking}
                disabled={!clientData.name || !clientData.email || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </Button>
            </div>
          </div>
        )}
      </main>
      
      {/* Confirmation Modal */}
      <Dialog open={showConfirmation} onClose={handleReset}>
        <DialogHeader onClose={handleReset}>Booking Confirmed!</DialogHeader>
        <DialogContent className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <p className="text-lg font-medium mb-2">
            Your booking has been registered
          </p>
          <p className="text-muted-foreground text-sm mb-4">
            We have sent a confirmation email to{" "}
            <span className="font-medium">{clientData.email}</span>
          </p>
          <div className="bg-secondary rounded-lg p-4 text-sm text-left space-y-1">
            <p><strong>Service:</strong> {selectedService?.name}</p>
            <p><strong>Date:</strong> {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")}</p>
            <p><strong>Time:</strong> {selectedTime}</p>
            <p><strong>Duration:</strong> {selectedService?.duration} minutes</p>
          </div>
        </DialogContent>
        <DialogFooter>
          <Button onClick={handleReset} className="w-full">
            New Booking
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
