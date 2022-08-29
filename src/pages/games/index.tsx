import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Games() {
  return (
    <main className='container'>
      <NavLink to='/audiocall'>audiocall</NavLink>
      <NavLink to='/sprint'>sprint</NavLink>
    </main>
  );
}
