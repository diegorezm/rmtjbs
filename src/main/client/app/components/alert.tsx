import { CircleX } from "lucide-react"

export const AlertError = ({ message }: { message: string }) => {
  return (
    <div role="alert" className="alert alert-error mt-6">
      <CircleX />
      {message}
    </div>
  )
}
