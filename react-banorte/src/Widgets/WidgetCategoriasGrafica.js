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

const centerTextPlugin = {
  id: "centerTextPlugin",
  afterDraw: (chart) => {
    let ctx = chart.ctx;
    ctx.save();

    // Text characteristics
    let centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
    let centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
    ctx.font = "1.6rem Arial"; // Adjust font size and style as needed
    ctx.fillStyle = "gray"; // Text color
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // The text to display
    ctx.fillText("Nov", centerX, centerY);

    ctx.restore();
  },
};

function WidgetCategoriasGrafica({ message, webChatInstance }) {
  // Informacion de las categorias
  // const categorias = message.user_defined.data;

  const legendMarginLeft = {
    id: "legendMarginRight",
    afterInit(chart, args, options) {
      const fitValue = chart.legend.fit;
      chart.legend.fit = function fit() {
        fitValue.bind(chart.legend)();
        let width = (this.width += 40);
        return width;
      };
    },
  };

  useEffect(() => {
    // Register the plugin
    Chart.register(ChartDataLabels, centerTextPlugin);

    // Data for the chart
    const data = {
      datasets: [
        {
          data: [10, 20, 30, 40, 10, 20, 30], // Example data
          backgroundColor: [
            "#FAC310",
            "#B01657",
            "#E4415D",
            "#FF8029",
            "#E35122",
            "#E6201B",
            "#808080",
          ],
          borderWidth: 0,
        },
      ],
      labels: [
        "Comida",
        "Super",
        "Servicios",
        "Transporte",
        "Salud",
        "Tecnologia",
        "Otros",
      ],
    };

    // Configuration for the chart
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
            position: "right", // Position the legend on the right
            align: "center", // Align the legend items in the center
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

    // Initialize the chart
    const myChart = new Chart(
      document.getElementById("myChart").getContext("2d"),
      config
    );

    // Cleanup
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
