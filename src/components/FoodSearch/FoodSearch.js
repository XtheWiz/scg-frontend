import React from 'react';

import FoodCard from './FoodCard';
import Loader from '../Loader/Loader';

const IMGURL = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=350&photoreference=";
const APIKEY = "YOUR_API_KEY";
const imgSrc = `${IMGURL}CmRaAAAANpsofhVs69yjpEZz7DT4plGW8isBK7kLPDQ6HbP-XAPs6O3Za65ppg2G-7V7_2hnb4b9IZ_N4iE9xEXTzzZbdE1OlFHJ3zpIiEcz4m1r7wj9Wudlbj28gSr-c0RvgOEEEhAYP6mwQEHqleRjqiziJBE0GhR76W_Btimhy2WWFQ5HScsJ0oyUdQ&key=${APIKEY}`

class FoodSearch extends React.Component {

  state = {
    loading: false,
    value: '',
    errMsg: '',
    results: []
  }

  handleOnValueChange = (event) => {
    this.setState({value: event.target.value})
  }

  handleOnClickSearchRestaurant = async () => {
    const value = this.state.value;
    this.setState({loading: true});

    var url = new URL('http://localhost:3111/scg/food');
    if (value && value.trim().length > 0) {
      url.search = new URLSearchParams({
        "foodType": value
      });
    }
    const response = await fetch(url);
    let data = await response.json();

    if (data.status === null || 
        data.status !== "OK" ||
        data.foodlist === null ||
        data.foodlist.length === 0 ) {
      this.setState({
        loading: false,
        errMsg: 'ไม่พบร้านอาหาร'
      });
    } else {
      this.setState({
        loading: false,
        results: data
      });
    }

    console.log(data);
  }

  render() {
    let foodList = null;
    if (this.state.results.foodlist && this.state.results.foodlist.length > 0) {
      foodList = this.state.results.foodlist.map( f => {
        // const mapUrl = `https://www.google.com/maps/search/?api=1&query=${f.Lat},${f.Lng}`
        const encodeName = encodeURI(f.Name);
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeName}`
        return (
          <FoodCard
            key={f.Name}
            name={f.Name}
            vicinity={f.Vicinity}
            imgSrc={IMGURL + f.PhotoRef + `&key=${APIKEY}`}
            dist={f.Distance}
            mapURL={mapUrl} />
        )
      })
    }
    return (
      <div className="mt-2">
        <label htmlFor="foodType">กินอะไรดีนะ</label>
        <div className="input-group">
          <input 
            id="foodType" name="foodType"
            onChange={this.handleOnValueChange}
            type="text" className="form-control width100 mr-2" />
          <span className="input-group-btn">
            <button 
              onClick={this.handleOnClickSearchRestaurant}
              className="btn btn-primary" type="button">หาร้าน</button>
          </span>
        </div>
        <div className="text-danger">{this.state.errMsg}</div>
        <hr className="mt-1 mb-3" />
        {this.state.loading && <Loader />}
        <div className="mb-5">
          {foodList}
        </div>
      </div>
    )
  }
}

export default FoodSearch;