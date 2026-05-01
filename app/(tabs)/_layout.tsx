import { Tabs } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        header: () => (
          <SafeAreaView style={styles.header}>
            
            <Image
              source={require('../../assets/img/alipao.png')}
              style={styles.logo}
            />

            {/* ✅ PROFILE ADDED ONLY */}
            <Image
              source={require('../../assets/icons/profile.png')}
              style={styles.profile}
            />

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
          tabBarIcon: ({ focused, color }) => (
            <View style={[styles.tabItemBox, focused && styles.activeBox]}>
              <Image
                source={require('../../assets/icons/home1.png')}
                style={[styles.icon, { tintColor: focused ? '#2872A1' : '#fff' }]}
              />
              <Text style={[styles.label, { color: focused ? '#2872A1' : '#fff' }]}>
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
          tabBarIcon: ({ focused, color }) => (
            <View style={[styles.tabItemBox, focused && styles.activeBox]}>
              <Image
                source={require('../../assets/icons/mybill2.png')}
                style={[styles.icon, { tintColor: focused ? '#2872A1' : '#fff' }]}
              />
              <Text style={[styles.label, { color: focused ? '#2872A1' : '#fff' }]}>
                My Bills
              </Text>
            </View>
          ),
        }}
      />

    </Tabs>
  );
}

const styles = StyleSheet.create({
  /* HEADER */
  header: {
    backgroundColor: '#2872A1',
    height: 90,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },

  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 15,
    marginLeft: -10,
  },

  /* ✅ ADDED PROFILE STYLE */
  profile: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    position: 'absolute',
    right: 15,
    top: 50,
  },

  /* FLOATING TAB */
  tabBar: {
    position: 'absolute',
    left: 15,
    right: 15,
    height: 55,
    backgroundColor: '#2872A1',
    borderRadius: 18,
    borderTopWidth: 0,
    elevation: 10,
    paddingBottom: 6,
    paddingTop: 6,
  },

  tabItem: {
    paddingVertical: 4,
  },

  icon: {
    marginTop: -16,
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginBottom: 2,
  },

  label: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: -10,
  },

  tabItemBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 23,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 3,
  },

  activeBox: {
    backgroundColor: '#fff',
  },
});