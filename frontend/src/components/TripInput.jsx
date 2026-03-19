import React from 'react';

const TripInput = ({ prompt, setPrompt, onGenerate, loading }) => {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 mb-12">
      <div className="relative group">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Plan a 5 day trip to Himachal..."
          className="w-full h-32 p-4 bg-slate-900 border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none text-slate-100 placeholder:text-slate-500"
        />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity" />
      </div>
      
      <button
        onClick={onGenerate}
        disabled={loading || !prompt.trim()}
        className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg active:scale-95 ${
          loading 
            ? 'bg-slate-800 cursor-not-allowed text-slate-500' 
            : 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 shadow-indigo-500/20'
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
            Generating Your Trip...
          </div>
        ) : (
          'Generate Trip'
        )}
      </button>
    </div>
  );
};

export default TripInput;
