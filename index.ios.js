'use strict';

var Controllers = require('react-native-controllers');

var React = Controllers.hijackReact();
var {
  ControllerRegistry,
  TabBarControllerIOS,
  NavigationControllerIOS,
  ViewControllerIOS,
  DrawerControllerIOS
} = React;

// require all top level react components you refer to in the layout
require('./SideMenu');
require('./MainScreen');
require('./MoreDrawerOptionsScreen');
require('./SearchScreen');
require('./FavoritesScreen');
require('./ExtraScreen');
require('./LoginScreen');
require('./AddServerScreen');
require('./StyledTabScreen');
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

var MoviesApp = Controllers.createClass({

  render: function() {
    return (
      <DrawerControllerIOS id="drawer"
                           componentLeft="SideMenu"
                           type="MMDrawer"
                           animationType="slide"
													 disableOpenGesture='true'
                           style={{contentOverlayColor:'#162D3D55'}}>
        <TabBarControllerIOS id="main">
          <TabBarControllerIOS.Item title="Servers" icon={require('./img/server.png')} selectedIcon={require('./img/server.png')}>
            <NavigationControllerIOS
              title="Servers"
              component="MainScreen"
              id="movies_nav"
              style={{ drawUnderNavBar: false, drawUnderTabBar: true,navBarBackgroundColor: '#1a78cf',navBarTextColor: '#ffffff',navBarButtonColor: '#ffffff',statusBarTextColorScheme: 'light'}}
            />
          </TabBarControllerIOS.Item>

        </TabBarControllerIOS>
      </DrawerControllerIOS>
    );
  }
});

var ModalScreenTester = Controllers.createClass({
  render: function() {
    return (
        <NavigationControllerIOS
            title="Modal"
            component="ModalScreen"
            id="modal_nav"
						style={{
							navBarHidden:true
						}}
        />
    );
  },
});
var AddServerScreen = Controllers.createClass({
  render: function() {
    return (
        <NavigationControllerIOS
            title="Modal"
            component="AddServerScreen"
            id="modal_add_server"
						style={{
							navBarHidden:true
						}}
        />
    );
  },
});

var TabStyleTester = Controllers.createClass({
  render: function() {
    return (
      <TabBarControllerIOS
        id="styled_tabs"
        style={{tabBarButtonColor: '#ffff00', tabBarSelectedButtonColor: '#ff9900', tabBarBackgroundColor: '#551A8B'}}
      >
        <TabBarControllerIOS.Item title="Movies" icon={require('./img/home.png')} selectedIcon={require('./img/home_selected.png')}>
          <NavigationControllerIOS
            title="Styled Tabs"
            component="StyledTabScreen"
            id="styled_tab_nav"
            leftButtons={[{
              title: "Close",
              onPress: function() {
                Controllers.Modal.dismissController();
              }
            }]}

          />
        </TabBarControllerIOS.Item>
        <TabBarControllerIOS.Item title="Favorites" icon={require('./img/star.png')} selectedIcon={require('./img/star_selected.png')}>
          <NavigationControllerIOS
            title="Styled Tabs"
            component="StyledTabScreen"
            id="styled_tab_nav2"
            leftButtons={[{
              title: "Close",
              onPress: function() {
                Controllers.Modal.dismissController();
              }
            }]}
          />
        </TabBarControllerIOS.Item>
      </TabBarControllerIOS>
    );
  }
})

var MoreDrawerScreenTester = Controllers.createClass({
  render: function() {
    return (
      <DrawerControllerIOS id="drawer_options"
                           componentLeft="SideMenu"
                           componentRight="SideMenu"
                           type="TheSideBar"
                           animationType="airbnb"
                           style={{leftDrawerWidth: 80,
                                   rightDrawerWidth: 50,
                                   contentOverlayColor: '#162D3D55',
                                   }}>


        <NavigationControllerIOS
          title="The Side Bar"
          component="MoreDrawerOptionsScreen"
          id="more_nav"
          style={{navBarTextColor: '#00ff00', drawUnderNavBar: false, drawUnderTabBar: true}}
        />
      </DrawerControllerIOS>
    );
  },
});

ControllerRegistry.registerController('MoviesApp', () => MoviesApp);
ControllerRegistry.registerController('ModalScreenTester', () => ModalScreenTester);
ControllerRegistry.registerController('AddServerScreen', () => AddServerScreen);
ControllerRegistry.registerController('TabStyleTester', () => TabStyleTester);
ControllerRegistry.registerController('MoreDrawerScreenTester', () => MoreDrawerScreenTester);

// this line makes the app actually start and initialize
ControllerRegistry.setRootController('MoviesApp');

module.exports = MoviesApp;
module.exports = ModalScreenTester;
module.exports = AddServerScreen;
module.exports = MoreDrawerScreenTester;
console.disableYellowBox = true;
