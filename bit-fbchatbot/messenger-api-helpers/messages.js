
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
    greeting:[
        {
          "locale":"default",
          "text":"Hello {{user_first_name}}!"
        }
      ]
  
  }
  module.exports =  {
    getStarted,
  };
  