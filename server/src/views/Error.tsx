import { HTTPException } from "hono/http-exception"

const Error = ({
  error,
  status,
}: { error: Error | HTTPException; status: number }) => (
    <html>
      <body>
        <h1>Error {status}</h1>
        <h2>{error.getRespose ? error.getRespose() : ""}</h2>
        <p>{process.env.NODE_ENV === "production" ? "" : error.stack}</p>
      </body>
    </html>
  )

export default Error
