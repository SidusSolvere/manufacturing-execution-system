
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Manufacturing Execution System</h1>
          <p className="text-xl text-blue-100 mb-8">Optimize production scheduling and real-time operations</p>
          <div className="flex gap-4 justify-center">
            <Link to="/features" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold">Explore Features</Link>
            <Link to="/login" className="bg-blue-700 text-white px-6 py-3 rounded-lg">Get Started</Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {['Real-Time Tracking', 'Gantt Scheduling', 'Workflow Builder', 'User Management'].map((feature, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-bold mb-2">{feature}</h3>
                <p className="text-slate-600 text-sm">Monitor production and manage workflows efficiently. </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
export default Home

