const getStarted = {
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
    "greeting":[
     {
        "locale":"en_US",
        "text":"Timeless apparel for the masses."
      }
    ]
  
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
  