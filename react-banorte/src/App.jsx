import React from "react";
import {
  WebChatContainer,
  setEnableDebug,
} from "@ibm-watson/assistant-web-chat-react";
import "./App.scss";
import { WidgetListaRecordatorios } from "./Widgets/WidgetListaRecordatorios";
import { ContentCarousel } from "./Widgets/ContentCarousel";
import { WidgetCategoria } from "./Widgets/WidgetCategoria.js";
import { WidgetCategoriasGrafica } from "./Widgets/WidgetCategoriasGrafica";
import { WidgetSaludFinanciera } from "./Widgets/WidgetSaludFinanciera";
import {
  WidgetAhorroProgramadoInfo,
  WidgetAhorroProgramadoPaso1,
  WidgetAhorroProgramadoPaso2,
  WidgetAhorroProgramadoPaso3,
  WidgetAhorroProgramadoPaso4,
  WidgetAhorroProgramadoPaso5,
  WidgetAhorroProgramadoPaso6,
} from "./Widgets/WidgetAhorroProgramadoInfo";
import { WidgetTipFinanciero } from "./Widgets/WidgetTipFinanciero";
// import { WidgetTarjetas } from "./Widgets/WidgetTarjetas";
import { WidgetEnviar } from "./Widgets/WidgetEnviar";
import { WidgetAvisosCarrusel } from "./Widgets/WidgetAvisosCarrusel";
import { WidgetAlternativa } from "./Widgets/WidgetAlternativa";
import { config } from "./config.js";
import { WidgetNotificaciones } from "./Widgets/WidgetNotificaciones";
import { WidgetRecordatorioDetalles } from "./Widgets/WidgetRecordatorioDetalles";

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

  // Muestra la lista de recordatorios
  if (
    message.user_defined &&
    message.user_defined.user_defined_type === "lista recordatorios"
  ) {
    return (
      <WidgetListaRecordatorios
        message={message}
        webChatInstance={webChatInstance}
      />
    );
  }

  // Muestra el detalle del recordatorio
  if (
    message.user_defined &&
    message.user_defined.user_defined_type === "recordatorio detalle"
  ) {
    return (
      <WidgetRecordatorioDetalles
        message={message}
        webChatInstance={webChatInstance}
      />
    );
  }

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
    message.user_defined.user_defined_type === "grafica categorias"
  ) {
    return (
      <WidgetCategoriasGrafica
        message={message}
        webChatInstance={webChatInstance}
      />
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

  // Muestra el Widget de Ahorro Programado Info
  if (
    message.user_defined &&
    message.user_defined.user_defined_type === "ahorro programado"
  ) {
    return (
      <WidgetAhorroProgramadoInfo
        message={message}
        webChatInstance={webChatInstance}
      />
    );
  }

  // Muestra el Widget de Ahorro Programado Paso 1
  if (
    message.user_defined &&
    message.user_defined.user_defined_type === "ahorro programado paso1"
  ) {
    return (
      <WidgetAhorroProgramadoPaso1
        message={message}
        webChatInstance={webChatInstance}
      />
    );
  }

  // Muestra el Widget de Ahorro Programado Paso 2
  if (
    message.user_defined &&
    message.user_defined.user_defined_type === "ahorro programado paso2"
  ) {
    return (
      <WidgetAhorroProgramadoPaso2
        message={message}
        webChatInstance={webChatInstance}
      />
    );
  }

  // Muestra el Widget de Ahorro Programado Paso 3 (Datepicker)
  if (
    message.user_defined &&
    message.user_defined.user_defined_type === "ahorro programado paso3"
  ) {
    return (
      <WidgetAhorroProgramadoPaso3
        message={message}
        webChatInstance={webChatInstance}
      />
    );
  }

  // Muestra el Widget de Ahorro Programado Paso 4
  if (
    message.user_defined &&
    message.user_defined.user_defined_type === "ahorro programado paso4"
  ) {
    return (
      <WidgetAhorroProgramadoPaso4
        message={message}
        webChatInstance={webChatInstance}
      />
    );
  }

  // Muestra el Widget de Ahorro Programado Paso 5
  if (
    message.user_defined &&
    message.user_defined.user_defined_type === "ahorro programado paso5"
  ) {
    return (
      <WidgetAhorroProgramadoPaso5
        message={message}
        webChatInstance={webChatInstance}
      />
    );
  }

  // Muestra el Widget de Ahorro Programado Paso 6 (Resumen)
  if (
    message.user_defined &&
    message.user_defined.user_defined_type === "ahorro programado paso6"
  ) {
    return (
      <WidgetAhorroProgramadoPaso6
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

  // Muestra la lista de avisos
  if (
    message.user_defined &&
    message.user_defined.user_defined_type === "lista avisos"
  ) {
    return (
      <WidgetAvisosCarrusel
        message={message}
        webChatInstance={webChatInstance}
      />
    );
  }

  // Muestra el tablero de notificaciones
  if (
    message.user_defined &&
    message.user_defined.user_defined_type === "tablero notificaciones"
  ) {
    return (
      <WidgetNotificaciones
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
      // <WidgetTarjetas message={message} webChatInstance={webChatInstance} />
      <ContentCarousel message={message} webChatInstance={webChatInstance} />
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
