import {
    Heading,
    View,
    Text,
    Stack,
    FormControl,
    Input,
    Button,
  } from "native-base";
  import { useContext, useState } from "react";
  import { useRegisterApi } from "../../api/RegisterApi";
  import { RegisterContext } from "../../contexts/register";
  import TopBarBack from "../TopBarBack";
  import DateTimePickerModal from "react-native-modal-datetime-picker";
  import dayjs from "dayjs";
  
  const RegisterDetails = ({ navigation }) => {
    const state = useContext(RegisterContext);
    const [email, setEmail] = useState("");
    const [nric, setNric] = useState("");
    const [mobile, setMobile] = useState("");
    const [username, setUsername] = useState("");
    const [date, setDate] = useState(new Date());
    const [datePicker, setDatePicker] = useState(false);
  
    const [displayEmailError, setDisplayEmailError] = useState(false);
    const [displayMobileError, setDisplayMobileError] = useState(false);
    const [displayNricError, setDisplayNricError] = useState(false);
  
    const { check } = useRegisterApi();
  
    const showDateTimePicker = () => {
      setDatePicker(true);
    };
    const hideDateTimePicker = () => {
      setDatePicker(false);
    };
    const handleDateTimeSelect = (date) => {
      setDate(date);
      setDatePicker(false);
    };
  
    const handleNext = async () => {
      //TODO: implement check
  
      const formData = {
        nric: nric,
        mobile: mobile,
        email: email,
      };
  
      const result = await check(formData);
      console.log(result);
      let error = false;
  
      if (!result.nricUnique) {
        setNric("");
        setDisplayNricError(true);
        error = true;
      }
  
      if (!result.mobileUnique) {
        setMobile("");
        setDisplayMobileError(true);
        error = true;
      }
  
      if (!result.emailUnique) {
        setEmail("");
        setDisplayEmailError(true);
        error = true;
      }
      if (error) {
        return;
      }
  
      if (result.emailUnique) setDisplayEmailError(false);
      if (result.mobileUnique) setDisplayMobileError(false);
      if (result.nricUnique) setDisplayNricError(false);
  
      state.nric = nric;
      state.email = email;
      state.mobile = mobile;
      state.username = username;
      state.date = date;
      navigation.navigate("RegisterCar");
    };
  
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <TopBarBack></TopBarBack>
        <Heading
          style={{
            alignSelf: "flex-start",
            paddingLeft: 30,
            paddingTop: 20,
          }}
          size="2xl"
        >
          Hello, {state.name}!
        </Heading>
        <Text
          style={{
            alignSelf: "flex-start",
            paddingLeft: 30,
          }}
        >
          We would like to hoard more details of you!
        </Text>
        <Stack
          w="85%"
          style={{
            marginTop: 30,
          }}
        >
          <FormControl>
            <FormControl.Label style={{ alignItems: "center" }}>
              Username
            </FormControl.Label>
            <Input
              value={username}
              onChangeText={(event) => setUsername(event)}
              variant="underlined"
              size="lg"
              placeholder="jomemes123"
            />
          </FormControl>
          <FormControl>
            <FormControl.Label style={{ alignItems: "center" }}>
              Email
            </FormControl.Label>
            <Input
              value={email}
              onChangeText={(event) => setEmail(event)}
              variant="underlined"
              size="lg"
              placeholder="jomeme@gmail.com"
            />
            {/* <FormControl.HelperText display={!displayEmailError}>
              Please enter another email address.
            </FormControl.HelperText> */}
          </FormControl>
          <FormControl>
            <FormControl.Label style={{ alignItems: "center" }}>
              NRIC
            </FormControl.Label>
            <Input
              value={nric}
              onChangeText={(event) => setNric(event)}
              variant="underlined"
              size="lg"
              placeholder="S6969696Z"
            />
            {/* <FormControl.HelperText display={!displayNricError}>
              NRIC is invalid, or already used.
            </FormControl.HelperText> */}
          </FormControl>
          <FormControl>
            <FormControl.Label style={{ alignItems: "center" }}>
              Mobile
            </FormControl.Label>
            <Input
              value={mobile}
              onChangeText={(event) => setMobile(event)}
              variant="underlined"
              size="lg"
              placeholder="99696969"
            />
            {/* <FormControl.HelperText display={!displayMobileError} >
              Mobile number is invalid, or already used.
            </FormControl.HelperText> */}
          </FormControl>
          <FormControl.Label style={{ alignItems: "center" }}>
            Date of Birth
          </FormControl.Label>
          <Button
            onPress={showDateTimePicker}
            style={{
              paddingLeft: 0,
            }}
          >
            {dayjs(date).format("DD/MM/YYYY")}
          </Button>
          <DateTimePickerModal
            isVisible={datePicker}
            mode="date"
            onCancel={hideDateTimePicker}
            onConfirm={handleDateTimeSelect}
          />
          <Button
            variant="outline"
            style={{ marginTop: 30 }}
            onPress={handleNext}
          >
            Next
          </Button>
        </Stack>
      </View>
    );
  };
  
  export default RegisterDetails;
  