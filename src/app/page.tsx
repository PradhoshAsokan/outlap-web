import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center p-8 bg-asphalt text-smoke-white relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-f1-red/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="z-10 max-w-5xl w-full flex flex-col gap-12 text-center items-center">
        <div className="space-y-4">
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-f1-red uppercase italic animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Outlap
          </h1>
          <div className="flex items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
             <div className="h-[1px] w-12 bg-white/10"></div>
             <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.6em] text-silver/40 italic">
               Mechanical Depth Engine
             </p>
             <div className="h-[1px] w-12 bg-white/10"></div>
          </div>
        </div>
        
        <div className="max-w-2xl w-full p-8 border border-white/5 bg-carbon/40 rounded-2xl backdrop-blur-md shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          <p className="text-lg md:text-xl mb-12 text-smoke-white/80 font-mono tracking-tight leading-relaxed">
            High-performance telemetry and Formula 1 insights dashboard for the next generation of race engineering.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <HomeCard 
              href="/pit-wall" 
              title="Pit Wall" 
              desc="Real-time race dashboard" 
            />
            <HomeCard 
              href="/paddock" 
              title="Paddock" 
              desc="Aggregated F1 insights" 
            />
            <HomeCard 
              href="/calendar" 
              title="Calendar" 
              desc="Next session countdown" 
            />
            <HomeCard 
              href="/standings" 
              title="Standings" 
              desc="Season hall of fame" 
            />
          </div>
        </div>

        <div className="text-[10px] text-silver/20 uppercase tracking-[0.5em] mt-8 font-black animate-in fade-in duration-1000 delay-1000">
          Advanced Telemetry Data via OpenF1 & Jolpica
        </div>
      </div>
    </main>
  );
}

function HomeCard({ href, title, desc }: { href: string, title: string, desc: string }) {
  return (
    <Link href={href} className="group relative p-6 border border-white/5 bg-asphalt/40 hover:border-f1-red/50 hover:bg-steel/30 transition-all rounded-xl overflow-hidden flex flex-col items-start text-left">
      <div className="absolute top-0 left-0 w-1 h-full bg-f1-red scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300"></div>
      <span className="block text-f1-red font-black uppercase italic tracking-widest mb-1 group-hover:translate-x-1 transition-transform">{title}</span>
      <span className="text-[10px] font-mono text-silver/40 group-hover:text-smoke-white group-hover:translate-x-1 transition-all uppercase tracking-tighter">
        {desc}
      </span>
    </Link>
  );
}
