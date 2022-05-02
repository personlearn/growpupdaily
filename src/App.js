import "./App.css";
import { Link } from "react-router-dom";
import "../node_modules/font-awesome/css/font-awesome.min.css";

function App() {
  return (
    <div>
      <div className="placeholder"></div>
      <div className="App">
        <ul className="App">
          <li>
            <Link to="/">
              <i className="fa fa-male"></i>home
            </Link>
          </li>
          <li>
            <Link to={{pathname:"/Imglist"}}>菜单1</Link>
          </li>
          <li>
            <Link to="/menu2">菜单2</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
