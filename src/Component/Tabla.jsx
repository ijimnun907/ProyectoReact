import React from 'react';

const Tabla = ({ gasolineras, fecha, ordenarPorPrecio }) => {
    return (
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
    );
};

export default Tabla;
