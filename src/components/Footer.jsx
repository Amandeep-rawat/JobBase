import React from 'react';
import {
    MDBFooter,
    MDBContainer,
    MDBIcon,
    MDBBtn
} from 'mdb-react-ui-kit';

const Footer = () => {
  return (
    <MDBFooter className=' border border-gray-600 gradient-title   text-white'>
      <MDBContainer className='p-4 mx-auto flex items-center max-sm:flex-col max-sm:items-start justify-between'>
      <section className='w-1/3 max-sm:hidden'>
        <img width={"100px"} src="src/assets/mylogo.svg" alt="" />
          <p className='text-md '>
            Welcome to <strong>JobBase</strong>, your go-to job portal for finding the best job opportunities and connecting with top recruiters. For inquiries or support, feel free to contact us.
          </p>
        </section>

      
        {/* Footer Text */}
       <section className='flex flex-col  gap-4  font-semibold'>
       <section className='flex  items-center gap-6'>

 
       <MDBBtn outline color="light" floating className='m-1' target='_blank' href='https://www.linkedin.com/in/amandeep-rawat-1622a82ba/'  role='button'>
            <MDBIcon size='xl' fab icon='linkedin-in' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' target='_blank' href='https://github.com/Amandeep-rawat' role='button'>
            <MDBIcon size='xl' fab icon='github' />
          </MDBBtn>
</section>
 
            
      <p><MDBIcon icon='home' className='me-2' /> Ramnagar,Uttarakhand,India</p>
              <p><MDBIcon icon='envelope' className='me-3' />Example@company.com</p>
              <p><MDBIcon icon='phone' className='me-3' /> +91________</p>
       </section>
      </MDBContainer>

      <div className='text-center p-3 bg-black text-white' >
        © 2024 JobBase. All rights reserved.
      </div>
    </MDBFooter>
  );
}

export default Footer;
