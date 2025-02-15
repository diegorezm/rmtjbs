import { Search } from "lucide-react";
import type { Route } from "./+types/index";
import { JobCard } from "~/features/jobs/components/job-card";
import type { JobPosting } from "~/features/jobs/types";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Remote jobs" },
    { name: "description", content: "Find your jobs here!" },
  ];
}


const mockJobs: JobPosting[] = [
  {
    id: "1",
    title: "Frontend Developer",
    description: "Looking for a React expert to build modern web applications.",
    salary: 75000,
    skills: ["React", "TypeScript", "Tailwind"],
    company: {
      id: "c1",
      location: ""
    },
    createdAt: "",
    expiresAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    title: "Backend Engineer",
    description: "Join our team to work on scalable APIs using Node.js and Go.",
    skills: ["Node.js", "Go", "PostgreSQL"],
    company: {
      id: "c1",
      location: ""
    },
    updatedAt: "",
    createdAt: "",
    expiresAt: ""
  },
];

export default function JobsPage() {
  return (
    <div className="w-full h-full space-y-4">
      {/* Search Bar */}
      <div className="join w-full mx-auto justify-center">
        <div className="w-full md:w-2/3">
          <label className="input input-neutral w-full input-lg validator join-item">
            <input type="email" placeholder="Title,Key words" required />
          </label>
        </div>
        <button className="btn btn-primary btn-lg join-item">
          <Search className="size-4" />
        </button>
      </div>

      <div className="max-w-4xl mx-auto grid gap-6">
        {mockJobs.map((job) => (
          <JobCard job={job} key={job.id} />
        ))}
      </div>
    </div>
  );
}

