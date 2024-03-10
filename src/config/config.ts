import { join } from 'path';

export interface ConfigInterface {
  get(name: string): string | object | number | void;
  getWebHookpath(name: string): string | object | number | void;
}

class Config implements ConfigInterface{
  state = {
    host: 'https://bot-express-vercel-kik-80.vercel.app/',
    port: 5001,
    tokenBot: '6884974307:AAEN0vj63vJ0ntxRoVSiqSnupPg3S2h7ymc',
    secretHook: '/secret-code/',
    firebaseAuthConfig: {
      apiKey: "AIzaSyDArYuP8lbb94JbErr6Y3xKwQS2oPE_zTc",
      authDomain: "t-b-kik-80.firebaseapp.com",
      projectId: "t-b-kik-80",
      storageBucket: "t-b-kik-80.appspot.com",
      messagingSenderId: "513130161339",
      appId: "1:513130161339:web:10285471a898b1a7f5759e",
      measurementId: "G-D1X8CLDW6X"
    },
    serviceAccount: join(__dirname, './','t-b-kik-80-firebase-adminsdk-9tb50-407289ee90.json')
  }
  get(name: string)  {
    switch(name){
      case 'token-bot':
        return this.state.tokenBot;
      case 'host':
        return this.state.host;
      case 'fb-config':
        return this.state.firebaseAuthConfig;
      case 'serviceAccount':
        return this.state.serviceAccount;
      case 'port':
        return this.state.port;
        default: null;
    }
  }

  getWebHookpath(name: string){
    switch(name){
      case 'full':
        return this.state.host + this.state.secretHook + this.state.tokenBot;
      case 'shot':
        return this.state.secretHook + this.state.tokenBot;
      default: null;
    }
  }
}

export let config = new Config();
