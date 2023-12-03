import React from 'react'
import '../App.css'
import { Header, Footer } from '../components'
function Help() {
  return (
    <div className="helpContainer">
      <Header />
      <div className="helpbody">
        <h1 className="aboutcolor">Help Page</h1>
        <p className="aboutcolor">Basic Information:</p>
        <p className="aboutcolor">TeamName FightOne </p>
        <p className="aboutcolor">Captain: Jialu Xu (jialu5@illinois.edu)</p>
        <p className="aboutcolor">Member1 Tianhao Chen (tc30@illinois.edu)</p>
        <p className="aboutcolor">Member2 Shenghao Cheng (sc71@illinois.edu)</p>
        <p className="aboutcolor">Member3 Lingge Wu (linggew2@illinois.edu)</p>
        <Footer />
      </div>
    </div>
  )
}
export default Help
