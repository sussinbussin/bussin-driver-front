const darkModeTheme = {
  colors: {
    primary: {
      50: "dark.50",
      100: "dark.100",
      200: "dark.200",
      300: "dark.300",
      400: "dark.400",
      500: "dark.500",
      600: "dark.600",
      700: "dark.700",
      800: "dark.800",
      900: "dark.900",
    },
  },
  components: {
    Box: {
      baseStyle: {
        bg: "black",
      },
    },
    Text: {
      baseStyle: {
        color: "muted.50",
      },
    },
    View: {
      defaultProps: {
        bg: "black",
      },
    },
    Heading: {
      baseStyle: {
        color: "muted.50",
      },
    },
    Button: {
      variants: {
        outline: {
          _text: "white",
          borderColor: "muted.500",
        },
      },
      baseStyle: {},
    },
    Input: {
      baseStyle: {
        color: "white",
      },
    },
    IconButton: {
      variants: {
        ghost: {
          _icon: {
            _color: "white",
          },
        },
      },
    },
  },
};

export default darkModeTheme;
