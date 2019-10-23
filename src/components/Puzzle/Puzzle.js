import React from 'react';

import PuzzleCard from './PuzzleCard';

const REGEX_NUM_ONLY = /^\d+$/;

class Puzzle extends React.Component {

  state = {
    loading: false,
    value: '',
    errMsg: '',
    result: []
  }

  handleOnValueChange = (event) => {
    this.setState({value: event.target.value, errMsg: ''})
  }

  handleOnClickCheckSequenceButton = async () => {
    let value = this.state.value;
    let nums = value.split(",");

    if (nums.length !== 4) {
      this.setState({errMsg: 'Please input 4 digits, separate with comma'})
    } else {
      for(let i = 0; i < 4; i++) {
        nums[i] = nums[i].trim();
        if(REGEX_NUM_ONLY.test(nums[i]) === false) {
          this.setState({errMsg: `Found ${nums[i]} is not digit`})
          return;
        }
      }

      var url = new URL('http://localhost:3111/scg/puzzle');
      url.search = new URLSearchParams({
        "var1": nums[0],
        "var2": nums[1],
        "var3": nums[2],
        "var4": nums[3]
      });
      const response = await fetch(url);
      let data = await response.json();
      data = {
        ...data,
        id: this.state.result.length + 1,
        seq: `X, ${nums[0]}, ${nums[1]}, ${nums[2]}, ${nums[3]}, Y, Z`
      }
      
      let newResult = [...this.state.result];
      newResult.unshift(data);
      this.setState({
        result: newResult
      });
    }
  }

  render() {

    let resultCards = this.state.result.map(r => {
      return (
        <PuzzleCard
          seq={r.seq}
          isSequence={r.isSequence}
          message={r.message} />
      )
    })

    return(
      <div className="mt-2">
        <p className="text-center">Please provide 4 numbers, separate by comma.<br />I will calculate if they are in desired sequence</p>
        <div className="input-group">
          <input 
            id="inputSequence" name="inputSequence"
            onChange={this.handleOnValueChange}
            type="text" className="form-control width100 mr-2" />
          <span className="input-group-btn">
            <button 
              disabled={this.state.value.length <= 0}
              onClick={this.handleOnClickCheckSequenceButton}
              className="btn btn-primary" type="button">check</button>
          </span>
        </div>
        <div className="text-danger">{this.state.errMsg}</div>
        <hr className="mt-1 mb-3" />
        <div className="text-center">
          {resultCards}
        </div>
      </div>
    )
  }
}

export default Puzzle;