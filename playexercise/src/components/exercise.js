import React, {useState, useEffect} from 'react';
import { Row, Col, Alert} from 'react-bootstrap';
import exercises from '../data/exercises.json';

const Exercise = ({ penalty, getExercise, isRunning=true }) => {
  
  const [itemex, setItemex] = useState({
    name: '',
    images: [],
    reps: 0
  });

  const [seconds, setSeconds] = useState(0);

  const [active, setActive] = useState(0);
  const [finalreps, setfinalreps] = useState(0);
  const [show, setShow] = useState(true);


  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {  
    if (active > itemex.images.length) {
      setActive(() => 0);
    } else {
      setActive(() => active+1);
    }

    if (isRunning) {
      setfinalreps(() => seconds);
    }
  
  }, [seconds, isRunning]);
    
  useEffect(() => {
    console.log('VARIABLE');
  }, [penalty]);

  useEffect(() => {
    getRandomExercise();
  }, [getExercise]);

  const getRandomExercise = () => {
    const exercise = exercises[ Math.floor(Math.random() * exercises.length) ];
    setItemex(exercise);
    setSeconds(0);
  }

  return (
    <div className="exercises">
    <Row>
      <Col xs="12" md="6" lg="6">
        <div className="exercise-images">
          {itemex.images.map((item, index) => (
            <img alt="ex" className={ active === index ? 'active' : '' } key={index} src={item.src} />
          ))}
        </div>
      </Col>
      <Col xs="12" md="6" lg="6">
          <h2 className="subtitle">{itemex.name}</h2>
          {penalty === 0 && <Alert variant="success">
            <Alert.Heading># of Reps</Alert.Heading>
              <p>Do: {itemex.reps + finalreps}</p>
            </Alert>}
          {penalty > 0 && <Alert variant="danger">
            <Alert.Heading>You Fail</Alert.Heading>
              <p>
                Total reps to do: {itemex.reps + finalreps + penalty}
              </p>
            </Alert>}
      </Col>
    </Row>
    </div>
  )
}

export default Exercise;