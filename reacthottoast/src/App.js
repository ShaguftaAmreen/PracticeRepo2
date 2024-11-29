import React from 'react';
import { Toaster, toast } from 'react-hot-toast';

function App() {
  const showToast = (type) => {
    switch (type) {
      case 'success':
        toast.success('Success message!');
        break;
      case 'error':
        toast.error('Error message!');
        break;
      default:
        toast('Default message!');
    }
  };

  return (
    <div className="App">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
      <div style={{ margin: '20px' }}>
        <button onClick={() => showToast('success')}>Show Success Toast</button>
        <button onClick={() => showToast('error')}>Show Error Toast</button>
        <button onClick={() => showToast()}>Show Default Toast</button>
      </div>
    </div>
  );
}

export default App;
