import { Alert } from "react-native";

export const alertResponse = (title:string = "Success",message: string, resetFn: Function) => {
  Alert.alert(title, message, [
    {
      text: "OK",
      onPress:()=> resetFn(),
    }
  ]);
};
