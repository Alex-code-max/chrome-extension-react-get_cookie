import React, { useState } from 'react';
import { Button, Input, Row, Col } from '@douyinfe/semi-ui';
import { CookieKeysEnum, Login_Status } from '../../../utils/enum';
import './Popup.css';

const Popup = () => {
  const [SRE_COOKIE, setSRE_COOKIE] = useState({
    status: Login_Status[1],
    value: '',
  });
  const [PAAS_COOKIE, setPAAS_COOKIE] = useState({
    status: Login_Status[1],
    value: '',
  });

  const handleGetSRECookie = () => {
    chrome.runtime.sendMessage({ action: 'SRE_GET_COOKIE' }, (response) => {
      setSRE_COOKIE(response.SRE_COOKIE);
    });
  };

  const handleGetPAASCookie = () => {
    chrome.runtime.sendMessage({ action: 'PAAS_GET_COOKIE' }, (response) => {
      setPAAS_COOKIE(response.PAAS_COOKIE);
    });
  };

  const handleWriteSREToLocal = () => {
    chrome.runtime.sendMessage({
      action: 'RES_SET_COOKIE',
      payload: SRE_COOKIE.value,
    });
  };

  const handleWritePAASToLocal = () => {
    chrome.runtime.sendMessage({
      action: 'PAAS_SET_COOKIE',
      payload: PAAS_COOKIE.value,
    });
  };

  return (
    <div className="App">
      <h3 className="title">获取SRE & PAAS cookie</h3>
      {/* <Stack horizontal tokens={stackTokens}> */}
      <div className="content">
        <h3 className="project">
          SRE
          {SRE_COOKIE.status === Login_Status[0] && (
            <span className="unlogin-text">（未找到cookie，请重新登录）</span>
          )}
        </h3>
        <Button
          theme="solid"
          type="secondary"
          block
          onClick={handleGetSRECookie}
        >
          Get SRE Cookie
        </Button>
        <div>
          <div>key：{CookieKeysEnum.SRE.key}</div>
          <Row>
            <Col span={4}>value：</Col>
            <Col span={14}>
              <Input value={SRE_COOKIE.value} />
            </Col>
            <Col span={6}>
              <Button
                theme="borderless"
                type="primary"
                disabled={!SRE_COOKIE.value}
                onClick={handleWriteSREToLocal}
              >
                写入本地
              </Button>
            </Col>
          </Row>
        </div>
      </div>
      <div className="content">
        <h3 className="project">
          PAAS
          {PAAS_COOKIE.status === Login_Status[0] && (
            <span className="unlogin-text">（未找到cookie，请重新登录）</span>
          )}
        </h3>
        <Button
          theme="solid"
          type="secondary"
          block
          onClick={handleGetPAASCookie}
        >
          Get PAAS Cookie
        </Button>
        <div>
          <div>key：{CookieKeysEnum.PAAS.key}</div>
          <Row>
            <Col span={4}>value：</Col>
            <Col span={14}>
              <Input value={PAAS_COOKIE.value} />
            </Col>
            <Col span={6}>
              <Button
                theme="borderless"
                type="primary"
                disabled={!PAAS_COOKIE.value}
                onClick={handleWritePAASToLocal}
              >
                写入本地
              </Button>
            </Col>
          </Row>
        </div>
      </div>
      {/* </Stack> */}
    </div>
  );
};

export default Popup;
