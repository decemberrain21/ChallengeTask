import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import * as firebase from "firebase";
var config = {
  apiKey: "AIzaSyCXsctYbxCBGWChbIADKeRQNlXali4bTLU",
  authDomain: "challenge-d61c9.firebaseapp.com",
  databaseURL: "https://challenge-d61c9.firebaseio.com",
  projectId: "challenge-d61c9",
  storageBucket: "challenge-d61c9.appspot.com",
  messagingSenderId: "519547814860"
};
firebase.initializeApp(config);

class Facebooklogin extends React.Component {
 
  componentDidMount() {
    window.fbAsyncInit = function () {
      FB.init({
        appId: '344466345977776',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v2.10'
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
  handleClick() {
    
    FB.getLoginStatus(function (response) {
      if (response.status === 'connected') {
        console.log('Logged in.');
        FB.logout(function (response) {

        });
      }
      else {
        FB.login(function (response) {
          if (response.authResponse) {
            FB.api('/me', { fields: "id,name,picture" }, function (response) {
              window.location.assign(`user.html?username=${response.name}&&pic=${response.picture.data.url}`);
            });
          } else {
            console.log('User cancelled login or did not fully authorize.');
          }
        });
      }
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>
          facebook login
        </button>
      </div>
    );
  }
}
class LinkedinLogin extends React.Component {
 
  componentDidMount() {
    var liRoot = document.createElement('div');
    liRoot.id = 'linkedin-root';

    document.body.appendChild(liRoot);

    (function (d, s, id) {
      const element = d.getElementsByTagName(s)[0];
      const ljs = element;
      var js = element;
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = '//platform.linkedin.com/in.js';
      js.text = 'api_key: 81a42cdjat7tks';
      ljs.parentNode.insertBefore(js, ljs);
    }(document, 'script', 'linkedin-sdk'));
  }
  callbackFunction() {

    IN.API.Profile("me").result(function (r) {
      console.log(r.values[0]);
      window.location.assign(`user.html?username=${r.values[0].firstName}&&pic=${r.values[0].pictureUrl}`);
    });
  }

  handleClick() {
    IN.User.authorize(this.callbackFunction, '');
  }

  render() {

    return (
      <div>
        <button onClick={this.handleClick}>
          LinkedIn login
        </button>
      </div>
    );


  }
}
class GplusLogin extends React.Component {

  responseGoogle(result) {
    window.location.assign(`user.html?username=${result.profileObj.name}&&pic=${result.profileObj.imageUrl}`);
  }

  render() {
    return (
      <div>
        <GoogleLogin
          clientId="631593353345-hc0nvej68dvt3spi2j4ln2j5uvgetbfd.apps.googleusercontent.com"
          buttonText="Google Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
        />
      </div>
    );
  }
}
class TweetLogin extends React.Component {
  
  handleClick(e) {
      var provider = new firebase.auth.TwitterAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function (result) {
      var token = result.credential.accessToken;
      var secret = result.credential.secret;
      var user = result.user;
      window.location.assign(`user.html?username=${user.displayName}&&pic=${user.photoURL}`);
    }).catch(function (error) {
      console.log(error);
    });
  }
  render() {
    return (
      <div>
      <button onClick={this.handleClick}>
        Tweeter Login
        </button>
        </div>
    );
  }
}
ReactDOM.render(
  <div><Facebooklogin /><LinkedinLogin /><GplusLogin /><TweetLogin /></div>,
  document.getElementById('app')
);