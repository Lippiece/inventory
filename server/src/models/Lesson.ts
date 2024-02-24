import { model, ObjectId, Schema, Types } from "mongoose"

export interface ILesson {
  active     : boolean
  date       : Date
  description: string
  price      : number
  service    : ObjectId
  title      : string
}

const LessonSchema = new Schema<ILesson>({
  active     : { default: true, required: true, type: Boolean },
  date       : { required: true, type: Date },
  description: { type: String },
  price      : { required: true, type: Number },
  service    : { type: Types.ObjectId },
  title      : { required: true, type: String },
})

LessonSchema.virtual("url").get(function (): string {
  return `/task/${this._id}`
})

const Lesson = model<ILesson>("Lesson", LessonSchema)

export default Lesson
