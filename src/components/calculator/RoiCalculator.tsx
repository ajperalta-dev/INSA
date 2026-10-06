import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Calculator, 
  TrendingUp, 
  ArrowRight, 
  Sparkles
} from 'lucide-react';

interface RoiCalculatorProps {
  onOpenBookingWithDetails: (details: string) => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenBookingWithDetails }) => {
  const { t, lang } = useLanguage();

  const [sector, setSector] = useState<'industry' | 'logistics' | 'retail' | 'finance'>('industry');
  const [operationalCost, setOperationalCost] = useState<number>(1200000); // 1.2M default
  const [solutionType, setSolutionType] = useState<'pred_maint' | 'demand' | 'genai' | 'bi'>('pred_maint');

  // Calculation parameters based on real industrial benchmarks
  const sectorMultipliers = {
    industry: { savingsRate: 0.18, efficiencyBoost: 34, paybackMonths: 4.2 },
    logistics: { savingsRate: 0.15, efficiencyBoost: 29, paybackMonths: 5.1 },
    retail: { savingsRate: 0.13, efficiencyBoost: 26, paybackMonths: 5.8 },
    finance: { savingsRate: 0.21, efficiencyBoost: 38, paybackMonths: 3.8 },
  };

  const solutionMultipliers = {
    pred_maint: { factor: 1.2, label: t('calc.sol.pred_maint') },
    demand: { factor: 1.05, label: t('calc.sol.demand') },
    genai: { factor: 1.15, label: t('calc.sol.genai') },
    bi: { factor: 0.9, label: t('calc.sol.bi') },
  };

  const currentSectorData = sectorMultipliers[sector];
  const currentSolData = solutionMultipliers[solutionType];

  const estimatedSavings = Math.round(operationalCost * currentSectorData.savingsRate * currentSolData.factor);
  const efficiencyGain = Math.round(currentSectorData.efficiencyBoost * (currentSolData.factor > 1 ? 1.1 : 0.95));
  const paybackTime = (currentSectorData.paybackMonths / currentSolData.factor).toFixed(1);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(lang === 'es' ? 'es-ES' : 'en-US', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleBookWithSimulation = () => {
    const contextNote = `Simulación ROI: Sector ${sector.toUpperCase()} · Coste Operativo: ${formatCurrency(operationalCost)} · Solución: ${currentSolData.label} · Ahorro estimado: ${formatCurrency(estimatedSavings)}/año`;
    onOpenBookingWithDetails(contextNote);
  };

  return (
    <section id="calculator" className="py-24 relative bg-[#030712] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t('calc.header.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5">
            {t('calc.header.title')}
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {t('calc.header.desc')}
          </p>
        </div>

        {/* Calculator Interactive Container */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-b from-[#0c1630] to-[#070d1e] border border-cyan-500/30 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Input Controls (Left Column) */}
            <div className="lg:col-span-7 space-y-7">
              
              {/* Sector Selector */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-3">
                  {t('calc.sector.label')}
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: 'industry', label: t('calc.sector.industry') },
                    { id: 'logistics', label: t('calc.sector.logistics') },
                    { id: 'retail', label: t('calc.sector.retail') },
                    { id: 'finance', label: t('calc.sector.finance') },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSector(s.id as any)}
                      className={`p-3 rounded-xl text-xs font-semibold text-left transition-all border ${
                        sector === s.id
                          ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300 shadow-sm shadow-cyan-500/20'
                          : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Annual Operational Cost Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono uppercase text-slate-300 font-bold">
                    {t('calc.cost.label')}
                  </label>
                  <span className="text-base sm:text-lg font-mono font-bold text-cyan-400">
                    {formatCurrency(operationalCost)}
                  </span>
                </div>
                <input
                  type="range"
                  min="200000"
                  max="5000000"
                  step="50000"
                  value={operationalCost}
                  onChange={(e) => setOperationalCost(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                  <span>€200.000</span>
                  <span>€2.500.000</span>
                  <span>€5.000.000+</span>
                </div>
              </div>

              {/* Priority Solution Area */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 font-bold mb-3">
                  {t('calc.solution.label')}
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'pred_maint', label: t('calc.sol.pred_maint') },
                    { id: 'demand', label: t('calc.sol.demand') },
                    { id: 'genai', label: t('calc.sol.genai') },
                    { id: 'bi', label: t('calc.sol.bi') },
                  ].map((sol) => (
                    <button
                      key={sol.id}
                      onClick={() => setSolutionType(sol.id as any)}
                      className={`w-full p-3 rounded-xl text-xs font-medium text-left flex items-center justify-between border transition-all ${
                        solutionType === sol.id
                          ? 'bg-blue-600/20 border-cyan-400 text-white shadow-sm'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span>{sol.label}</span>
                      {solutionType === sol.id && (
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Simulated Impact Results (Right Column) */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-[#091124] border border-cyan-500/40 p-6 sm:p-7 shadow-2xl relative overflow-hidden">
                
                <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-4 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  {lang === 'es' ? 'PROYECCIÓN ANUAL ESTIMADA' : 'ESTIMATED ANNUAL PROJECTION'}
                </div>

                {/* Savings Metric */}
                <div className="mb-6 p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-xs text-slate-400 font-medium mb-1">
                    {t('calc.result.savings')}
                  </div>
                  <div className="text-3xl sm:text-4xl font-black font-mono bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
                    {formatCurrency(estimatedSavings)}
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1 font-mono flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {lang === 'es' ? 'Impacto directo en EBITDA' : 'Direct EBITDA impact'}
                  </div>
                </div>

                {/* Secondary Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-medium mb-1">
                      {t('calc.result.efficiency')}
                    </div>
                    <div className="text-2xl font-black text-cyan-300 font-mono">
                      +{efficiencyGain}%
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[11px] text-slate-400 font-medium mb-1">
                      {t('calc.result.payback')}
                    </div>
                    <div className="text-2xl font-black text-blue-400 font-mono">
                      {paybackTime} {lang === 'es' ? 'meses' : 'months'}
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <p className="text-[11px] text-slate-400 italic mb-6 leading-normal">
                  {t('calc.result.note')}
                </p>

                {/* CTA Button */}
                <button
                  onClick={handleBookWithSimulation}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all text-xs sm:text-sm shadow-lg shadow-cyan-500/25 active:scale-95"
                >
                  <span>{t('calc.cta')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
