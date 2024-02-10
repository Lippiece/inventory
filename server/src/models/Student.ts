import { model, type ObjectId, Schema, Types } from "mongoose"

export interface IStudent {
  contact      : string
  name         : string
  subscriptions: ObjectId[]
}

const StudentSchema = new Schema<IStudent>({
  contact      : { required: true, type: String },
  name         : { required: true, type: String },
  subscriptions: { required: true, type: [Types.ObjectId] },
})

StudentSchema.virtual("url").get(function (): string {
  return `/subscription/${this._id}`
})

const Student = model<IStudent>("Student", StudentSchema)

export default Student
