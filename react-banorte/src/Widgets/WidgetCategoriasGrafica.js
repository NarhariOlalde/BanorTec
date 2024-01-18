import { useEffect } from "react";
import PropTypes from "prop-types";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Chart from "chart.js/auto";

const wrapper = {
  margin: "0",
  padding: "0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "100%",
  gap: "1rem",
  backgroundColor: "white",
};

function WidgetCategoriasGrafica({ message, webChatInstance }) {
  // Informacion de las categorias
  const categorias = message.user_defined.data;
  const mes = message.user_defined.mes;
  const categoriasLabels = categorias.map((item) => item.categoria);
  const categoriasColors = categorias.map((item) => item.color);
  const categoriasCount = categorias.map((item) => item.count);

  const centerTextPlugin = {
    id: "centerTextPlugin",
    afterDraw: (chart) => {
      let ctx = chart.ctx;
      ctx.save();

      let centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
      let centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
      ctx.font = "1.6rem Arial";
      ctx.fillStyle = "gray";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText(mes.substring(0, 3), centerX, centerY);

      ctx.restore();
    },
  };

  const legendMarginLeft = {
    id: "legendMarginRight",
    afterInit(chart, args, options) {
      const fitValue = chart.legend.fit;
      chart.legend.fit = function fit() {
        fitValue.bind(chart.legend)();
        let width = (this.width += 30);
        return width;
      };
    },
  };

  useEffect(() => {
    Chart.register(ChartDataLabels, centerTextPlugin);

    const data = {
      datasets: [
        {
          data: categoriasCount,
          backgroundColor: categoriasColors,
          borderWidth: 0,
        },
      ],
      labels: categoriasLabels,
    };

    const config = {
      type: "doughnut",
      data: data,
      options: {
        maintainAspectRatio: true,
        aspectRatio: 1.5,
        layout: {
          padding: {
            right: 0,
            left: 45,
          },
        },
        plugins: {
          datalabels: {
            color: "gray",
            anchor: "end",
            align: "end",
            offset: 0,

            formatter: (value, context) => {
              const sum = context.chart.data.datasets[0].data.reduce(
                (a, b) => a + b,
                0
              );
              const percentage = ((value / sum) * 100).toFixed(2) + "%";
              return percentage;
            },
          },
          legend: {
            position: "right",
            align: "center",
            rtl: true,
            labels: {
              textAlign: "left",
              color: "black",
              boxWidth: 30,
              font: {
                size: 11,
                family: "Arial",
                style: "bold",
              },
            },
          },
        },
      },
      plugins: [legendMarginLeft],
    };

    const myChart = new Chart(
      document.getElementById("myChart").getContext("2d"),
      config
    );

    return () => myChart.destroy();
  }, []);

  return (
    <div style={wrapper}>
      <canvas id="myChart"></canvas>
    </div>
  );
}

WidgetCategoriasGrafica.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  webChatInstance: PropTypes.object.isRequired,
};

export { WidgetCategoriasGrafica };
