import { Link } from "react-router-dom";
import { Zap, Shield, Users, TrendingUp, Workflow, BarChart3 } from "lucide-react";

function About() {
  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="min-h-screen bg-linear-to-br from-gray-100 to-blue-200 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">About MES Platform</h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8">Empowering manufacturers with intelligent execution systems for optimal production management</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/demo" className="inline-block px-6 md:px-8 py-3 md:py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
                Explore Demo
              </Link>
              <Link to="/contact" className="inline-block px-6 md:px-8 py-3 md:py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition duration-300">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-12 md:py-16 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-slate-200">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-3">Our Mission</h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              To transform manufacturing operations through intelligent execution systems that optimize production scheduling, reduce operational costs, and empower teams with real-time insights into their manufacturing processes.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-slate-200">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-3">Our Vision</h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              To be the leading Manufacturing Execution System platform trusted by companies worldwide for delivering efficient, scalable, and user-friendly production management solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">Why Choose MES</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Workflow,
                title: "Visual Workflow Builder",
                desc: "Intuitive drag-and-drop interface to design custom manufacturing workflows without coding"
              },
              {
                icon: TrendingUp,
                title: "Real-Time Analytics",
                desc: "Live production tracking with instant visibility into manufacturing operations and bottlenecks"
              },
              {
                icon: BarChart3,
                title: "Cost Optimization",
                desc: "Detailed cost analysis including material, labor, and machine costs for better decision making"
              },
              {
                icon: Zap,
                title: "Fast Implementation",
                desc: "Quick deployment and setup with minimal disruption to existing manufacturing operations"
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                desc: "Role-based access control and data protection ensuring secure team collaboration"
              },
              {
                icon: Users,
                title: "Dedicated Support",
                desc: "Expert support team ready to assist with implementation, training, and ongoing optimization"
              }
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="p-6 rounded-lg border border-slate-200 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg group-hover:bg-blue-600 transition-colors duration-300 mb-4">
                    <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-12 md:py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">Our Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                title: "Production Order Management",
                items: ["Order creation and tracking", "Timeline management", "Quantity forecasting"]
              },
              {
                title: "Inventory Management",
                items: ["Real-time stock tracking", "Unit conversion automation", "Inventory sufficiency alerts"]
              },
              {
                title: "Gantt Scheduling",
                items: ["Visual timeline planning", "Resource allocation", "Schedule optimization"]
              },
              {
                title: "Cost Analysis",
                items: ["Material cost tracking", "Labor cost calculation", "Machine cost monitoring"]
              },
              {
                title: "Workflow Integration",
                items: ["Custom workflow design", "Multi-stage processing", "Assembly management"]
              },
              {
                title: "Team Collaboration",
                items: ["User role management", "Access control", "Real-time updates"]
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-slate-200">
                <h3 className="text-xl font-bold text-blue-600 mb-4">{feature.title}</h3>
                <ul className="space-y-2">
                  {feature.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-700 text-sm">
                      <span className="text-blue-600 font-bold mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { value: "Innovation", desc: "Continuous improvement and adoption of cutting-edge technology" },
              { value: "Reliability", desc: "Dependable, enterprise-grade platform for critical operations" },
              { value: "Simplicity", desc: "Making complex manufacturing operations easy to manage" },
              { value: "Excellence", desc: "Commitment to highest quality in features and support" },
              { value: "Partnership", desc: "Growing together with our customers and partners" }
            ].map((item, i) => (
              <div key={i} className="text-center p-4 md:p-6">
                <h3 className="text-lg font-bold text-blue-600 mb-2">{item.value}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-12 md:py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">Industries We Serve</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              "Electronics & Computing",
              "Automotive Manufacturing",
              "Consumer Goods Production",
              "Pharmaceutical Manufacturing",
              "Food & Beverage",
              "Textiles & Apparel",
              "Heavy Equipment",
              "Industrial Components"
            ].map((industry, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md border border-blue-200 text-center hover:shadow-lg transition-all duration-300">
                <p className="font-semibold text-slate-900 text-sm md:text-base">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">Our Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <h3 className="text-xl font-bold text-blue-600 mb-3">Frontend</h3>
              <p className="text-slate-600 text-sm md:text-base">React 19 + Vite with TailwindCSS for modern, responsive user interface</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-bold text-blue-600 mb-3">Backend</h3>
              <p className="text-slate-600 text-sm md:text-base">Node.js + Express for scalable, high-performance API services</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-bold text-blue-600 mb-3">Database</h3>
              <p className="text-slate-600 text-sm md:text-base">MongoDB for flexible, document-based data management</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Manufacturing?</h2>
          <p className="text-lg md:text-xl mb-8 text-blue-100">Join companies worldwide using MES to optimize their production operations</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/demo" className="px-6 md:px-8 py-3 md:py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition duration-300">
              View Demo
            </Link>
            <Link to="/contact" className="px-6 md:px-8 py-3 md:py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
