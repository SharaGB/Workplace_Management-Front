import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, ListGroup, Card } from "react-bootstrap";

import NavBar from "../../../services/Navbar";
import { FormButton } from "../../../services/Buttons";
import styles from "../../../css/index.module.css";
import { InputEffect } from "../../../services/Inputs";
import Alert from "../../../services/Alert";

import {
  submit,
  startTime,
  finalTime,
  verifyAvailable,
  handlePickSelected,
  ShowDateReservation
} from "./NewReservation";

const Newreservation = () => {
  const [newReservation, setNewReservation] = useState({});
  const [showFinalPickTime, setFinalShowPickTime] = useState(false);
  const [showPickStationAvailable, setShowPickStationAvailable] = useState(false);
  const [stationSelected, setStationSelected] = useState();
  const [stationsAvailable, setStationsAvailable] = useState([]);
  const [showErrorMsg, setShowErrorMsg] = useState(null);

  const recoveryUser = localStorage.getItem("user");
  const user = JSON.parse(recoveryUser);
  const navigate = useNavigate();
  const handleSubmit = e => {
    console.log(newReservation);
    submit(e, newReservation, user, stationSelected, setShowErrorMsg, setFinalShowPickTime, navigate);
    // window.location.href = './myreservations';
  }

  return (
    <form className={styles.newReservation_area}>
      <NavBar />
      <Container>
        <Row>
          <Col sm={6}>
            <div className={styles.date_time_zone}>
              <p>Select a day and the starting time of your reservation:</p>
              <InputEffect
                textLabel="Select a day and time:"
                type="datetime-local"
                handleOnChange={e => startTime(e, setNewReservation, newReservation, setFinalShowPickTime, setStationSelected, setShowErrorMsg)}
                name="startDate"
              />
            </div>
            {showFinalPickTime ? (
              <div className={styles.date_time_zone}>
                <p>Select the final time for your reservation:</p>
                <InputEffect
                  textLabel="End time"
                  type="time"
                  name="finalDate"
                  handleOnChange={e => finalTime(newReservation, e, setNewReservation)}
                />
                <FormButton
                  text="Check Availability"
                  handleClick={e =>
                    verifyAvailable(e, newReservation, setStationsAvailable, setShowPickStationAvailable)
                  }
                />
              </div>
            ) : null}
          </Col>
          {showPickStationAvailable ? (
            <Col sm={6}>
              <h2>Available desktops</h2>
              <ListGroup>
                {stationsAvailable.map(station => {
                  let desktopText = 'Choose desktop ' + station.id
                  return (
                    <FormButton
                      text={desktopText}
                      key={station.id}
                      handleClick={e =>
                        handlePickSelected(e, station.id, setStationSelected, setShowPickStationAvailable)}
                    />
                  );
                })}
              </ListGroup>
            </Col>
          ) : null}
          {stationSelected ? (
            <Col sm={6}>
              <Card style={{ width: "18rem" }} className={styles.card}>
                <Card.Img variant="top" src={stationSelected.image} />
                <Card.Body>
                  <Card.Title>{stationSelected.name}</Card.Title>
                  <Card.Text>
                    <strong>Reserve day: </strong>
                    <ShowDateReservation reservation={newReservation} />
                  </Card.Text>
                  <Card.Text>
                    <strong>Desk: </strong> {stationSelected.id}
                  </Card.Text>
                  <FormButton text="Confirm" handleClick={e => handleSubmit(e)} />
                  <FormButton
                    text="Cancel"
                    handleClick={e => {
                      e.preventDefault();
                      setStationSelected(false);
                      setShowErrorMsg(false)
                    }}
                  />
                  {showErrorMsg ? <Alert severity="error" msg={showErrorMsg} /> : null}
                </Card.Body>
              </Card>
            </Col>
          ) : null}
        </Row>
      </Container>
    </form>
  );
};

export default Newreservation;
