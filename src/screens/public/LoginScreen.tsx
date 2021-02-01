import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Dimensions,
} from 'react-native';
import FormInput from '../../components/FormInput';
import { connect } from 'react-redux';
import { userLogin } from '../../store/actions/userAction';

import Appbar from '../../components/Appbar';
import AnicureText from '../../components/AnicureText';
import AnicureButton from '../../components/AnicureButton';

const { height, width } = Dimensions.get('screen');

const LoginScreen = ({ navigation, userLogin }: any) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [isLoading, setIsLoading] = useState(false);


  const handleLogin = async () => {
    if (email.value === "" || password.value === "") {
      let error = "Enter a valid email and password"
      return;
    }
    setIsLoading(true)
    await userLogin({ email, password });
    setIsLoading(false);
  };

  return (
    <View style={[styles.scrollView]}>
      <Appbar
        navigation={navigation}
        back={true}
      />
      <View style={{ width: width, alignItems: "center", paddingHorizontal: 30 }}>

        <Image
          source={require("../../assets/svg/logo.png")}
          style={{ width: 100 }}
          resizeMode="cover"
        />

        <AnicureText
          text="Login to your account"
          type="subTitle"
          otherStyles={{ fontFamily: "Roboto-Medium", width: "100%", textAlign: "left", marginTop: 40, marginBottom: 20, paddingHorizontal: 20, fontSize: 15 }}
        />

        <View style={{ minHeight: 300, width: "100%", backgroundColor: "#FFFFFF", borderRadius: 10, padding: 20 }}>

          <FormInput
            preIcon={"user"}
            value={email.value}
            error={email.error}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Email"
            onChangeText={(userEmail: string) => setEmail({ value: userEmail, error: email.error })}
          />

          <FormInput
            preIcon={"lock"}
            placeholder="Password"
            icon="password"
            value={password.value}
            error={password.error}
            secureTextEntry={true}
            onChangeText={(userPassword: string) => setPassword({ value: userPassword, error: password.error })}
          />

          <AnicureButton
            onPress={handleLogin}
            title="Sign In"
          />
        </View>

        <View style={{ flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "center", paddingTop: 50 }}>
          <AnicureText

            type="subTitle"
            text="Don't have an Account?"
            otherStyles={{ color: "#1F1742", opacity: 0.76, fontSize: 14 }}
          />
          <AnicureButton
            width="20%"
            textBtn={true}
            fontSize={15}
            title="Sign Up"
            otherStyles={{ width: 80 }}
            onPress={() => navigation.navigate("CreateAccount")}

          />
        </View>





      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F4F4',
  },
  scrollView: {
    // flex: 1,
    // height: height - 90,
    backgroundColor: "#F4F4F4",
    // alignItems: "flex-start"
  },
  image: {
    width: 170,
    height: 170,
    borderRadius: 100,
    marginHorizontal: "auto"
  },
  titleText: {
    fontSize: 17,
    marginBottom: 10,
  },
  loginButtonLabel: {
    fontSize: 20,
  },
  navButtonText: {
    fontSize: 13,
  },
});

const mapStateToProps = (state: any) => {
  console.log(state.error.authError)
  console.log('=============')
  return ({
    error: state.error.authError,
  })
};

export default connect(mapStateToProps, { userLogin })(LoginScreen);
