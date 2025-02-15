import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  layout("./components/layouts/app-layout.tsx", [
    index("routes/(public)/index.tsx"),
    route("/profile", "./routes/(private)/profile/index.tsx"),
    ...prefix("jobs", [
      index("./routes/(public)/jobs/index.tsx")
    ]),
    ...prefix("auth", [
      route("/login", "./routes/(public)/auth/login/index.tsx"),
      route("/register", "./routes/(public)/auth/register/index.tsx")
    ])
  ])
] satisfies RouteConfig;
