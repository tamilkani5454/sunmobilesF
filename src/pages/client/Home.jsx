import BestSellers from '../../components/BestSellers'
import Hero from '../../components/Hero'
import Latestproduct from '../../components/Latestproduct'
import React from 'react'

const Home = () => {
  return (
    <div>
     <Hero/>
     <BestSellers/>
     <Latestproduct />
    </div>
  )
}

export default Home
