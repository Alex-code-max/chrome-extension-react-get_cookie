import React, { useState } from 'react';
import { Button, Input, Row, Col } from '@douyinfe/semi-ui';
import './Popup.css';

const Popup = () => {
  const [SRE_COOKIE, setSRE_COOKIE] = useState('');
  const [PAAS_COOKIE, setPAAS_COOKIE] = useState('');

  const handleGetSRECookie = () => {
    chrome.runtime.sendMessage({ foo: 'SRE' }, (response) => {
      setSRE_COOKIE(response.SRE_COOKIE);
    });
  };

  const handleGetPAASCookie = () => {
    chrome.runtime.sendMessage({ foo: 'PAAS' }, (response) => {
      setPAAS_COOKIE(response.PAAS_COOKIE);
    });
  };

  return (
    <div className="App">
      <h3 className="title">获取SRE & PAAS cookie</h3>
      {/* <Stack horizontal tokens={stackTokens}> */}
      <div className="content">
        <h3 className="project">SRE</h3>
        <Button
          theme="solid"
          type="secondary"
          block
          onClick={handleGetSRECookie}
        >
          Get SRE Cookie
        </Button>
        <div>
          <div>key：__AUTHZ_SSO_TICKET__</div>
          <Row>
            <Col span={4}>value：</Col>
            <Col span={20}>
              <Input value={SRE_COOKIE} />
            </Col>
          </Row>
        </div>
      </div>
      <div className="content">
        <h3 className="project">PAAS</h3>
        <Button
          theme="solid"
          type="secondary"
          block
          onClick={handleGetPAASCookie}
        >
          Get PAAS Cookie
        </Button>
        <div>
          <div>key：orion_sso_token</div>
          <Row>
            <Col span={4}>value：</Col>
            <Col span={20}>
              <Input value={PAAS_COOKIE} />
            </Col>
          </Row>
        </div>
      </div>
      {/* </Stack> */}
    </div>
  );
};

export default Popup;
