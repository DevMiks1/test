import { reactive } from "vue";

export const useSnackbar = () => {
  const snackbarProperties = reactive({
    isVisible: false,
    message: "",
    color: "",
    timeout: 3000,
  });

  const showSnackbar = (status: string, msg: string) => {
    snackbarProperties.color = status;
    snackbarProperties.message = msg;
    snackbarProperties.isVisible = true;
  };

  return { snackbarProperties, showSnackbar };
};

export const snackbarInstance = useSnackbar();
