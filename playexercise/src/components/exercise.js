import React, {useState, useEffect} from 'react';
import { Row, Col} from 'react-bootstrap';
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
    console.log(active);
    console.log(itemex.images);

    if ((active+1) >= itemex.images.length) {
      setActive(() => 0);
    } else {
      setActive(() => active+1);
    }

    if (isRunning) {
      setfinalreps(() => seconds);
    }

  }, [seconds, isRunning]);

  useEffect(() => {
    getRandomExercise();
  }, [getExercise]);

  const getRandomExercise = () => {
    const exercise = exercises[ Math.floor(Math.random() * exercises.length) ];
    setItemex(exercise);
    setSeconds(0);
  }

  return (
    <div className="exercises mv-2">
    <Row>
      <Col xs="12" md="12" lg="6">
        <div className="exercise-images card-container">
          {itemex.images.map((item, index) => (
            <img alt="ex" className={ active === index ? 'active' : '' } data-index={index} key={index} src={item.src} />
          ))}
        </div>
      </Col>
      <Col xs="12" md="12" lg="6">
        <div className="card-container p-3 exercise-info">
          <h2 className="subtitle space-vertical-2">{itemex.name}</h2>
          {penalty === 0 &&
              <div>
                <p className="reps-label">Reps to do: {itemex.reps + finalreps}</p>
              </div>
            }
          {penalty > 0 &&
              <div>
                <p className="reps-label penalty-label">
                  Reps to do: {itemex.reps + finalreps + penalty}
                </p>
              </div>
            }
        </div>
      </Col>
    </Row>
    </div>
  )
}

export default Exercise;