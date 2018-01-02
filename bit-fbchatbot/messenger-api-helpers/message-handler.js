const api = require('./api');
const sendAPI = require('./send');
const openAPI = require('../rest-api/openapi');

//message를 받았을 때 그 메시지를 처리할 함수를 보관하는 빈 객체.
const messageHandler = {

};


const signInButton = {

  type: 'account_link',
  "url":"https://www.bangyeonju.xyz:9999/login3.html"
  //"url":"https://www.subeenk.xyz:9999/login-complete"
};

const signOutButton = {type: 'account_unlink'};

const signInSuccessMessage = {
  attachment: {
    type: 'template',
    payload: {
      template_type: 'button',
      text: 'Now you’ll have full access to your order history and shopping list.',
      buttons: [signOutButton],
    },
  },
};

const signOutSuccessMessage = {
  attachment: {
    type: 'template',
    payload: {
      template_type: 'button',
      text: 'You’ve been logged out of your Jasper’s account.',
      buttons: [signInButton],
    },
  },
};


const addMessage = (message, handler) => {
  messageHandler[message] = handler;
}

const getHandler = (message) => {
  return messageHandler[message];
};

addMessage('help', (recipientId) => {
  var messageData= {
    recipient: {
      id: recipientId
    },
    message: {
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"button",
          "text":"메뉴",
          "buttons":[
            {
              "type":"postback",
              "title":"LED",
              "payload":"/led"
            },
            {
              "type":"postback",
              "title":"계산기",
              "payload":"/calc"
            },
            {
              "type":"postback",
              "title":"주소검색",
              "payload":"/addr"
            }
          ]
        }
      }
    }
  };
  api.callMessagesAPI(messageData);
});

addMessage('login', (recipientId) => {
  console.log('=====================>')
  //console.log(signInButton);
  var messageData= {
    recipient: {
      id: recipientId
    },
    message: {
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"button",
          "text":"로그인",
          "buttons":[signInButton]
        }
      }
    }
  };
  api.callMessagesAPI(messageData);
});

addMessage('/calc', (recipientId, messageText) => {
  try{
    var tokens = messageText.split(' ');
    if (tokens.length != 3)
      throw '계산 형식 오류';

    var a = parseInt(tokens[0]);
    var op = tokens[1];
    var b = parseInt(tokens[2]);
    var result = 0;
    switch (op) {
      case '+': result = a + b; break;
      case '-': result = a - b; break;
      case '*': result = a * b; break;
      case '/': result = a / b; break;
      case '%': result = a % b; break;

      default:
        sendAPI.sendTextMessage(recipientId,
          '+','-','*','/','% 연산자만 사용할 수 있습니다.')
        return;

      }
      sendAPI.sendTextMessage(recipientId,
        '계산 결과는 ' + result + ' 입니다.')


  } catch(exception){
    sendAPI.sendTextMessage(recipientId,
      '계산식이 옳지 않습니다.\n 예) a + b')
  }
});

addMessage('/addr/road', (recipientId, messageText) => {
    try{
      openAPI.searchNewAddress('road',messageText, (msg) => {
        sendAPI.sendTextMessage(recipientId, msg);
      });
    }catch(err){
      console.log(err);
    }
});
addMessage('/addr/dong', (recipientId, messageText) => {
    try{
      openAPI.searchNewAddress('dong',messageText, (msg) => {
        sendAPI.sendTextMessage(recipientId, msg);
      });
    }catch(err){
      console.log(err);
    }
});
addMessage('/addr/post', (recipientId, messageText) => {
    try{
      openAPI.searchNewAddress('post',messageText, (msg) => {
        sendAPI.sendTextMessage(recipientId, msg);
      });
    }catch(err){
      console.log(err);
    }
});

module.exports = {
  getHandler,
  signOutSuccessMessage,
  signInSuccessMessage
};
