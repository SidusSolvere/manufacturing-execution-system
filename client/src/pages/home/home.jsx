import { Link } from "react-router-dom";
import {
  ArrowRight,
  Zap,
  Layout,
  Users,
  TrendingUp,
  BarChart3,
  Package,
  Layers,
} from "lucide-react";
import BlurText from "../../components/BlurText";
import bgImage from "./image.jpg";


function Home() {
  return (
    <div >
      {/* Hero Section */}
      <section
  className=" bg-cover bg-center text-white pt-24 md:py-32 relative overflow-hidden "
  style={{ backgroundImage: `url(${bgImage})` }}
>
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
    <div className="absolute -bottom-8 left-10 w-72 h-72 bg-blue-300 rounded-full blur-3xl"></div>
  </div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          
<BlurText
  text="The most intuitive MES — from small shops to smart factories"
  delay={50}
  animateBy="words"
  direction="bottom"
  className="text-4xl sm:text-2xl md:text-6xl font-bold mb-4 leading-tight text-center"
/>
          
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            
             
            <Link
              to="/login"
              className="bg-blue-800 hover:bg-blue-900 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 border border-blue-500"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to streamline your manufacturing operations
            </p>
          </div>
          {/* Core Manufacturing Features - Expanded to 8 capabilities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Real-Time Tracking",
                desc: "Monitor production progress with instant status updates and live visibility",
              },
              {
                icon: Layout,
                title: "Gantt Scheduling",
                desc: "Visualize timelines and optimize resource allocation across operations",
              },
              {
                icon: Zap,
                title: "Workflow Builder",
                desc: "Design custom manufacturing processes visually without coding knowledge",
              },
              {
                icon: Users,
                title: "User Management",
                desc: "Control access and manage team permissions with role-based security",
              },
              {
                icon: BarChart3,
                title: "Cost Optimization",
                desc: "Analyze material, labor, and equipment expenses for better decisions",
              },
              {
                icon: Package,
                title: "Inventory Management",
                desc: "Track stock levels in real-time and predict supply chain shortages",
              },
              {
                icon: Layers,
                title: "Production Orders",
                desc: "Create, manage, and track orders from initial request to fulfillment",
              },
              {
                icon: Zap,
                title: "Multi-Stage Processing",
                desc: "Handle assembly and product finalization with advanced workflow control",
              },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-blue-300 group"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg group-hover:bg-blue-600 transition-colors duration-300 mb-4">
                    <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-bold text-lg md:text-xl text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
export default Home;
