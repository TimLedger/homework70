import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './containers/Home/Home';
import NotFound from './containers/NotFound/NotFound';
import ContactForm from './containers/ContactForm/ContactForm';
import './App.css';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="page-body">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/new-contact" element={<ContactForm />} />
            <Route path="/contacts/:id/edit" element={<ContactForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;