import { Schema, model } from "mongoose"

export interface IUser {
  type: "admin" | "student" | "teacher"
  username: string
  password: string
}

const UserSchema = new Schema<IUser>({
  type: { required: true, type: String, enum: ["admin", "student", "teacher"] },
  username: { required: true, type: String },
  password: { required: true, type: String },
})

UserSchema.virtual("url").get(function (): string {
  return `/user/${this._id}`
})

const User = model<IUser>("User", UserSchema)

export default User
