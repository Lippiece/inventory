import type { IService } from "@/models/Service"
import Service from "@/views/service/Service"

const ServiceList = ({ services }: { services: IService[] }) => (
    <ul>
      {services.map((service) => (
        <li key={service.name}>
          <Service service={service} />
        </li>
      ))}
    </ul>
  )

export default ServiceList
