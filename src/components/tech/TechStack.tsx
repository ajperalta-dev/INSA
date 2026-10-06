import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Cpu, CheckCircle } from 'lucide-react';

export const TechStack: React.FC = () => {
  const { lang } = useLanguage();

  const coreStack = [
    { name: 'Databricks', role: 'Lakehouse & Spark', category: 'Data' },
    { name: 'Snowflake', role: 'Enterprise Cloud DWH', category: 'Data' },
    { name: 'Python & PyTorch', role: 'Deep Learning & ML', category: 'AI' },
    { name: 'LangChain & RAG', role: 'Agentes GenAI Corporativos', category: 'AI' },
    { name: 'Docker & Kubernetes', role: 'MLOps & Microservicios', category: 'Ops' },
    { name: 'Power BI & Tableau', role: 'Business Intelligence', category: 'BI' },
    { name: 'OPC UA & MQTT', role: 'Sensórica Industria 4.0', category: 'IoT' },
    { name: 'dbt & Airflow', role: 'Pipelines Automatizados', category: 'Data' },
    { name: 'AWS · Azure · GCP', role: 'Arquitectura Cloud', category: 'Cloud' },
    { name: 'MLflow & Triton', role: 'Telemetría de Modelos', category: 'Ops' },
  ];

  return (
    <section className="py-14 bg-[#050b18] border-y border-slate-800/80 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-glow opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Compact Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono font-semibold tracking-wider mb-2">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>{lang === 'es' ? 'ARQUITECTURA & STACK DE ÉLITE' : 'ENTERPRISE TECH STACK'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {lang === 'es' ? 'Tecnologías y Plataformas que Dominamos' : 'Battle-Tested Enterprise Technologies'}
            </h3>
          </div>
          
          <p className="text-xs sm:text-sm text-slate-400 max-w-md font-sans leading-relaxed">
            {lang === 'es' 
              ? 'Infraestructura moderna, escalable y sin deuda técnica para entornos corporativos e industriales.' 
              : 'Modern, cloud-native stack engineered for high availability and zero technical debt.'}
          </p>
        </div>

        {/* Compact Grid of Tech Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {coreStack.map((tech, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900 transition-all duration-200 group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                  {tech.name}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 group-hover:bg-cyan-400 transition-colors"></span>
              </div>
              <span className="text-[11px] font-mono text-slate-400 group-hover:text-slate-300 transition-colors">
                {tech.role}
              </span>
            </div>
          ))}
        </div>

        {/* Enterprise Governance Micro-badge */}
        <div className="mt-6 pt-4 border-t border-slate-900 flex flex-wrap items-center justify-center sm:justify-start gap-6 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
            {lang === 'es' ? 'Seguridad y Privacidad GDPR' : 'GDPR & SOC-2 Compliance'}
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
            {lang === 'es' ? 'Despliegues On-Premise y Cloud' : 'On-Premise & Cloud Hybrid'}
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
            {lang === 'es' ? 'Gobernanza y Linaje de Datos' : 'Data Lineage & Governance'}
          </span>
        </div>

      </div>
    </section>
  );
};
