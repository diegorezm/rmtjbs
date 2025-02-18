import { CircleX } from "lucide-react"
import { useState } from "react"

export const AlertError = ({ message }: { message: string }) => {
  const [show, setShow] = useState(true)
  if (!show) return null
  return (
    <div role="alert" className="alert alert-error mt-6">
      <button className="hover:cursor-pointer" onClick={() => setShow(false)}>
        <CircleX />
      </button>
      {message}
    </div>
  )
}
