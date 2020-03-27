import React, {useState} from 'react';
import Exercise from './exercise';
import Timer from './timer';
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
  const [isStarted, setIsStarted] = useState(false);
  const [slide1, setSlide1] = useState('');
  const [slide2, setSlide2] = useState('hidden');
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState({
    title: '',
    message: ''
  });

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

    let val1 = getRandomNumber(index, [result]) - result;
    let val2 = getRandomNumber(index, [val1, result]) + result + 6;

    responseArray.push(result);
    responseArray.push(val1);
    responseArray.push(val2);

    const buttonsPosition = getRandomValueFromArray([0,1,2]);
    const finalArray = arrayRotate(responseArray, buttonsPosition);

    setCalculation(resultText);
    setResponse(finalArray);
    setOpresult(parseInt(result));
  }

  const getRandomValueFromArray = (items) => {
    return items[Math.floor(Math.random() * items.length)];
  }

  const arrayRotate = (arr, count) => {
    count -= arr.length * Math.floor(count / arr.length);
    arr.push.apply(arr, arr.splice(0, count));
    return arr;
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
    setIsStarted(true);
    getOperationsByLevel(level);
    setCipheractive('');
    setAnswer('');
    setRandomExercise(getRandomNumber(45));
    setIsRunning(true);
    setPenalty(0);
    setSlide2('');
    setSlide1('hidden');
  }

  const nextExercise = () => {
    getOperationsByLevel(level);
    setCipheractive('');
    setAnswer('');
    setRandomExercise(getRandomNumber(45));
    setIsRunning(true);
    setPenalty(0);
  }

  const returnToIntro = () => {
    setSlide2('hidden');
    setSlide1('');
    setIsRunning(false);
  }

  const selectLevel = (e) => {
    setLevel(e.target.value)
  }

  const selectAnswer = (e) => {
    const selectedValue = e.target.value;

    if (isRunning) {
      if (+selectedValue !== +opresult) {
        setBadge('danger');
        setAnswer('Error!');
        setPenalty(10);
      } else {
        setBadge('success');
        setAnswer('Excellent!');
        setPenalty(0);
      }
    }

    setIsRunning(false);
  }

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
    const btnModal = e.currentTarget.dataset.modal;
    if (btnModal === 'howto') {
      setModal({
        title: 'How To Play',
        message: `A random math problem will be shown after you start and a random exercise will be selected, this exercise
        has a base number of repetitions, this number will increase each second you take to solve the math problem.
        If you fail your response, you will be penalized with 10 extra repetitions.`
      });
    } else if(btnModal === 'disclaimer') {
      setModal({
        title: 'Disclaimer',
        message: `Fitbrain strongly recommends that you consult with your physician before beginning any exercise program.
        You should be in good physical condition and be able to participate in the exercise. Fitbrain is not a licensed
        medical care provider and represents that it has no expertise in diagnosing, examining, or treating medical conditions of any kind,
        or in determining the effect of any specific exercise on a medical condition.`
      });
    } else {
      setModal({
        title: 'Copyright',
        message: `All the images are property of The American Council on Exercise (ACE).`
      });
    }
  }
  return (
    <Container>
      <div className="wrapper">
        <div className={slide1 + ' slide1'}>
          <Row className="justify-content-center intro">
            <Col xs="4" md="6" lg="6">
              <img className="logo" src={logo} alt="aramfit" />
            </Col>
            <Col xs="8" md="6" lg="6" className="music">
              <iframe title="music" className="musicplayer" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/10373213&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
            </Col>
          </Row>
          <Row className="mv-2">
            <Col xs="4" md="4" lg="4" className="info-bl p-1">
              <a onClick={handleShow} data-modal="howto" href="/">How to Play</a>
            </Col>
            <Col xs="4" md="4" lg="4" className="info-bl p-1">
              <a onClick={handleShow} data-modal="disclaimer" href="/">Disclaimer</a>
            </Col>
            <Col xs="4" md="4" lg="4" className="info-bl p-1">
              <a onClick={handleShow} data-modal="copy" href="/">Copyright</a>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{modal.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>{modal.message}</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
          </Row>
          <Row className="mv-5">
            <Col xs="12" md="12" lg="6">
              <div className="card-container p-2">
                <h1 className="title">Fitbrain</h1>
                <h4 className="label">Select Difficult level</h4>
                <div className="levels">
                  <Button onClick={selectLevel} value="1" type="button">Easy</Button>
                  <Button onClick={selectLevel} value="2" type="button">Medium</Button>
                  <Button onClick={selectLevel} value="3" type="button">Hard</Button>
                  <Button onClick={selectLevel} value="4" type="button">Super Hard</Button>
                  <Button onClick={selectLevel} value="5" type="button">Impossible</Button>
                </div>
              </div>
            </Col>
            <Col xs="12" md="12" lg="6">
                <div className="label-footer">
                  <div className="card-container p-2">
                    {level && <p>Level selected: {level}</p>}
                    <Button onClick={startGame} variant="success" className="fullw btnstart" type="button">Start</Button>
                  </div>
                </div>
            </Col>
          </Row>
        </div>
        <div className={slide2 + ' slide2'}>
          <Row className="justify-content-center intro">
            <Col xs="4" md="6" lg="6">
              <img className="logo" src={logo} alt="aramfit" />
            </Col>
            <Col xs="8" md="6" lg="6" className="music">
              <iframe title="music" className="musicplayer" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/10373213&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
            </Col>
          </Row>
          <Row className="cardblock">
            <Col xs= "12" md="12" lg="12">
              <div className="card-container bg-w p-2 mv-2">
                <p className="small-title">Resolve</p>
                <p className="calculation">{calculation}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="12" lg="12">
              <div className="card-container p-2">
                <p className="small-title">Answers:</p>
                {answer && <div className={(penalty > 0 ? 'alert-result error': 'alert-result')}>
                  <p>{answer}</p>
                  <Button onClick={nextExercise} variant="success" value="1" type="button">Next Exercise</Button>
                </div>}
                {!answer &&
                  <div className="response">
                    { response.map((item, index) => (
                      <Button onClick={selectAnswer} value={item} key={index}>{item}</Button>
                    ))}
                  </div>
                }
              </div>
            </Col>
              <Col xs="12" md="12" lg="12">
              <div>
                <Exercise getExercise={randomExercise} penalty={penalty} isRunning={isRunning} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs= "12" md="12" lg="12">
              <div className="card-container p-2">
                {isStarted && <Timer />}
                <Button onClick={returnToIntro} className="fullw btnstart" variant="success" value="1" type="button">Return</Button>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  )
}

export default Welcome;