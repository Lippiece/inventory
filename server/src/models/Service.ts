import { model,Schema } from "mongoose"

export interface IService {
  description: string
  duration   : number
  name       : string
  price      : number
}

const ServiceSchema = new Schema<IService>({
  description: { required: true, type: String },
  duration   : { required: true, type: Number },
  name       : { required: true, type: String },
  price      : { required: true, type: Number },
})

ServiceSchema.virtual("url").get(function (): string {
  return `/service/${this._id}`
})

const Service = model<IService>("Service", ServiceSchema)

export default Service
