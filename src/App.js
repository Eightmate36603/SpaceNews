import './styles/App.css';
import {Routes, Route, Navigate, HashRouter} from "react-router-dom";

import News from "./js/News";
import Article from "./js/Article";
import Bookmarks from "./js/Bookmarks";
import About from "./js/About";
import NotFound from "./js/NotFound";

function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/news">
            <Route path="/news/:page" element={<News/>} />
            <Route path="/news/:page/:id" element={<Article/>} />
          </Route>
          <Route path="/bookmarks">
            <Route path="/bookmarks/:page" element={<Bookmarks/>} />
          </Route>
          <Route path="/about" element={<About/>}/>
          <Route path="/" element={<Navigate to="/news/1"/>}/>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
