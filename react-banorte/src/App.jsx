import React from "react";
import {
  WebChatContainer,
  setEnableDebug,
} from "@ibm-watson/assistant-web-chat-react";
import "./App.scss";
import { ContentCarousel } from "./ContentCarousel.js";

/**
 * This example uses the `@ibm-watson/assistant-web-chat-react` library to import web chat into a React application.
 *
 * See https://www.npmjs.com/package/@ibm-watson/assistant-web-chat-react.
 */

const config = {
  integrationID: "bfd4bbf7-dc84-4159-80ea-eae2f9bf9ff0",
  region: "us-south",
  serviceInstanceID: "90636f78-424c-4abb-8ae7-ab820fa401a4",
  // subscriptionID: 'only on enterprise plans',
  // Note that there is no onLoad property here. The WebChatContainer component will override it.
  // Use the onBeforeRender or onAfterRender prop instead.
};

// Include this if you want to get debugging information from this library. Note this is different than
// the web chat "debug: true" configuration option which enables debugging within web chat.

setEnableDebug(true);
function App() {
  return (
    <>
      <WebChatContainer
        renderCustomResponse={renderCustomResponse}
        config={config}
      />
    </>
  );
}

/**
 * This is the callback function that will render custom responses. It will look at the "user_defined_type" message
 * property to determine what custom response to render and return the appropriate component.
 */

// function renderCustomResponse(event) {
//   console.log("awu");
//   // The event here will contain details for each custom response that needs to be rendered.
//   // The "user_defined_type" property is just an example; it is not required. You can use any other property or
//   // condition you want here. This makes it easier to handle different response types if you have more than
//   // one custom response type.
//   if (
//     event.data.message.user_defined &&
//     event.data.message.user_defined.user_defined_type === "AAAA"
//   ) {
//     return <div>My custom content</div>;
//   }
// }

function renderCustomResponse(event, webChatInstance) {
  const { message } = event.data;
  // The "user_defined_type" property is just an example. It is not required or you can use any other property or
  // condition you want here. This makes it easier to handle different response types if you have more than one
  // custom response type.
  if (
    message.user_defined &&
    message.user_defined.user_defined_type === "carousel"
  ) {
    console.log("Se ejecuta el carrousel");
    return (
      <ContentCarousel message={message} webChatInstance={webChatInstance} />
    );
  }
  return <div>Holi</div>;
}

export default App;
