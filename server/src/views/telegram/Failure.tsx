interface Error {
  description: string
  error_code : number
  ok         : boolean
}

const Failure = async ({ json }: { json: Error }) => {
  console.error(json)

  return ( (
    await <article className="bg-red-200 text-white flex flex-col items-center">
      <h2 className="text-4xl">Ой!</h2>
      <p className="text-2xl">
        Не получилось. Попробуйте перезагрузить страницу.
      </p>
      <p className="text-lg text-slate-700">{json.description}</p>
    </article>
  ))
}

export default Failure
