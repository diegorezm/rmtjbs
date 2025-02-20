import { SendHorizonal } from "lucide-react";
import { useState, type FormEvent } from "react";

type Props = {
  handleSendMessage: (content: string) => void
}

export function ChatMessageInput({ handleSendMessage }: Props) {
  const [message, setMessage] = useState("")

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    handleSendMessage(message)
    setMessage("")
  }
  return (
    <div className="relative w-full  lg:w-1/2 mx-auto">
      <form className="border border-primary rounded-lg  h-24 flex items-center px-2" onSubmit={onSubmit}>
        <textarea
          placeholder="Your new message..."
          className="flex-grow resize-none border-none outline-none h-full py-2"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button className="btn btn-primary ml-2">
          <SendHorizonal className="size-4" />
        </button>
      </form>
    </div>
  )
}
