'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ScrollView
} = ReactNative;
import Button from 'react-native-button'

var Controllers = require('react-native-controllers');
import Toast from 'react-native-root-toast';

var PushedScreen = React.createClass({
	getInitialState: function() {
		return {
			auto_backups:this.props.info.auto_backups,
		}
	},
	async _enableBackup(subID){

		console.log(this.props.apikey)
		var APIURL='https://api.vultr.com/v1/server/backup_enable';
		var headers = {
	    'API-Key': this.props.apikey,
			"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
	};
	var dataString = 'SUBID='+subID;
		await fetch(APIURL,{
			method: 'POST',
	    headers: headers,
	    body:dataString,
		})
		.then((response) =>
		response.status==200?this.setState({auto_backups:'yes'})
:Toast.show('To re-enable backup on this machine, you need to contact Vultr customer service.', {
	    duration: Toast.durations.LONG,
	    position: -100,
	    hideOnPress: true,
	})
		)

	},async _disableBackup(subID){

		console.log(this.props.apikey)
		var APIURL='https://api.vultr.com/v1/server/backup_disable';
		var headers = {
	    'API-Key': this.props.apikey,
			"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
	};
	var dataString = 'SUBID='+subID;
		await fetch(APIURL,{
			method: 'POST',
	    headers: headers,
	    body:dataString,
		})
		.then((response) =>
		response.status==200?this.setState({auto_backups:'no'})
:Toast.show('Some Error Happend.', {
	    duration: Toast.durations.SHORT,
	    position: -100,
	    hideOnPress: true,
	})
		)

	},
	render: function() {

		return (
			<View style={styles.container}>
				<ScrollView>
					<View style={{flexDirection:'column',flex:1}}>
						<View style={styles.rowContent}>
							<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
								<View style={{flexDirection:'row',alignItems:'flex-end'}}>
									<Text style={{color:'#616366',fontFamily:'WebHostingHub-Glyphs',fontSize:28,color:'#1e88e5'}}></Text><Text style={{fontSize:28,color:'#1e88e5'}}>{this.props.info.pending_charges}</Text><Text style={{color:'#616366',fontSize:10}}> Pending</Text>
								</View>
								<View style={{flexDirection:'row',alignItems:'flex-end'}}>
									<Text style={{color:'#616366',fontFamily:'WebHostingHub-Glyphs',fontSize:12}}></Text><Text style={{color:'#616366',fontSize:12}}>${parseInt(this.props.info.cost_per_month).toFixed(0)}  per month</Text>
								</View>
							</View>
							<View style={{flex:1,marginLeft:30}}>
								<View style={{flexDirection:'row'}}>
									<Text style={{fontSize:12,color:'#616366'}}>Subscription  </Text><Text style={{color:this.props.info.power_status=='running'?'#7cb342':'#ff0000' ,fontSize:12,}}>{this.props.info.status} </Text>
								</View>
								<View style={{flexDirection:'row',paddingVertical:2}}>
									<Text style={{fontSize:12,color:'#616366'}}>Power Status </Text><Text style={{color:this.props.info.power_status=='running'?'#7cb342':'#ff0000' ,fontSize:12,}}>{(this.props.info.power_status).split(' ')[0]} </Text>
								</View>
								<View style={{flexDirection:'row'}}>
									<Text style={{fontSize:12,color:'#616366'}}>Server State  </Text><Text style={{color:this.props.info.power_status=='running'?'#7cb342':'#ff0000' ,fontSize:12,}}>{this.props.info.server_state} </Text>
								</View>
							</View>
						</View>

						<View style={styles.rowContentWithExtraRow}>
							<View style={styles.rowContentNoBorder}>
								<View style={{flex:1,justifyContent:'center',}}>
									<View style={{flexDirection:'row'}}>
										<Text style={{fontFamily:'WebHostingHub-Glyphs', fontSize:12,color:'#616366'}}> </Text><Text style={{color:'#616366' ,fontSize:12,}}>{this.props.info.location} </Text>
									</View>
									<View style={{flexDirection:'row',paddingVertical:2}}>
										<Text style={{fontFamily:'WebHostingHub-Glyphs', fontSize:12,color:'#616366'}}> </Text><Text style={{color:'#616366' ,fontSize:12,}}>{(this.props.info.date_created).split(' ')[0]} </Text>
									</View>
									<View style={{flexDirection:'row'}}>
										<Text style={{fontFamily:'icomoon', fontSize:12,color:'#616366'}}> </Text><Text style={{color:'#616366' ,fontSize:12,}}>{this.props.info.os} </Text>
									</View>
								</View>
								<View style={{flex:1,justifyContent:'center',marginLeft:30}}>
									<View style={{flexDirection:'row'}}>
										<Text style={{fontFamily:'WebHostingHub-Glyphs', fontSize:12,color:'#616366'}}> </Text><Text style={{color:'#616366' ,fontSize:12,}}>{this.props.info.disk.split(' ')[1]} {this.props.info.disk.split(' ')[2]} </Text>
									</View>
									<View style={{flexDirection:'row'}}>
										<Text style={{fontFamily:'WebHostingHub-Glyphs', fontSize:12,color:'#616366'}}> </Text><Text style={{color:'#616366' ,fontSize:12,}}>{this.props.info.vcpu_count}{this.props.info.vcpu_count>1?" cores":" core"} </Text>
									</View>
									<View style={{flexDirection:'row'}}>
										<Text style={{fontFamily:'WebHostingHub-Glyphs', fontSize:12,color:'#616366'}}> </Text><Text style={{color:'#616366' ,fontSize:12,}}>{this.props.info.ram} </Text>
									</View>
								</View>
							</View>
							<View style={{flexDirection:'row',paddingTop:2}}>
								<Text style={{fontFamily:'WebHostingHub-Glyphs', color:'#616366' ,fontSize:12,}}> </Text><Text style={{color:'#616366' ,fontSize:12,}}>Bandwidth used {parseFloat(this.props.info.current_bandwidth_gb).toFixed(2)}GB out of {this.props.info.allowed_bandwidth_gb}GB</Text>
							</View>
						</View>


						<View style={styles.rowContent}>
							<View style={{flex:1,justifyContent:'center'}}>
								<View style={{flexDirection:'row'}}>
									<Text style={{ fontSize:12,color:'#616366'}}>Main IP:    </Text><Text style={{color:'#616366' ,fontSize:12,}}>{this.props.info.main_ip} </Text>
								</View>
								<View style={{flexDirection:'row',paddingVertical:2}}>
									<Text style={{ fontSize:12,color:'#616366'}}>Netmask: </Text><Text style={{color:'#616366' ,fontSize:12,}}>{(this.props.info.netmask_v4).split(' ')[0]} </Text>
								</View>
								<View style={{flexDirection:'row'}}>
									<Text style={{ fontSize:12,color:'#616366'}}>Gateway: </Text><Text style={{color:'#616366' ,fontSize:12,}}>{this.props.info.gateway_v4} </Text>
								</View>
							</View>
							<View style={{flex:1,justifyContent:'center',marginLeft:30}}>
								<View style={{flexDirection:'row'}}>
									<Text style={{ fontSize:12,color:'#616366'}}>Internal IP: </Text><Text style={{color:'#616366' ,fontSize:12,}}>{this.props.info.internal_ip} </Text>
								</View>
							</View>
						</View>


												<View style={styles.rowContent}>
													<View style={{flex:1,justifyContent:'center',}}>
														<View style={{flexDirection:'row'}}>
															<Text style={{ fontSize:12,color:'#616366'}}>Auto Backup:    </Text><Text style={this.state.auto_backups=="yes"?{color:'#7cb342' ,fontSize:12,}:{color:'#616366' ,fontSize:12,}}>{this.state.auto_backups} </Text>
														</View>

													</View>
													<View style={{flex:1,justifyContent:'flex-end',alignItems:'flex-end',marginHorizontal:50}}>
														<View style={{flexDirection:'row',justifyContent:'flex-end',alignItems:'flex-end'}}>
															{this.state.auto_backups=="yes"?
															<Button
																containerStyle={{
																	marginBottom: 10,
																	marginTop: 10,
																	}}
																	onPress={()=>{
																		this._disableBackup(this.props.info.SUBID);
																	}}
																style={{fontSize: 16, color: '#1669ba'}}>
																Disable
															</Button>:
															<Button
																containerStyle={{
																	marginBottom: 10,
																	marginTop: 10,
																	}}
																	onPress={()=>{
																		this._enableBackup(this.props.info.SUBID);
																	}}
																style={{fontSize: 16, color: '#1669ba'}}>
																Enable
															</Button>
														}
														</View>
													</View>
												</View>

					</View>
				</ScrollView>
			</View>
		);
	},


});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff'
	},
	rowContent: {
		flexDirection:'row',
		flex:1,
		marginVertical:5,
		borderBottomWidth:1,
		borderBottomColor:'#e6e9eb',
		padding:10
	},
	rowContentWithExtraRow:{
		flex:1,
		marginVertical:5,
		borderBottomWidth:1,
		borderBottomColor:'#e6e9eb',
		padding:10
	},
	rowContentNoBorder:{
		flexDirection:'row',
		flex:1,
	}
});

AppRegistry.registerComponent('PushedScreen', () => PushedScreen);

module.exports = PushedScreen;
