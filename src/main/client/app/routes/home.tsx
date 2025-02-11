import { Briefcase, Globe, Send, User } from "lucide-react";
import type { Route } from "./+types/home";
import { NavLink } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Remote jobs" },
    { name: "description", content: "Find your jobs here!" },
  ];
}

export default function Home() {
  return (
    <main className="relative w-full h-screen flex flex-col justify-center items-center text-primary-content overflow-hidden">
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
        <NavLink to="/" className="btn btn-primary btn-lg transition-transform duration-300 hover:scale-105">
          Get to work!
        </NavLink>
        <NavLink to="/" className="btn btn-outline btn-lg transition-transform duration-300 hover:scale-105">
          Know more
        </NavLink>
      </div>
    </main>
  );
}

// Floating Icon Component with Animations
function FloatingIcon({ icon: Icon, className }: { icon: any; className?: string }) {
  return (
    <Icon
      className={`absolute w-12 h-12 opacity-30 floating ${className}`}
    />
  );
}

