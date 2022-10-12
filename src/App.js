import './App.css';
import Routing from './Config/Routing';
import {BrowserRouter as Router} from 'react-router-dom';
import Nav from './Config/Nav';
import TopNav from './Config/TopNav';

const App = () => {
  if(localStorage.getItem('isLoggedIn') === 'true') {
    return (
      <div className="App">
        <Router>
          <Nav/>
          <TopNav/>
          <Routing/>
        </Router>
      </div>
    );
  }

  else {

    document.querySelector('body').style.backgroundColor = 'white';

    return (
      <div className="App">
        <Router>
          <Routing/>
        </Router>
      </div>
    )
  }
}

export default App;
