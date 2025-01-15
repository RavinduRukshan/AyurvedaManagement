import React from 'react';
import Footer from '../components/templetes/Footer';
import WelcomePage from './welcomePage';
function MainPage() {
  return (
    <div className="d-flex flex-column"style={{ minHeight: '100vh' }}>
     <div className="flex-grow-1">
        <WelcomePage/>
      </div>
      <Footer />
    </div>
  );
}

export default MainPage;