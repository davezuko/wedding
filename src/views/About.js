import { h, Component } from 'preact'

class About extends Component {
  render() {
    return (
      <div className="about">
        <h2>The Bride</h2>
        <p>
          Jackie is from Shelby Township, Michigan. She earned her bachelor's
          degree in social work at Oakland University and master’s degree in
          policy, planning, and administration at Western Michigan University.
          Jackie volunteers with Habitat for Humanity and Junior League of
          Nashville in her free time. She enjoys painting, traveling to new
          places, and spending quality time with friends and family.
        </p>
        <h2>The Groom</h2>
        <p>
          David is from Rochester, Michigan. He grew up in southeast Michigan
          but also spent several years in Japan during his childhood. He also
          attended Western Michigan University for computer science. David is a
          software engineer at Microsoft as well as an avid tennis player. He’s
          a lifelong learner and can usually be found watching videos or reading
          articles on the latest and greatest technology and science.
        </p>
      </div>
    )
  }
}
About.title = 'About'
About.header = {
  title: 'About Us',
  subtitle: 'A little bit about our story',
}

export default About
