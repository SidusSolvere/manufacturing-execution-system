import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Manufacturing Execution System</h1>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 md:mb-8">Optimize production scheduling and real-time operations</p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Link to="/features" className="bg-white text-blue-600 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-sm md:text-base hover:bg-gray-100 transition">Explore Features</Link>
            <Link to="/login" className="bg-blue-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base hover:bg-blue-800 transition">Get Started</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {['Real-Time Tracking', 'Gantt Scheduling', 'Workflow Builder', 'User Management'].map((feature, i) => (
              <div key={i} className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="font-bold text-base md:text-lg mb-2">{feature}</h3>
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