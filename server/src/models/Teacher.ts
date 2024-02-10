import { model, Schema } from "mongoose"

export interface ITeacher {
  bio     : string
  contact : string
  name    : string
  services: string
}

const TeacherSchema = new Schema<ITeacher>({
  bio     : { required: true, type: String },
  contact : { type: String },
  name    : { required: true, type: String },
  services: { required: true, type: String },
})

TeacherSchema.virtual("url").get(function (): string {
  return `/subscription/${this._id}`
})

const Teacher = model<ITeacher>("Teacher", TeacherSchema)

export default Teacher
