'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
	Image,
  TouchableOpacity,
	LayoutAnimation,
	TextInput,
	Alert,
	AsyncStorage
} = ReactNative;
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Controllers = require('react-native-controllers');
var KeyboardSpacer = require('react-native-keyboard-spacer');
var WebViewBridge = require('react-native-webview-bridge');
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
var GiftedSpinner = require('react-native-gifted-spinner');

var {
  Modal,
  ControllerRegistry
} = Controllers;
import Button from 'react-native-button'


const injectScript = `
  (function () {
    if (WebViewBridge) {
			if(document.getElementsByClassName("error_message").length<1){
				try{
					[].filter.call( document.getElementsByTagName("input"), function( input ) {
						return input.value === "Enable API";
					})[0].click();
				}
				catch (e) {
					console.log('API enabled already');
				}
				document.querySelector('#header2_wrap').style.display='none';
				document.querySelector('.block1170deploy').style.display='none';
				document.querySelector('#tabc_settingsapi').style.color='#fff';
				document.querySelector('#tabc_settingsapi a').style.display='none';
				document.querySelector('#header4_0').style.display='none';
				document.querySelector('.hr20').style.display='none';
				changeTabSubmenu('settingsapi'); hidePostMessages();
				var api=document.querySelector('input[name="api_key"]').value;
				message=api;
			} else {
				message="invalidUsernamePassword"
						}
			WebViewBridge.send(message);
		}
  }());
`;

var ModalScreen = React.createClass({

	  getInitialState: function() {
	    return {
	      started: false,
				username: '',
				password: '',
				uri:'https://my.vultr.com/?logout=1',
				isLoading:false,
	    }
	  },
	_handleGetStarted: function(){
		LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
		this.setState({started:true});
		console.log(this.state)

	},
	_handleGo:async function(){
		this.setState({uri:'https://my.vultr.com/settings/?username='+this.state.username+'&password='+this.state.password});
		this.setState({isLoading:true});
		await AsyncStorage.setItem("email",this.state.username);


	},
	onBridgeMessage: async function(message) {
    const {webviewbridge} = this.refs;
		if(!(message=="invalidUsernamePassword")){

			try {
	      await AsyncStorage.setItem("sessionStatus", 'true');
				await AsyncStorage.setItem("apikey", message.toString());
				 var numberAccounts = await AsyncStorage.getItem('numberAccounts');
				 numberAccounts=parseInt(numberAccounts)+1;
				  AsyncStorage.setItem("numberAccounts", numberAccounts.toString());
				 console.log('session status changed to true. Number of Accounts:'+numberAccounts);
	    } catch (error) {
				console.log('error occured when setting session status.');
	    };
			RCTDeviceEventEmitter.emit('loggedIn',message );
			RCTDeviceEventEmitter.emit('loggedInUser',this.state.username );
			this.setState({isLoading:false});
			Modal.dismissController();
		}
		else{
			console.log('Invalid Username or Password');
			Alert.alert(
            'Error',
            'Invalid Username or Password.',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed!')},
            ]
          )
					this.setState({isLoading:false});
		}
  },
  render: function() {
    return (
      <View style={styles.container}>
				<WebViewBridge
					ref = "webviewbridge"
					style = {styles.webview}
					onBridgeMessage ={this.onBridgeMessage}
					javaScriptEnabled ={true}
					injectedJavaScript = {injectScript}
					source ={{uri:this.state.uri}} />
				<View style={{alignItems:'center',justifyContent:'center',flex:100,flexDirection:'column'}}>
				<Image source={require('./Vultr-Logo.png')} resizeMode="contain" style={{
            height: 150,
            backgroundColor: 'transparent',
          }}/>
				<Text style={{margin:20,color:'#fff',fontWeight:'bold'}}>Let's fully utilize Vultr's API!</Text>
					{this.state.started?
						<View>
							<View style={styles.inputs}>
	                 <View style={styles.inputContainer}>
	                     <Image style={styles.inputUsername} source={{uri: 'http://i.imgur.com/iVVVMRX.png'}}/>
	                     <TextInput
												 		autoCapitalize='none'
														style={[styles.input, styles.whiteFont]}
														placeholder="Vultr Account"
														onChangeText={(username) => this.setState({username})}
														placeholderTextColor="#FFF"
														value={this.state.username}
	                     />
	                 </View>
	                 <View style={styles.inputContainer}>
	                     <Image style={styles.inputPassword} source={{uri: 'http://i.imgur.com/ON58SIG.png'}}/>
	                     <TextInput
	                         password={true}
	                         style={[styles.input, styles.whiteFont]}
	                         placeholder="Vultr Password"
													 onChangeText={(password) => this.setState({password})}
	                         placeholderTextColor="#cccccc"
	                         value={this.state.password}
	                     />
	                 </View>

	             </View>
					 <Button
						 containerStyle={{padding:10, height:40, overflow:'hidden', borderRadius:8,backgroundColor:"#1a78cf"}}
						 style={{fontSize: 16, color: 'white'}}
						 onPress={() => this._handleGo()}>
						 {this.state.isLoading?
						 <GiftedSpinner />:'GO!'}
					 </Button>
					 </View>:
						<Button
							containerStyle={{padding:10, height:40, overflow:'hidden', borderRadius:8,backgroundColor:"#1a78cf"}}
							style={{fontSize: 16, color: 'white'}}
							onPress={() => this._handleGetStarted()}>
							Get Started!
						</Button>


					}
					<KeyboardSpacer/>
					</View>


      </View>

    );
  },

});

var styles = StyleSheet.create({
  container: {
		justifyContent:'center',
		alignItems:'center',
		flex:1,
		flexDirection:'column',
    backgroundColor: '#1669ba'
  },
  button: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    color: 'white'
  },
	inputs: {
			marginTop: 10,
			marginBottom: 10,
	},
	inputPassword: {
			width: 20,
			height: 21
	},
	inputUsername: {
		width: 20,
		height: 20
	},
	inputContainer: {
			paddingVertical: 10,
			paddingHorizontal:0,
			width:200,
			borderBottomWidth:0.2,
			borderBottomColor: '#fff',
	},
	input: {
			position: 'absolute',
			left: 30,
			top: 12,
			right: 0,
			height: 20,
			fontSize: 14
	},

	greyFont: {
		color: '#D8D8D8'
	},
	whiteFont: {
		color: '#FFF'
	},
	webviewbridge:{
		height:0,
		flex:0
	}
});

AppRegistry.registerComponent('ModalScreen', () => ModalScreen);

module.exports = ModalScreen;
