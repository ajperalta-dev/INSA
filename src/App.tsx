import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/common/Navbar';
import { Hero } from './components/hero/Hero';
import { ServicesSection } from './components/services/ServicesSection';
import { AboutTeam } from './components/about/AboutTeam';
import { CaseStudiesSection } from './components/caseStudies/CaseStudiesSection';
import { TechStack } from './components/tech/TechStack';
import { MethodologySection } from './components/methodology/MethodologySection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/common/Footer';
import { BookingModal } from './components/booking/BookingModal';
import { WhatsAppWidget } from './components/whatsapp/WhatsAppWidget';
import { ChatbotWidget } from './components/chat/ChatbotWidget';

export function AppContent() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');
  const [initialBookingNotes, setInitialBookingNotes] = useState('');

  const handleOpenBooking = (service?: string, notes?: string) => {
    if (service) setPreselectedService(service);
    else setPreselectedService('');

    if (notes) setInitialBookingNotes(notes);
    else setInitialBookingNotes('');

    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setPreselectedService('');
    setInitialBookingNotes('');
  };

  return (
    <div className="min-h-screen bg-[#030712] dark:bg-[#030712] light-bg text-slate-100 dark:text-slate-100 flex flex-col font-sans relative selection:bg-cyan-500/30 selection:text-cyan-200 transition-colors duration-300">
      
      {/* Sticky Glass Navbar */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onOpenBooking={() => handleOpenBooking()} />
        <ServicesSection onSelectServiceForBooking={(service) => handleOpenBooking(service)} />
        <AboutTeam />
        <CaseStudiesSection onOpenBooking={() => handleOpenBooking()} />
        <TechStack />
        <MethodologySection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preselectedService={preselectedService}
        initialNotes={initialBookingNotes}
      />

      {/* Floating Interactive Widgets */}
      <WhatsAppWidget />
      <ChatbotWidget onOpenBooking={() => handleOpenBooking()} />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
