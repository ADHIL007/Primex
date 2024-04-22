import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Provider as PaperProvider, DarkTheme, DefaultTheme, List, Divider } from 'react-native-paper';

const Settings = () => {
  const [theme, setTheme] = useState(DefaultTheme);

  const toggleTheme = () => {
    setTheme(theme === DarkTheme ? DefaultTheme : DarkTheme);
  };

  const handleOptionPress = option => {
    // Implement logic for each option
  };

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <List.Section>
          <List.Subheader style={styles.subheader}>General Settings</List.Subheader>
          <List.Item
            title="Change Theme"
            onPress={toggleTheme}
            left={() => <List.Icon icon="palette" color="#1e90ff" />}
          />
          <Divider style={styles.divider} />
          <List.Item
            title="Change Password"
            onPress={() => handleOptionPress('Change Password')}
            left={() => <List.Icon icon="key" color="#1e90ff" />}
          />
          <Divider style={styles.divider} />
          <List.Item
            title="Change Display Name"
            onPress={() => handleOptionPress('Change Display Name')}
            left={() => <List.Icon icon="account-circle" color="#1e90ff" />}
          />
        </List.Section>
        <List.Section>
          <List.Subheader style={styles.subheader}>Additional Options</List.Subheader>
          <List.Item
            title="Notification Settings"
            onPress={() => handleOptionPress('Notification Settings')}
            left={() => <List.Icon icon="bell" color="#1e90ff" />}
          />
          <Divider style={styles.divider} />
          <List.Item
            title="Privacy Settings"
            onPress={() => handleOptionPress('Privacy Settings')}
            left={() => <List.Icon icon="lock" color="#1e90ff" />}
          />
          <Divider style={styles.divider} />
          <List.Item
            title="Help & Support"
            onPress={() => handleOptionPress('Help & Support')}
            left={() => <List.Icon icon="help-circle" color="#1e90ff" />}
          />
        </List.Section>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  subheader: {
    backgroundColor: '#fff',
    color: '#1e90ff',
    fontSize: 24,
    paddingVertical: 15,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  divider: {
    backgroundColor: '#1e90ff',
    marginVertical: 8,
  },
});

export default Settings;
