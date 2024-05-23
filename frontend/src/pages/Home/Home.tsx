import React from 'react';
import './style.scss';
import Hero from '../../components/organisms/Hero/Hero';
import Courses from '../../components/organisms/Courses/Courses';
import Features from '../../components/organisms/Features/Features';

const Home: React.FC = () => {
  
  return (
    <div className='home'>
      <Hero />
      <Courses />
      <Features />
    </div>
  )
}

export default Home;
