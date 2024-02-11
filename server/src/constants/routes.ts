import jetPaths from "jet-paths"

const idDelete = "/:id/delete"
const idUpdate = "/:id/update"
const id = "/:id"
const idAdd = "/add"
const paths = {
  Base: "/api",

  health: "/health",

  lesson: {
    add: idAdd,
    Base: "/lesson",
    delete: idDelete,
    get: id,
    update: idUpdate,
    lessons: "s",
  },

  service: {
    add: idAdd,
    Base: "/service",
    delete: idDelete,
    get: id,
    update: idUpdate,
    services: "s",
  },

  student: {
    add: idAdd,
    Base: "/student",
    delete: idDelete,
    get: id,
    update: idUpdate,
    students: "s",
  },

  subscription: {
    add: idAdd,
    Base: "/subscription",
    delete: idDelete,
    get: id,
    update: idUpdate,
    subscriptions: "s",
  },

  teacher: {
    add: idAdd,
    Base: "/teacher",
    delete: idDelete,
    get: id,
    update: idUpdate,
    teachers: "s",
  },
}

const routes = jetPaths(paths)

export default routes
