import { GeoJSON } from "react-leaflet/GeoJSON";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Popup } from "react-leaflet/Popup";
import "leaflet/dist/leaflet.css";
import { useNeighborhoods } from "./App.hooks";
import { Chart } from "./Chart";
import styles from "./App.module.scss";

function App() {
  const {
    geojson,
    status,
    isFailure,
    retry,
    selectNeighborhood,
    selectedNeighborhood,
  } = useNeighborhoods();

  return (
    <MapContainer
      style={{ height: "100vh" }}
      bounds={[
        [-23.234708, -45.928813],
        [-23.198917, -45.900761],
      ]}
      zoom={15}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=BcCw9iWXRyBExU9XfTBr"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {geojson && (
        <GeoJSON
          data={geojson}
          style={{ color: "#6c58ff" }}
          eventHandlers={{
            click: (event) => {
              selectNeighborhood(event.sourceTarget.feature.properties.id);
            },
          }}
        >
          <Popup minWidth={250}>
            {selectedNeighborhood && (
              <Chart
                name={selectedNeighborhood.name}
                population={selectedNeighborhood.population}
              />
            )}
          </Popup>
        </GeoJSON>
      )}

      {status === "loading" && (
        <div className={styles.feedback_container}>
          <div className={styles.loader} />
        </div>
      )}

      {isFailure && (
        <div className={styles.feedback_container}>
          <button onClick={retry} className={styles.retry_button}>
            Tentar novamente
          </button>
        </div>
      )}
    </MapContainer>
  );
}

export default App;
