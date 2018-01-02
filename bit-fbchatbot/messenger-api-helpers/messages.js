const getStarted = {
  "greeting":[
    {
      "locale":"default",
      "text":"Hello {{user_first_name}}!"
    }
  ],
    setting_type: 'call_to_actions',
    thread_state: 'new_thread',
    call_to_actions: [
      {
        //payload: JSON.stringify({
          //type: 'GET_STARTED',
        //}),
        payload: 'GET_STARTED'
      },
      
    ],
  
  }
  const signInButton = {
    type: 'account_link',
    //url: `${SERVER_URL}/users/login`,
    url: `https://www.bangyeonju.xyz:9999/users/login`
  };
  module.exports =  {
    getStarted,
    signInButton
  };
  