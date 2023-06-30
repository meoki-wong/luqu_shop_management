
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import UseRoute from '../router/useRouter';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UseRoute />
      </BrowserRouter>
    </div>
  );
}

export default App;
