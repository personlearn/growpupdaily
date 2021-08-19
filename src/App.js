import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div>     
        <ul>
          <li><Link to="/">home</Link></li>
          <li><Link to="/menu1">菜单1</Link></li>
          <li><Link to="/menu2">菜单2</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default App;
