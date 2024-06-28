import './App.css';  
import Routes from './routes/route'
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
 

function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
