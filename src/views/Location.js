import React from 'react'

class Location extends React.Component {
  render() {
    return (
      <div className="content">
        <div className="venue-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.8713467221055!2d-83.1514503841734!3d42.68526747916647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824e99abb14977d%3A0x57c5a529c7c1cda9!2sGreat+Oaks+Country+Club!5e0!3m2!1sen!2sus!4v1526527783591"
            width="600"
            height="450"
            frameBorder="0"
            style="border:0"
            allowFullScreen
            style={{ display: 'block', margin: '0 auto' }}
          />
        </div>
        <div className="text-center" style={{ marginTop: '5rem' }}>
          <h2>Ceremony and Reception Details</h2>
          <hr />
          <p style={{ textIndent: 0 }}>
            <a href="https://www.greatoakscc.com">Great Oaks Country Club</a>
            <br />
            Saturday, September 22, 2018 at five-thirty in the evening<br />
            777 Great Oaks Blvd, Rochester Hills, MI 48307
          </p>
          <hr />
          <p style={{ textIndent: 0 }}>
            The ceremony will begin at five-thirty with a cocktail hour, dinner
            and dancing to follow. Complimentary valet parking provided at
            venue. Dress Code: Cocktail Attire. Please keep in mind that our
            ceremony is currently scheduled to take place outside.
          </p>
        </div>
      </div>
    )
  }
}
Location.title = 'Location'
Location.header = {
  title: 'The Venue',
  subtitle: 'Where the wedding is and where to stay',
}

export default Location
