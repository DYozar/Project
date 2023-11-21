import React from 'react';
import styles from '../../styles/Footer.module.css';
import ButtomBar from './ButtomBar';
import Social from '../Sections/SocialMedia';
import Link from 'next/link';
const Footer = () => {
  return (
    <footer className=' border-0  border-t-[0.5px] border-slate-400 text-center mb-5'>
      <p className=' mx-3 mt-4   text-[12px]' >&copy; 2023 All rights reserved To <span className=''><Link href={'/'} className='hover:text-blue-600 hover:underline underline-offset-4'>insight medium</Link></span></p>
      <ButtomBar/>
      
    </footer>
  );
};

export default Footer;
