import React from 'react'
import Countdown from '../components/Countdown'
import ContentContainer from '../components/ContentContainer'

class Home extends React.Component {
  render() {
    return (
      <div>
        <p>
          Fate brought Jackie and David together in the fall of 2014 in true
          modern day fashion, on the trusty dating app, OkCupid. David had just
          finished school at Western Michigan University and had moved into his
          first apartment in Birmingham, Michigan. Jackie was a social work
          student at Oakland University at the time and worked as a soccer coach at the
          time.
        </p>
        <p>
          Not long after they started chatting, David picked Jackie up for their
          first date. They went to a local park to eat a Little Ceasers pizza and
          get to know each other. After a few hours of riveting conversation, they 
          headed to downtown Rochester to walk along the river. They quickly realized
          that they had grown up
          less than a quarter mile from each other.
        </p>
      </div>
    )
  }
}
Home.title = 'Home'
Home.header = {
  title: (
    <span>
      Jackie Kutcher <span className="and">&</span> David Zukowski
    </span>
  ),
  subtitle: 'September 22, 2018 — Rochester, MI',
}

export default Home
