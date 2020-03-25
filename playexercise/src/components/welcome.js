import React, {useState, useRef} from 'react';
import Exercise from './exercise';
import { evaluate } from 'mathjs'
import {Button, Container, Row, Col, Badge, Modal} from 'react-bootstrap';
import logo from '../images/aramfit.png';

const Welcome = () => {
  const [calculation, setCalculation] = useState('');
  const [cipheractive, setCipheractive] = useState('hidden');
  const [response, setResponse] = useState([]);
  const [level, setLevel] = useState(1);
  const [answer, setAnswer] = useState('-');
  const [opresult, setOpresult] = useState(0);
  const [badge, setBadge] = useState('success');
  const [randomExercise, setRandomExercise] = useState('');
  const [penalty, setPenalty] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [show, setShow] = useState(false);
  const refContainer = useRef();

  
  const getOperationsByLevel = () => {
    let operations = [];
    let numbers = 0;
    let finalOperation = [];
    let index = 10;

    switch (level) {
      case '1':
        numbers = 2;
        operations = ['+', '-'];
        break;
      case '2':
        numbers = 3;
        operations = ['+', '-'];
        break;
      case '3':
        numbers = 4;
        operations = ['+', '-', '*'];
        index = 20;
        break;
      case '4':
        numbers = 5;
        operations = ['+', '-', '*'];
        index = 30;
        break;
      case '5':
        numbers = 6;
        operations = ['+', '-', '*'];
        index = 100;
        break;
    
      default:
        numbers = 2;
        operations = ['+', '-'];
        index = 10;
        break;
    }

    for (let i=1; i<= numbers; i++) {
      const randomOperation = getRandomValueFromArray(operations);
      const randomNumber = getRandomNumber(index);

      finalOperation.push(randomNumber);
      finalOperation.push(randomOperation);
    }

    finalOperation.pop();
    
    const resultText = finalOperation.join(' ').toString();
    const result = evaluate(finalOperation.join(' '));
    const responseArray = [];

    let val1 = getRandomNumber(index, [result]);
    let val2 = getRandomNumber(index, [val1, result]);

    
    responseArray.push(result);
    responseArray.push(val1);
    responseArray.push(val2);

    setCalculation(resultText);
    setResponse(responseArray);
    setOpresult(parseInt(result));
  }

  const getRandomValueFromArray = (items) => {
    return items[Math.floor(Math.random() * items.length)];
  }

  const getRandomNumber = (index, excludes = []) => {
    const indexes = [];

    for (let i=0; i<= index; i++){
      indexes.push(i);
    }

    if (excludes.length > 0) {
      for (let i=0; i<= excludes.length-1; i++){
        indexes.splice(excludes[i], 1);
      } 
    }
    return getRandomValueFromArray(indexes);
  }

  const startGame = (e) => {
    getOperationsByLevel(level);    
    setCipheractive('');
    setAnswer('');
    setRandomExercise(getRandomNumber(45));
    setIsRunning(true);
    setPenalty(0);
  }

  const selectLevel = (e) => {
    setLevel(e.target.value)
  }

  const selectAnswer = (e) => {
    const selectedValue = e.target.value;
    
    console.log(selectedValue)
    console.log(opresult);

    if (+selectedValue !== +opresult) {
      setBadge('danger');
      setAnswer('ERROR!');
      setPenalty(10);
    } else {
      setBadge('success');
      setAnswer('PERFECT!');
      setPenalty(0);
    }

    setIsRunning(false);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  return (
    <Container>
      <Row className="justify-content-center intro">
        <Col xs="6" md="3" lg="3">
          <img className="logo" src={logo} alt="aramfit" />
        </Col>
        <Col xs="6" md="3" lg="3">
          <h1 className="title">BrainFit</h1>
        </Col>
        <Col xs="12" md="6" lg="6" className="music">
          <iframe title="spotify" src="https://open.spotify.com/embed/album/2lUZ9w5P1SCM1yViaQNfuA?si=29jdLn4US8qdTG4ZjRCrBw" className="musicplayer" allowtransparency="true" allow="encrypted-media"></iframe>
        </Col>
      </Row>
      <Row className="description">
        <Col xs="12" md="12" lg="12">
          <Button variant="success" onClick={handleShow} ref={refContainer}>
            How to play
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>How to play</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>A random math problem will be shown after you start and a random exercise will be selected, this exercise
              has a base number of repetitions, this number will increase each second you take to solve the math problem.
              If you fail your response, you will be penalized with an extra exercise added to the exercise showed.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <h2 className="subtitle">Difficult level: {level}</h2>
          <div className="levels">
            <Button onClick={selectLevel} variant="secondary" value="1" type="button">1</Button>
            <Button onClick={selectLevel} variant="info" value="2" type="button">2</Button>
            <Button onClick={selectLevel} variant="success" value="3" type="button">3</Button>
            <Button onClick={selectLevel} variant="warning" value="4" type="button">4</Button>
            <Button onClick={selectLevel} variant="danger" value="5" type="button">5</Button>
          </div>
          <Button onClick={startGame} className="btn-full" type="button">Start</Button>
        </Col>
      </Row>
      <Row className={cipheractive}>
        <Col xs="12" md="12" lg="12">
          
          <p className="calculation">{calculation}</p>
            
          <div className="response">
            <h2 className="subtitle">Select Your answer: <Badge variant={badge}>{answer}</Badge>{' '}</h2>
            { response.map((item, index) => (
              <Button variant="warning" onClick={selectAnswer} value={item} key={index}>{item}</Button>
            ))}
          </div>
          <div>
            <Exercise getExercise={randomExercise} penalty={penalty} isRunning={isRunning} />
          </div>
          
          
        </Col>
      </Row>
    </Container>
  )
}

export default Welcome;