import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import "./index.css";
import Snowfall from "react-snowfall";

function App() {
  return (
    <div className="my-container">
      <Snowfall color="#fff" snowflakeCount={200} />
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
