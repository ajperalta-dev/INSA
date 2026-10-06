import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import type { BookingFormData } from '../../types';
import { sendBookingConfirmationEmail, buildGoogleCalendarUrl, isEmailConfigured } from '../../utils/emailService';
import confetti from 'canvas-confetti';
import { 
  X, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Building, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Video,
  ExternalLink,
  Loader2
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  initialNotes?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({ 
  isOpen, 
  onClose, 
  preselectedService = '',
  initialNotes = '' 
}) => {
  const { t, lang, services } = useLanguage();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [calendarUrl, setCalendarUrl] = useState('');
  const [emailStatus, setEmailStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    serviceCategory: preselectedService || 'Industria 4.0 & Transformación Digital de Planta',
    companySize: '50-250',
    preferredDate: '',
    preferredTime: '10:00 - 10:30 CET',
    projectDescription: initialNotes || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, serviceCategory: preselectedService }));
    }
    if (initialNotes) {
      setFormData(prev => ({ ...prev, projectDescription: initialNotes }));
    }
  }, [preselectedService, initialNotes]);

  // Set default preferred date to tomorrow's date
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    setFormData(prev => ({ ...prev, preferredDate: `${yyyy}-${mm}-${dd}` }));
  }, []);

  if (!isOpen) return null;

  const validateStep1 = () => true;

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.preferredDate) {
      newErrors.preferredDate = lang === 'es' ? 'Selecciona una fecha válida' : 'Please select a date';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = lang === 'es' ? 'El nombre es obligatorio' : 'Name is required';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = lang === 'es' ? 'Introduce un correo corporativo válido' : 'Valid corporate email required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setIsSubmitting(true);

    // Build Google Calendar URL
    const gcalUrl = buildGoogleCalendarUrl(formData, lang);
    setCalendarUrl(gcalUrl);

    // Send Real Email via EmailJS
    const emailResponse = await sendBookingConfirmationEmail(formData, gcalUrl, lang);
    
    if (emailResponse.success) {
      setEmailStatus('success');
    } else {
      setEmailStatus('error');
    }

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00e5ff', '#38bdf8', '#2563eb', '#10b981'],
      });
    } catch (err) {
      // fallback
    }

    // Auto-open Google Calendar after a short delay
    setTimeout(() => {
      window.open(gcalUrl, '_blank', 'noopener,noreferrer');
    }, 1000);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setStep(1);
    setCalendarUrl('');
    setEmailStatus('idle');
    onClose();
  };

  const timeSlots = [
    '09:30 - 10:00 CET',
    '10:30 - 11:00 CET',
    '12:00 - 12:30 CET',
    '15:00 - 15:30 CET',
    '16:30 - 17:00 CET',
    '17:30 - 18:00 CET',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-white dark:bg-[#091124] border border-slate-200 dark:border-cyan-500/40 shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto transition-colors duration-300">
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          disabled={isSubmitting}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-cyan-400 transition-colors disabled:opacity-50"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Modal Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/60 text-cyan-700 dark:text-cyan-300 text-xs font-mono font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                <span>{lang === 'es' ? 'CONSULTORÍA ESTRATÉGICA 1-ON-1' : '1-ON-1 TECHNICAL CONSULTATION'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {t('booking.modal.title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                {t('booking.modal.subtitle')}
              </p>
            </div>

            {/* Stepper progress indicator */}
            <div className="flex items-center justify-between gap-2 mb-8 p-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-semibold">
              <div className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all ${step === 1 ? 'bg-cyan-50 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-400/40' : 'text-slate-400'}`}>
                1. {lang === 'es' ? 'Alcance' : 'Scope'}
              </div>
              <div className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all ${step === 2 ? 'bg-cyan-50 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-400/40' : 'text-slate-400'}`}>
                2. {lang === 'es' ? 'Horario' : 'Schedule'}
              </div>
              <div className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all ${step === 3 ? 'bg-cyan-50 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-400/40' : 'text-slate-400'}`}>
                3. {lang === 'es' ? 'Contacto' : 'Contact'}
              </div>
            </div>

            {/* Step 1: Project Scope */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-700 dark:text-slate-300 font-bold mb-2">
                    {t('booking.field.service')}
                  </label>
                  <select
                    value={formData.serviceCategory}
                    onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.title[lang]}>
                        {s.levelBadge[lang]} - {s.title[lang]}
                      </option>
                    ))}
                    <option value="Auditoría Integral de Datos">
                      {lang === 'es' ? 'Diagnóstico & Auditoría Global de Datos' : 'Comprehensive Data & AI Audit'}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-700 dark:text-slate-300 font-bold mb-2">
                    {t('booking.field.size')}
                  </label>
                  <select
                    value={formData.companySize}
                    onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400"
                  >
                    <option value="1-20">1 - 20 {lang === 'es' ? 'empleados (Startup/Pyme)' : 'employees'}</option>
                    <option value="20-100">20 - 100 {lang === 'es' ? 'empleados (Mediana empresa)' : 'employees'}</option>
                    <option value="100-500">100 - 500 {lang === 'es' ? 'empleados (Corporación mediana)' : 'employees'}</option>
                    <option value="500+">500+ {lang === 'es' ? 'empleados (Gran Multinacional)' : 'employees (Enterprise)'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-700 dark:text-slate-300 font-bold mb-2">
                    {t('booking.field.notes')}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={lang === 'es' ? 'Ej: Queremos predecir paradas en máquinas CNC...' : 'e.g. We want to predict machine breakdowns...'}
                    value={formData.projectDescription}
                    onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 resize-none"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Date & Time Slot */}
            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-700 dark:text-slate-300 font-bold mb-2 flex items-center gap-1.5">
                    <CalendarIcon className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                    {t('booking.field.date')}
                  </label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400"
                  />
                  {errors.preferredDate && (
                    <span className="text-xs text-rose-500 mt-1 block">{errors.preferredDate}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-700 dark:text-slate-300 font-bold mb-2 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                    {t('booking.field.time')}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredTime: slot })}
                        className={`p-2.5 rounded-xl text-xs font-mono font-medium text-center border transition-all ${
                          formData.preferredTime === slot
                            ? 'bg-cyan-50 dark:bg-cyan-500/20 border-cyan-400 text-cyan-700 dark:text-cyan-300'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-cyan-300'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <Video className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0" />
                  <span>
                    {lang === 'es' 
                      ? 'La sesión se realizará por Google Meet (30 min). Al confirmar, el evento se añadirá a tu calendario y recibirás un correo de confirmación.' 
                      : 'Session via Google Meet (30 min). On confirmation, the event will be added to your calendar and an email will be sent.'}
                  </span>
                </div>
              </div>
            )}

            {/* Step 3: Contact Info */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-700 dark:text-slate-300 font-bold mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                    {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Carlos Gómez"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400"
                  />
                  {errors.fullName && <span className="text-xs text-rose-500 mt-1">{errors.fullName}</span>}
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-700 dark:text-slate-300 font-bold mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="carlos@empresa.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400"
                  />
                  {errors.email && <span className="text-xs text-rose-500 mt-1">{errors.email}</span>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-700 dark:text-slate-300 font-bold mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                      {t('contact.form.phone')}
                    </label>
                    <input
                      type="tel"
                      placeholder="+34 600 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-700 dark:text-slate-300 font-bold mb-1.5 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                      {t('contact.form.company')}
                    </label>
                    <input
                      type="text"
                      placeholder="Empresa S.A."
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400"
                    />
                  </div>
                </div>
              </form>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center justify-between gap-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 disabled:opacity-50"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{t('booking.btn.back')}</span>
                </button>
              ) : (
                <div></div>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all text-xs sm:text-sm shadow-md shadow-cyan-500/20"
                >
                  <span>{t('booking.btn.next')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all text-xs sm:text-sm shadow-lg shadow-cyan-500/25 active:scale-95 disabled:opacity-70 disabled:cursor-wait"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  <span>{isSubmitting ? (lang === 'es' ? 'Procesando...' : 'Processing...') : t('booking.btn.confirm')}</span>
                </button>
              )}
            </div>

          </div>
        ) : (
          /* Confirmation Success State */
          <div className="text-center py-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-400/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
              {t('booking.success.title')}
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-3">
              {t('booking.success.msg')}
            </p>

            {/* Email Status Notice */}
            <div className="mb-4 text-xs font-medium">
              {emailStatus === 'success' ? (
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1.5">
                  <Mail className="w-4 h-4" />
                  {lang === 'es' ? `Invitación enviada a ${formData.email}` : `Invite sent to ${formData.email}`}
                </span>
              ) : emailStatus === 'error' ? (
                <span className="text-rose-500 flex items-center justify-center gap-1.5">
                  <Mail className="w-4 h-4" />
                  {lang === 'es' ? 'No se pudo enviar el email automático.' : 'Could not send automatic email.'}
                </span>
              ) : !isEmailConfigured() ? (
                <span className="text-amber-500 flex items-center justify-center gap-1.5">
                  <Mail className="w-4 h-4" />
                  {lang === 'es' ? '(EmailJS no configurado en modo dev)' : '(EmailJS not configured in dev)'}
                </span>
              ) : null}
            </div>

            {/* Google Calendar notice */}
            <p className="text-xs text-cyan-600 dark:text-cyan-400 font-mono mb-6">
              {lang === 'es'
                ? '📅 Se ha abierto Google Calendar. Si no se abrió, usa el botón de abajo.'
                : '📅 Google Calendar was opened. If it didn\'t open, use the button below.'}
            </p>

            {/* Summary card */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-left font-mono text-xs space-y-2 mb-6 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">{lang === 'es' ? 'Cliente:' : 'Client:'}</span>
                <span className="text-slate-900 dark:text-white font-semibold">{formData.fullName} ({formData.company || 'Empresa'})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">{lang === 'es' ? 'Email:' : 'Email:'}</span>
                <span className="text-slate-900 dark:text-white font-semibold">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">{lang === 'es' ? 'Servicio:' : 'Service:'}</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold truncate ml-4 text-right" title={formData.serviceCategory}>{formData.serviceCategory}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">{lang === 'es' ? 'Fecha y Hora:' : 'Slot:'}</span>
                <span className="text-slate-900 dark:text-white font-semibold">{formData.preferredDate} @ {formData.preferredTime}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {/* Primary: Add to Google Calendar */}
              <a
                href={calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20"
              >
                <CalendarIcon className="w-4 h-4" />
                <span>{lang === 'es' ? 'Añadir a Google Calendar' : 'Add to Google Calendar'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              {/* Secondary: Confirm via WhatsApp */}
              <a
                href={`https://wa.me/34641012046?text=${encodeURIComponent(`Hola Agustín, acabo de agendar una sesión técnica para ${formData.preferredDate} a las ${formData.preferredTime} sobre ${formData.serviceCategory}. Mi correo es ${formData.email}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-xs text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-all flex items-center justify-center gap-1.5"
              >
                <span>{lang === 'es' ? 'Confirmar por WhatsApp' : 'Confirm via WhatsApp'}</span>
              </a>

              <button
                onClick={handleResetAndClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-semibold text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white transition-all"
              >
                {lang === 'es' ? 'Cerrar' : 'Close'}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
