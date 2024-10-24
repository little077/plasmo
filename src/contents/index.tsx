import React from 'react'
import * as buildConfig from "../../.project/build.json";

const index = () => {
  console.log("windows环境content",buildConfig.name,process.env.PLASMO_PUBLIC_OSS_BASE_URL)
  return (
    <div>index</div>
  )
}

export default index