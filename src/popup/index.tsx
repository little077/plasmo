import { useState } from "react"
import "../styles/index.scss"
function IndexPopup() {
  const [data, setData] = useState("")
  return (
    <h1
    className=" text-cyan-600 p-7 bg-sky-300"
     >
      此地空无一物
    </h1>
  )
}

export default IndexPopup
