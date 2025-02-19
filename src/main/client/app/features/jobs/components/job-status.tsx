import type { JobApplicationStatus } from "~/features/applications/types";

export const ApplicationStatus = ({ status }: { status: JobApplicationStatus }) => {
  const base = "badge badge-md";
  switch (status) {
    case "PENDING":
      return <p className={base}>pending</p>;
    case "ACCEPTED":
      return <p className={base + " badge-primary"}>accepted!</p>;
    case "REJECTED":
      return <p className={base + " badge-error"}>rejected</p>;
  }
};

