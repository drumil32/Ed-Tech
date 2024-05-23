import React from 'react';
import './style.scss';
import Hero from '../../components/organisms/Hero/Hero';
import Courses from '../../components/organisms/Courses/Courses';
import Features from '../../components/organisms/Features/Features';
import AboutUs from '../../components/organisms/AboutUs/AboutUs';

const Home: React.FC = () => {
  
  return (
    <div className='home'>
      <Hero />
      <Courses />
      <Features />
      <AboutUs />
    </div>
  )
}

export default Home;
