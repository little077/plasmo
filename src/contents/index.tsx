import React from 'react'
import * as buildConfig from "../../.project/build.json";
import "../styles/index.scss"

const index = () => {
  console.log("windows环境content",buildConfig.name,process.env.PLASMO_PUBLIC_OSS_BASE_URL)
  return (
    <div className=' w-4 bg-blue-500'>index</div>
  )
}

export default index