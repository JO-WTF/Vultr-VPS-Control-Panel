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
	ListView,
	ScrollView,
	AsyncStorage,
	Switch,
	TouchableHighlight,
} = ReactNative;
var Dimensions = require('Dimensions');
var windowSize = Dimensions.get('window');
var Controllers = require('react-native-controllers');
var KeyboardSpacer = require('react-native-keyboard-spacer');
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
var GiftedSpinner = require('react-native-gifted-spinner');
import Toast from 'react-native-root-toast';

var {
	Modal,
	ControllerRegistry
} = Controllers;
import Button from 'react-native-button'

var countryData = [{
	"6": {
		"DCID": "6",
		"name": "Atlanta",
		"country": "US",
		"continent": "North America",
		"state": "GA",
		"ddos_protection": false,
		"block_storage": false
	},
	"2": {
		"DCID": "2",
		"name": "Chicago",
		"country": "US",
		"continent": "North America",
		"state": "IL",
		"ddos_protection": true,
		"block_storage": false
	},
	"3": {
		"DCID": "3",
		"name": "Dallas",
		"country": "US",
		"continent": "North America",
		"state": "TX",
		"ddos_protection": false,
		"block_storage": false
	},
	"5": {
		"DCID": "5",
		"name": "Los Angeles",
		"country": "US",
		"continent": "North America",
		"state": "CA",
		"ddos_protection": true,
		"block_storage": false
	},
	"39": {
		"DCID": "39",
		"name": "Miami",
		"country": "US",
		"continent": "North America",
		"state": "FL",
		"ddos_protection": true,
		"block_storage": false
	},
	"1": {
		"DCID": "1",
		"name": "New Jersey",
		"country": "US",
		"continent": "North America",
		"state": "NJ",
		"ddos_protection": true,
		"block_storage": true
	},
	"4": {
		"DCID": "4",
		"name": "Seattle",
		"country": "US",
		"continent": "North America",
		"state": "WA",
		"ddos_protection": false,
		"block_storage": false
	},
	"12": {
		"DCID": "12",
		"name": "Silicon Valley",
		"country": "US",
		"continent": "North America",
		"state": "CA",
		"ddos_protection": true,
		"block_storage": false
	},
	"7": {
		"DCID": "7",
		"name": "Amsterdam",
		"country": "NL",
		"continent": "Europe",
		"state": "",
		"ddos_protection": true,
		"block_storage": false
	},
	"25": {
		"DCID": "25",
		"name": "Tokyo",
		"country": "JP",
		"continent": "Asia",
		"state": "",
		"ddos_protection": false,
		"block_storage": false
	},
	"8": {
		"DCID": "8",
		"name": "London",
		"country": "GB",
		"continent": "Europe",
		"state": "",
		"ddos_protection": true,
		"block_storage": false
	},
	"24": {
		"DCID": "24",
		"name": "Paris",
		"country": "FR",
		"continent": "Europe",
		"state": "",
		"ddos_protection": true,
		"block_storage": false
	},
	"9": {
		"DCID": "9",
		"name": "Frankfurt",
		"country": "DE",
		"continent": "Europe",
		"state": "",
		"ddos_protection": true,
		"block_storage": false
	},
	"19": {
		"DCID": "19",
		"name": "Sydney",
		"country": "AU",
		"continent": "Australia",
		"state": "",
		"ddos_protection": false,
		"block_storage": false
	}
}];
var planData=[{
	"29": {
		"VPSPLANID": "29",
		"name": "768 MB RAM,15 GB SSD,1.00 TB BW",
		"vcpu_count": "1",
		"ram": "768",
		"disk": "15",
		"bandwidth": "1.00",
		"bandwidth_gb": "1024",
		"price_per_month": "5.00",
		"windows": false,
		"plan_type": "SSD",
		"available_locations": [
			1,
			2,
			4,
			5,
			6,
			7,
			8,
			9,
			12,
			19,
			24,
			25,
			39
		]
	},
	"93": {
		"VPSPLANID": "93",
		"name": "1024 MB RAM,20 GB SSD,2.00 TB BW",
		"vcpu_count": "1",
		"ram": "1024",
		"disk": "20",
		"bandwidth": "2.00",
		"bandwidth_gb": "2048",
		"price_per_month": "10.00",
		"windows": false,
		"plan_type": "SSD",
		"available_locations": [
			1,
			2,
			4,
			5,
			6,
			7,
			8,
			9,
			12,
			19,
			24,
			25,
			39
		]
	},
	"94": {
		"VPSPLANID": "94",
		"name": "2048 MB RAM,45 GB SSD,3.00 TB BW",
		"vcpu_count": "2",
		"ram": "2048",
		"disk": "45",
		"bandwidth": "3.00",
		"bandwidth_gb": "3072",
		"price_per_month": "20.00",
		"windows": false,
		"plan_type": "SSD",
		"available_locations": [
			1,
			2,
			4,
			5,
			7,
			8,
			9,
			12,
			19,
			24,
			25,
			39
		]
	},
	"95": {
		"VPSPLANID": "95",
		"name": "4096 MB RAM,90 GB SSD,4.00 TB BW",
		"vcpu_count": "4",
		"ram": "4096",
		"disk": "90",
		"bandwidth": "4.00",
		"bandwidth_gb": "4096",
		"price_per_month": "40.00",
		"windows": false,
		"plan_type": "SSD",
		"available_locations": [
			1,
			2,
			4,
			5,
			7,
			8,
			9,
			12,
			19,
			24,
			25,
			39
		]
	},
	"96": {
		"VPSPLANID": "96",
		"name": "8192 MB RAM,150 GB SSD,5.00 TB BW",
		"vcpu_count": "6",
		"ram": "8192",
		"disk": "150",
		"bandwidth": "5.00",
		"bandwidth_gb": "5120",
		"price_per_month": "80.00",
		"windows": false,
		"plan_type": "SSD",
		"available_locations": [
			1,
			2,
			4,
			5,
			7,
			8,
			9,
			12,
			19,
			24,
			25,
			39
		]
	},
	"97": {
		"VPSPLANID": "97",
		"name": "16384 MB RAM,300 GB SSD,6.00 TB BW",
		"vcpu_count": "8",
		"ram": "16384",
		"disk": "300",
		"bandwidth": "6.00",
		"bandwidth_gb": "6144",
		"price_per_month": "160.00",
		"windows": false,
		"plan_type": "SSD",
		"available_locations": [
			1,
			2,
			4,
			5,
			7,
			8,
			9,
			12,
			19,
			24,
			25,
			39
		]
	},
	"98": {
		"VPSPLANID": "98",
		"name": "32768 MB RAM,600 GB SSD,10.00 TB BW",
		"vcpu_count": "16",
		"ram": "32768",
		"disk": "600",
		"bandwidth": "10.00",
		"bandwidth_gb": "10240",
		"price_per_month": "320.00",
		"windows": false,
		"plan_type": "SSD",
		"available_locations": [
			1,
			2,
			4,
			5,
			7,
			8,
			9,
			12,
			19,
			24,
			25,
			39
		]
	}
}];

var OSData=[{
	"127": {
		"OSID": 127,
		"name": "CentOS 6 x64",
		"arch": "x64",
		"family": "centos",
		"windows": false
	},
	"147": {
		"OSID": 147,
		"name": "CentOS 6 i386",
		"arch": "i386",
		"family": "centos",
		"windows": false
	},
	"162": {
		"OSID": 162,
		"name": "CentOS 5 x64",
		"arch": "x64",
		"family": "centos",
		"windows": false
	},
	"163": {
		"OSID": 163,
		"name": "CentOS 5 i386",
		"arch": "i386",
		"family": "centos",
		"windows": false
	},
	"167": {
		"OSID": 167,
		"name": "CentOS 7 x64",
		"arch": "x64",
		"family": "centos",
		"windows": false
	},
	"128": {
		"OSID": 128,
		"name": "Ubuntu 12.04 x64",
		"arch": "x64",
		"family": "ubuntu",
		"windows": false
	},
	"148": {
		"OSID": 148,
		"name": "Ubuntu 12.04 i386",
		"arch": "i386",
		"family": "ubuntu",
		"windows": false
	},
	"160": {
		"OSID": 160,
		"name": "Ubuntu 14.04 x64",
		"arch": "x64",
		"family": "ubuntu",
		"windows": false
	},
	"161": {
		"OSID": 161,
		"name": "Ubuntu 14.04 i386",
		"arch": "i386",
		"family": "ubuntu",
		"windows": false
	},
	"209": {
		"OSID": 209,
		"name": "Ubuntu 15.10 x64",
		"arch": "x64",
		"family": "ubuntu",
		"windows": false
	},
	"210": {
		"OSID": 210,
		"name": "Ubuntu 15.10 i386",
		"arch": "i386",
		"family": "ubuntu",
		"windows": false
	},
	"215": {
		"OSID": 215,
		"name": "Ubuntu 16.04 x64",
		"arch": "x64",
		"family": "ubuntu",
		"windows": false
	},
	"216": {
		"OSID": 216,
		"name": "Ubuntu 16.04 i386",
		"arch": "i386",
		"family": "ubuntu",
		"windows": false
	},
	"139": {
		"OSID": 139,
		"name": "Debian 7 x64 (wheezy)",
		"arch": "x64",
		"family": "debian",
		"windows": false
	},
	"152": {
		"OSID": 152,
		"name": "Debian 7 i386 (wheezy)",
		"arch": "i386",
		"family": "debian",
		"windows": false
	},
	"193": {
		"OSID": 193,
		"name": "Debian 8 x64 (jessie)",
		"arch": "x64",
		"family": "debian",
		"windows": false
	},
	"194": {
		"OSID": 194,
		"name": "Debian 8 i386 (jessie)",
		"arch": "i386",
		"family": "debian",
		"windows": false
	},
	"140": {
		"OSID": 140,
		"name": "FreeBSD 10 x64",
		"arch": "x64",
		"family": "freebsd",
		"windows": false
	},
	"179": {
		"OSID": 179,
		"name": "CoreOS Stable",
		"arch": "x64",
		"family": "coreos",
		"windows": false
	},
	"124": {
		"OSID": 124,
		"name": "Windows 2012 R2 x64",
		"arch": "x64",
		"family": "windows",
		"windows": true
	},
	"159": {
		"OSID": 159,
		"name": "Custom",
		"arch": "x64",
		"family": "iso",
		"windows": false
	},
	"164": {
		"OSID": 164,
		"name": "Snapshot",
		"arch": "x64",
		"family": "snapshot",
		"windows": false
	},
	"180": {
		"OSID": 180,
		"name": "Backup",
		"arch": "x64",
		"family": "backup",
		"windows": false
	},
	"186": {
		"OSID": 186,
		"name": "Application",
		"arch": "x64",
		"family": "application",
		"windows": false
	}
}];

var convertedCountryData =[];

for( var i in countryData[0] ) {
	if (countryData[0].hasOwnProperty(i)){
		convertedCountryData.push(countryData[0][i]);
	}
}
console.log(convertedCountryData)


var convertedOSData =[];

for( var i in OSData[0] ) {
	if (OSData[0].hasOwnProperty(i)){
		convertedOSData.push(OSData[0][i]);
	}
}
console.log(convertedOSData)

var convertedPlanData =[];
for( var i in planData[0] ) {
	if (planData[0].hasOwnProperty(i)){
		convertedPlanData.push(planData[0][i]);
	}
}

	var AddServerScreen = React.createClass({
		getInitialState: function() {
			var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

			return {
				countryDataSource: ds.cloneWithRows(countryData[0]),
				planDataSource:ds.cloneWithRows(planData[0]),
				OSDataSource:ds.cloneWithRows(OSData[0]),
				selectedRegion:"1",
				selectedCountry:"US",
				selectedFamily:"centos",
				selectedOS:"127",
                windowsSelected:false,
				selectedPlan:"29",
              selectedPlanPrice:"5.00",
              ipv6:true,
              private_network:true,
              auto_backup:false,
              ddos_protection:false,
			hostname:"",
			label:""
			};
		},
		filterCountry(country, regionList) {
			var filtered=[];
			filtered= convertedCountryData.filter(function (el) {
				return (el.country === country);
			})
			return filtered
		},
		filterOS(family, OSList) {
			var filtered=[];
			filtered= convertedOSData.filter(function (el) {
				return (el.family === family);
			})
			return filtered
		},

		componentDidMount() {
			//var listViewScrollView = this.refs.listView.getScrollResponder();
			//listViewScrollView.scrollTo(1); // Hack to get ListView to render fully

      this.setState({countryDataSource:this.state.countryDataSource.cloneWithRows(this.filterCountry('US',countryData[0]))})
			this.setState({OSDataSource:this.state.OSDataSource.cloneWithRows(this.filterOS('centos',OSData[0]))})
			this.setState({planDataSource:this.state.planDataSource.cloneWithRows(convertedPlanData)})

		},
		renderCountryRow(rowData) {
			return (
				<TouchableHighlight underlayColor={' '} style={this.state.selectedRegion==rowData.DCID?styles.selectedRow:styles.wrapper}
					onPress={()=>
						{this.setState({selectedRegion:rowData.DCID})}
					}
					>
					<View style={{flexDirection:'row'}}>
						<View style={{flex:1}}>
							{(() =>{
								switch (rowData.country) {
									case "US":   return <Image style={styles.countryFlag} source={require('./img/US.png')} />;
									case "GB":   return <Image style={styles.countryFlag} source={require('./img/GB.png')} />;
									case "DE":   return <Image style={styles.countryFlag} source={require('./img/DE.png')} />;
									case "NL":   return <Image style={styles.countryFlag} source={require('./img/NL.png')} />;
									case "AU":   return <Image style={styles.countryFlag} source={require('./img/AU.png')} />;
									case "JP":   return <Image style={styles.countryFlag} source={require('./img/JP.png')} />;
									case "FR":   return <Image style={styles.countryFlag} source={require('./img/FR.png')} />;
									default: break;
								}
							})()}

						</View>
						<View style={{flex:3}}>
							<Text style={this.state.selectedRegion==rowData.DCID?styles.textSelected:styles.text}>{rowData.country}, {rowData.name}</Text>
							<Text style={this.state.selectedRegion==rowData.DCID?{fontSize:12,color:'#cccccc',fontWeight:'100'}:{fontSize:12,color:'#616366',fontWeight:'100'}}>{rowData.ddos_protection?"DDos Protection":null}  {rowData.block_storage?"Block Storage  ":null}</Text>
						</View>
					</View>
				</TouchableHighlight>
			)
		},
		renderPlanRow(rowData) {
      if((this.state.windowsSelected==true)&&(rowData.VPSPLANID=="29"||rowData.VPSPLANID=="93")){return null}else {
				return (
					<TouchableHighlight underlayColor={' '} style={this.state.selectedPlan==rowData.VPSPLANID?styles.selectedRow:styles.wrapper}
						onPress={()=>
												{this.setState({selectedPlan:rowData.VPSPLANID,selectedPlanPrice:rowData.price_per_month});}
											}>

						<View style={{flexDirection:'row',flex:1}}>
						<View style={{flexDirection:'row',flex:2,paddingVertical:5}}>
							<Text style={this.state.selectedPlan==rowData.VPSPLANID?styles.textSelected:styles.text}>${parseInt(rowData.price_per_month).toFixed(0)}</Text><Text style={this.state.selectedPlan==rowData.VPSPLANID?{fontSize:12,color:'#ffffff'}:{fontSize:12,color:'#1669ba'}}>/mo</Text>
						</View>
						<View style={{flex:5,alignItems:'flex-start'}}>
							<View style={{flexDirection:'row',flex:12,paddingTop:5}}>
								<Text style={this.state.selectedPlan==rowData.VPSPLANID?{fontFamily:'WebHostingHub-Glyphs', fontSize:12,color:'#ffffff'}:{fontFamily:'WebHostingHub-Glyphs', fontSize:12,color:'#616366'}}> </Text><Text style={this.state.selectedPlan==rowData.VPSPLANID?{color:'#ffffff', fontSize:12,}:{color:'#616366', fontSize:12,}}>{rowData.vcpu_count} CPU </Text>
								<Text style={this.state.selectedPlan==rowData.VPSPLANID?{fontFamily:'WebHostingHub-Glyphs', fontSize:12,color:'#ffffff'}:{fontFamily:'WebHostingHub-Glyphs', fontSize:12,color:'#616366'}}> </Text><Text style={this.state.selectedPlan==rowData.VPSPLANID?{color:'#ffffff', fontSize:12,}:{color:'#616366', fontSize:12,}}>{rowData.ram} MB </Text>
								<Text style={this.state.selectedPlan==rowData.VPSPLANID?{fontFamily:'WebHostingHub-Glyphs', fontSize:12,color:'#ffffff'}:{fontFamily:'WebHostingHub-Glyphs', fontSize:12,color:'#616366'}}> </Text><Text style={this.state.selectedPlan==rowData.VPSPLANID?{color:'#ffffff', fontSize:12,}:{color:'#616366', fontSize:12,}}>{rowData.disk} GB</Text>
							</View>
							<View style={{flexDirection:'column',flex:5,paddingVertical:5}}>
								<Text style={this.state.selectedPlan==rowData.VPSPLANID?{fontSize:12,color:'#ffffff',fontWeight:'100'}:{fontSize:12,color:'#616366',fontWeight:'100'}}>Bandwidth:{parseInt(rowData.bandwidth).toFixed(0)} GB Transfer:{(parseInt(rowData.bandwidth_gb)/1000).toFixed(0)} TB</Text>
							</View>
						</View>
						</View>
					</TouchableHighlight>

				)
      }

		},
		renderOSRow(rowData) {
			return (
				<TouchableHighlight underlayColor={' '} style={this.state.selectedOS==rowData.OSID?styles.selectedRow:styles.wrapper}
					onPress={()=>
						{this.setState({selectedOS:rowData.OSID});
                        rowData.family=="windows"?this.setState({windowsSelected:true}):this.setState({windowsSelected:false});
                         if((rowData.family=="windows")&&(this.state.selectedPlan=="29"||this.state.selectedPlan=="93")){
													 Toast.show('Windows requires a plan with at least 45GB of disk space. Available package options have changed.', {
															 duration: Toast.durations.LONG,
															 position: -200,
															 hideOnPress: true,
													 })
													 this.setState({selectedPlan:"94"})
													 this.setState({selectedPlanPrice:"20.00"})
                        }
                        }
					}
					>
					<View style={{flexDirection:'row'}}>
					<View style={{flex:3,flexDirection:'row'}}>
						<Text style={this.state.selectedOS==rowData.OSID?{fontSize:25,fontFamily:'icomoon',color:'#ffffff',marginRight:10}:{fontSize:25,fontFamily:'icomoon',color:'#1669ba',marginRight:10}}>{(() =>{
								switch (rowData.family) {
									case "centos":   return "";
									case "coreos": return "";
									case "freebsd":  return "";
									case "ubuntu":  return "";
									case "windows":  return "";
									case "debian":  return "";
									default:      return "";
								}
							})()}</Text>
						<Text style={this.state.selectedOS==rowData.OSID?styles.textSelected:styles.text}>{rowData.name}</Text>
						</View>
						</View>

					</TouchableHighlight>
				)
		},
		render: function() {
			var _scrollView: ScrollView;

			return (
				<View style={{flex:1}}>
					<ScrollView
						ref={(scrollView) => { _scrollView = scrollView; }}
						style={styles.container}>
						<View style={styles.rowSection}>
							<View style={styles.rowTitle}><Text style={{fontSize:15,fontFamily:'WebHostingHub-Glyphs',color:'#1669ba'}}>1</Text><Text style={{fontSize:15,fontWeight:'bold',color:'#1669ba'}}>  Server Location</Text></View>
							<View style={styles.rowContent}>
								<View style={{flexDirection:'row',paddingVertical:10,justifyContent:'space-around',flexWrap:'wrap',borderBottomWidth:1,borderBottomColor:'#e6e9eb'}}>
									<Button
										containerStyle={this.state.selectedCountry=='US'?styles.countryBtnSelected:styles.countryBtn}
										style={styles.countryBtnText}
										onPress={() => {this.setState({countryDataSource:this.state.countryDataSource.cloneWithRows(this.filterCountry('US',countryData[0]))});this.setState({selectedCountry:'US'});}}>
										US
									</Button>
									<Button
										containerStyle={this.state.selectedCountry=='GB'?styles.countryBtnSelected:styles.countryBtn}
										style={{fontSize: 16, color: 'white'}}
										onPress={() => {this.setState({countryDataSource:this.state.countryDataSource.cloneWithRows(this.filterCountry('GB',countryData[0]))});this.setState({selectedCountry:'GB'});}}>
										GB
									</Button>
									<Button
										containerStyle={this.state.selectedCountry=='JP'?styles.countryBtnSelected:styles.countryBtn}
										style={{fontSize: 16, color: 'white'}}
										onPress={() => {this.setState({countryDataSource:this.state.countryDataSource.cloneWithRows(this.filterCountry('JP',countryData[0]))});this.setState({selectedCountry:'JP'});}}>
										JP
									</Button>
									<Button
										containerStyle={this.state.selectedCountry=='AU'?styles.countryBtnSelected:styles.countryBtn}
										style={{fontSize: 16, color: 'white'}}
										onPress={() => {this.setState({countryDataSource:this.state.countryDataSource.cloneWithRows(this.filterCountry('AU',countryData[0]))});this.setState({selectedCountry:'AU'});}}>
										AU
									</Button>
									<Button
										containerStyle={this.state.selectedCountry=='DE'?styles.countryBtnSelected:styles.countryBtn}
										style={{fontSize: 16, color: 'white'}}
										onPress={() => {this.setState({countryDataSource:this.state.countryDataSource.cloneWithRows(this.filterCountry('DE',countryData[0]))});this.setState({selectedCountry:'DE'});}}>
										DE
									</Button>
									<Button
										containerStyle={this.state.selectedCountry=='FR'?styles.countryBtnSelected:styles.countryBtn}
										style={{fontSize: 16, color: 'white'}}
										onPress={() => {this.setState({countryDataSource:this.state.countryDataSource.cloneWithRows(this.filterCountry('FR',countryData[0]))});this.setState({selectedCountry:'FR'});}}>
										FR
									</Button>
									<Button
										containerStyle={this.state.selectedCountry=='NL'?styles.countryBtnSelected:styles.countryBtn}
										style={{fontSize: 16, color: 'white'}}
										onPress={() => {this.setState({countryDataSource:this.state.countryDataSource.cloneWithRows(this.filterCountry('NL',countryData[0]))});this.setState({selectedCountry:'NL'});}}>
										NL
									</Button>

								</View>
								<ListView
									ref="listView1"
									style={styles.listContainer}
									automaticallyAdjustContentInsets={false}
									dataSource={this.state.countryDataSource}
									renderRow={this.renderCountryRow}
									/>
							</View>
						</View>


						<View style={styles.rowSection}>
							<View style={styles.rowTitle}><Text style={{fontSize:15,fontFamily:'WebHostingHub-Glyphs',color:'#1669ba'}}>2</Text><Text style={{fontSize:15,fontWeight:'bold',color:'#1669ba'}}>  Operating System</Text></View>
							<View style={styles.rowContent}>
								<View style={{flexDirection:'row',paddingVertical:10,justifyContent:'space-around',flexWrap:'wrap',borderBottomWidth:1,borderBottomColor:'#e6e9eb'}}>
									<Button
										containerStyle={this.state.selectedFamily=='centos'?styles.countryBtnSelected:styles.countryBtn}
										style={{fontFamily: 'icomoon',fontSize: 25, color: 'white',flex:1}}
										onPress={() => {this.setState({OSDataSource:this.state.OSDataSource.cloneWithRows(this.filterOS('centos',OSData[0])),selectedFamily:'centos'})}}>
										
									</Button>
									<Button
										containerStyle={this.state.selectedFamily=='coreos'?styles.countryBtnSelected:styles.countryBtn}
										style={{fontFamily: 'icomoon',fontSize: 25, color: 'white',flex:1}}
										onPress={() => {this.setState({OSDataSource:this.state.OSDataSource.cloneWithRows(this.filterOS('coreos',OSData[0])),selectedFamily:'coreos'})}}>
										
									</Button>
									<Button
										containerStyle={this.state.selectedFamily=='freebsd'?styles.countryBtnSelected:styles.countryBtn}
										style={{fontFamily: 'icomoon',fontSize: 25, color: 'white',flex:1}}
										onPress={() => {this.setState({OSDataSource:this.state.OSDataSource.cloneWithRows(this.filterOS('freebsd',OSData[0])),selectedFamily:'freebsd'})}}>
										
									</Button>
									<Button
										containerStyle={this.state.selectedFamily=='debian'?styles.countryBtnSelected:styles.countryBtn}
										style={{fontFamily: 'icomoon',fontSize: 25, color: 'white',flex:1}}
										onPress={() => {this.setState({OSDataSource:this.state.OSDataSource.cloneWithRows(this.filterOS('debian',OSData[0])),selectedFamily:'debian'})}}>
										
									</Button>
									<Button
										containerStyle={this.state.selectedFamily=='ubuntu'?styles.countryBtnSelected:styles.countryBtn}
										style={{fontFamily: 'icomoon',fontSize: 25, color: 'white',flex:1}}
										onPress={() => {this.setState({OSDataSource:this.state.OSDataSource.cloneWithRows(this.filterOS('ubuntu',OSData[0])),selectedFamily:'ubuntu'})}}>
										
									</Button>
									<Button
										containerStyle={this.state.selectedFamily=='windows'?styles.countryBtnSelected:styles.countryBtn}
										style={{fontFamily: 'icomoon',fontSize: 25, color: 'white',flex:1}}
										onPress={() => {this.setState({OSDataSource:this.state.OSDataSource.cloneWithRows(this.filterOS('windows',OSData[0])),selectedFamily:'windows'})}}>
										
									</Button>

								</View>
								<ListView
									ref="listView2"
									style={styles.listContainer}
									automaticallyAdjustContentInsets={false}
									dataSource={this.state.OSDataSource}
									renderRow={this.renderOSRow}
									/>
							</View>
						</View>
						<View style={styles.rowSection}>
							<View style={styles.rowTitle}><Text style={{fontSize:15,fontFamily:'WebHostingHub-Glyphs',color:'#1669ba'}}>3</Text><Text style={{fontSize:15,fontWeight:'bold',color:'#1669ba'}}>  Server Plan</Text></View>
							<View style={styles.rowContent}>
								<ListView
									ref="listView3"
									style={styles.listContainer}
									automaticallyAdjustContentInsets={false}
									dataSource={this.state.planDataSource}
									renderRow={this.renderPlanRow}
									/>
							</View>
						</View>
						<View style={styles.rowSection}>
							<View style={styles.rowTitle}><Text style={{fontSize:15,fontFamily:'WebHostingHub-Glyphs',color:'#1669ba'}}>4</Text><Text style={{fontSize:15,fontWeight:'bold',color:'#1669ba'}}>  Additional Features</Text></View>
							<View style={styles.rowContent}>
								<View style={styles.wrapper}>
									<Text style={{alignItems:'center',justifyContent:'center',fontSize:14,flex:4}}>Enable IPv6</Text>
									<Switch
										onValueChange={(value) => this.setState({ipv6: value})}
										style={{flex:1,alignItems:'center'}}
										value={this.state.ipv6} />
								</View>
								<View style={styles.wrapper}>
									<Text style={{alignItems:'center',justifyContent:'center',fontSize:14,flex:4}}>Enable Private Network</Text>
									<Switch
										onValueChange={(value) => this.setState({private_network: value})}
										style={{flex:1,alignItems:'center'}}
										value={this.state.private_network} />
								</View>
								<View style={styles.wrapper}>
									<Text style={{alignItems:'center',justifyContent:'center',fontSize:14,flex:4}}>Enable Auto Backups</Text>
									<Switch
										onValueChange={(value) => this.setState({auto_backup: value})}
										style={{flex:1,alignItems:'center'}}
										value={this.state.auto_backup} />
								</View>
								<View style={styles.wrapper}>
									<Text style={{alignItems:'center',justifyContent:'center',fontSize:14,flex:4}}>Enable DDOS Protection</Text>
									<Switch
										onValueChange={(value) => this.setState({ddos_protection: value})}
										style={{flex:1,alignItems:'center'}}
										value={this.state.ddos_protection} />
								</View>

							</View>
						</View>

						<View style={styles.rowSection}>
							<View style={styles.rowTitle}><Text style={{fontSize:15,fontFamily:'WebHostingHub-Glyphs',color:'#1669ba'}}>5</Text><Text style={{fontSize:15,fontWeight:'bold',color:'#1669ba'}}>  Hostname & Label</Text></View>
							<View style={styles.rowContent}>
								<View style={styles.wrapper}>

									<TextInput
										style={{flex:1,width:100,height:40,paddingHorizontal:20,borderBottomWidth:1,borderBottomColor:'#333333'}}
// 										onFocus={ ()=>{_scrollView.scrollTo(1800);}}
										placeholder="Server Hostname"
										onChangeText={(hostname) => this.setState({hostname})}
										placeholderTextColor="#cccccc"
										value={this.state.hostname}
										/>
								</View>
								<View style={styles.wrapper}>

									<TextInput
										style={{flex:1,width:100,height:40,paddingHorizontal:20,borderBottomWidth:1,borderBottomColor:'#333333'}}
// 										onFocus={ ()=>{_scrollView.scrollTo({y: 1775});}}

										placeholder="Server Label"
										onChangeText={(label) => this.setState({label})}
										placeholderTextColor="#cccccc"
										value={this.state.label}
										/>
								</View>

							</View>

						</View>

						<View style={styles.rowSection}>
							<View style={styles.rowTitle}><Text style={{fontSize:15,fontFamily:'WebHostingHub-Glyphs',color:'#1669ba'}}>Summary</Text><Text style={{fontSize:15,fontWeight:'bold',color:'#1669ba'}}></Text></View>
							<View style={styles.rowContent}>
								<View style={styles.wrapper}>
									<Text style={{
											fontSize: 20,
											fontWeight: "200",
											color: '#1669ba',
											flex:5}}>Server Price</Text>
										<Text style={styles.text}>
                                            ${parseInt(this.state.selectedPlanPrice).toFixed(0)}
                                        </Text>
									</View>
									<View style={styles.wrapper}>
										<Text style={{
												fontSize: 20,
												fontWeight: "200",
												color: '#1669ba',
												flex:1}}>Backup Fee</Text><Text style={styles.text}>${parseInt(this.state.selectedPlanPrice)*0.2*this.state.auto_backup}</Text>

										</View>
										<View style={styles.wrapper}>
											<Text style={{
													fontSize: 20,
													fontWeight: "200",
													color: '#1669ba',
													flex:1}}>DDos Protection Fee</Text><Text style={styles.text}>${10*this.state.ddos_protection}</Text>

											</View>
											<View style={styles.wrapper}>
												<Text style={{
														fontSize: 20,
														fontWeight: "200",
														color: '#1669ba',
														flex:1}}>Windows Fee</Text><Text style={styles.text}>${16*this.state.windowsSelected}/mo</Text>

												</View>
											<View style={styles.wrapper}>
												<Text style={{
														fontSize: 20,
														fontWeight: "300",
														color: '#1669ba',
														flex:1}}>Total</Text><Text style={styles.text}>${parseInt(this.state.selectedPlanPrice)+parseInt(this.state.selectedPlanPrice)*0.2*this.state.auto_backup+10*this.state.ddos_protection+16*this.state.windowsSelected}/mo</Text>

												</View>
												<Text style={{padding:10,color:'#cccccc'}}>Note:  VAT (Value Added Tax) will apply to customers reside in EU.</Text>
											</View>
										</View>
									</ScrollView>

									<View style={{
											borderTopWidth:1,
											borderTopColor:'#ccc',
											shadowColor: "#000000",
											shadowOpacity: 0.8,
											shadowRadius: 5,
											shadowOffset: {
												height: 1,
												width: 0
											},
											flex:1,
											paddingVertical:5,
											justifyContent:'center',
										}}>
										<Button
											containerStyle={{padding:6,height:36, overflow:'hidden', borderRadius:5,backgroundColor:"#1a78cf"}}
											style={{fontSize: 20,flex:1,color: 'white'}}
											onPress={
												()=>{				var APIURL='https://api.vultr.com/v1/server/create';
																console.log(this.props.apikey);
																var headers = {
																	'API-Key': this.props.apikey,
																	"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
															};
															var hostname=this.state.hostname!==""?this.state.hostname:'Vultr';
															var label=this.state.label!=""?this.state.label:'Cloud%20Instance'
															console.log(hostname+" "+label)
															var dataString = 'DCID='+this.state.selectedRegion+'&VPSPLANID='+this.state.selectedPlan+'&hostname='+hostname+'&label='+label+'&OSID='+this.state.selectedOS+'&enable_ipv6='+(this.state.ipv6?'yes':'no')+'&enable_private_network'+(this.state.private_network?'yes':'no')+'&auto_backups'+(this.state.auto_backups?'yes':'no')+'&ddos_protection'+(this.state.ddos_protection?'yes':'no');
																  fetch(APIURL,{
																	method: 'POST',
																	headers: headers,
																	body:dataString,
																})
																.then((response) =>
																response.status==200?Toast.show('Your server is now installing.', {
																	duration: Toast.durations.SHORT,
																	position: -100,
																	shadow: true,
																	animation: true,
																	hideOnPress: true,
															}):console.log(response))
Controllers.NavigationControllerIOS("movies_nav").pop();
														}
											}>
											DEPLOY NOW
										</Button>
									</View>

								</View>
							);
						},

					});

					var styles = StyleSheet.create({
						container: {
							flex:12,
							flexDirection:'column',
							backgroundColor: '#F5FCFF',
						},
						button: {
							textAlign: 'center',
							fontSize: 18,
							marginBottom: 10,
							marginTop: 10,
							color: 'white'
						},
						rowSection:{
							paddingVertical:10,
							paddingHorizontal:20
						},
						rowTitle:{
							flexDirection:'row'
						},
						rowContent:{
							marginTop:10,
							backgroundColor:'#ffffff',
							borderRadius: 2,
							paddingVertical:4,
							shadowColor: "#000000",
							shadowOpacity: 0.6,
							shadowRadius: 1,
							shadowOffset: {
								height: 1,
								width: 0
							}
						},
						countryBtn: {
							padding:6,overflow:'hidden', borderRadius:5,backgroundColor:"#1a78cf"
						},
						countryBtnText: {
							fontSize: 16, color: 'white'
						},
						countryBtnSelected: {
							padding:6,overflow:'hidden', borderRadius:5,backgroundColor:"#7cb342"
						},
						countryFlag:{
							width:54,
							height:36,
							margin:5
						},
						listContainer: {
							flex: 1,
							backgroundColor: '#ffffff',
						},
						wrapper: {
							padding:10,
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems:'center',
							borderBottomWidth: 1,
							borderBottomColor: '#e6e9eb',
						},
						selectedRow: {
							padding:10,
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems:'center',
							backgroundColor:'#1669ba',
							borderBottomWidth: 1,
							borderBottomColor: '#e6e9eb',
						},
						text: {
							fontSize: 20,
							fontWeight: "200",
							color: '#1669ba',
						},
						textSelected: {
							fontSize: 20,
							fontWeight: "200",
							color: '#ffffff',
						},

						whiteFont: {
							color: '#FFF',
							width:50
						},
					});

					AppRegistry.registerComponent('AddServerScreen', () => AddServerScreen);

					module.exports = AddServerScreen;
