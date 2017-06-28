import React, { Component } from 'react';
import './App.css';
import DistrictRepository from './helper.js'
import kinderData from '../data/kindergartners_in_full_day_program.js';

const DistrictRepoInfo = new DistrictRepository(kinderData)
console.log(DistrictRepository)


class App extends Component {
  render() {
    return (
      <div>Welcome To Headcount 2.0</div>
    );
  }
}

export default App;
