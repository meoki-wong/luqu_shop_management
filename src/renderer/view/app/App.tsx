
import './App.scss';
import { HashRouter } from 'react-router-dom';
import UseRoute from '../router/useRouter';
function App() {
  return (
    <div className="App">
      <HashRouter>
        <UseRoute />
      </HashRouter>
    </div>
  );
}

export default App;
