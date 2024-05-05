import React, { useState } from 'react';
import trees from '../assets/logo.png';
import supabase from '../../supaBase';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [Fname, setFName] = useState('');
  const [Lname, setLName] = useState('');
  const [aadhar, setAadharNumber] = useState('');
  const [district, setDistrict] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      
      const { data, error } = await supabase.
        from('database_voters').
        select().
        eq('First Name',Fname).
        eq('Last Name',Lname).
        eq('Adhar Number',aadhar).
        single();
      
      const district = data['District']
      console.log(district)
      setDistrict(district)


      if (error) {
        throw error;
      }

      if (!data) {
        // If the user does not exist, display a message
        console.log('No voter registered with the provided name and Aadhar number');
        return;
      }

      console.log('User data found:', data);
      // If the user exists, navigate to the /profile page
      localStorage.setItem('user', JSON.stringify({ Fname,Lname, aadhar }));
      navigate(`/profile/vote?district=${district}`);

    } catch (error) {
      console.error('Error retrieving user data:', error.message);
    }

  };

  return (
    <div className='flex items-center justify-center h-screen -mt-16 md:-mt-24 lg:-mt-32'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[600px] h-[400px] shadow-lg shadow-gray-600'>
        <div className='hidden md:block'>
          <img className='w-full mt-40 mb-20 object-cover animate-spin-horizontal ' src={trees} alt="/" />
        </div>
        <div className='p-4 flex flex-col justify-center items-center md:items-start'>
          <form className='w-full' onSubmit={handleSubmit}>
            <h2 className='text-4xl font-bold text-center mb-8'>VOTE.</h2>
            <div className='w-full'>
              <input
                className='border p-2 mb-4 w-full'
                type="text"
                placeholder='First Name'
                value={Fname}
                onChange={(e) => setFName(e.target.value)}
              />
               <input
                className='border p-2 mb-4 w-full'
                type="text"
                placeholder='Last Name'
                value={Lname}
                onChange={(e) => setLName(e.target.value)}
              />
              <input
                className='border p-2 mb-4 w-full'
                type="text"
                placeholder='AADHAR NUMBER'
                value={aadhar}
                onChange={(e) => setAadharNumber(e.target.value)}
              />
            </div>
            <button className='w-full py-2 bg-orange-700 hover:bg-orange-800'>Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;