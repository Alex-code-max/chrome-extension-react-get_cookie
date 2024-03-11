console.log('This is the background page.');
console.log('Put the background scripts here.');
let SRE_COOKIE = '';
let PAAS_COOKIE = '';

//TODO:
// 1. 监听cookie变化，重新获取cookie
// 2. 根据拿到的cookie直接设置到本地，达到让本地调用测试环境接口

chrome.cookies.getAll(
  {
    domain: '.tcshuke.com',
    name: '__AUTHZ_SSO_TICKET__',
  },
  function (cookie) {
    console.log('cookie :>> ', cookie);
    SRE_COOKIE = cookie?.[0]?.value;
  }
);
chrome.cookies.getAll(
  {
    domain: '.itcjf.com',
    name: 'orion_sso_token',
  },
  function (cookie) {
    PAAS_COOKIE = cookie?.[0]?.value;
  }
);

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.foo === 'SRE') {
    GET_SRE_COOKIE(msg).then(sendResponse);
  } else if (msg.foo === 'PAAS') {
    GET_PAAS_COOKIE(msg).then(sendResponse);
  }
  return true;
});

function GET_SRE_COOKIE(msg) {
  return new Promise((resolve) => {
    resolve({ SRE_COOKIE });
  });
}

function GET_PAAS_COOKIE(msg) {
  return new Promise((resolve) => {
    resolve({ PAAS_COOKIE });
  });
}
