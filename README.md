# ALPHA Digital Transformation — Web Application

Aplicación web moderna de alta gama para **ALPHA Digital Transformation**, consultora especializada en Ingeniería de Datos, Inteligencia Artificial, MLOps, Business Intelligence e Industria 4.0.

Inspirada en el estilo de páginas de consultoría avanzada (McKinsey QuantumBlack, Palantir, Merovingian Data), con paleta oscura profunda (`#030712`, `#070d1e`), acentos vibrantes cian/azul eléctrico, canvas interactivo y componentes modulares.

---

## 🚀 Tecnologías Principales
- **React 19 + TypeScript**: Arquitectura modular con componentes funcionales y tipado estricto.
- **Tailwind CSS**: Estilos utilitarios, gradientes corporativos, glassmorphism (`backdrop-blur`) y micro-animaciones.
- **Lucide React**: Iconografía técnica de alta precisión.
- **HTML5 Canvas**: Red neuronal interactiva de fondo reactiva al cursor del ratón (`NeuralBackground`).
- **Canvas Confetti**: Celebración visual al agendar citas con éxito.
- **Context API i18n**: Sistema bilingüe instantáneo (Español / Inglés).

---

## 📁 Estructura del Proyecto

```text
ALPHA/
├── public/
├── src/
│   ├── assets/
│   ├── types/
│   │   └── index.ts                 # Definiciones TypeScript completas
│   ├── context/
│   │   └── LanguageContext.tsx      # Diccionario ES/EN, servicios (niveles 1 a 6), equipo y casos
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.tsx           # Header fijo con glassmorphism, selector ES/EN y CTA
│   │   │   └── Footer.tsx           # Pie corporativo con enlaces, SLA y copyright
│   │   ├── hero/
│   │   │   ├── Hero.tsx             # Portada de alto impacto con KPI ticker y terminal de telemetría en vivo
│   │   │   └── NeuralBackground.tsx # Canvas interactivo con nodos y sinapsis de datos
│   │   ├── services/
│   │   │   └── ServicesSection.tsx  # Portafolio estructurado de básico a avanzado (1 a 6) con modal deep-dive
│   │   ├── about/
│   │   │   └── AboutTeam.tsx        # Perfiles de Ingeniería Industrial y Data Scientists (Máster en IA)
│   │   ├── methodology/
│   │   │   └── MethodologySection.tsx # Framework ágil en 4 fases (Auditoría, PoC, Producción, MLOps)
│   │   ├── calculator/
│   │   │   └── RoiCalculator.tsx    # Simulador interactivo de ahorro y ROI operativo por sector
│   │   ├── tech/
│   │   │   └── TechStack.tsx        # Ecosistema tecnológico (Lakehouse, ML, GenAI, BI, IoT)
│   │   ├── caseStudies/
│   │   │   └── CaseStudiesSection.tsx # Casos reales en Automoción, Energía y Cadena de Suministro
│   │   ├── booking/
│   │   │   └── BookingModal.tsx     # Formulario interactivo por pasos para agendar consultoría
│   │   ├── contact/
│   │   │   └── ContactSection.tsx   # Formulario interactivo, email y teléfono oficial
│   │   ├── chat/
│   │   │   └── ChatbotWidget.tsx    # Asistente virtual ALPHA AI bilingüe con respuestas inteligentes
│   │   └── whatsapp/
│   │       └── WhatsAppWidget.tsx   # Botón flotante directo al chat de WhatsApp corporativo
│   ├── App.tsx                      # Orquestador principal de la aplicación
│   ├── main.tsx                     # Punto de entrada React
│   └── index.css                    # Directivas Tailwind, scrollbar moderno y utilidades de brillo
├── index.html                       # Fuentes Google, metadata y favicon SVG
├── tailwind.config.js               # Configuración de paleta de colores y animación
└── package.json
```

---

## 🛠️ Servicios Estructurados de Básico a Avanzado (Niveles 1 al 6)
Inspirados en la estructura de madurez analítica de firmas de referencia:
1. **Nivel 1 (Fundamental)**: *Data Analytics & Business Intelligence Moderno* (Power BI, Tableau, SQL dimensional, KPIs corporativos).
2. **Nivel 2 (Arquitectura)**: *Data Engineering & Gobernanza de Lakehouses* (Pipelines ETL/ELT, Snowflake, Databricks, Apache Spark, Linaje).
3. **Nivel 3 (Analítica Avanzada)**: *Machine Learning & Modelos Predictivos* (Forecasting multivariable, Churn, Scoring, Computer Vision).
4. **Nivel 4 (IA Generativa)**: *IA Generativa & Agentes Autónomos Empresariales* (Sistemas RAG privados, LangChain, embeddings locales, seguridad GDPR).
5. **Nivel 5 (Producción)**: *MLOps & Arquitectura de Escalado en Producción* (CI/CD para ML, Docker/Kubernetes, monitorización de drift, latencia mínima).
6. **Nivel 6 (Industria 4.0)**: *Industria 4.0 & Transformación Digital de Planta* (Mantenimiento predictivo con IoT/sensores, gemelos digitales, convergencia IT/OT, SCADA/MES).

---

## 💼 Perfiles de Equipo Destacados
- **Ingeniería Industrial**: Enfoque en eficiencia operativa, reducción de cuellos de botella (TOC), Lean Operations, OEE y maximización de margen.
- **Senior Data Scientists & MLOps**: Con Máster Universitario en Big Data, Data Science e Inteligencia Artificial y certificaciones internacionales.
- **Trayectoria Multinacional**: Experiencia directa en sectores críticos (Automoción Tier-1, Energía/Renovables, Banca & Fintech, Gran Distribución).

---

## 📞 Datos de Contacto Corporativos
- **Email**: `alpha.digital.ia@gmail.com`
- **Teléfono / WhatsApp**: `+34 641 012 046`
- **Cobertura**: Madrid, España · Proyectos Internacionales (Remoto & On-site)

---

## 💻 Comandos de Ejecución

Para iniciar el servidor de desarrollo local:
```bash
npm run dev
```

Para compilar para producción:
```bash
npm run build
```

Para previsualizar la compilación de producción:
```bash
npm run preview
```
