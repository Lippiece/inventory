import type { IService } from "@/models/Service"

const Service = ({ service }: { service: IService }) =>
  (
    <article>
      <h2>{service.name}</h2>
      <h3>{service.price}</h3>
      <p>{service.description}</p>
    </article>
  )

export default Service
