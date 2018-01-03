const castArray = require("lodash/castArray")
const api = require('./api')
const messages = require("./messages")

// 기존 함수
const sendTextMessage = (recipientId, messageText) => {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };
  api.callMessagesAPI(messageData);
};

const sendImageMessage = (recipientId) => {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: "메인 메뉴 사진",
            subtitle: "메뉴 사진",
            image_url: "http://www.bloter.net/wp-content/uploads/2016/08/%EC%8A%A4%EB%A7%88%ED%8A%B8%ED%8F%B0-%EC%82%AC%EC%A7%84-765x519.jpg",
            
            buttons: [{
              type: "web_url",
              url: "http://www.jawsfood.co.kr/?page_id=202",
              title: "사이트 방문"
            },{
              type: "postback",
              payload: "/menu",
              title: "메인으로"
            }]

          }]
        }
      }
    }
  }; 
  api.callMessagesAPI(messageData);
};


const sendGenericMessage = (recipientId) => {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: "이벤트 메뉴 사진 1",
            subtitle: "12월달 신메뉴",
            image_url: "http://www.bloter.net/wp-content/uploads/2016/08/%EC%8A%A4%EB%A7%88%ED%8A%B8%ED%8F%B0-%EC%82%AC%EC%A7%84-765x519.jpg",
            
            buttons: [{
              type: "web_url",
              url: "http://www.jawsfood.co.kr/?page_id=202",
              title: "사이트 방문"
            },{
              type: "postback",
              payload: "/menu",
              title: "메인으로"
            }
          ]

          }, {
            title: "이벤트 메뉴 사진 2",
            subtitle: "할인 이벤트",
            image_url: "http://www.bloter.net/wp-content/uploads/2016/08/%EC%8A%A4%EB%A7%88%ED%8A%B8%ED%8F%B0-%EC%82%AC%EC%A7%84-765x519.jpg",

            buttons: [{
              type: "web_url",
              url: "http://www.jawsfood.co.kr/?page_id=206",
              title: "사이트 방문"
            },{
              type: "postback",
              payload: "/menu",
              title: "메인으로"
            }]
            
          },{
            title: "이벤트 메뉴 사진 3",
            subtitle: "적립 이벤트",
            image_url: "http://www.bloter.net/wp-content/uploads/2016/08/%EC%8A%A4%EB%A7%88%ED%8A%B8%ED%8F%B0-%EC%82%AC%EC%A7%84-765x519.jpg",

            buttons: [{
              type: "web_url",
              url: "http://www.jawsfood.co.kr/?page_id=202",
              title: "사이트 방문"
            },{
              type: "postback",
              payload: "/menu",
              title: "메인으로"
            }]
            
          },{
            title: "이벤트 메뉴 사진 4",
            subtitle: "공짜 이벤트",
            image_url: "http://www.bloter.net/wp-content/uploads/2016/08/%EC%8A%A4%EB%A7%88%ED%8A%B8%ED%8F%B0-%EC%82%AC%EC%A7%84-765x519.jpg",

            buttons: [{
              type: "web_url",
              url: "http://www.jawsfood.co.kr/?page_id=206",
              title: "사이트 방문"
            },{
              type: "postback",
              payload: "/menu",
              title: "메인으로"
            }]
            
          }]
        }
      }
    }
  };  
  api.callMessagesAPI(messageData);
};


const typingOn = (recipientId) => {
  return {
    recipient: {
      id: recipientId,
    },
    sender_action: 'typing_on', // eslint-disable-line camelcase
  };
};
// Turns typing indicator off.
const typingOff = (recipientId) => {
  return {
    recipient: {
      id: recipientId,
    },
    sender_action: 'typing_off', // eslint-disable-line camelcase
  };
};
// Wraps a message json object with recipient information.
const messageToJSON = (recipientId, messagePayload) => {
  return {
    recipient: {
      id: recipientId,
    },
    message: messagePayload,
  };
};
// Send one or more messages using the Send API.
const sendMessage = (recipientId, messagePayloads) => {
  const messagePayloadArray = castArray(messagePayloads)
    .map((messagePayload) => messageToJSON(recipientId, messagePayload));

  api.callMessagesAPI(
    [
      typingOn(recipientId),
      ...messagePayloadArray,
      typingOff(recipientId),
    ]);
};

const sendSignInSuccessMessage = (recipientId, username) => {
  sendMessage(
    recipientId,
    [
      messages.signInGreetingMessage(username),
    ]);
    // var handler = messageHandler.getHandler("메뉴")
    //  handler(recipientId)   
    
};  

module.exports = {

  sendTextMessage,
  sendGenericMessage,
  sendImageMessage,
  sendSignInSuccessMessage,
  sendMessage


};
