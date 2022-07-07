import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import '../../css/Signup.css';
import { TextField } from '../TextField';

function Signup () {
  const validate = Yup.object({
    name: Yup.string()
      .required('Required'),
    lastName: Yup.string()
      .required('Required'),
    username: Yup.string()
      .required('Required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 charaters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Confirm password is required')
  });
  return (
    <section className='login-block'>
      <div className='container'>
        <div className='my_container'>
          <div className='row'>
            <div className='col-md-4 login-sec'>
              <h2 className='text-center'>Register Now</h2>
              <Formik
                initialValues={{
                  name: '',
                  lastName: '',
                  username: '',
                  email: '',
                  password: '',
                  confirmPassword: ''
                }}
                validationSchema={validate}
                onSubmit={values => {
                  console.log(values);
                }}
              >
                {formik => (
                  <Form className='login-form'>
                    <div className='form-group'>
                      <TextField label='NAME' name='name' type='text' />
                    </div>
                    <div className='form-group'>
                      <TextField label='LAST NAME' name='lastName' type='text' />
                    </div>
                    <div className='form-group'>
                      <TextField label='USERNAME' name='username' type='text' />
                    </div>
                    <div className='form-group'>
                      <TextField label='EMAIL' name='email' type='email' />
                    </div>
                    <div className='form-group'>
                      <TextField label='PASSWORD' name='password' type='password' />
                    </div>
                    <div className='form-group'>
                      <TextField label='CONFIRM PASSWORD' name='confirmPassword' type='password' />
                    </div>
                    <div className='container'>
                      <div className='form-check'>
                        <button type='submit' className='btn-login'>Submit</button>
                      </div>
                      <div className='d-flex justify-content-center links2'>Already have an account?&nbsp;
                        <Link to='/' href='#'>Login</Link>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className='col-md-8 banner-sec'>
              <div id='carouselExampleIndicators' className='carousel slide' data-ride='carousel'>
                <ol className='carousel-indicators'>
                  <li data-target='#carouselExampleIndicators' data-slide-to='0' className='active' />
                  <li data-target='#carouselExampleIndicators' data-slide-to='1' />
                  <li data-target='#carouselExampleIndicators' data-slide-to='2' />
                </ol>
                <div className='carousel-inner' role='listbox'>
                  <div className='carousel-item active'>
                    <img className='d-block img-fluid' src='https://www.encora.com/hs-fs/hubfs/Press%20release.png?width=1253&name=Press%20release.png' alt='First slide' />
                    <div className='carousel-caption d-none d-md-block'>
                      <div className='banner-text'>
                        <h2>Lets Work Togheter!</h2>
                        <p>Please register into the Encora Workplace Mangement app and let's share a moment togheter at our office!</p>
                      </div>
                    </div>
                  </div>
                  <div className='carousel-item'>
                    <img className='d-block img-fluid' src='https://images.pexels.com/photos/7097/people-coffee-tea-meeting.jpg' alt='First slide' />
                    <div className='carousel-caption d-none d-md-block'>
                      <div className='banner-text'>
                        <h2>Let's Work Togheter!</h2>
                        <p>Please register into the Encora Workplace Management app and let's share a moment together at our office!</p>
                      </div>
                    </div>
                  </div>
                  <div className='carousel-item'>
                    <img className='d-block img-fluid' src='https://i.postimg.cc/wj2qWcz2/encora.jpg' alt='First slide' />
                    <div className='carousel-caption d-none d-md-block'>
                      <div className='banner-text'>
                        <h2>This is Heaven</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
