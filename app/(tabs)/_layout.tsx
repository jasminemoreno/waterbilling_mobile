import { Tabs, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    setShowMenu(false);
    console.log("Logout clicked");

    // TODO: clear token if needed
    // AsyncStorage.removeItem("customerToken");

    router.replace('/login');
  };

  const goProfile = () => {
    setShowMenu(false);
    router.push('/profile'); // ✅ GO TO PROFILE PAGE
  };

  const goAbout = () => {
    setShowMenu(false);
    router.push('/about'); // optional if you have page
  };

  const goSettings = () => {
    setShowMenu(false);
    router.push('/settings'); // optional if you have page
  };

  return (
    <TouchableWithoutFeedback onPress={() => setShowMenu(false)}>
      <View style={{ flex: 1 }}>

        <Tabs
          screenOptions={{
            header: () => (
              <SafeAreaView style={styles.header} edges={['top']}>

                {/* LEFT */}
                <View style={styles.headerLeft}>
                  <Image
                    source={require('../../assets/img/alipao.png')}
                    style={styles.logo}
                  />

                  <Text style={styles.headerText} numberOfLines={1}>
                    Alipao Water Billing System
                  </Text>
                </View>

                {/* RIGHT PROFILE ICON */}
                <View style={styles.headerRight}>
                  <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
                    <Image
                      source={require('../../assets/icons/profile.png')}
                      style={styles.profile}
                    />
                  </TouchableOpacity>
                </View>

              </SafeAreaView>
            ),

            tabBarShowLabel: true,
            tabBarStyle: [
              styles.tabBar,
              { bottom: insets.bottom + 10 },
            ],

            tabBarActiveTintColor: '#2872A1',
            tabBarInactiveTintColor: '#ffffff',
            tabBarLabelStyle: styles.label,
            tabBarItemStyle: styles.tabItem,
          }}
        >

          {/* HOME */}
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ focused }) => (
                <View style={[styles.tabItemBox, focused && styles.activeBox]}>
                  <Image
                    source={require('../../assets/icons/home1.png')}
                    style={[
                      styles.icon,
                      { tintColor: focused ? '#2872A1' : '#fff' },
                    ]}
                  />
                  <Text style={[
                    styles.label,
                    { color: focused ? '#2872A1' : '#fff' }
                  ]}>
                    Home
                  </Text>
                </View>
              ),
            }}
          />

          {/* MY BILLS */}
          <Tabs.Screen
            name="mybills"
            options={{
              title: 'My Bills',
              tabBarIcon: ({ focused }) => (
                <View style={[styles.tabItemBox, focused && styles.activeBox]}>
                  <Image
                    source={require('../../assets/icons/mybill2.png')}
                    style={[
                      styles.icon,
                      { tintColor: focused ? '#2872A1' : '#fff' },
                    ]}
                  />
                  <Text style={[
                    styles.label,
                    { color: focused ? '#2872A1' : '#fff' }
                  ]}>
                    My Bills
                  </Text>
                </View>
              ),
            }}
          />

          {/* PAY BILLS */}
          <Tabs.Screen
            name="paybills"
            options={{
              title: 'Pay Bills',
              tabBarIcon: ({ focused }) => (
                <View style={[styles.tabItemBox, focused && styles.activeBox]}>
                  <Image
                    source={require('../../assets/icons/paybill1.png')}
                    style={[
                      styles.icon,
                      { tintColor: focused ? '#2872A1' : '#fff' },
                    ]}
                  />
                  <Text style={[
                    styles.label,
                    { color: focused ? '#2872A1' : '#fff' }
                  ]}>
                    Pay Bills
                  </Text>
                </View>
              ),
            }}
          />

          {/* NOTIFICATIONS */}
          <Tabs.Screen
            name="notifications"
            options={{
              title: 'Notifications',
              tabBarIcon: ({ focused }) => (
                <View style={[styles.tabItemBox, focused && styles.activeBox]}>
                  <Image
                    source={require('../../assets/icons/notification2.png')}
                    style={[
                      styles.icon,
                      { tintColor: focused ? '#2872A1' : '#fff' },
                    ]}
                  />
                  <Text style={[
                    styles.label,
                    { color: focused ? '#2872A1' : '#fff' }
                  ]}>
                    Notifications
                  </Text>
                </View>
              ),
            }}
          />

          {/* HISTORY */}
          <Tabs.Screen
            name="history"
            options={{
              title: 'History',
              tabBarIcon: ({ focused }) => (
                <View style={[styles.tabItemBox, focused && styles.activeBox]}>
                  <Image
                    source={require('../../assets/icons/history2.png')}
                    style={[
                      styles.icon,
                      { tintColor: focused ? '#2872A1' : '#fff' },
                    ]}
                  />
                  <Text style={[
                    styles.label,
                    { color: focused ? '#2872A1' : '#fff' }
                  ]}>
                    History
                  </Text>
                </View>
              ),
            }}
          />

        </Tabs>

        {/* ================= DROPDOWN MENU ================= */}
        {showMenu && (
          <View style={styles.dropdown}>

            {/* PROFILE */}
            <TouchableOpacity style={styles.menuItem} onPress={goProfile}>
              <Image
                source={require('../../assets/icons/profile.png')}
                style={styles.menuIcon}
              />
              <Text style={styles.menuText}>Profile</Text>
            </TouchableOpacity>

            {/* ABOUT */}
            <TouchableOpacity style={styles.menuItem} onPress={goAbout}>
              <Image
                source={require('../../assets/icons/info.png')}
                style={styles.menuIcon}
              />
              <Text style={styles.menuText}>About</Text>
            </TouchableOpacity>

            {/* SETTINGS */}
            <TouchableOpacity style={styles.menuItem} onPress={goSettings}>
              <Image
                source={require('../../assets/icons/settings.png')}
                style={styles.menuIcon}
              />
              <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>

            {/* LOGOUT */}
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <Image
                source={require('../../assets/icons/logout.png')}
                style={[styles.menuIcon, { tintColor: 'red' }]}
              />
              <Text style={[styles.menuText, { color: 'red' }]}>
                Logout
              </Text>
            </TouchableOpacity>

          </View>
        )}

      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  /* HEADER (FIXED STABILITY) */
  header: {
    backgroundColor: '#2872A1',
    height: 90,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  headerRight: {
    width: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },

  headerText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    flexShrink: 1,
  },

  profile: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },

  dropdown: {
    position: 'absolute',
    top: 90,
    right: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    width: 180,
    elevation: 12,
    zIndex: 999,
    overflow: 'hidden',
  },
  
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  
  menuIcon: {
    width: 18,
    height: 18,
    marginRight: 10,
    resizeMode: 'contain',
  },
  
  menuText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  /* TAB BAR */
  tabBar: 
  { position: 'absolute', 
    left: 15, right: 15, 
    height: 55, 
    backgroundColor: '#2872A1', 
    borderRadius: 18, 
    borderTopWidth: 0, 
    elevation: 10, 
    paddingBottom: 6, 
    paddingTop: 6, }, 
  
  tabItem: 
  { paddingVertical: 4, }, 

  icon: 
  { marginTop: -16, 
    width: 22, 
    height: 22, 
    resizeMode: 'contain', 
    marginBottom: 2, }, 
    
  label: 
  { fontSize: 9, 
    fontWeight: '700', 
    marginTop: -10, },

  tabItemBox: 
  { alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 23, 
    paddingHorizontal: 16, 
    borderRadius: 10,
    marginBottom: 3, }, 
    
  activeBox: 
  { backgroundColor: '#fff', }, });