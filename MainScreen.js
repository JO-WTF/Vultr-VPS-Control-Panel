'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	ScrollView,
	View,
	TouchableOpacity,
	TouchableHighlight,
	AsyncStorage,
	LayoutAnimation,
	Image
} = ReactNative;
var GiftedListView = require('react-native-gifted-listview');
// var request = require('request');
import Toast from 'react-native-root-toast';

require('./LightBox');
require('./ServerScreen');

var Controllers = require('react-native-controllers');
var {
	Modal,
	ControllerRegistry,
	Constants
} = Controllers;
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
import Button from 'react-native-button'


var apikey;

var MainScreen = React.createClass({
	getInitialState: function() {
		return {
			api_loaded:false,
			view:'main',
			apikey:'',
			activeRow:'',
			state:'',
		}
	},
	async _loadInitialState() {

		try {


			var value =  await AsyncStorage.getItem('sessionStatus');
			console.log(value);
			if(value!==null){
				this.setState({sessionStatus: value});
				console.log('Logged In.');
				apikey = await AsyncStorage.getItem('apikey');
				this.setState({'apikey':apikey});
				this.setState({'api_loaded':true});
			}
			else{
				console.log('Not logged in.');
				AsyncStorage.setItem("numberAccounts", '0');
				await Modal.showController('ModalScreenTester', 'slide-up');
			}
		} catch (error) {
			console.log('error occured when accessing session status.');
		}

	},
	componentDidMount: function() {
		Controllers.NavigationControllerIOS("movies_nav").setLeftButtons([{
			title: "Accounts",
			icon: require('./img/user.png'),
			onPress: function() {
				Controllers.DrawerControllerIOS("drawer").toggle({side:"left"});
			}
		}]);

		this._loadInitialState();

		var me = this;
		RCTDeviceEventEmitter.addListener('loggedIn',function(apikey){
			console.log('event loggedIn received.')
			me.setState({'api_loaded':true,'apikey':apikey});
		})
		RCTDeviceEventEmitter.addListener('loggedOut',function(apikey){
			console.log('event loggedOut received.')
			me.setState({'api_loaded':false,'apikey':''});
		})
		Controllers.NavigationControllerIOS("movies_nav").setRightButtons([{
			title: "Add Server",
			icon: require('./img/server_add.png'),
			onPress: function() {
				console.log(me.state.apikey)
				console.log('me.state.apikey')
						Controllers.NavigationControllerIOS("movies_nav").push({
							title: "Add Server",
							component: "AddServerScreen",
							passProps:{apikey:me.state.apikey},
							animated: true,
							style:{
							tabBarHidden: true}
						});

			}
		}]);
	},


	async _onFetch(page = 1, callback, options) {
		var rowsData = [];
		console.log(this.state);
		console.log('start sending api requests')
		var APIURL='https://api.vultr.com/v1/server/list';
		console.log(APIURL)
		var request = new Request(APIURL, {
			headers: new Headers({
				'API-Key': this.state.apikey
			})
		});
		await fetch(request)
		.then((response) =>
		response.status==200?response.json():console.log(response)
		)

	.then((responseText) =>{
		console.log(responseText)
		if(Object.keys(responseText).length>0){

			var servers=Object.getOwnPropertyNames(responseText).sort();
			servers.map((server)=>{
				rowsData.push(responseText[server]);
			});
		}
	})
	.catch((error) => {
		console.log('error occured when sending api request.')
	});
	callback(rowsData);
},
/**
* When a row is touched
* @param {object} rowData Row data
*/
_onPress(rowData) {
	this.state.activeRow!==rowData.SUBID?this.setState({activeRow:rowData.SUBID}):this.setState({activeRow:''});
	console.log(this.state.activeRow)

},
_detailPage(rowData) {
	var pushedTitle=rowData.label?rowData.label:"Cloud Instance";

	Controllers.NavigationControllerIOS("movies_nav").push({
		title: pushedTitle,
		component: "PushedScreen",
		animated: true,
		passProps:{
			info:rowData,
			apikey:this.state.apikey
		},
		style:{
			tabBarHidden: true
		}
	});
},
async _reboot(subID){
	Toast.show('Request Sent', {
	    duration: Toast.durations.SHORT,
	    position: -100,
	    hideOnPress: true,
	})
	var APIURL='https://api.vultr.com/v1/server/reboot';
	var headers = {
    'API-Key': this.state.apikey,
		"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
};
var dataString = 'SUBID='+subID;
	console.log(this.state.apikey)
	 await fetch(APIURL,{
		method: 'POST',
    headers: headers,
    body:dataString,
	})
	.then((response) =>
	response.status==200?Toast.show('Your server has been rebooted.', {
    duration: Toast.durations.SHORT,
    position: -100,
    shadow: true,
    animation: true,
    hideOnPress: true,
}):Toast.show('Some Error Happend.', {
    duration: Toast.durations.SHORT,
    position: -100,
    hideOnPress: true,
})
	)

	this.refs.serverList._refresh();

},
async _halt(subID){
	Toast.show('Request Sent', {
	    duration: Toast.durations.SHORT,
	    position: -100,
	    hideOnPress: true,
	})
	var APIURL='https://api.vultr.com/v1/server/halt';
	var headers = {
    'API-Key': this.state.apikey,
		"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
};
var dataString = 'SUBID='+subID;
	console.log(this.state.apikey)
	await fetch(APIURL,{
		method: 'POST',
    headers: headers,
    body:dataString,
	})
	.then((response) =>
	response.status==200?Toast.show('Your server has been stopped.', {
    duration: Toast.durations.SHORT,
    position: -100,
    shadow: true,
    animation: true,
    hideOnPress: true,
}):Toast.show('Some Error Happend.', {
    duration: Toast.durations.SHORT,
    position: -100,
    hideOnPress: true,
})
	)
	this.refs.serverList._refresh();

},
async _start(subID){
	Toast.show('Request Sent', {
	    duration: Toast.durations.SHORT,
	    position: -100,
	    hideOnPress: true,
	})
	var APIURL='https://api.vultr.com/v1/server/start';
	var headers = {
    'API-Key': this.state.apikey,
		"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
};
var dataString = 'SUBID='+subID;
	console.log(this.state.apikey)
	 await fetch(APIURL,{
		method: 'POST',
    headers: headers,
    body:dataString,
	})
	.then((response) =>
	response.status==200?Toast.show('Your server has been started.', {
    duration: Toast.durations.SHORT,
    position: -100,
    shadow: true,
    animation: true,
    hideOnPress: true,
}):Toast.show('Some Error Happend.', {
    duration: Toast.durations.SHORT,
    position: -100,
    hideOnPress: true,
})
	)
	this.refs.serverList._refresh();
},
async _destroy(subID){
	Toast.show('Request Sent', {
	    duration: Toast.durations.SHORT,
	    position: -100,
	    hideOnPress: true,
	})
	var APIURL='https://api.vultr.com/v1/server/destroy';
	var headers = {
    'API-Key': this.state.apikey,
		"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
};
var dataString = 'SUBID='+subID;
	console.log(this.state.apikey)
	 await fetch(APIURL,{
		method: 'POST',
    headers: headers,
    body:dataString,
	})
	.then((response) =>
	response.status==200?Toast.show('Your server has been destroyed.', {
    duration: Toast.durations.SHORT,
    position: -100,
    shadow: true,
    animation: true,
    hideOnPress: true,
}):Toast.show('Some Error Happend.', {
    duration: Toast.durations.SHORT,
    position: -100,
    hideOnPress: true,
})
	)
	this.refs.serverList._refresh();
},

/**
* Render a row
* @param {object} rowData Row data
*/
_renderRowView(rowData) {
	return (
		<View  style={styles.row}>
			<View style={{flexDirection:'row'}}>
				<TouchableHighlight
					underlayColor=' '
					onPress={() => this._onPress(rowData)}
					style={{flex:80}}
					>
					<View style={{flexDirection:'row'}}>
						<Text style={{fontFamily: 'icomoon', fontSize: 50, flex:15,marginRight:10, color:'#1e88e5'}}>
							{(() =>{
								var os=rowData.os.split(' ');
								switch (os[0]) {
									case "CentOS":   return "";
									case "CoreOS": return "";
									case "FreeBSD":  return "";
									case "Ubuntu":  return "";
									case "Windows":  return "";
									case "Debian":  return "";
									default:      return "";
								}
							})()}</Text>
							<View style={{flexDirection:'column',flex:60}}>
								<View style={{flexDirection:'row'}}>
									<Text style={{fontWeight:'bold'}}>{rowData.label?rowData.label:"Cloud Instance"}</Text>
									{rowData.power_status=='running'?<Text style={{paddingVertical:2,marginLeft:5,color:rowData.power_status=='running'?'#7cb342':'#ff0000',fontSize:12}}>(Running)</Text>:<Text>({rowData.power_status})</Text>}
								</View>

								<View style={{flexDirection:'row',marginVertical:1}}>
									<Text style={{fontFamily:'WebHostingHub-Glyphs', fontSize:12,color:'#616366'}}> </Text><Text style={{color:'#616366', fontSize:12,}}>{rowData.vcpu_count}{rowData.vcpu_count>1?" cores":" core"}   </Text>
									<Text style={{fontFamily:'WebHostingHub-Glyphs', fontSize:12,color:'#616366'}}> </Text><Text style={{color:'#616366', fontSize:12,}}>{rowData.ram}   </Text>
									<Text style={{fontFamily:'WebHostingHub-Glyphs', fontSize:12,color:'#616366'}}> </Text><Text style={{color:'#616366', fontSize:12,}}>{rowData.disk.split(' ')[1]} {rowData.disk.split(' ')[2]}   </Text>
								</View>

								<View style={{flexDirection:'row'}}>
									<Text style={{fontFamily:'WebHostingHub-Glyphs', fontSize:13,color:'#616366'}}> </Text><Text style={{color:'#616366', fontSize:12,}}>{rowData.main_ip}   </Text>
									<Text style={{fontFamily:'WebHostingHub-Glyphs', fontSize:13,color:'#616366'}}> </Text><Text style={{color:'#616366', fontSize:12,}}>{rowData.location}   </Text>
								</View>
							</View>

						</View>
					</TouchableHighlight>
					<TouchableHighlight style={{flex:10}} onPress={() => this._detailPage(rowData)} 					underlayColor=' '>
						<View style={{justifyContent:'center',alignItems:'center',flex:5}}>
							<Text style={{fontFamily:'WebHostingHub-Glyphs', fontSize:18,color:rowData.power_status=='running'?'#7cb342':'#ff0000'}}></Text>
						</View>
					</TouchableHighlight>
				</View>
				<View style={{borderBottomWidth:1,borderBottomColor:'#e6e9eb'}}>
					{this.state.activeRow==rowData.SUBID?<View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginVertical:15,paddingHorizontal:20}}>
					{rowData.power_status=='running'?<TouchableHighlight underlayColor=' ' onPress={()=>this._halt(rowData.SUBID)	}><Text style={{fontFamily:'WebHostingHub-Glyphs', fontSize:12,color:'#1e88e5',marginHorizontal:5}}>Power Off</Text></TouchableHighlight>:<TouchableHighlight underlayColor=' ' onPress={()=>this._start(rowData.SUBID)	}><Text style={{fontFamily:'WebHostingHub-Glyphs', fontSize:12,color:'#1e88e5',marginHorizontal:5}}>Power On</Text></TouchableHighlight>}
					<TouchableHighlight underlayColor=' ' onPress={()=>this._reboot(rowData.SUBID)	}><Text style={{fontFamily:'WebHostingHub-Glyphs', fontSize:12,color:'#1e88e5',marginHorizontal:5}}>Reboot</Text></TouchableHighlight>
						<TouchableHighlight underlayColor=' ' onPress={()=>this._destroy(rowData.SUBID)	}><Text style={{fontFamily:'WebHostingHub-Glyphs', fontSize:12,color:'#1e88e5',marginHorizontal:5}}>Destroy</Text></TouchableHighlight>
				</View>:null}
			</View>
		</View>
	);
},

render: function() {
	return (
		<View style={styles.container}>
			{this.state.api_loaded?
				<GiftedListView
					ref="serverList"
					rowView={this._renderRowView}
					onFetch={this._onFetch}
					firstLoader={true} // display a loader for the first fetching
					pagination={false} // enable infinite scrolling using touch to load more
					refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
					withSections={false} // enable sections
					/>:<View style={{backgroundColor:'#1a78cf',flex:1,alignItems:'center',justifyContent:'center'}}><Image
          style={styles.logo}
          source={{uri: 'https://www.vultr.com/media/logo_onblue.png'}}
        />

				 <Button
					 containerStyle={{padding:10, height:40,flex:1, overflow:'hidden', borderRadius:8,backgroundColor:"#1a78cf"}}
					 style={{fontSize: 16, color: 'white'}}
					 onPress={()=>{Modal.showController('ModalScreenTester', 'slide-up');}}
					 >
					 Log In
				 </Button>
					</View>}
				</View>
			);
		},

	});

	var styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#ffffff'
		},
		button: {
			textAlign: 'center',
			fontSize: 18,
			marginBottom: 10,
			marginTop:10,
			color:'blue'
		},
		row:{
			padding:10,
		},

  logo: {
		resizeMode:'contain',flex:1,justifyContent:'center',alignItems:'center',
    	width:200,height: 200,
  },
	});

	AppRegistry.registerComponent('MainScreen', () => MainScreen);

	module.exports = MainScreen;
