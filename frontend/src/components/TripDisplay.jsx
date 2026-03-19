import React from 'react';

const TripDisplay = ({ trip }) => {
  if (!trip) return null;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Trip Summary Section */}
      <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl backdrop-blur-sm">
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-200 to-slate-200 bg-clip-text text-transparent mb-4">
          {trip.trip_summary}
        </h2>
        <div className="h-1 w-20 bg-indigo-500 rounded-full" />
      </div>

      {/* Days Cards Container */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {trip.days?.map((day) => (
          <div 
            key={day.day} 
            className="group p-6 bg-slate-900/40 border border-slate-800 rounded-2xl hover:bg-slate-800/50 hover:border-slate-700 transition-all shadow-xl hover:shadow-indigo-500/10"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 font-bold border border-indigo-500/30">
                {day?.day}
              </span>
              <h3 className="text-xl font-bold text-slate-100 group-hover:text-white transition-colors">
                Day {day?.day} — {day?.title || day?.location}
              </h3>
            </div>
            
            <ul className="space-y-4">
              {day.activities?.map((activity, index) => (
                <li 
                  key={index} 
                  className="p-3 bg-slate-800/20 border border-slate-700/30 rounded-xl hover:bg-slate-800/40 transition-colors group/item"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase tracking-tighter font-bold text-indigo-400/80 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">
                      {activity?.time}
                    </span>
                    <h4 className="text-sm font-bold text-slate-200 group-hover/item:text-white transition-colors">
                      {activity?.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pl-1 border-l border-slate-700 ml-1">
                    {activity?.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripDisplay;
