const api = require('./api');
const sendAPI = require('./send');
//const awsIoT = require('../iot-api/aws')
const awsIoTShadow = require('../iot-api/shadow')

const postbackHandler = {};

const addPostback = (postback, handler) => {
  postbackHandler[postback] = handler;
}

const getHandler = (postback) => {
  return postbackHandler[postback];
};

addPostback("/board", (recipientId) => {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "button",
          "text": "메뉴판 확인해주세요",
          "buttons": [
            {
              "type": "postback",
              "title": "메인메뉴판",
              "payload": "/board/main"
            },
            {
              "type": "postback",
              "title": "이벤트메뉴판",
              "payload": "/board/event"
            },
          ]
        }
      }
    }
  };
  api.callMessagesAPI(messageData);
})

addPostback("/board/main", (recipientId) => {
  sendAPI.sendImageMessage(recipientId)
  // SpringBoot 와 연결한다;
})
addPostback("/board/event", (recipientId) => {
  sendAPI.sendGenericMessage(recipientId)
  // SpringBoot 와 연결한다;
})

addPostback("/store", (recipientId) => {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "button",
          "text": "매장 관리해주세요",
          "buttons": [
            {
              "type": "postback",
              "title": "온도",
              "payload": "/store/temperature"
            },
            {
              "type": "postback",
              "title": "습도",
              "payload": "/store/humidity"
            },
            {
              "type": "postback",
              "title": "미세먼지",
              "payload": "/store/dust"
            }
          ]
        }
      }
    }
  };
  api.callMessagesAPI(messageData);
})
addPostback("/store/temperature", (recipientId) => {
  sendAPI.sendTextMessage(recipientId, '현재온도:');
})


addPostback("/store/humidity", (recipientId) => {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "button",
          "text": "가습기 on/off 제어 해주세요",
          "buttons": [
            {
              "type": "postback",
              "title": "가습기 on",
              "payload": "/store/humidity/on"
            },
            {
              "type": "postback",
              "title": "가습기 off",
              "payload": "/store/humidity/off"
            },
            {
              "type": "postback",
              "title": "메인으로",
              "payload": "/menu"
            }
          ]
        }
      }
    }
  };
  sendAPI.sendTextMessage(recipientId, '현재 실내 습도 : ');
  api.callMessagesAPI(messageData);
})

addPostback("/store/humidity/on", (recipientId) => {
  sendAPI.sendTextMessage(recipientId, '가습기 켭니다');
  // awsIoT.publish('dev01', 'topic_1', {
  //   message: 'humidity on',
  //   humidifier: 'on'
  // });
  // awsIoTShadow.update({humidifier:on});
})

addPostback("/store/humidity/off", (recipientId) => {
  sendAPI.sendTextMessage(recipientId, '가습기 끕니다');
  // awsIoT.publish('dev01', 'topic_1', {
  //   message: 'humidity off',
  //   humidifier: 'off'
  // });
  // awsIoTShadow.update({humidifier:off});
})


addPostback("/store/dust", (recipientId) => {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "button",
          "text": "환풍기 on/off 제어 해주세요",
          "buttons": [
            {
              "type": "postback",
              "title": "환풍기 on",
              "payload": "/store/dust/on"
            },
            {
              "type": "postback",
              "title": "환풍기 off",
              "payload": "/store/dust/off"
            },
            {
              "type": "postback",
              "title": "메인으로",
              "payload": "/menu"
            }
          ]
        }
      }
    }
  };
  sendAPI.sendTextMessage(recipientId, '현재 미세먼지농도 : ');
  api.callMessagesAPI(messageData);
})

addPostback("/store/dust/on", (recipientId) => {
  sendAPI.sendTextMessage(recipientId, '환풍기 켭니다');
  
})

addPostback("/store/dust/off", (recipientId) => {
  sendAPI.sendTextMessage(recipientId, '환풍기 끕니다');
})



addPostback("/menu", (recipientId) => {
  var messageData = {
    recipient: {
      id: recipientId
    },

    message: {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "button",
          "text": "옵션을 보고싶으세요? 아래에서 탭 해주세요.",
          "buttons": [
            {
              "type": "postback",
              "title": "메뉴판",
              "payload": "/board" // 버튼 클릭 시, 서버에 다시 보내지는 값; postback-handler 에 구현
            },
            {
              "type": "postback",
              "title": "매장관리",
              "payload": "/store"
            }
          ]
        },
      }
    }

  };

  api.callMessagesAPI(messageData);
})


module.exports = {
  getHandler
};
