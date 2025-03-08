import { useState, useEffect } from "react";
import './App.css';
import SelectForm from './Component/SelectForm.jsx';
import Tabla from './Component/Tabla.jsx';

export default function App() {
    const [comunidades, setComunidades] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [localidades, setLocalidades] = useState([]);
    const [gasolineras, setGasolineras] = useState([]);
    const [selectedComunidad, setSelectedComunidad] = useState("null");
    const [selectedProvincia, setSelectedProvincia] = useState("null");
    const [selectedLocalidad, setSelectedLocalidad] = useState("null");
    const [fecha, setFecha] = useState("");

    useEffect(() => {
        fetch("https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/ComunidadesAutonomas/")
            .then((res) => res.json())
            .then((data) => setComunidades(data));
    }, []);

    useEffect(() => {
        setGasolineras([]);
        setProvincias([]);
        setLocalidades([]);
        setSelectedProvincia("null");
        setSelectedLocalidad("null");

        if (selectedComunidad !== "null") {
            fetch(`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/ProvinciasPorComunidad/${selectedComunidad}`)
                .then((res) => res.json())
                .then((data) => setProvincias(data));
        }
    }, [selectedComunidad]);

    useEffect(() => {
        setGasolineras([]);
        setLocalidades([]);
        setSelectedLocalidad("null");

        if (selectedProvincia !== "null") {
            fetch(`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/MunicipiosPorProvincia/${selectedProvincia}`)
                .then((res) => res.json())
                .then((data) => setLocalidades(data));
        }
    }, [selectedProvincia]);

    useEffect(() => {
        if (selectedLocalidad !== "null") {
            fetch(`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroMunicipio/${selectedLocalidad}`)
                .then((res) => res.json())
                .then((data) => {
                    setGasolineras(data.ListaEESSPrecio || []);
                    setFecha(data.Fecha || "");
                });
        } else {
            setGasolineras([]);
        }
    }, [selectedLocalidad]);

    const ordenarPorPrecio = (tipo) => {
        const gasolinerasOrdenadas = [...gasolineras].sort((a, b) => {
            const precioA = parseFloat(a[tipo]?.replace(',', '.') || Infinity);
            const precioB = parseFloat(b[tipo]?.replace(',', '.') || Infinity);
            return precioA - precioB;
        });
        setGasolineras(gasolinerasOrdenadas);
    };

    return (
        <div className="container">
            <h1>Precios de Gasolinera</h1>
            <SelectForm
                comunidades={comunidades}
                selectedComunidad={selectedComunidad}
                setSelectedComunidad={setSelectedComunidad}
                provincias={provincias}
                selectedProvincia={selectedProvincia}
                setSelectedProvincia={setSelectedProvincia}
                localidades={localidades}
                selectedLocalidad={selectedLocalidad}
                setSelectedLocalidad={setSelectedLocalidad}
            />
            {gasolineras.length > 0 ? (
                <Tabla gasolineras={gasolineras} fecha={fecha} ordenarPorPrecio={ordenarPorPrecio}/>
            ) : selectedLocalidad !== "null" && (
                <h2>No hay gasolineras</h2>
            )}
        </div>
    );

}