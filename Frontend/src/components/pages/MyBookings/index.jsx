import { Container, Alert, Spinner } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import styles from '../../../css/my-reservation.module.css'
import { MyReservationList } from './MyBookings';
import NavBar from '../../../services/Navbar';

const baseURL = 'http://localhost:8000/api/reservation/';

const Myreservations = () => {
  const [showMsg, setShowMsg] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  let msg = null;
  let location = useLocation(); /* Returns the current location object */
  if (location.state) {
    msg = location.state.message;
  }
  useEffect(() => {
    if (msg) {
      setShowMsg(true);
    }

    try {
      const get = async () => {
        axios.get(baseURL).then(res => {
          console.log(res.data)
        if (res.data.length === 0) { /* If no reservations have been made */
          setErrorMsg('No bookings made by you')
          setIsLoading(true)
          return
        }
        setBookings(res.data);
      })
        setIsLoading(false)
      };
      get();

    } catch (error) {
      setErrorMsg('Some error occurred while fetching the information')
    }

    setTimeout(() => {
      setShowMsg(false);
    }, 3000);
  }, [msg]);

  return (
    <div>
      <NavBar />
      <Container>
        {showMsg && <Alert variant='success'>{msg}</Alert>}
        <h2>My bookings</h2>
        <p>Reservations from the current day</p>
        {isLoading && (
          <div className={styles.spinner}>
            <Spinner animation='border' />
          </div>
        )}
        {errorMsg && <Alert variant='danger'>{errorMsg}</Alert>}
        {bookings.map(booking => {
          return <MyReservationList key={booking.id} bookings={booking} />;
        })}
      </Container>
    </div>
  );
};

export default Myreservations;
