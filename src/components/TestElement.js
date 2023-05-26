import axios from 'axios'
import React, { useEffect } from 'react'

const TestElement = () => {

    

    useEffect(()=>{
        axios.get('http://127.0.0.1/5000/api/test').then((response)=>{
        console.log(response)
    })
    })
    

  return (
    <p>TEST MODULE</p>
    
  )
}

export default TestElement
