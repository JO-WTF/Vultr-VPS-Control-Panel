'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {AppRegistry, StyleSheet, Text, View, TouchableHighlight, AsyncStorage} =
ReactNative;
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
var Controllers = require('react-native-controllers');
var drawerController = Controllers.DrawerControllerIOS("drawer");
import Button from 'react-native-button'
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');


var SideMenu = React.createClass({
	getInitialState() { return ({email: '', apikey: ''}) },
	async _Initialise() {
		var email = await AsyncStorage.getItem('email')
		var apikey =await AsyncStorage.getItem('apikey')
		console.log(email)
		console.log(apikey)
		var APIURL = 'https://api.vultr.com/v1/account/info';
		var me=this;
		RCTDeviceEventEmitter.addListener('loggedInUser',function(email) {
			console.log('event loggedIn received at side menu.')
			me.setState({'email': email});
		})
		RCTDeviceEventEmitter.addListener('loggedIn', function(apikey) {
			me.setState({'apikey': apikey});
			console.log(me.state.apikey);
			var request = new Request(APIURL, {headers: new Headers({'API-Key': me.state.apikey})});
				fetch(request)
				.then((response) => response.status == 200 ? response.json() :
				console.log(response))
				.then((responseText) => {
					console.log(responseText.balance)
					 me.setState({balance: parseFloat(responseText.balance) * -1})
					me.setState({pending_charges: parseFloat(responseText.pending_charges)})
				})
		})

		this.setState({email: email, apikey: apikey})
		console.log(this.state.apikey);
		var request = new Request(APIURL, {headers: new Headers({'API-Key': this.state.apikey})});
			fetch(request)
			.then((response) => response.status == 200 ? response.json() :
			console.log(response))
			.then((responseText) => {
				console.log(responseText.balance)
				this.setState({balance: parseFloat(responseText.balance) * -1})
				this.setState({pending_charges: parseFloat(responseText.pending_charges)})
			})
		},
		componentDidMount() {
			this._Initialise();
		},

		_logout: function() {
			AsyncStorage.removeItem('sessionStatus');
			RCTDeviceEventEmitter.emit('loggedOut');
			drawerController.close({side: "left", animated: true});
		},

		render: function() {

			return (
				<View style = {styles.container}><
					Text style = {{fontSize: 22, color: '#fff'}}>
					Account<
					/Text>
					<Text style={{fontSize:16,color:'#fff',marginVertical:15}}>{this.state.email!==''?this.state.email:null}</Text><
						Text style = {{color: '#ffffff'}}>
						Balance: ${this.state.balance}<
						/Text>
						<Text style={{color:'#ffffff'}}>Pending Balance: ${this.state.pending_charges}</Text><
							Button containerStyle =
							{
								{
									marginVertical: 10, padding: 4, height: 28,
									overflow: 'hidden', borderRadius: 4,
									backgroundColor: "#1a78cf"
								}
							} style =
							{
								{ fontSize: 16, color: 'white' }
							} onPress = {this._logout}>
							Logout</Button>
					</View>);
				},

			});

			var styles = StyleSheet.create({
				container: {
					flex: 1,
					alignItems: 'flex-start',
					backgroundColor: '#F5FCFF',
					paddingVertical: 50,
					paddingHorizontal: 30,
					backgroundColor: '#1669ba'
				},
				welcome: {
					fontSize: 20,
					textAlign: 'center',
					margin: 10,
				},
				instructions: {
					textAlign: 'center',
					color: '#333333',
					marginBottom: 5,
				},
				button: {
					textAlign: 'center',
					fontSize: 18,
					marginBottom: 10,
					marginTop: 10,
				},
			});

			AppRegistry.registerComponent('SideMenu', () => SideMenu);

			module.exports = SideMenu;
