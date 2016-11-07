import React from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";

const ARC_DE_TRIOMPHE_POSITION = {
  lat: 48.873947,
  lng: 2.295038,
  zoom: 2
};

const INITIAL_LOCATION = {
  address: 'New York City',
  lat: 40.758608,
  lng: -73.934471,
  zoom: 2
};

const ATLANTIC_OCEAN = {
  lat: 29.53,
  lng: -55.49
}


export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spots: [],
      foundAddress: INITIAL_LOCATION.address,
      isGeocodingError: false,
      lat: null,
      lng: null,
      localContent: this.props.Content || ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setSearchInputElementReference = this.setSearchInputElementReference.bind(this);
    this.getCurrentPosition = this.getCurrentPosition.bind(this);
    this.panLocationEnter = this.panLocationEnter.bind(this);
  }

  componentDidMount() {
    this.map = new google.maps.Map(document.querySelector('#map'), {
      center: INITIAL_LOCATION,
      zoom: 18,
      setMap: 'map',
    });

    this.marker = new google.maps.Marker({
      map: this.map,
      position: {
        lat: INITIAL_LOCATION.lat,
        lng: INITIAL_LOCATION.lng
      },
      draggable: true,
      animation: google.maps.Animation.DROP
    });

    this.geocoder = new google.maps.Geocoder();
    this.geocodeLocation();
    this.getCurrentPosition();
    this.panLocationEnter();
  }

  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position)
      if (position) {
        this.marker = new google.maps.Marker({
          map: this.map,
          position: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          animation: google.maps.Animation.drop
        })
        this.marker.addListener('click', function() {
          this.infowindow = new google.maps.InfoWindow({
            content: 'You are Here '
          })
          this.infowindow.open(this.map, this.marker)
        })
        } else {
          console.log('problem')
        }
      })
  }

  handleSubmit(e) {
    e.preventDefault();
    let address = this.searchInputElement.value;

    this.geocodeAddress(address);
  }

  setSearchInputElementReference(inputReference) {
    this.searchInputElement = inputReference;
  }

  geocodeLocation() {
    let location = this.props.spots;
    let image = 'http://pix.iemoji.com/images/emoji/apple/ios-9/33/0566.png'
    console.log(this.props)
    for(let i=0; i < 10; i++) {
      setTimeout(() => {
        (this.geocoder.geocode({ 'address': location[i] }, function handleResults(results, status) {
          console.log(status)
          if (status === google.maps.GeocoderStatus.OK) {
             this.marker = new google.maps.Marker({
                map: this.map,
                position: results[0].geometry.location,
                animation: google.maps.Animation.DROP,
                title: results[0].formatted_address,
                icon: image
              });
             this.marker.addListener('click', function() {
              console.log('click')
             this.infowindow = new google.maps.InfoWindow({
                content: results[0].formatted_address
             })
              this.infowindow.open(this.map, this.marker)

            })
          } else if (status === 'ZERO_RESULTS' || status === 'OVER_QUERY_LIMIT') {
            console.log(status)
          }
          console.log(i)
        }.bind(this)))
      }, 1000 * i);
    }
  }

  geocodeAddress(address) {
    this.geocoder.geocode({ 'address': address }, function handleResults(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        console.log(results[0])
        this.setState ({
          foundAddress: results[0].formatted_address,
          isGeocodingError: false
        })
        this.map.setCenter(results[0].geometry.location);
        this.marker.setPosition(results[0].geometry.location);
        this.map.panTo(results[0].geometry.location);

        return;
      }

      this.setState({
        foundAddress: null,
        isGeocodingError: true
      })
      this.map.setCenter({
        lat: ATLANTIC_OCEAN.lat,
        lng: ATLANTIC_OCEAN.lng
      });

      this.marker.setPosition({
        lat: ATLANTIC_OCEAN.lat,
        lng: ATLANTIC_OCEAN.lng
      })
    }.bind(this));
  }

  panLocationEnter() {
    let enterLocation = this.props.content;

    this.geocodeFirstLocation(enterLocation);
  }

  geocodeFirstLocation(enterLocation) {
    this.geocoder.geocode({ 'address': enterLocation }, function handleResults(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        this.setState ({
          foundAddress: results[0].formatted_address,
          isGeocodingError: false
        })
        this.map.setCenter(results[0].geometry.location);
        this.marker.setPosition(results[0].geometry.location);
        this.map.panTo(results[0].geometry.location);

        return;
      }

      this.setState({
        foundAddress: null,
        isGeocodingError: true
      })
      this.map.setCenter({
        lat: ATLANTIC_OCEAN.lat,
        lng: ATLANTIC_OCEAN.lng
      });

      this.marker.setPosition({
        lat: ATLANTIC_OCEAN.lat,
        lng: ATLANTIC_OCEAN.lng
      })
    }.bind(this));
  }


  render() {
    const mapStyle = {
      width: 700,
      height: 500,
      border: '1px solid black'
    };
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
              <form className="form-inline" onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col-xs-8 col-sm-10">
                    <div className="form-group">
                      <label className="sr-only" htmlFor="address">Address </label>
                      <input className="input"
                        type="text"
                        id="address"
                        placeholder="WHERE ARE YALL GOING?"
                        ref={this.setSearchInputElementReference}
                        required/>
                      <button type="submit" className="btn">
                      <span className="glyphicon glyphicon-search"> Hit </span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
          </div>
        </div>
        <div>
        {this.state.isGeocodingError ? <p className="bg-danger">Address not found.</p> : <p className="bg-info">{this.state.foundAddress}</p>}
        </div>
        <div id="map" ref="map" style={mapStyle}>I should be a map!</div>
      </div>
    );
  }
}
