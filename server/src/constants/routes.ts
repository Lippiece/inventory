import jetPaths from "jet-paths"

const template = {
  all     : "/all",
  delete  : "/delete",
  id      : "/:id",
  idAdd   : "/add",
  idDelete: "/:id/delete",
  idUpdate: "/:id/update",
}
const paths    = {
  Base: "/api",

  health: "/health",

  lesson: {
    Base: "/lessons",
    ...template,
  },

  service: {
    Base: "/services",
    ...template,
  },

  student: {
    Base: "/students",
    ...template,
  },

  subscription: {
    Base: "/subscriptions",
    ...template,
  },

  teacher: {
    Base: "/teachers",
    ...template,
  },
}

const routes = jetPaths(paths)

export default routes
