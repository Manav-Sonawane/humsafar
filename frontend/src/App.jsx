import { useState } from "react";
import axios from "axios";

function App() {

  const [prompt, setPrompt] = useState("")
  const [trip, setTrip] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const generateTrip = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await axios.post("http://localhost:5000/api/trip", { prompt: prompt })
      setTrip(res.data)
    } catch (err) {
      console.error(err)
      setError("Failed to generate trip. Make sure the backend and Ollama are running.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>HumSafar</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Plan a trip to..."
        style={{ width: "400px", height: "100px" }}
      />

      <br />

      <button onClick={generateTrip} disabled={loading}>
        {loading ? "Generating..." : "Generate Trip"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {trip && (
        <div>
          <h2>{trip.trip_summary}</h2>
          {trip.days.map(day => (
            <div key={day.day}>
              <h3>Day {day.day} — {day.location}</h3>
              <ul>
                {day.activities.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
