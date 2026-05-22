'use client';

const OutlapLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-20 animate-in fade-in duration-700">
      <div className="relative w-24 h-24">
        {/* Outer spinning ring */}
        <div className="absolute inset-0 rounded-full border-2 border-white/5 border-t-f1-red animate-spin duration-700"></div>
        
        {/* Inner static brand text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-black text-f1-red uppercase italic tracking-tighter animate-pulse">
            Outlap
          </span>
        </div>

        {/* Pulse effect */}
        <div className="absolute inset-0 rounded-full bg-f1-red/10 animate-ping duration-1000 opacity-20"></div>
      </div>
      
      <div className="flex flex-col items-center gap-1">
        <span className="text-[8px] font-black text-silver/40 uppercase tracking-[0.4em]">Initializing</span>
        <div className="flex gap-1">
          <div className="w-1 h-1 bg-f1-red rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-1 h-1 bg-f1-red rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-1 h-1 bg-f1-red rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default OutlapLoader;
