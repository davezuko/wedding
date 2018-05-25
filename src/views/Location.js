import React from 'react'

class Location extends React.Component {
  render() {
    return (
      <div className="content location">
        <div className="text-center">
          <h2 className="heading">Ceremony and Reception Details</h2>
          <p>
            <a href="https://www.greatoakscc.com">Great Oaks Country Club</a>
            <br />
            Saturday, September 22, 2018 at five-thirty in the evening<br />
            777 Great Oaks Blvd, Rochester Hills, MI 48307
          </p>
        </div>
        <div className="venue-map d-none d-md-block">
          <iframe
            className="google-map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2932.8713467221055!2d-83.1514503841734!3d42.68526747916647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824e99abb14977d%3A0x57c5a529c7c1cda9!2sGreat+Oaks+Country+Club!5e0!3m2!1sen!2sus!4v1526527783591"
            width="600"
            height="450"
            frameBorder="0"
            allowFullScreen
          />
        </div>
        <h2 className="heading">Hotel Information</h2>
        <div className="row mb-5 hotel-info">
          <div className="col-12 col-md-6">
            <h3>Royal Park Hotel</h3>
            <p>
              We have reserved a block of rooms at Royal Park Hotel for our
              guests on Friday, September 21st and Saturday, September 22nd.
            </p>
            <dl class="row">
              <dt class="col-md-3">Rate:</dt>
              <dd class="col-md-9">$229/night</dd>
              <dt class="col-md-3">Address:</dt>
              <dd class="col-md-9">600 E University Dr, Rochester, MI 48307</dd>
              <dt class="col-md-3">Phone:</dt>
              <dd class="col-md-9">248-652-2600</dd>
              <dt class="col-md-3">Distance:</dt>
              <dd class="col-md-9">1.3 miles</dd>
            </dl>
          </div>
          <div className="col-12 col-md-6">
            <h3>Crowne Plaza Auburn Hills</h3>
            <p>
              We have also reserved a second block of rooms at The Crowne Plaza
              on Friday, September 21st and Saturday, September 22nd.
            </p>
            <dl class="row">
              <dt class="col-md-3">Rate:</dt>
              <dd class="col-md-9">$119/night</dd>
              <dt class="col-md-3">Address:</dt>
              <dd class="col-md-9">1500 N Opdyke Rd, Auburn Hills, MI 48326</dd>
              <dt class="col-md-3">Phone:</dt>
              <dd class="col-md-9">248-363-4550</dd>
              <dt class="col-md-3">Distance:</dt>
              <dd class="col-md-9">6.2 miles</dd>
            </dl>
          </div>
        </div>
        <h2 className="heading">Event Details</h2>
        <p>
          The ceremony will begin at five-thirty with a cocktail hour, dinner
          and dancing to follow. Complimentary valet parking provided at venue.
          Dress Code: Cocktail Attire. Please keep in mind that our ceremony is
          currently scheduled to take place outside.
        </p>
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
