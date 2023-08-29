import { store } from "./store";
import { setFields, resetFields, setSubmitButton } from "./formSlice";

export const handleInput = (key, value) => {
  store.dispatch(setFields({ values: { [key]: value } }));
};

export const handleReset = () => {
  store.dispatch(resetFields());
};

export const handledisablesubmitButton = (bool) => {
  store.dispatch(setSubmitButton(bool));
};



