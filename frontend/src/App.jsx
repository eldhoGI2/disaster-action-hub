import { useEffect, useState } from "react";

function App() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/locations")
      .then((res) => res.json())
      .then((data) => setLocations(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Disaster Action Hub</h1>
      <ul>
        {locations.map((loc) => (
          <li key={loc.id}>
            {loc.name} - ({loc.latitude}, {loc.longitude})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;