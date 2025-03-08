import React from 'react';

const SelectForm = ({
                        comunidades,
                        selectedComunidad,
                        setSelectedComunidad,
                        provincias,
                        selectedProvincia,
                        setSelectedProvincia,
                        localidades,
                        selectedLocalidad,
                        setSelectedLocalidad,
                    }) => {
    return (
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
            {localidades.length > 0 && selectedProvincia !== "null" && (
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
    );
};

export default SelectForm;
