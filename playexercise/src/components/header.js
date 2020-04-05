import React from 'react';
import { Row, Col} from 'react-bootstrap';
import logo from '../images/aramfit.png';

const Header = () => {
  return (
    <Row className="justify-content-center intro">
      <Col xs="4" md="6" lg="6">
        <img className="logo" src={logo} alt="aramfit" />
      </Col>
      <Col xs="8" md="6" lg="6" className="music">
        <iframe title="music" className="musicplayer" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/10373213&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
      </Col>
    </Row>
  )
}

export default Header;