import React from 'react';
import Select from './components/Select';
import RHFWithMUI from './components/RHFWithMUI'
import LoginWithMUIRHF from "./components/LoginWithMUIRHF"
// import RhfMui from "./components/RhfMui"

import ControllerWithZOD from "./components/ControllerWithZOD"
import MuirhfController from './components/ControllerWithZOD';

const App = () => {
  const selectOptions = ['Option 1', 'Option 2', 'Option 3'];
  const selectRef = React.useRef();

  return (
    <div>
      {/* <Select
        options={selectOptions}
        label="Choose an option:"
        ref={selectRef}
        className="custom-class"
        onChange={(e) => console.log(e.target.value)}
      /> */}
      {/* <RHFWithMUI /> */}
      {/* <LoginWithMUIRHF /> */}
      {/* <RhfMui /> */}
      {/* <MuirhfController /> */}
      <ControllerWithZOD />
    </div>
  );
};

export default App;

