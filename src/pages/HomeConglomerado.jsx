import NavbarConglomerado from "../components/NavbarConglomerados";
import SidebarMenu from "../components/SidebarMenu";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import "./styles/HomeConglomerado.scss";
import { Bar } from "react-chartjs-2";
import AuthContext from "../context/AuthContext";
import { useGetObtenerNumPropietarios } from "../hooks/useObtenerGetEstadistica";
import ContainerNavSidbLoad from "../components/Container_Nav_Sidb_Load";
import { serverURL } from "../utils/Configuration";
const HomeConglomerado = ({ EstadoGlobal }) => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const successMessage = queryParams.get("successLogin");
  const [togle, setTogle] = useState(true);
  const {
    numPropietarios,
    numSocios,
    numInquilino,
    activoProp,
    inactivoProp,
    activoPropietarios,
    inactivoPropietarios,
    isLoading,
  } = useGetObtenerNumPropietarios(
    `${serverURL}/Estadistica/buscar/propietarios`,
    `${serverURL}/Estadistica/buscar/socios`,
    `${serverURL}/Estadistica/buscar/inquilinos`,
    `${serverURL}/Estadistica/obtener/estado/propiedades`,
    `${serverURL}/Estadistica/obtener/estado/prop/inactivo`,
    `${serverURL}/Estadistica/obtener/estado/propietarios/activo`,
    `${serverURL}/Estadistica/obtener/estado/propietarios/inactivo`,
    EstadoGlobal
  );

  //Composicion conglomerado Inicio
  //Actualiza estos valores con tus estadísticas reales

 

  useEffect(() => {
    console.log(auth);
    if (successMessage) {
      // Mostrar el mensaje de éxito usando un componente de notificación
      // Por ejemplo, usando la biblioteca "toast-library"
      toast.success("Inicio de sesión realizado con éxito");
    }
  }, [successMessage]);

  if (isLoading) {
    return <ContainerNavSidbLoad />;
  } else {
    const data = {
      labels: ["Propietarios", "Socios", "Inquilinos"],
      datasets: [
        {
          label: "Cantidad",
          data: [numPropietarios.data, numSocios.data, numInquilino.data],
          backgroundColor: ["#cae1fd", "#84b6f4", "#fdcae1"],
          hoverBackgroundColor: ["#cae1fd", "#84b6f4", "#fdcae1"],
        },
      ],
    };

    // Calcula los valores en porcentaje
    const total = data.datasets[0].data.reduce((sum, value) => sum + value, 0);

    const porcentajes = data.datasets[0].data.map(
      (value) => ((value / total) * 100).toFixed(2)
    );
    console.log(porcentajes);
    const optionsC = {
      animation: {
        duration: 1500, // Ajusta la duración de la animación (en milisegundos)
        easing: 'easeInOutQuart', // Ajusta la curva de animación según tus preferencias
      },
      maintainAspectRatio: false, // Permite redimensionar el gráfico
      aspectRatio: 2, // Ajusta esto según tus necesidades para aumentar la altura
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 10,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false, // Oculta la leyenda
        },
        title: {
          display: true,
          text: "Composición del conglomerado", // Cambia esto por el título que desees
          font: {
            size: 16,
            weight: "bold",
            family: "'Reboto', sans-serif",
          },
        },
      },
    };

    //Composicion conglomerado Fin
    //Estado propietario Inicio

    const data2 = {
      labels: ["Activo", "Inactivo"],
      datasets: [
        {
          data: [activoPropietarios.data, inactivoPropietarios.data], // Actualiza estos valores con tus estadísticas reales
          backgroundColor: ["#66ccff", "#84b6f4", "#fdcae1"],
          hoverBackgroundColor: ["#66ccff", "#84b6f4", "#fdcae1"],
        },
      ],
    };

    // Calcula los valores en porcentaje
    const total2 = data2.datasets[0].data.reduce(
      (sum, value) => sum + value,
      0
    );

    const porcentajes2 = data2.datasets[0].data.map(
      (value) => ((value / total2) * 100).toFixed(2)
    );
    //formatear porcentaje2

    console.log(porcentajes2)
    //const porcentajeFormateado = porcentajes2 % 1 === 0 ? porcentajes2.toFixed(0) : porcentajes2.toFixed(1);


    const optionsEP = {
      animation: {
        duration: 1500, // Ajusta la duración de la animación (en milisegundos)
        easing: 'easeInOutQuart', // Ajusta la curva de animación según tus preferencias
      },
      maintainAspectRatio: false, // Permite redimensionar el gráfico
      aspectRatio: 2, // Ajusta esto según tus necesidades para aumentar la altura
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 10,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false, // Oculta la leyenda
        },
        title: {
          display: true,
          text: "Estado Actual de los Propietarios", // Cambia esto por el título que desees
          font: {
            size: 16,
            weight: "bold",
            family: "'Reboto', sans-serif",
          },
        },
      },
    };

    const data3 = {
      labels: ["Disponibles", "Ocupados"],
      datasets: [
        {
          data: [activoProp.data, inactivoProp.data], // Actualiza estos valores con tus estadísticas reales
          backgroundColor: ["rgb(254, 177, 151)", "#84b6f4", "#fdcae1"],
          hoverBackgroundColor: ["rgb(254, 147, 101)", "#84b6f4", "#fdcae1"],
        },
      ],
    };

    // Calcula los valores en porcentaje
    const total3 = data3.datasets[0].data.reduce(
      (sum, value) => sum + value,
      0
    );

    console.log(total3);

    const porcentajes3 = data3.datasets[0].data.map(
      (value) => ((value / total3) * 100).toFixed(2)
    );
    console.log(porcentajes3);

    const optionsEPS = {
      animation: {
        duration: 1500, // Ajusta la duración de la animación (en milisegundos)
        easing: 'easeInOutQuart', // Ajusta la curva de animación según tus preferencias
      },
      maintainAspectRatio: false, // Permite redimensionar el gráfico
      aspectRatio: 2, // Ajusta esto según tus necesidades para aumentar la altura
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 10,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false, // Oculta la leyenda
        },
        title: {
          display: true,
          text: "Estado de Alquiler de Propiedades", // Cambia esto por el título que desees
          font: {
            size: 16,
            weight: "bold",
            family: "'Reboto', sans-serif",
          },
        },
      },
    };

    const textCenterEstadoActualProp={
      id:'textCenter',
      beforeDatasetsDraw(chart, args, pluginOptions){
        const {ctx,data}=chart;
        ctx.save();
        ctx.font='bolder 30px sans-serif';
        ctx.fillStyle='teal';
        ctx.textAlign='center';
        if (!isNaN(porcentajes2[0])) {
          ctx.fillText(`${porcentajes2[0]}%`, chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
        }
      }
    }

    const textCenterEstadoActualAlquiler={
      id:'textCenter',
      beforeDatasetsDraw(chart, args, pluginOptions){
        const {ctx,data}=chart;
        ctx.save();
        ctx.font='bolder 30px sans-serif';
        ctx.fillStyle='teal';
        ctx.textAlign='center';
        if (!isNaN(porcentajes3[0])) {
       ctx.fillText(`${porcentajes3[0]}%`, chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
      }
      }
    }
    return (
      <div className="navbar-sidebar-directivos">
        <NavbarConglomerado />
        <div className="container-Sidebar-view-directivo">
          <SidebarMenu setTogle={setTogle} />
          <div className="home-container" style={{ width: `100rem` }}>
            <div className="bienvenida-container"></div>
            <br />
            <div className="row align-items-center">
              <div className="col-md-4 d-flex justify-content-center mb-4">
                <div className="chart-container-home-conglomerado-chart1 ">
                  <Bar data={data} options={optionsC} />
                </div>
              </div>

              <div className="col-md-4 d-flex justify-content-center mb-4">
                <div className="chart-container-home-conglomerado ">
                  <Bar data={data2} options={optionsEP} />
                </div>
              </div>

              <div className="col-md-4 d-flex justify-content-center mb-4">
                <div className="chart-container-home-conglomerado ">
                  <Bar data={data3} options={optionsEPS} />
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center mb-4 ">
                <div className="chart-container-home-conglomerado ">
                  <Doughnut
                    data={{
                      ...data,
                      datasets: [
                        {
                          ...data.datasets[0],
                          data: porcentajes,
                        },
                      ],
                      
                    }}
                    options={{
                      plugins: {
                        legend: {
                          display: true,
                          position:  "bottom",
                        },
                        title: {
                          display: true,
                          text: "Composición del conglomerado",
                          font: {
                            size: 14,
                            weight: "bold",
                            family: "'Reboto', sans-serif",
                          },
                        },
                      },
                      cutout: "70%",
                      aspectRatio: 1,
                      animation: {
                        duration: 1500, // Ajusta la duración de la animación (en milisegundos)
                        easing: 'easeInOutQuart', // Ajusta la curva de animación según tus preferencias
                      },
                    }}
                  
                 
                  />
                </div>
              </div>
              <div className="col-md-4 d-flex justify-content-center mb-4">
                <div className="chart-container-home-conglomerado ">
                  <Doughnut
                    data={{
                      ...data2,
                      datasets: [
                        {
                          ...data2.datasets[0],
                          data: porcentajes2,
                        },
                      ],
                     
                    }}
                    options={{
                      plugins: {
                        legend: {
                          position: "bottom", // Coloca la leyenda en la parte inferior
                        },
                        title: {
                          display: true,
                          text: "Estado Actual de los Propietarios", // Cambia esto por el título que desees
                          font: {
                            size: 16,
                            weight: "bold",
                            family: "'Reboto', sans-serif",
                          },
                        },
                        
			subtitles: [{
				text: "71% Positive",
				verticalAlign: "center",
				fontSize: 24,
				dockInsidePlotArea: true
			}],
                      },
                      
                      cutout: "70%",
                      aspectRatio: 1,
                      animation: {
                        duration: 1500, // Ajusta la duración de la animación (en milisegundos)
                        easing: 'easeInOutQuart', // Ajusta la curva de animación según tus preferencias
                      },
                    }}

                    plugins={[textCenterEstadoActualProp]}
                  />
                </div>
              </div>

              <div className="col-md-4 d-flex justify-content-center mb-4">
                <div className="chart-container-home-conglomerado ">
                  <Doughnut
                    data={{
                      ...data3,
                      datasets: [
                        {
                          ...data3.datasets[0],
                          data: porcentajes3,
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        legend: {
                          position: "bottom", // Coloca la leyenda en la parte inferior
                        },
                        title: {
                          display: true,
                          text: "Estado Alquiler", // Cambia esto por el título que desees
                          font: {
                            size: 16,
                            weight: "bold",
                            family: "'Reboto', sans-serif",
                          },
                        },
                      },
                      cutout: "70%",
                      aspectRatio: 1,
                      animation: {
                        duration: 1500, // Ajusta la duración de la animación (en milisegundos)
                        easing: 'easeInOutQuart', // Ajusta la curva de animación según tus preferencias
                      },
                    }}

                    plugins={[textCenterEstadoActualAlquiler]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container"></div>
        <ToastContainer />
      </div>
    );
  }
};

export default HomeConglomerado;
