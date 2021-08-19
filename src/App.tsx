import React from 'react';
import './App.css';
import Footer from './components/Footer'
import Login from './components/Login';
import ClassLogin from './components/ClassLogin'

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <div className = "verticalCenter">
        <ClassLogin />
      <Footer />
      </div>
    </div>
  );
}

export default App;
