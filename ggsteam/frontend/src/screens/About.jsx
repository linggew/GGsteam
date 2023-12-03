import React from 'react'
import { Header, Footer } from '../components'
function About() {
  return (
    <div className="aboutContainer">
      <Header />
      <div className="aboutbody">
        <h1>About Us</h1>
        <h2>Project Summary</h2>
        <p>
          The goal of this project is to create a gaming community website,
          catering to Steam users, where they can explore new games, discover
          gaming deals, and connect with gamers with the same interests. Users
          will be able to explore the latest games, receive the recommended
          games, find top games by different categories, the ability to mark
          their favorite games, track game prices, and provide game reviews.
          This platform will serve as a hub for gamers to share their
          experiences, discuss their interests, and build connections with their
          friends. With a user-friendly interface and a comprehensive set of
          features, our website aims to enhance the experience for Steam users
          to find and share games.{' '}
        </p>
        <h2>Contribution</h2>
        <p>
          Our project is organized into four distinct sections: Data Processing,
          Database Design, Frontend UI Implementation, and Backend
          Implementation. Initially, our team was divided into two groups, with
          two members focusing on UI implementation and two on data processing
          and database design. We diligently processed and prepared the data,
          designed an efficient database schema, and created a user-friendly
          front-end interface. As the project evolved, we seamlessly
          transitioned to backend development, where we integrated the processed
          data to provide valuable functionalities. The following highlights our
          distribution.
        </p>
        <p>
          Shenghao: responsible for Data processing, helping with db design as
          needed. Responsible for DB design testing to make sure all SQL
          commands will return the correct result as anticipation. Help with
          deployed backend related to db.
        </p>
        <p>
          Tianhao: responsible for DB design, including query, trigger, and
          stored procedure. Help with data processing as needed. Help with the
          DB design testing as needed. Help with deployed backend related to db.
        </p>
        <p>
          Jialu: Responsible for UI design, focusing on the style's design,
          checking Websize compatibility, and helping with frame implementation
          as needed. Responsible for Backend frame implementation. Help with web
          testing as needed.
        </p>
        <p>
          Lingge: Responsible for UI design and frame implementation, helping
          with style choice as needed. Help with backend implementation, work on
          logic structure with DB, and be responsible for web testing.
        </p>
      </div>
      <Footer />
    </div>
  )
}
export default About
