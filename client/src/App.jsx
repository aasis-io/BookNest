import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import MyFooter from "./components/MyFooter";
import { ScrollRestoration } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div className="bg-sky-50">
        <Navbar />
        {/* Add ScrollRestoration here */}
        <ScrollRestoration />
        <div className="bg-sky-50">
          <Outlet />
        </div>
        <MyFooter />
      </div>
    </div>
  );
}

export default App;
