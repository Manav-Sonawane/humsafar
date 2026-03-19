import React, { useState } from "react";
import axios from "axios";
import TripInput from "./components/TripInput";
import TripDisplay from "./components/TripDisplay";
import "./index.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateTrip = async () => {
    if (!prompt.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      setTrip(null); // Clear previous result
      
      const res = await axios.post("http://localhost:5000/api/trip", { prompt });
      setTrip(res.data);
    } catch (err) {
      console.error("API call error:", err);
      setError(
        err.response?.data?.error || 
        "Failed to generate trip. Please ensure your backend and Ollama are running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background Decorative Gradients */}
      <div className="fixed inset-0 pointer-events-none opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-indigo-500 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-purple-500 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-12 flex flex-col items-center">
        {/* Header Section */}
        <header className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-block p-1 mb-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/20">
            <div className="px-3 py-1 bg-slate-900 rounded-[10px] text-xs font-bold font-mono tracking-widest text-indigo-400 uppercase">
              AI Powered
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-br from-white via-slate-100 to-slate-400 bg-clip-text text-transparent tracking-tight mb-4 drop-shadow-2xl">
            HumSafar
            <span className="text-indigo-500">.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-lg mx-auto leading-relaxed italic opacity-80">
            "Your companion for Every journey"
          </p>
        </header>

        {/* Action Section */}
        <main className="w-full space-y-12 mb-20">
          <TripInput 
            prompt={prompt}
            setPrompt={setPrompt}
            onGenerate={generateTrip}
            loading={loading}
          />

          {error && (
            <div className="w-full max-w-2xl mx-auto p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm animate-in zoom-in-95 duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <TripDisplay trip={trip} />
        </main>
        
        {/* Footer */}
        <footer className="mt-auto pt-10 text-slate-500 text-sm font-medium border-t border-slate-900 w-full text-center">
          &copy; {new Date().getFullYear()} HumSafar AI | Your Perfect Travel Buddy
        </footer>
      </div>
    </div>
  );
}

export default App;
