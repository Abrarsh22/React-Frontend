import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import FormPreviewer from "./FormPreviewer";
import { store } from "./redux/store";
import { Provider } from "react-redux";

// selects divs whose div.id starts with "rfb-"
const rfbDivs = document.querySelectorAll("div[id^='rfb-']");

rfbDivs.forEach((div) => {
  const uuid = div.id.substring(4); // get the UUID from the id attribute by slicing the "rfb-" from the shortcode
  ReactDOM.createRoot(div).render(
    <Provider store={store}>
      <FormPreviewer id={uuid} />
    </Provider>
  );
});

