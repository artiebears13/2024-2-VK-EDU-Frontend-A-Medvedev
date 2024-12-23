import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import TranslateForm from './components/TranslateForm/TranslateForm';
import TranslationHistory from './components/TranslationHistory/TranslationHistory';
import './App.scss';

const App: React.FC = () => {
  return (
      <div className="app-container">
        <header>
          <h1>Приложение-переводчик</h1>
          <nav>
            <NavLink to="/" className={'links'} end>
              Переводчик
            </NavLink>
            <NavLink to="/history" className={'links'}>
              История переводов
            </NavLink>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<TranslateForm />} />
            <Route path="/history" element={<TranslationHistory />} />
          </Routes>
        </main>
      </div>
  );
};

export default App;
