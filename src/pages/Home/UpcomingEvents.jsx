
import 'animate.css';
import { Link } from 'react-router-dom';
const UpcomingEvents = () => {
  return (
    <div >
      <h2 className=" text-center text-3xl font-bold animate__animated animate__backInLeft">Upcoming Events</h2>
      <div className='  my-10 animate__animated animate__backInRight grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {/* card1 */}
        <div className=' h-96  hover:bg-[#3a5f9c] hover:text-white flex  justify-between p-6 flex-col bordered shadow-lg border border-gray-100 rounded-lg'>
            <div>
              <p className='text-5xl  font-medium'>08</p>
              <p className='text-lg '>JUNE, 2025</p>
            </div>
            <div className='space-y-2'>
              <h3 className='text-xl font-medium'> Community Clean-Up Drive</h3>
              <p className=' font-medium '>Central Park, New York, USA</p>
              <p>Join us to help clean up and preserve the beauty of Central Park. All tools and refreshments will be provided.</p>
              <button className='btn bg-[#3a5f9c] text-white'>Sign Up Now</button>
              {/* 569caa    3a5f9c*/}
            
            </div>
        </div>
        {/* card2 */}
        <div className=' h-96  hover:bg-[#3a5f9c] hover:text-white flex  justify-between p-6 flex-col bordered shadow-lg border border-gray-100 rounded-lg'>
            <div>
              <p className='text-5xl  font-medium'>17</p>
              <p className='text-lg '> February, 2025</p>
            </div>
            <div className='space-y-2'>
              <h3 className='text-xl font-medium'> Food Donation Campaign</h3>
              <p className=' font-medium '>Downtown Shelter, Los Angeles, USA</p>
              <p>Help us distribute food packages to those in need. Your contribution can bring a smile to someone's face.</p>
              <button className='btn bg-[#3a5f9c] text-white'>Register Today</button>
              {/* 569caa    3a5f9c*/}
            
            </div>
        </div>
        {/* card3 */}
        <div className=' h-96  hover:bg-[#3a5f9c] hover:text-white flex  justify-between p-6 flex-col bordered shadow-lg border border-gray-100 rounded-lg'>
            <div>
              <p className='text-5xl  font-medium'>03</p>
              <p className='text-lg '>March, 2025</p>
            </div>
            <div className='space-y-2'>
              <h3 className='text-xl font-medium'>Tree Plantation Program</h3>
              <p className=' font-medium '>Greenfield Park, Chicago, USA</p>
              <p>Be a part of our mission to plant 1,000 trees. Together, we can make the earth greener!</p>
              <button className='btn bg-[#3a5f9c] text-white'>Join the Movement</button>
              {/* 569caa    3a5f9c*/}
            
            </div>
        </div>
        {/* card4 */}
        <div className=' h-96  hover:bg-[#3a5f9c] hover:text-white flex  justify-between p-6 flex-col bordered shadow-lg border border-gray-100 rounded-lg'>
            <div>
              <p className='text-5xl  font-medium'>18</p>
              <p className='text-lg '>March , 2025</p>
            </div>
            <div className='space-y-2'>
              <h3 className='text-xl font-medium'> Community Clean-Up Drive</h3>
              <p className=' font-medium '>Community Hall, Houston, USA</p>
              <p>Help us raise awareness about health and wellness through free check-ups and consultations.</p>
              <button className='btn bg-[#3a5f9c] text-white'>Volunteer Now</button>
              {/* 569caa    3a5f9c*/}
            
            </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;