import { h, Component } from 'preact'
import Countdown from '../components/Countdown'
import ContentContainer from '../components/ContentContainer'

class Home extends Component {
  render() {
    return (
      <div>
        <p>
          Fate brought Jackie and David together in the fall of 2014 in true
          modern day fashion, on the trusty dating app, OkCupid. David had just
          finished school at Western Michigan University and moved into his
          first apartment in Birmingham, Michigan. Jackie was a social work
          student at Oakland University and worked as a soccer coach at the
          time. Not long after they started chatting on OkCupid, David picked
          Jackie up from her parents house and they went to a local park to eat
          a Little Ceasers pizza and get to know one another. Jackie was
          impressed with David’s intelligence and sense of adventure. They
          quickly realised that they had grown up less than a quarter mile from
          each other but had never knowingly crossed paths due to the county
          divide.{' '}
        </p>
      </div>
    )
  }
}
Home.title = 'Home'

export default Home
