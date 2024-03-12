// TODO: 监听cookie变化，重新获取cookie
import { CookieKeysEnum, Login_Status } from '../../../utils/enum';

let SRE_COOKIE = {
  status: Login_Status[1],
  value: '',
};
let PAAS_COOKIE = { status: Login_Status[1], value: '' };

chrome.cookies.getAll(
  {
    domain: CookieKeysEnum.SRE.qa_domain,
    name: CookieKeysEnum.SRE.key,
  },
  function (cookie) {
    if (!cookie?.[0]?.value) {
      SRE_COOKIE.status = Login_Status[0];
      SRE_COOKIE.value = '';
    } else {
      SRE_COOKIE.status = Login_Status[1];
      SRE_COOKIE.value = cookie?.[0]?.value;
    }
  }
);
chrome.cookies.getAll(
  {
    domain: CookieKeysEnum.PAAS.qa_domain,
    name: CookieKeysEnum.PAAS.key,
  },
  function (cookie) {
    if (!cookie?.[0]?.value) {
      PAAS_COOKIE.status = Login_Status[0];
      PAAS_COOKIE.value = '';
    } else {
      PAAS_COOKIE.status = Login_Status[1];
      PAAS_COOKIE.value = cookie?.[0]?.value;
    }
  }
);

chrome.runtime.onMessage.addListener(
  ({ action, payload }, sender, sendResponse) => {
    switch (action) {
      case 'SRE_GET_COOKIE':
        GET_SRE_COOKIE().then(sendResponse);
        return true;
      case 'PAAS_GET_COOKIE':
        GET_PAAS_COOKIE().then(sendResponse);
        return true;
      case 'RES_SET_COOKIE':
        SET_SRE_COOKIE(payload);
        break;
      case 'PAAS_SET_COOKIE':
        SET_PAAS_COOKIE(payload);
        break;
      default:
        break;
    }
  }
);

function GET_SRE_COOKIE() {
  return new Promise((resolve) => {
    resolve({ SRE_COOKIE });
  });
}

function GET_PAAS_COOKIE() {
  return new Promise((resolve) => {
    resolve({ PAAS_COOKIE });
  });
}

function SET_SRE_COOKIE(msg) {
  chrome.cookies.set({
    url: CookieKeysEnum.SRE.local_url,
    name: CookieKeysEnum.SRE.key,
    value: msg,
  });
}

function SET_PAAS_COOKIE(msg) {
  chrome.cookies.set({
    url: CookieKeysEnum.PAAS.local_url,
    name: CookieKeysEnum.PAAS.key,
    value: msg,
  });
}
