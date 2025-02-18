import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  layout("./components/layouts/app-layout.tsx", [
    index("routes/(public)/index.tsx"),
    route("/profile", "./routes/(private)/profile/index.tsx"),
    route("/applications", "./routes/(private)/applications/index.tsx"),
    route("/job/:jobId", "./routes/(public)/job/index.tsx"),
    layout("./components/layouts/job-layout.tsx", [
      ...prefix("jobs", [
        route("/general", "./routes/(public)/jobs/general/index.tsx"),
        route("/recommended", "./routes/(public)/jobs/recommended/index.tsx"),
      ]),
    ]),
    ...prefix("auth", [
      route("/login", "./routes/(public)/auth/login/index.tsx"),
      route("/register", "./routes/(public)/auth/register/index.tsx")
    ])
  ])
] satisfies RouteConfig;
