import React from "react";
import { Text, themeColor, useTheme } from "react-native-rapi-ui";
export default (props) => {
  const { isDarkmode } = useTheme();
  return (
    <Text
      fontWeight="bold"
      style={{
        marginBottom: 5,
        color: props.focused ? (isDarkmode ? "#D76348" : "#D76348") : "#E8A998",
        fontSize: 10,
      }}
    >
      {props.title}
    </Text>
  );
};
