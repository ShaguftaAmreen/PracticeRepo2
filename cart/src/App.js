// import logo from './logo.svg';
import './App.css';
// import Products from './components/Products';
// import Cart from './components/Cart';
import Header from './components/Header';
import AllRoutes from './components/AllRoutes';
import ToastPromise from './components/ToastPromise';

function App() {
  return (
    <div className="App">
      <Header />
      <AllRoutes />
     {/* <Products /> */}
     {/* <ToastPromise /> */}
    </div>
  );
}

export default App;
