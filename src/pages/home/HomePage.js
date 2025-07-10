import React from 'react';
import Header from '../../layout/Header';
import MainLayout from '../../layout/MainLayout';

function HomePage() {
  return (
    <>
      <MainLayout>
        <div className="home-container">
          <h1>Olá!</h1>
        </div>
      </MainLayout>
    </>
  );
}

export default HomePage;