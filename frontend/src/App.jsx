import { useEffect, useState } from 'react';
import Tilt from 'react-parallax-tilt'; // Add tilt effect

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/status.json')
      .then(res => res.json())
      .then(setData)
      .catch(() => setData({ error: 'Unable to load status' }));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-extrabold text-blue-800 mb-6 animate-fade-in">
        🚀 Cluster Status Dashboard
      </h1>

      {!data ? (
        <p className="text-center text-blue-600 animate-pulse">Loading...</p>
      ) : data.error ? (
        <p className="text-center text-red-600">{data.error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl w-full animate-fade-in-up">
          <AnimatedCard title="🌐 NKP Link" value={data.nkp_ip} />
          <AnimatedCard title="🛡️ Kasten Link" value={data.kasten_ip} />
          <AnimatedCard title="📡 NKP Status" value={data.nkp_status} status />
          <AnimatedCard title="📊 Kubernetes Uptime" value={data.k8s_uptime} />
          <AnimatedCard title="📊 Load Balancer" value={data.k8s_uptime} />
          <AnimatedCard title="📊 Kubernetes Uptime" value={data.k8s_uptime} />
        </div>
      )}
    </div>
  );
}

function AnimatedCard({ title, value, status = false }) {
  const color = status
    ? value === 'Operational'
      ? 'text-green-600'
      : 'text-red-600'
    : 'text-gray-800';

  return (
    <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} glareEnable={true} glareMaxOpacity={0.1}>
      <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 text-center transition-transform transform hover:scale-105 duration-300 border border-blue-100">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">{title}</h2>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
      </div>
    </Tilt>
  );
}

export default App;
