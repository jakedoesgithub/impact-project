const tokenProvider = new Chatkit.TokenProvider({
    url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/ebb0cc35-1da6-490e-845a-8fa9d9026a1a/token"
  });
  
  const chatManager = new Chatkit.ChatManager({
    instanceLocator: "v1:us1:ebb0cc35-1da6-490e-845a-8fa9d9026a1a",
    userId: "YOUR USER ID",
    tokenProvider: tokenProvider
  });

  export {chatManager, tokenProvider}