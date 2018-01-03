const signInUserMessage = (username) => {
    return {
      text: `환영합니다, ${username}님!`,
    };
  };


  module.exports =  {
    signInUserMessage,
  };
  