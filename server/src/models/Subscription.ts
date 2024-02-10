import { model, ObjectId, Schema, Types } from "mongoose"

export interface ISubscription {
  active      : boolean
  dateEnd     : Date
  lessonsCount: number
  price       : number
  service     : ObjectId
  student     : ObjectId
  teachers    : ObjectId[]
  type        : "monthly" | "yearly"
}

const SubscriptionSchema = new Schema<ISubscription>({
  active  : { default: true, required: true, type: Boolean },
  dateEnd : { required: true, type: Date },
  price   : { required: true, type: Number },
  service : { required: true, type: Types.ObjectId },
  student : { required: true, type: Types.ObjectId },
  teachers: { required: true, type: [Types.ObjectId] },
  type    : { required: true, type: String },
})

SubscriptionSchema.virtual("url").get(function (): string {
  return `/subscription/${this._id}`
})

const Subscription = model<ISubscription>("Subscription", SubscriptionSchema)

export default Subscription
