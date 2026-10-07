import Toast from "react-native-toast-message";

export function showErrorToast(message: string) {
  Toast.show({
    type: "error",
    text1: "Something went wrong",
    text2: message,
  });
}

export function showSuccessToast(message: string) {
  Toast.show({
    type: "success",
    text1: "Success",
    text2: message,
  });
}
