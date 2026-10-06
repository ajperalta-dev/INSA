import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language, ServiceItem, TeamProfile, CaseStudyItem } from '../types';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  services: ServiceItem[];
  team: TeamProfile[];
  caseStudies: CaseStudyItem[];
}

const translations: Record<Language, Record<string, string>> = {
  es: {
    // Brand & Taglines
    'brand.name': 'ALPHA',
    'brand.tagline': 'Digital Transformation',
    'brand.slogan': 'Ingeniería de Datos, Inteligencia Artificial y Soluciones Avanzadas de Industria 4.0',

    // Navbar
    'nav.home': 'Inicio',
    'nav.services': 'Soluciones',
    'nav.about': 'Equipo & Filosofía',
    'nav.methodology': 'Metodología',
    'nav.calculator': 'Simulador ROI',
    'nav.cases': 'Casos de Éxito',
    'nav.contact': 'Contacto',
    'nav.bookCta': 'Agendar Consultoría',

    // Hero Section
    'hero.badge': 'CONSULTORÍA ESTRATÉGICA EN DATA & IA',
    'hero.title.pre': 'Transformamos Datos Críticos en',
    'hero.title.highlight': 'Ventaja Competitiva Real',
    'hero.title.post': 'con IA e Industria 4.0',
    'hero.subtitle': 'Diseñamos e implementamos arquitecturas de datos de alto rendimiento, modelos de Machine Learning predictivos, agentes GenAI y automatización inteligente con rigor de Ingeniería Industrial.',
    'hero.cta.primary': 'Explorar Soluciones',
    'hero.cta.secondary': 'Agendar Sesión Técnica',
    'hero.metrics.precision': '+40',
    'hero.metrics.precision.label': 'Proyectos Entregados',
    'hero.metrics.roi': '5 años',
    'hero.metrics.roi.label': 'Experiencia en Data & IA',
    'hero.metrics.events': '3',
    'hero.metrics.events.label': 'Países con Clientes Activos',
    'hero.metrics.downtime': '-35%',
    'hero.metrics.downtime.label': 'Reducción media de costes operativos',

    // Services
    'services.header.badge': 'NUESTRO PORTAFOLIO DE SOLUCIONES',
    'services.header.title': 'Desde los Fundamentos del Dato hasta la IA más Avanzada',
    'services.header.desc': 'Estructuramos nuestras capacidades de forma modular y progresiva, garantizando que cada fase de madurez analítica genere retorno de inversión tangible para tu empresa.',
    'services.filter.all': 'Todas las Soluciones',
    'services.filter.foundational': 'Nivel 1-2: Fundamentos & Datos',
    'services.filter.advanced': 'Nivel 3-4: Machine Learning & GenAI',
    'services.filter.industrial': 'Nivel 5-6: MLOps & Industria 4.0',
    'services.card.deliverables': 'Entregables Clave:',
    'services.card.impact': 'Impacto de Negocio:',
    'services.card.cta': 'Solicitar propuesta técnica',

    // About Team
    'about.header.badge': 'QUIÉNES SOMOS & ADN TÉCNICO',
    'about.header.title': 'Equipo Internacional de Data Scientists e Ingenieros Industriales',
    'about.header.desc': 'Combinamos la solidez metodológica y la visión de procesos de la Ingeniería Industrial con la vanguardia técnica en Inteligencia Artificial, Big Data y MLOps.',
    'about.story.title': 'Nuestra Filosofía: El dato como activo productivo de ingeniería',
    'about.story.p1': 'En ALPHA Digital Transformation no creemos en la Inteligencia Artificial como un artificio teórico, sino como una herramienta de ingeniería de precisión orientada a optimizar procesos, multiplicar márgenes y reducir tiempos de parada.',
    'about.story.p2': 'Nuestros consultores provienen de trayectorias en multinacionales líderes en automoción, energía, banca y cadenas de suministro globales. Todos nuestros líderes técnicos cuentan con Máster Universitario en Big Data, Data Science e Inteligencia Artificial.',
    'about.pillar1.title': 'Rigor de Ingeniería Industrial',
    'about.pillar1.desc': 'Enfoque centrado en lean operations, cuello de botella, throughput y métricas operacionales reales.',
    'about.pillar2.title': 'Especialización Senior en IA',
    'about.pillar2.desc': 'Dominio riguroso de modelos predictivos, redes neuronales, LLMs y sistemas en tiempo real.',
    'about.pillar3.title': 'Arquitecturas Escalables (MLOps)',
    'about.pillar3.desc': 'No nos quedamos en notebooks de prueba. Desplegamos soluciones robustas listas para producción.',
    'about.pillar4.title': 'Soberanía y Seguridad del Dato',
    'about.pillar4.desc': 'Gobernanza estricta, cumplimiento normativo GDPR y despliegues On-Premise o Cloud seguros.',

    // Methodology
    'method.header.badge': 'FRAMEWORK DE TRABAJO',
    'method.header.title': 'Metodología Ágil Orientada a Resultados',
    'method.header.desc': 'Un proceso estructurado en 4 fases que reduce la incertidumbre y garantiza valor desde las primeras semanas.',
    'method.phase1.num': '01',
    'method.phase1.title': 'Auditoría & Diagnóstico de Datos',
    'method.phase1.desc': 'Evaluamos la madurez analítica, arquitectura existente, calidad de datos y definimos los casos de uso de mayor retorno.',
    'method.phase2.num': '02',
    'method.phase2.title': 'Arquitectura & PoC Acelerada',
    'method.phase2.desc': 'Diseñamos la solución objetivo y desarrollamos un prototipo funcional en menos de 4 semanas para validar la hipótesis.',
    'method.phase3.num': '03',
    'method.phase3.title': 'Ingeniería & Despliegue en Producción',
    'method.phase3.desc': 'Construcción modular de pipelines robustos, contenedores Docker/Kubernetes, APIs seguras y dashboards ejecutivos.',
    'method.phase4.num': '04',
    'method.phase4.title': 'MLOps & Optimización Continua',
    'method.phase4.desc': 'Monitorización de drift de datos, reentrenamiento automatizado, auditoría de sesgos y formación al equipo interno.',

    // ROI Simulator
    'calc.header.badge': 'HERRAMIENTA INTERACTIVA',
    'calc.header.title': 'Simulador de Retorno de Inversión (ROI)',
    'calc.header.desc': 'Estima el impacto financiero potencial de modernizar tus procesos con Data & IA según tu sector y volumen operacional.',
    'calc.sector.label': 'Sector de tu Empresa',
    'calc.sector.industry': 'Manufactura / Industria 4.0',
    'calc.sector.logistics': 'Logística & Cadena de Suministro',
    'calc.sector.retail': 'Retail & Comercio Electrónico',
    'calc.sector.finance': 'Banca, Finanzas & Seguros',
    'calc.cost.label': 'Coste Operativo Anual Aproximado (€)',
    'calc.solution.label': 'Área de Intervención Prioritaria',
    'calc.sol.pred_maint': 'Mantenimiento Predictivo & Cero Paradas',
    'calc.sol.demand': 'Forecasting de Demanda & Optimización de Stock',
    'calc.sol.genai': 'Automatización Cognitiva con Agentes GenAI',
    'calc.sol.bi': 'Business Intelligence Centralizado & Data Lake',
    'calc.result.savings': 'Ahorro Anual Estimado:',
    'calc.result.efficiency': 'Aumento de Eficiencia Operativa:',
    'calc.result.payback': 'Período Estimado de Amortización:',
    'calc.result.note': '* Estimaciones basadas en benchmarks de proyectos previos de ALPHA Digital Transformation en sectores comparables.',
    'calc.cta': 'Agendar auditoría para validar estas cifras',

    // Case Studies
    'cases.header.badge': 'CASOS DE ÉXITO & RESULTADOS',
    'cases.header.title': 'Resultados Reales en Clientes',
    'cases.header.desc': 'Ejemplos sencillos de cómo resolvemos problemas diarios en producción, stock y toma de decisiones.',

    // Contact
    'contact.header.badge': 'HABLEMOS DE TU PROYECTO',
    'contact.header.title': 'Inicia tu Transformación con Especialistas',
    'contact.header.desc': 'Ponte en contacto directo con nuestros Senior Data Scientists e Ingenieros. Evaluaremos la viabilidad de tu proyecto sin compromiso.',
    'contact.info.email': 'alpha.digital.ia@gmail.com',
    'contact.info.phone': '+34 641 012 046',
    'contact.info.location': 'Madrid, España · Proyectos Internacionales',
    'contact.info.hours': 'Lunes a Viernes: 08:30 - 19:30 (CET)',
    'contact.form.name': 'Nombre y Apellidos *',
    'contact.form.email': 'Correo Corporativo *',
    'contact.form.phone': 'Teléfono de Contacto',
    'contact.form.company': 'Empresa / Organización',
    'contact.form.service': 'Solución de Interés',
    'contact.form.message': 'Cuéntanos brevemente sobre tu reto o proyecto *',
    'contact.form.submit': 'Enviar Solicitud de Información',
    'contact.form.success': '¡Mensaje recibido con éxito! Un Senior Data Scientist se comunicará contigo en menos de 24 horas.',

    // Booking Modal
    'booking.modal.title': 'Agendar Sesión de Consultoría Estratégica',
    'booking.modal.subtitle': 'Sesión técnica gratuita de 30 minutos con un Senior Data Scientist & Ingeniero Industrial.',
    'booking.step1': '1. Detalles del Proyecto',
    'booking.step2': '2. Fecha & Horario',
    'booking.step3': '3. Datos de Contacto',
    'booking.field.service': '¿Qué solución necesitas explorar?',
    'booking.field.size': 'Tamaño de tu organización',
    'booking.field.date': 'Fecha preferida',
    'booking.field.time': 'Franja horaria preferida',
    'booking.field.notes': 'Objetivo principal de la reunión',
    'booking.btn.next': 'Continuar',
    'booking.btn.back': 'Atrás',
    'booking.btn.confirm': 'Confirmar Cita',
    'booking.success.title': '¡Cita Agendada Exitosamente!',
    'booking.success.msg': 'Hemos registrado tu sesión. Te hemos enviado un correo de confirmación y el enlace de Google Meet.',

    // Chatbot
    'chat.header.name': 'ALPHA AI Assistant',
    'chat.header.status': 'En línea · Consultoría en directo',
    'chat.welcome': 'Hola, soy el asistente virtual de ALPHA Digital Transformation. ¿En qué podemos potenciar tu empresa hoy?',
    'chat.prompt.services': '¿Qué servicios ofrecen?',
    'chat.prompt.industry40': '¿Qué experiencia tienen en Industria 4.0?',
    'chat.prompt.pricing': '¿Cómo funcionan sus tarifas?',
    'chat.prompt.book': 'Deseo agendar una reunión técnica',
    'chat.input.placeholder': 'Escribe tu consulta...',
    'chat.typing': 'ALPHA AI está analizando...',

    // WhatsApp
    'whatsapp.tooltip': '¿Prefieres conversar directamente? Escríbenos a WhatsApp (+34 641 012 046)',
    'whatsapp.defaultMsg': 'Hola ALPHA Digital Transformation, deseo solicitar información sobre sus servicios de Data e IA.',

    // Footer
    'footer.rights': 'Todos los derechos reservados.',
    'footer.legal': 'Aviso Legal',
    'footer.privacy': 'Política de Privacidad',
    'footer.cookies': 'Política de Cookies',
    'footer.desc': 'Consultora de ingeniería de datos, analítica avanzada, inteligencia artificial y modernización industrial con estándares de multinacional.',
  },
  en: {
    // Brand & Taglines
    'brand.name': 'ALPHA',
    'brand.tagline': 'Digital Transformation',
    'brand.slogan': 'Data Engineering, Artificial Intelligence & Advanced Industry 4.0 Solutions',

    // Navbar
    'nav.home': 'Home',
    'nav.services': 'Solutions',
    'nav.about': 'Team & Philosophy',
    'nav.methodology': 'Methodology',
    'nav.calculator': 'ROI Simulator',
    'nav.cases': 'Case Studies',
    'nav.contact': 'Contact',
    'nav.bookCta': 'Book Consultation',

    // Hero Section
    'hero.badge': 'STRATEGIC DATA & AI CONSULTING',
    'hero.title.pre': 'Transforming Critical Data into',
    'hero.title.highlight': 'Definitive Competitive Advantage',
    'hero.title.post': 'with AI & Industry 4.0',
    'hero.subtitle': 'We architect and implement high-performance data systems, predictive Machine Learning models, enterprise GenAI agents, and industrial automation with Industrial Engineering rigor.',
    'hero.cta.primary': 'Explore Solutions',
    'hero.cta.secondary': 'Book Technical Session',
    'hero.metrics.precision': '+40',
    'hero.metrics.precision.label': 'Projects Delivered',
    'hero.metrics.roi': '5 years',
    'hero.metrics.roi.label': 'Experience in Data & AI',
    'hero.metrics.events': '3',
    'hero.metrics.events.label': 'Countries with Active Clients',
    'hero.metrics.downtime': '-35%',
    'hero.metrics.downtime.label': 'Average Operational Cost Reduction',

    // Services
    'services.header.badge': 'OUR SOLUTIONS PORTFOLIO',
    'services.header.title': 'From Data Foundations to Cutting-Edge Enterprise AI',
    'services.header.desc': 'We organize our technical capabilities progressively from ground level to advanced autonomy, ensuring measurable business return at every step.',
    'services.filter.all': 'All Solutions',
    'services.filter.foundational': 'Levels 1-2: Foundations & Data',
    'services.filter.advanced': 'Levels 3-4: Machine Learning & GenAI',
    'services.filter.industrial': 'Levels 5-6: MLOps & Industry 4.0',
    'services.card.deliverables': 'Key Deliverables:',
    'services.card.impact': 'Business Impact:',
    'services.card.cta': 'Request Technical Proposal',

    // About Team
    'about.header.badge': 'ABOUT US & TECHNICAL DNA',
    'about.header.title': 'International Team of Data Scientists & Industrial Engineers',
    'about.header.desc': 'Bridging the process discipline of Industrial Engineering with state-of-the-art expertise in Artificial Intelligence, Big Data, and MLOps.',
    'about.story.title': 'Our Philosophy: Data as a high-precision engineering asset',
    'about.story.p1': 'At ALPHA Digital Transformation, we do not view AI as a speculative experiment, but as a high-precision engineering lever designed to optimize operations, multiply margins, and eliminate machine downtime.',
    'about.story.p2': 'Our consultants bring proven track records in tier-1 multinationals across automotive, energy, banking, and global supply chains. All our technical leads hold accredited Masters degrees in Big Data, Data Science, and Artificial Intelligence.',
    'about.pillar1.title': 'Industrial Engineering Rigor',
    'about.pillar1.desc': 'Focused on operational bottlenecks, process lean methodology, throughput, and verified financial ROI.',
    'about.pillar2.title': 'Senior AI Specialization',
    'about.pillar2.desc': 'Rigorous mastery of predictive models, neural architectures, LLMs, and real-time inference engines.',
    'about.pillar3.title': 'Scalable Architectures (MLOps)',
    'about.pillar3.desc': 'We move beyond exploratory notebooks to deliver battle-tested, enterprise-grade production systems.',
    'about.pillar4.title': 'Data Sovereignty & Security',
    'about.pillar4.desc': 'Strict data governance, GDPR compliance, and robust On-Premise or Private Cloud infrastructure.',

    // Methodology
    'method.header.badge': 'DELIVERY FRAMEWORK',
    'method.header.title': 'Results-Driven Agile Methodology',
    'method.header.desc': 'A structured 4-phase framework designed to eliminate guesswork and generate tangible ROI from the earliest sprints.',
    'method.phase1.num': '01',
    'method.phase1.title': 'Data Audit & Diagnostic',
    'method.phase1.desc': 'We assess analytical maturity, existing infrastructure, data veracity, and pinpoint the highest-yield use cases.',
    'method.phase2.num': '02',
    'method.phase2.title': 'Architecture & Rapid PoC',
    'method.phase2.desc': 'We design target-state architecture and build a functional working prototype within 4 weeks to validate hypotheses.',
    'method.phase3.num': '03',
    'method.phase3.title': 'Production Engineering & Scaling',
    'method.phase3.desc': 'Full engineering of resilient data pipelines, Docker/Kubernetes container orchestration, secure APIs, and executive BI.',
    'method.phase4.num': '04',
    'method.phase4.title': 'MLOps & Continuous Improvement',
    'method.phase4.desc': 'Real-time telemetry, model drift detection, automated retraining pipelines, and internal team enablement.',

    // ROI Simulator
    'calc.header.badge': 'INTERACTIVE TOOL',
    'calc.header.title': 'ROI & Operational Savings Simulator',
    'calc.header.desc': 'Estimate the potential financial impact of modernizing your operations with Data & AI based on industry benchmarks.',
    'calc.sector.label': 'Company Sector',
    'calc.sector.industry': 'Manufacturing / Industry 4.0',
    'calc.sector.logistics': 'Logistics & Supply Chain',
    'calc.sector.retail': 'Retail & E-Commerce',
    'calc.sector.finance': 'Banking, Finance & Insurance',
    'calc.cost.label': 'Approximate Annual Operational Cost (€)',
    'calc.solution.label': 'Priority Intervention Area',
    'calc.sol.pred_maint': 'Predictive Maintenance & Zero Downtime',
    'calc.sol.demand': 'Demand Forecasting & Inventory Optimization',
    'calc.sol.genai': 'Cognitive Automation with GenAI Agents',
    'calc.sol.bi': 'Centralized BI & Modern Lakehouse Architecture',
    'calc.result.savings': 'Estimated Annual Savings:',
    'calc.result.efficiency': 'Operational Efficiency Boost:',
    'calc.result.payback': 'Estimated Payback Period:',
    'calc.result.note': '* Projections based on past client benchmarks delivered by ALPHA Digital Transformation in equivalent enterprise sectors.',
    'calc.cta': 'Book Technical Audit to Validate Figures',

    // Case Studies
    'cases.header.badge': 'CASE STUDIES & IMPACT',
    'cases.header.title': 'Real Client Results & Tangible Outcomes',
    'cases.header.desc': 'Clear examples of how we solve everyday friction across production lines, stock management, and decisions.',

    // Contact
    'contact.header.badge': 'GET IN TOUCH',
    'contact.header.title': 'Start Your Transformation with Senior Engineers',
    'contact.header.desc': 'Connect directly with our Senior Data Scientists and Industrial Engineers. We will evaluate your technical feasibility with zero obligation.',
    'contact.info.email': 'alpha.digital.ia@gmail.com',
    'contact.info.phone': '+34 641 012 046',
    'contact.info.location': 'Madrid, Spain · Global Remote Engagements',
    'contact.info.hours': 'Monday to Friday: 08:30 - 19:30 (CET)',
    'contact.form.name': 'Full Name *',
    'contact.form.email': 'Corporate Email *',
    'contact.form.phone': 'Phone Number',
    'contact.form.company': 'Company / Organization',
    'contact.form.service': 'Solution of Interest',
    'contact.form.message': 'Briefly describe your challenge or project *',
    'contact.form.submit': 'Submit Information Request',
    'contact.form.success': 'Message successfully received! A Senior Data Scientist will contact you within 24 hours.',

    // Booking Modal
    'booking.modal.title': 'Book Strategic Consultation Session',
    'booking.modal.subtitle': 'Free 30-minute technical session with a Senior Data Scientist & Industrial Engineer.',
    'booking.step1': '1. Project Scope',
    'booking.step2': '2. Date & Time',
    'booking.step3': '3. Contact Details',
    'booking.field.service': 'Which solution would you like to explore?',
    'booking.field.size': 'Organization size',
    'booking.field.date': 'Preferred date',
    'booking.field.time': 'Preferred time window',
    'booking.field.notes': 'Main objective for the meeting',
    'booking.btn.next': 'Next Step',
    'booking.btn.back': 'Back',
    'booking.btn.confirm': 'Confirm Meeting',
    'booking.success.title': 'Meeting Successfully Booked!',
    'booking.success.msg': 'Your appointment has been registered. We have sent a calendar invite with Google Meet access.',

    // Chatbot
    'chat.header.name': 'ALPHA AI Assistant',
    'chat.header.status': 'Online · Live Advisory',
    'chat.welcome': 'Hello, I am ALPHA Digital Transformation\'s virtual assistant. How can we empower your enterprise today?',
    'chat.prompt.services': 'What services do you provide?',
    'chat.prompt.industry40': 'What is your Industry 4.0 track record?',
    'chat.prompt.pricing': 'How do your consulting fees work?',
    'chat.prompt.book': 'I want to schedule a technical meeting',
    'chat.input.placeholder': 'Ask your question...',
    'chat.typing': 'ALPHA AI is analyzing...',

    // WhatsApp
    'whatsapp.tooltip': 'Prefer direct messaging? Chat on WhatsApp (+34 641 012 046)',
    'whatsapp.defaultMsg': 'Hello ALPHA Digital Transformation, I would like to request details about your Data and AI services.',

    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.legal': 'Legal Notice',
    'footer.privacy': 'Privacy Policy',
    'footer.cookies': 'Cookie Policy',
    'footer.desc': 'High-end consultancy in data engineering, advanced analytics, artificial intelligence, and industrial modernization with global standards.',
  }
};

// 6 Structured Services from Foundations to Cutting-Edge (Level 1 to 6)
// Inspired by Merovingian Data's solutions (BI, Engineering, ML, GenAI, MLOps, Industry 4.0)
const servicesData: ServiceItem[] = [
  {
    id: 'data-analytics-bi',
    level: 1,
    levelBadge: {
      es: 'NIVEL 1 · FUNDAMENTAL',
      en: 'LEVEL 1 · FOUNDATIONAL',
    },
    title: {
      es: 'Data Analytics & Business Intelligence Moderno',
      en: 'Modern Data Analytics & Business Intelligence',
    },
    subtitle: {
      es: 'De datos dispersos a dashboards ejecutivos de toma de decisiones en tiempo real',
      en: 'From fragmented spreadsheets to real-time executive decision dashboards',
    },
    description: {
      es: 'Construimos la base analítica de tu organización: modelado dimensional (estrella/copo de nieve), diseño de métricas clave (KPIs corporativos), cuadros de mando automatizados de alta fidelidad y alertas inteligentes que sustituyen los reportes manuales.',
      en: 'We establish your firm\'s analytical bedrock: dimensional modeling (star/snowflake), corporate KPI taxonomy, high-fidelity automated dashboards, and proactive alerts that eliminate error-prone manual spreadsheets.',
    },
    deliverables: {
      es: [
        'Dashboards interactivos en Power BI, Tableau o Looker',
        'Diccionario unificado de métricas y Single Source of Truth',
        'Automatización 100% de la ingesta y refresco de reportes',
        'Capacitación ejecutiva y autoservicio analítico para equipos',
      ],
      en: [
        'Interactive dashboards in Power BI, Tableau, or Looker',
        'Unified business metric dictionary & Single Source of Truth',
        '100% automation of report ingestion and refresh cycles',
        'Executive training & self-service analytics enablement',
      ],
    },
    businessImpact: {
      es: 'Reducción de hasta un 75% en tiempo de generación de informes y visibilidad unificada de rentabilidad por línea de negocio.',
      en: 'Up to 75% reduction in manual reporting overhead with unified visibility into business unit profitability.',
    },
    techStack: ['Power BI', 'Tableau', 'SQL Server', 'PostgreSQL', 'dbt', 'DAX', 'Looker Studio'],
    iconName: 'BarChart3',
    featured: false,
  },
  {
    id: 'data-engineering',
    level: 2,
    levelBadge: {
      es: 'NIVEL 2 · ARQUITECTURA',
      en: 'LEVEL 2 · ARCHITECTURE',
    },
    title: {
      es: 'Data Engineering & Gobernanza de Lakehouses',
      en: 'Data Engineering & Lakehouse Governance',
    },
    subtitle: {
      es: 'Infraestructura de datos robusta, escalable y gobernada para la alta demanda',
      en: 'Robust, governed, high-throughput cloud data pipelines and storage',
    },
    description: {
      es: 'Diseño e implementación de pipelines ETL/ELT resilientes en la nube y arquitecturas Lakehouse modernas (Medallion architecture: Bronze, Silver, Gold). Garantizamos calidad de datos, linaje, cumplimiento normativo GDPR y disponibilidad en milisegundos.',
      en: 'Design and deployment of resilient cloud ETL/ELT pipelines and modern Lakehouse architectures (Medallion pattern: Bronze, Silver, Gold). We enforce strict data quality, governance, lineage, and sub-second querying latency.',
    },
    deliverables: {
      es: [
        'Pipelines de datos automatizados por lotes (Batch) y en tiempo real (Streaming)',
        'Modern Data Stack sobre Snowflake, Databricks o BigQuery',
        'Framework de Data Quality y detección proactiva de datos anómalos',
        'Catálogo de datos corporativo con control de accesos RBAC y linaje',
      ],
      en: [
        'Automated batch and real-time streaming data ingestion pipelines',
        'Modern Data Stack implementation on Snowflake, Databricks, or BigQuery',
        'Data Quality framework with automated anomaly and drift detection',
        'Enterprise data catalog with RBAC access control and lineage tracking',
      ],
    },
    businessImpact: {
      es: 'Eliminación total de silos de información y reducción de costes de infraestructura cloud de hasta un 35%.',
      en: 'Total elimination of data silos and up to 35% reduction in cloud infrastructure spend.',
    },
    techStack: ['Databricks', 'Snowflake', 'Apache Spark', 'Python', 'Apache Airflow', 'AWS / Azure / GCP', 'Kafka'],
    iconName: 'Database',
    featured: false,
  },
  {
    id: 'machine-learning',
    level: 3,
    levelBadge: {
      es: 'NIVEL 3 · ANALÍTICA AVANZADA',
      en: 'LEVEL 3 · ADVANCED ANALYTICS',
    },
    title: {
      es: 'Machine Learning & Modelos Predictivos',
      en: 'Machine Learning & Predictive Analytics',
    },
    subtitle: {
      es: 'De entender el pasado a anticipar el futuro con precisión algorítmica',
      en: 'Moving from retrospective reporting to forward-looking algorithmic precision',
    },
    description: {
      es: 'Desarrollamos algoritmos de aprendizaje automático a medida para resolver retos críticos: previsión de demanda para cadenas de suministro, detección de fuga de clientes (Churn), scoring de riesgo crediticio, modelos de fijación dinámica de precios y visión computacional.',
      en: 'We engineer tailored machine learning models addressing critical business friction: demand forecasting, customer churn prevention, credit risk scoring, dynamic pricing engines, and industrial computer vision.',
    },
    deliverables: {
      es: [
        'Modelos de forecasting multivariable con intervalos de confianza',
        'Algoritmos de clasificación, clustering y propensión de compra',
        'Sistemas de visión artificial para control de calidad e inspección óptica',
        'Explicabilidad algorítmica (SHAP/LIME) para auditoría de decisiones',
      ],
      en: [
        'Multivariate forecasting models with calibrated confidence bounds',
        'Propensity, churn, and recommendation classification algorithms',
        'Computer vision systems for automated optical quality inspection',
        'Model explainability framework (SHAP/LIME) for regulatory scrutiny',
      ],
    },
    businessImpact: {
      es: 'Incremento de precisión en forecasting del 30%+ y ahorro sustancial en obsolescencia de stock y roturas de inventario.',
      en: '30%+ surge in forecasting accuracy, substantially cutting stockouts and excess inventory costs.',
    },
    techStack: ['Python', 'Scikit-learn', 'PyTorch', 'XGBoost', 'OpenCV', 'Pandas', 'MLflow'],
    iconName: 'Cpu',
    featured: true,
  },
  {
    id: 'genai-enterprise',
    level: 4,
    levelBadge: {
      es: 'NIVEL 4 · IA GENERATIVA',
      en: 'LEVEL 4 · GENERATIVE AI',
    },
    title: {
      es: 'IA Generativa & Agentes Autónomos Empresariales',
      en: 'Generative AI & Autonomous Enterprise Agents',
    },
    subtitle: {
      es: 'Sistemas RAG privados, asistentes cognitivos internos y agentes inteligentes de flujo',
      en: 'Private RAG systems, cognitive enterprise copilots, and workflow AI agents',
    },
    description: {
      es: 'Implantamos soluciones de IA Generativa seguras, privadas y conectadas con los documentos y bases de datos de tu compañía. Creamos sistemas RAG (Retrieval-Augmented Generation) sin alucinaciones y agentes autónomos capaces de razonar y ejecutar tareas complejas de negocio.',
      en: 'We deploy secure, enterprise-grade Generative AI grounded exclusively in your company documents and core databases. Zero data leakage, hallucination-resistant RAG architectures, and autonomous reasoning agents that execute multi-step workflows.',
    },
    deliverables: {
      es: [
        'Arquitectura RAG corporativa con bases de datos vectoriales privadas',
        'Copilotos internos para equipos de ingeniería, legal, ventas y operaciones',
        'Agentes autónomos orquestados con herramientas y APIs internas',
        'Fine-tuning y cuantización de modelos abiertos (Llama, Mistral) on-premise',
      ],
      en: [
        'Corporate RAG architecture with secured enterprise vector stores',
        'Internal intelligence copilots for engineering, legal, sales, and operations',
        'Autonomous task agents integrated with proprietary internal APIs',
        'Private fine-tuning and quantization of open weights (Llama, Mistral)',
      ],
    },
    businessImpact: {
      es: 'Aumento del 40% en la productividad de equipos cualificados y respuestas instantáneas sobre petabytes de conocimiento técnico corporativo.',
      en: '40% acceleration in knowledge worker productivity with instant, cited answers across petabytes of technical documentation.',
    },
    techStack: ['LangChain', 'LlamaIndex', 'Pinecone', 'ChromaDB', 'OpenAI API', 'Hugging Face', 'Ollama'],
    iconName: 'Sparkles',
    featured: true,
  },
  {
    id: 'mlops-scale',
    level: 5,
    levelBadge: {
      es: 'NIVEL 5 · DESPLIEGUE CONTINUO',
      en: 'LEVEL 5 · PRODUCTION ENGINEERING',
    },
    title: {
      es: 'MLOps & Arquitectura de Escalado en Producción',
      en: 'MLOps & Production Scaling Architecture',
    },
    subtitle: {
      es: 'Del experimento a producción continua: CI/CD, telemetría y monitorización de drift',
      en: 'From experimental notebooks to continuous production: CI/CD, telemetry & drift monitoring',
    },
    description: {
      es: 'Garantizamos que los modelos de IA se mantengan fiables, seguros y precisos a lo largo del tiempo. Implementamos pipelines automatizados de CI/CD para Machine Learning, Feature Stores centralizados, monitorización en tiempo real de data drift y escalado automático con baja latencia.',
      en: 'We ensure AI and ML assets maintain reliability, low inference latency, and high accuracy over time. We automate CI/CD pipelines for models, unified Feature Stores, live telemetry for data and concept drift, and auto-scaling container clusters.',
    },
    deliverables: {
      es: [
        'Infraestructura de inferencia en tiempo real y microservicios gRPC/REST',
        'Pipelines de CI/CD para reentrenamiento continuo y testeo automático',
        'Monitorización de métricas de negocio, data drift y latencia P99',
        'Contenedores optimizados y clusters Kubernetes (EKS / AKS / GKE)',
      ],
      en: [
        'Sub-second real-time inference microservices via gRPC and REST APIs',
        'Automated CI/CD pipelines for continuous retraining and unit testing',
        'Live telemetry for business KPIs, concept drift, and P99 latency SLA',
        'Optimized containers and orchestration on Kubernetes (EKS/AKS/GKE)',
      ],
    },
    businessImpact: {
      es: 'Reducción de meses a días en el ciclo de lanzamiento de modelos y garantía de disponibilidad del 99.9% en servicios críticos.',
      en: 'Deployment velocity accelerated from quarters to days with 99.9% uptime guarantees for mission-critical services.',
    },
    techStack: ['MLflow', 'Docker', 'Kubernetes', 'KubeFlow', 'Triton Server', 'FastAPI', 'Prometheus'],
    iconName: 'Server',
    featured: false,
  },
  {
    id: 'industry-40',
    level: 6,
    levelBadge: {
      es: 'NIVEL 6 · INDUSTRIA 4.0',
      en: 'LEVEL 6 · INDUSTRY 4.0 & OT',
    },
    title: {
      es: 'Industria 4.0 & Transformación Digital de Planta',
      en: 'Industry 4.0 & Operational Plant Digitalization',
    },
    subtitle: {
      es: 'Mantenimiento predictivo, IoT industrial, gemelos digitales y convergencia IT/OT',
      en: 'Predictive maintenance, industrial IoT, digital twins, and IT/OT convergence',
    },
    description: {
      es: 'Nuestra especialidad diferencial: unimos el rigor de la Ingeniería Industrial con la vanguardia de la IA. Conectamos sensores industriales, PLCs, sistemas SCADA y MES a modelos inteligentes para predecir fallos mecánicos antes de que ocurran, optimizar OEE y simular líneas de fabricación.',
      en: 'Our premier differentiator: uniting Industrial Engineering rigor with bleeding-edge AI. We integrate industrial sensors, PLCs, SCADA, and MES systems with machine intelligence to forecast machine breakdowns, optimize OEE, and build digital plant twins.',
    },
    deliverables: {
      es: [
        'Modelos de Mantenimiento Predictivo con sensores de vibración, temperatura y acústica',
        'Optimización algorítmica de parámetros de proceso para maximizar OEE',
        'Arquitectura de convergencia IT/OT segura con protocolos MQTT e industrial OPC UA',
        'Gemelos Digitales (Digital Twins) para simulación de flujos productivos',
      ],
      en: [
        'Predictive Maintenance algorithms analyzing vibration, acoustic, and thermal telemetry',
        'Real-time process parameter optimization to maximize OEE and plant yield',
        'Hardened IT/OT convergence architectures running MQTT and industrial OPC UA',
        'Digital Twins simulating plant throughput and manufacturing scenarios',
      ],
    },
    businessImpact: {
      es: 'Reducción de paradas no programadas en planta de entre un 35% y un 50%, prolongando la vida útil del activo y reduciendo costes de repuestos.',
      en: '35% to 50% drop in unscheduled plant downtime, extending machinery lifespan while optimizing critical spare parts inventory.',
    },
    techStack: ['OPC UA', 'MQTT', 'Industrial IoT', 'Time-Series DB', 'Edge AI', 'Digital Twins', 'PyTorch'],
    iconName: 'Factory',
    featured: true,
  },
];

// Team profiles featuring Industrial Engineering and Senior Data Scientists with Big Data & AI Masters
const teamData: TeamProfile[] = [
  {
    id: 'lead-ds-industrial',
    name: 'Agustín Peralta',
    role: {
      es: 'Director de Consultoría & Principal Data Scientist',
      en: 'Consulting Principal & Lead Data Scientist',
    },
    specialty: {
      es: 'Ingeniería Industrial · Inteligencia Artificial · Industria 4.0',
      en: 'Industrial Engineering · Artificial Intelligence · Industry 4.0',
    },
    degrees: {
      es: [
        'Grado en Ingeniería Industrial (Procesos & Optimización Operativa)',
        'Máster en Big Data, Data Science & Inteligencia Artificial Avanzada',
        'Certificaciones profesionales en Arquitectura Cloud & MLOps',
      ],
      en: [
        'B.S. in Industrial Engineering (Operational Research & Process Optimization)',
        'Master of Science in Big Data, Data Science & Advanced AI',
        'Professional Certifications in Cloud Architecture & MLOps',
      ],
    },
    highlights: {
      es: [
        'Liderazgo en implantación de proyectos de IA y analítica en multinacionales europeas',
        'Especialista en integración de sensórica industrial, OEE y modelos de visión artificial',
        'Diseño de arquitecturas Lakehouse y optimización de flujos de valor en planta',
      ],
      en: [
        'Led end-to-end data and AI implementations for European multinationals',
        'Specialist in industrial sensor integration, OEE, and computer vision deployment',
        'Architected high-throughput Lakehouse stacks and industrial value streams',
      ],
    },
    experienceYears: 8,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'senior-mle',
    name: 'Elena Rostova, Ph.D.',
    role: {
      es: 'Senior MLOps & Data Platform Architect',
      en: 'Senior MLOps & Data Platform Architect',
    },
    specialty: {
      es: 'MLOps · Distribuited Computing · Databricks & Snowflake',
      en: 'MLOps · Distributed Computing · Databricks & Snowflake',
    },
    degrees: {
      es: [
        'Doctorado en Ciencias de la Computación & Machine Learning',
        'Máster Oficial en Inteligencia Artificial y Big Data Analytics',
        'Databricks Certified Data Engineer Professional',
      ],
      en: [
        'Ph.D. in Computer Science & Applied Machine Learning',
        'M.Sc. in Artificial Intelligence & Big Data Analytics',
        'Databricks Certified Data Engineer Professional',
      ],
    },
    highlights: {
      es: [
        'Despliegue de pipelines de streaming de más de 20M eventos diarios en sector fintech',
        'Auditoría y optimización de latencia en modelos predictivos con Kubernetes y Triton',
        'Gobernanza corporativa de datos bajo normativas financieras y de automoción',
      ],
      en: [
        'Deployed streaming ingestion pipelines processing 20M+ events/day in fintech',
        'Inference optimization for sub-millisecond predictions via Kubernetes & Triton',
        'Corporate data governance implementation across regulated manufacturing standards',
      ],
    },
    experienceYears: 10,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'senior-genai',
    name: 'Carlos Mendoza, M.Sc.',
    role: {
      es: 'Lead GenAI & Applied Solutions Engineer',
      en: 'Lead GenAI & Applied Solutions Engineer',
    },
    specialty: {
      es: 'LLMs Empresariales · Sistemas RAG · Agentes Autónomos',
      en: 'Enterprise LLMs · RAG Architectures · Autonomous Agents',
    },
    degrees: {
      es: [
        'Ingeniero de Telecomunicaciones & Sistemas',
        'Máster en Inteligencia Artificial Aplicada y Procesamiento de Lenguaje Natural',
        'Certificación en Deep Learning & Arquitecturas Transformer',
      ],
      en: [
        'B.S. in Telecommunications & Systems Engineering',
        'M.Sc. in Applied Artificial Intelligence and Natural Language Processing',
        'Certified Specialist in Deep Learning & Transformer Architectures',
      ],
    },
    highlights: {
      es: [
        'Creación de agentes IA multimodales para automatización documental en multinacionales',
        'Desarrollo de bases vectoriales seguras para búsqueda semántica sobre petabytes',
        'Fine-tuning de modelos open-source para cumplimiento estricto de privacidad GDPR',
      ],
      en: [
        'Built multimodal AI agents automating complex document reasoning in global firms',
        'Engineered enterprise vector search infrastructure indexing petabytes of documents',
        'Fine-tuned open-source models under strict air-gapped GDPR environments',
      ],
    },
    experienceYears: 7,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
  },
];

const caseStudiesData: CaseStudyItem[] = [
  {
    id: 'case-industry',
    clientIndustry: {
      es: 'Industria & Manufactura',
      en: 'Industry & Manufacturing',
    },
    challenge: {
      es: 'Paradas imprevistas en maquinaria crítica que causaban retrasos de entrega y costes elevados de reparación.',
      en: 'Unplanned machine breakdowns causing production halts and high emergency repair expenses.',
    },
    solution: {
      es: 'Instalación de sensórica IoT y alertas de mantenimiento predictivo que avisan días antes de que ocurra una avería.',
      en: 'Deployed IoT sensors and predictive alerts notifying maintenance teams days before failure occurs.',
    },
    metrics: [
      { val: '-45%', label: { es: 'Paradas imprevistas', en: 'Unplanned Downtime' } },
      { val: '€380K', label: { es: 'Ahorro anual en costes', en: 'Annual Cost Savings' } },
      { val: '4 meses', label: { es: 'Amortización de inversión', en: 'Payback Period' } },
    ],
    techUsed: ['IoT Industrial', 'Mantenimiento Predictivo', 'Python', 'Alertas en Tiempo Real'],
  },
  {
    id: 'case-retail',
    clientIndustry: {
      es: 'Retail, Comercio & Distribución',
      en: 'Retail & Distribution',
    },
    challenge: {
      es: 'Falta de previsión de ventas: se agotaba el producto estrella y sobraba stock de baja rotación en almacén.',
      en: 'Inaccurate sales forecasts leading to frequent stockouts of top sellers and excess dead inventory.',
    },
    solution: {
      es: 'Modelo de inteligencia artificial que calcula la demanda futura exacta por tienda, temporada y producto.',
      en: 'AI forecasting model estimating exact future customer demand per store, season, and item.',
    },
    metrics: [
      { val: '+32%', label: { es: 'Precisión de inventario', en: 'Inventory Precision' } },
      { val: '-26%', label: { es: 'Coste de almacenamiento', en: 'Holding Costs Cut' } },
      { val: '99.2%', label: { es: 'Pedidos a tiempo', en: 'On-Time Deliveries' } },
    ],
    techUsed: ['Machine Learning', 'Forecasting IA', 'Snowflake', 'Power BI'],
  },
  {
    id: 'case-corporate',
    clientIndustry: {
      es: 'Gestión Empresarial & Finanzas',
      en: 'Corporate Management & Finance',
    },
    challenge: {
      es: 'El equipo directivo perdía decenas de horas semanales cruzando hojas de cálculo Excel desactualizadas.',
      en: 'Management spent dozens of weekly hours reconciling outdated manual spreadsheets across departments.',
    },
    solution: {
      es: 'Plataforma unificada de Business Intelligence con dashboards en tiempo real accesibles desde móvil y PC.',
      en: 'Unified Business Intelligence platform featuring live executive dashboards accessible on mobile & PC.',
    },
    metrics: [
      { val: '-75%', label: { es: 'Tiempo en reportes', en: 'Reporting Time' } },
      { val: '100%', label: { es: 'Datos centralizados', en: 'Single Source of Truth' } },
      { val: '24/7', label: { es: 'Visibilidad en directo', en: 'Live Decision Visibility' } },
    ],
    techUsed: ['Power BI', 'Data Lakehouse', 'dbt', 'SQL Automatizado'],
  },
];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('es');

  // Load preferred language from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem('alpha_lang') as Language;
    if (saved === 'es' || saved === 'en') {
      setLang(saved);
    }
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('alpha_lang', newLang);
  };

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations['es']?.[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang: handleSetLang,
        t,
        services: servicesData,
        team: teamData,
        caseStudies: caseStudiesData,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
