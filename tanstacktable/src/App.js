
import './App.css';
import BasicTable from './components/BasicTable';
import TanStackTable from './components/TanStackTable';
import WithOutFiltering from './WithOutFiltering'

function App() {
  return (
    <div className="App">
    <h3>Basic Table</h3>
    <BasicTable />
    {/* <TanStackTable /> */}
    {/* <WithOutFiltering /> */}
    </div>
  );
}

export default App;
