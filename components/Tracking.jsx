import { Box, Text, Button } from "native-base";
import { useContext, useState, useEffect } from "react";
import { useTrackApi } from "../api/TrackApi";
import { GlobalContext } from "../contexts/global";
import { StyleSheet } from "react-native";

const Tracking = ({ navigation }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const [trackingState, setTrackingState] = useState();
  const { updateTrack, deleteTrack } = useTrackApi();

  const handleState = async () => {
    if (trackingState == "started") {
      //chage to picked up
      //
      let result = await updateTrack(
        {
          status: "picked",
        },
        state.tracker
      );
      console.log(result);
      setTrackingState("picked");
      return;
    }
    if (trackingState == "picked") {
      await deleteTrack(state.tracker);
      dispatch({
        type: "SET_TRACK",
        payload: null
      });
      dispatch({
        type: "MODIFY_STAGE",
        payload: {
          ...state.stage,
          display: "search",
        },
      });
    }
  };
  useEffect(() => {
    (async () => {
      const { getTrack } = useTrackApi();
      console.log("tracker:" + state.tracker);
      let data = await getTrack(state.tracker);
      setTrackingState(data.status);
    })();
  }, []);

  return (
    <Box style={{ ...styles.map }}>
      <Button variant="outline" onPress={handleState}>
        {trackingState == "started" ? "Picked Up" : "Dropped Off"}
      </Button>
    </Box>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "90%",
    marginTop: "auto",
    padding: 15,
    marginBottom: 90,
    borderRadius: 10,
  },
  input: {},
});
export default Tracking;
