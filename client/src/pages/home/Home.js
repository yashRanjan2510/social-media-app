import React, { useEffect } from 'react'
 import { axiosclient } from '../../utils/axiosclient'
function Home() {

 useEffect(()=>{
      fetchdata()
 }, [])

 async function fetchdata(){
  const response= await axiosclient.get('/post/all')
  console.log('get the response', response)
 }



  return (
    <div>Home
    
    </div>
  )
}

export default Home