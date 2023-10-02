import React from 'react'
import  {ThreeDots} from "react-loader-spinner"

const Loader = ({visible}) => {
  return (
    <ThreeDots 
    height="40" 
    width="40" 
    radius="2"
    color="white" 
    ariaLabel="three-dots-loading"
    wrapperStyle={{}}
    wrapperClassName=""
    visible={visible}
     />
  )
}

export default Loader