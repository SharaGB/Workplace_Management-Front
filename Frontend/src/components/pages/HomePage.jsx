import { Col, Container, Row } from "react-bootstrap";
import "react-calendar/dist/Calendar.css";
import React from "react";

import styles from "../../css/HomePage.module.css";
import NavBar from "../../services/Navbar";
import { LinkButton } from "../../services/Buttons";

const HomePage = () => {
  return (
    <div className={styles.home_page}>
      <NavBar />
      <Container>
        <h1>Welcome to choose your desktop!</h1>
        <Row>
          <Col className={styles.col} sm={6}>
            <LinkButton
              to="/newreservationpage"
              text="Make a booking"
            ></LinkButton>
          </Col>
          <Col className={styles.col} sm={6}>
            <LinkButton
              to="/myreservations"
              text="My bookings"
            ></LinkButton>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
