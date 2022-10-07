import { Text, Box, Center, Heading } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
/**
 * The bar on top of the application, together with the status bar.
 */
const TopBar = () => {
  const insets = useSafeAreaInsets();

  return (
    <Box style={{ paddingTop: insets.top, paddingBottom: 10 }}>
      <Center>
        <Heading>Bussin.</Heading>
        <Text fontSize="xs">Driver</Text>
      </Center>
    </Box>
  );
};

export default TopBar;
