import { Link } from "react-router-dom";
import { 
  ClipboardClock, Boxes, Cog, Wrench, Package, Database, 
  Calendar, BarChart3, Workflow, TrendingUp, Shield, Zap,
  Smartphone, Layers, Cpu, CheckCircle2
} from "lucide-react";

function Features() {
  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <section className="min-h-screen bg-linear-to-br from-gray-100 to-blue-200 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">Comprehensive Manufacturing Features</h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8">Every tool you need to manage production from order to final delivery with complete visibility and control</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/demo" className="inline-block px-6 md:px-8 py-3 md:py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
                Explore Demo
              </Link>
              <Link to="/contact" className="inline-block px-6 md:px-8 py-3 md:py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition duration-300">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Production Workflow Nodes */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4">Production Workflow Nodes</h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">Build complete manufacturing processes using our visual workflow nodes, each designed for specific production stages</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: ClipboardClock,
                title: "Production Orders",
                desc: "Create and track customer orders with status management, delivery dates, and order fulfillment tracking"
              },
              {
                icon: Boxes,
                title: "Parts Management",
                desc: "Define Bill of Materials, manage SKUs, track part quantities, and calculate unit costs for inventory"
              },
              {
                icon: Cog,
                title: "Processing",
                desc: "Configure multi-stage manufacturing with machine allocation, labor costs, and processing time estimation"
              },
              {
                icon: Wrench,
                title: "Assembly",
                desc: "Combine parts and intermediate products with efficiency metrics and assembly cost tracking"
              },
              {
                icon: Package,
                title: "Final Product",
                desc: "Quality control, batch numbering, packaging configuration, and dispatch location management"
              },
              {
                icon: Database,
                title: "Inventory Management",
                desc: "Real-time stock tracking, reservation management, and supply chain fulfillment predictions"
              }
            ].map((node, i) => {
              const Icon = node.icon;
              return (
                <div key={i} className="bg-slate-50 p-6 md:p-8 rounded-lg shadow-md border border-slate-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{node.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{node.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advanced Capabilities */}
      <section className="py-12 md:py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">Advanced Capabilities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Calendar,
                title: "Gantt Scheduling",
                desc: "Visual timeline planning with drag-and-drop task management and resource allocation optimization"
              },
              {
                icon: BarChart3,
                title: "Cost Analysis",
                desc: "Track material, labor, and equipment costs in real-time with profitability insights and reporting"
              },
              {
                icon: TrendingUp,
                title: "Real-Time Tracking",
                desc: "Live production status monitoring with bottleneck identification and performance metrics"
              },
              {
                icon: Shield,
                title: "Role-Based Access",
                desc: "Secure team collaboration with configurable permission levels and user role management"
              },
              {
                icon: Workflow,
                title: "Workflow Customization",
                desc: "Visual drag-and-drop builder to create custom manufacturing processes without coding"
              },
              {
                icon: Layers,
                title: "Performance Analytics",
                desc: "Production metrics, throughput analysis, and comprehensive reporting for continuous improvement"
              }
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-slate-200 hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg group-hover:bg-blue-600 transition-colors duration-300 mb-4">
                    <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">Technical Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: Smartphone,
                title: "Visual Editor",
                desc: "Intuitive canvas with drag-and-drop node management and real-time workflow updates"
              },
              {
                icon: Zap,
                title: "Auto-Layout",
                desc: "Intelligent arrangement of complex workflow diagrams for better visualization"
              },
              {
                icon: Cpu,
                title: "Customizable Themes",
                desc: "Multiple background themes and color customization for personalized workspace"
              },
              {
                icon: CheckCircle2,
                title: "Data Export",
                desc: "Generate reports, analytics insights, and export production data in multiple formats"
              }
            ].map((tech, i) => {
              const Icon = tech.icon;
              return (
                <div key={i} className="bg-slate-50 p-6 md:p-8 rounded-lg shadow-md border border-slate-200">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{tech.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{tech.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Case Examples */}
      <section className="py-12 md:py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">Industries We Support</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                title: "Electronics Manufacturing",
                items: ["Complex multi-part assembly", "High precision requirements", "Supply chain coordination"]
              },
              {
                title: "Automotive Production",
                items: ["Multi-stage processing", "Precision tracking", "Quality control integration"]
              },
              {
                title: "Consumer Goods",
                items: ["High-volume production", "Cost optimization", "Quick fulfillment"]
              },
              {
                title: "Batch Manufacturing",
                items: ["Discrete order management", "Inventory optimization", "Batch tracking"]
              }
            ].map((useCase, i) => (
              <div key={i} className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-slate-200 hover:shadow-lg transition-all duration-300">
                <h3 className="text-lg font-bold text-blue-600 mb-4">{useCase.title}</h3>
                <ul className="space-y-2">
                  {useCase.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-700 text-sm">
                      <span className="text-blue-600 font-bold mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">Why Choose Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="text-4xl font-bold text-blue-600">24/7</div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Real-Time Monitoring</h3>
              <p className="text-slate-600">Monitor your manufacturing operations continuously with live updates and instant alerts</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="text-4xl font-bold text-blue-600">100%</div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Visibility</h3>
              <p className="text-slate-600">Complete transparency across all production stages from raw materials to final products</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="text-4xl font-bold text-blue-600">∞</div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Scalable</h3>
              <p className="text-slate-600">Grows with your business from small operations to large-scale manufacturing facilities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 md:py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Manufacturing?</h2>
          <p className="text-lg md:text-xl mb-8 text-blue-100">Start optimizing your production operations with our comprehensive feature set today</p>
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

export default Features;
