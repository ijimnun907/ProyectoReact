import { useState, useEffect } from "react";
import './App.css';

export default function Gasolinera() {
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
        if (selectedComunidad !== "null") {
            fetch(`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/ProvinciasPorComunidad/${selectedComunidad}`)
                .then((res) => res.json())
                .then((data) => setProvincias(data));
        } else {
            setProvincias([]);
            setLocalidades([]);
            setGasolineras([]);
            setSelectedProvincia("null");
            setSelectedLocalidad("null");
        }
    }, [selectedComunidad]);

    useEffect(() => {
        if (selectedProvincia !== "null") {
            fetch(`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/MunicipiosPorProvincia/${selectedProvincia}`)
                .then((res) => res.json())
                .then((data) => setLocalidades(data));
        } else {
            setLocalidades([]);
            setGasolineras([]);
            setSelectedLocalidad("null");
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
            <form>
                <div className="form-group">
                    <label>Comunidad Autónoma</label>
                    <select value={selectedComunidad} onChange={(e) => setSelectedComunidad(e.target.value)}>
                        <option value="null">Seleccione una comunidad</option>
                        {comunidades.map((com) => (
                            <option key={com.IDCCAA} value={com.IDCCAA}>{com.CCAA}</option>
                        ))}
                    </select>
                </div>
                {provincias.length > 0 && (
                    <div className="form-group">
                        <label>Provincia</label>
                        <select value={selectedProvincia} onChange={(e) => setSelectedProvincia(e.target.value)}>
                            <option value="null">Seleccione una provincia</option>
                            {provincias.map((pro) => (
                                <option key={pro.IDPovincia} value={pro.IDPovincia}>{pro.Provincia}</option>
                            ))}
                        </select>
                    </div>
                )}
                {localidades.length > 0 && (
                    <div className="form-group">
                        <label>Localidad</label>
                        <select value={selectedLocalidad} onChange={(e) => setSelectedLocalidad(e.target.value)}>
                            <option value="null">Seleccione una localidad</option>
                            {localidades.map((loc) => (
                                <option key={loc.IDMunicipio} value={loc.IDMunicipio}>{loc.Municipio}</option>
                            ))}
                        </select>
                    </div>
                )}
            </form>
            {gasolineras.length > 0 ? (
                <div className="table-container">
                    <h2>Precios Actuales {fecha}</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>Estación</th>
                            <th>Dirección</th>
                            <th>Horario</th>
                            <th onClick={() => ordenarPorPrecio("Precio Gasolina 95 E5")}>Gasolina95</th>
                            <th onClick={() => ordenarPorPrecio("Precio Gasolina 98 E5")}>Gasolina98</th>
                            <th onClick={() => ordenarPorPrecio("Precio Gasoleo A")}>GasóleoA</th>
                            <th onClick={() => ordenarPorPrecio("Precio Gasoleo Premium")}>GasóleoA+</th>
                            <th onClick={() => ordenarPorPrecio("Precio Gasoleo B")}>GasóleoB</th>
                        </tr>
                        </thead>
                        <tbody>
                        {gasolineras.map((pre, index) => (
                            <tr key={index}>
                                <td>{pre["Rótulo"]}</td>
                                <td>{pre["Dirección"]}</td>
                                <td>{pre.Horario}</td>
                                <td>{pre["Precio Gasolina 95 E5"]}</td>
                                <td>{pre["Precio Gasolina 98 E5"]}</td>
                                <td>{pre["Precio Gasoleo A"]}</td>
                                <td>{pre["Precio Gasoleo Premium"]}</td>
                                <td>{pre["Precio Gasoleo B"]}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : selectedLocalidad !== "null" && (
                <h2>No hay gasolineras</h2>
            )}
        </div>
    );
}


