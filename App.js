import React, { useRef, useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  BackHandler,
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { WebView } from "react-native-webview";

const App = () => {
  const webViewRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const backAction = () => {
      if (webViewRef.current) {
        webViewRef.current
          .evaluateJavaScript("window.history.length")
          .then((historyLength) => {
            if (historyLength > 1) {
              webViewRef.current.goBack();
            } else {
              Alert.alert("Keluar", "Yakin ingin keluar dari aplikasi?", [
                { text: "Batal", style: "cancel" },
                { text: "Keluar", onPress: () => BackHandler.exitApp() },
              ]);
            }
          });
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    webViewRef.current.reload();
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* <WebView
          ref={webViewRef}
          source={{ uri: "https://app.hhproperti.com/" }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onLoadStart={() => setLoading(true)}
          onLoad={() => setLoading(false)}
          style={StyleSheet.absoluteFillObject} // WebView full screen tanpa padding
        /> */}
        <WebView
          ref={webViewRef}
          source={{ uri: "https://app.gamaarcadia.com/" }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onLoadStart={() => setLoading(true)}
          onLoad={() => setLoading(false)}
          style={StyleSheet.absoluteFillObject} // WebView full screen tanpa padding
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Warna background jika WebView belum dimuat
  },
  loaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    zIndex: 1,
  },
});

export default App;
