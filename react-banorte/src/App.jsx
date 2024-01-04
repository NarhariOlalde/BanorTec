import React from "react";
import {
  WebChatContainer,
  setEnableDebug,
} from "@ibm-watson/assistant-web-chat-react";
import "./App.scss";
import { ContentCarousel } from "./Widgets/ContentCarousel";
import { WidgetCategoria } from "./Widgets/WidgetCategoria.js";
import { WidgetSaludFinanciera } from "./Widgets/WidgetSaludFinanciera";
import { WidgetTipFinanciero } from "./Widgets/WidgetTipFinanciero";
import { WidgetTarjetas } from "./Widgets/WidgetTarjetas";
import { WidgetEnviar } from "./Widgets/WidgetEnviar";
import { WidgetAlternativa } from "./Widgets/WidgetAlternativa";
import { config } from "./config.js";

setEnableDebug(true);

// Contenedor de WebChat 2.0
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

// Funcion para ejecutar los Widgets de React
function renderCustomResponse(event, webChatInstance) {
  const { message } = event.data;

  // Muestra el carrusel de tarjetas demo
  if (
    message.user_defined &&
    message.user_defined.user_defined_type === "carousel"
  ) {
    return (
      <ContentCarousel message={message} webChatInstance={webChatInstance} />
    );
  }

  // Muestra los widgets de gastos por categoria
  if (
    message.user_defined &&
    message.user_defined.user_defined_type === "gasto categoria"
  ) {
    return (
      <WidgetCategoria message={message} webChatInstance={webChatInstance} />
    );
  }

  // Muestra el Widget de Salud Financiera
  if (
    message.user_defined &&
    message.user_defined.user_defined_type === "salud financiera"
  ) {
    return (
      <WidgetSaludFinanciera
        message={message}
        webChatInstance={webChatInstance}
      />
    );
  }

  // Muestra el Widget de Tip Financiero
  if (
    message.user_defined &&
    message.user_defined.user_defined_type === "tip financiero"
  ) {
    return (
      <WidgetTipFinanciero
        message={message}
        webChatInstance={webChatInstance}
      />
    );
  }

  // Muestra el Widget con las tarjetas disponibles
  if (
    message.user_defined &&
    message.user_defined.user_defined_type === "tarjetas disponibles"
  ) {
    return (
      <WidgetTarjetas message={message} webChatInstance={webChatInstance} />
    );
  }

  // Muestra el Widget con una sola tarjeta
  if (
    message.user_defined &&
    message.user_defined.user_defined_type === "Tarjeta seleccionada"
  ) {
    return <WidgetEnviar message={message} webChatInstance={webChatInstance} />;
  }

  // Muestra el Widget con las alternativas
  if (
    message.user_defined &&
    message.user_defined.user_defined_type === "Proponer alternativas"
  ) {
    return (
      <WidgetAlternativa message={message} webChatInstance={webChatInstance} />
    );
  }
}

export default App;
