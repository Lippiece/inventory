import { tryCatch } from "fp-ts/TaskEither"

const getById = (model: any) => (id: string) =>
  tryCatch<Error, Model<any>>(
    async () => await model.findById(id),
    (error: any) => new Error(error),
  )

export default getById
