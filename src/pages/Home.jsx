import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Contact from '../components/Contact'
import About from '../components/About'
import Services from '../components/Services'
import Index from '../components/Index'


function Home() {
  return (
    <div>
      <Header/>
      <Index/>
      
      <Services/>
      <About/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default Home
