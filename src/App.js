import './App.css';
import MapWidget from './components/MapWidget';
import { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      center: [39.828, -98.579]
    }
  }

  onMapClick = (data) => {
    return null
  }

  render(){
    return (
      <div className="App">
        <h1>20020 Map: The Mappening</h1>
        <MapWidget debugCallback={this.onMapClick} center={this.state.center} />
      </div>
    );
  }
}

export default App;
