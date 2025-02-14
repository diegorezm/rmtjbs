import { Briefcase, Globe, Send, User, Rocket, Search, Users } from "lucide-react";
import type { Route } from "./+types/index";
import { NavLink } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Remote jobs" },
    { name: "description", content: "Find your jobs here!" },
  ];
}

export default function Index() {
  return (
    <div className="relative w-full  text-primary-content overflow-hidden flex flex-col justify-center items-center gap-32">
      <section className="flex flex-col items-center mt-20" >
        <div className="absolute inset-0 pointer-events-none">
          <FloatingIcon icon={Briefcase} className="top-10 left-10 text-primary" />
          <FloatingIcon icon={Globe} className="top-1/3 right-12 text-secondary" />
          <FloatingIcon icon={Send} className="bottom-16 left-1/4 text-accent" />
          <FloatingIcon icon={User} className="bottom-8 right-20 text-info" />
        </div>

        <h1 className="text-6xl font-extrabold leading-tight text-center">
          Your Future Starts with{" "}
          <span className="text-primary">Remote Jobs!</span>
        </h1>

        <p className="mt-4 text-xl text-secondary-content max-w-lg text-center">
          Discover exciting opportunities, connect with recruiters, and apply with ease.
        </p>

        <div className="mt-8 flex items-center justify-center gap-6">
          <NavLink to="/jobs" className="btn btn-primary btn-lg transition-transform duration-300 hover:scale-105">
            Get to work!
          </NavLink>
          <NavLink to="#know-more" className="btn btn-outline btn-lg transition-transform duration-300 hover:scale-105 2xl:hidden">
            Know more
          </NavLink>
        </div>
      </section >

      {/* Know More Section */}
      < section id="know-more" className="mt-16 w-full max-w-5xl px-6 text-center mb-6" >
        <h2 className="text-4xl font-bold text-primary-content mb-6">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={Search}
            title="Find Jobs Easily"
            description="Our advanced search helps you find the perfect job that fits your skills and preferences."
          />
          <InfoCard
            icon={Users}
            title="Connect with Recruiters"
            description="Engage with top recruiters and get noticed by companies worldwide."
          />
          <InfoCard
            icon={Rocket}
            title="Boost Your Career"
            description="Take your career to the next level with top remote opportunities."
          />
        </div>
      </section >
    </div >
  );
}

// Floating Icon Component with Animations
function FloatingIcon({ icon: Icon, className }: { icon: any; className?: string }) {
  return (
    <Icon className={`absolute w-12 h-12 opacity-30 floating ${className}`} />
  );
}

// Informational Card Component
function InfoCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
  return (
    <div className="card bg-base-200 shadow-xl p-6 transition-transform duration-300 hover:scale-105">
      <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="text-base-content mt-2">{description}</p>
    </div>
  );
}

