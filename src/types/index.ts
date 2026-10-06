export type Language = 'es' | 'en';

export interface ServiceItem {
  id: string;
  level: number;
  levelBadge: {
    es: string;
    en: string;
  };
  title: {
    es: string;
    en: string;
  };
  subtitle: {
    es: string;
    en: string;
  };
  description: {
    es: string;
    en: string;
  };
  deliverables: {
    es: string[];
    en: string[];
  };
  businessImpact: {
    es: string;
    en: string;
  };
  techStack: string[];
  iconName: string;
  featured?: boolean;
}

export interface TeamProfile {
  id: string;
  name: string;
  role: {
    es: string;
    en: string;
  };
  specialty: {
    es: string;
    en: string;
  };
  degrees: {
    es: string[];
    en: string[];
  };
  highlights: {
    es: string[];
    en: string[];
  };
  experienceYears: number;
  avatarUrl: string;
}

export interface CaseStudyItem {
  id: string;
  clientIndustry: {
    es: string;
    en: string;
  };
  challenge: {
    es: string;
    en: string;
  };
  solution: {
    es: string;
    en: string;
  };
  metrics: {
    val: string;
    label: {
      es: string;
      en: string;
    };
  }[];
  techUsed: string[];
}

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  serviceCategory: string;
  companySize: string;
  preferredDate: string;
  preferredTime: string;
  projectDescription: string;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  isQuickReply?: boolean;
  action?: 'open_booking' | 'contact_whatsapp' | 'call';
}
