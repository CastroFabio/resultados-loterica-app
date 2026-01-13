import React, { useState, useEffect } from "react";
import "../../App.css";

function App() {
  const [listA, setListA] = useState(["", "", "", "", "", "", "", "", "", ""]);
  const [listB, setListB] = useState(["", "", "", "", ""]);
  const [matches, setMatches] = useState([]);
  const [stats, setStats] = useState({
    totalA: 0,
    totalB: 0,
    matchesCount: 0,
  });

  // Processa as listas quando mudam
  useEffect(() => {
    // Filtra números válidos
    const validA = listA
      .map((num) => num.trim())
      .filter((num) => num !== "" && !isNaN(num))
      .map((num) => parseFloat(num));

    const validB = listB
      .map((num) => num.trim())
      .filter((num) => num !== "" && !isNaN(num))
      .map((num) => parseFloat(num));

    // Encontra coincidências
    const foundMatches = [];
    validA.forEach((numA) => {
      if (validB.includes(numA) && !foundMatches.includes(numA)) {
        foundMatches.push(numA);
      }
    });

    setMatches(foundMatches.sort((a, b) => a - b));

    // Atualiza estatísticas
    setStats({
      totalA: validA.length,
      totalB: validB.length,
      matchesCount: foundMatches.length,
    });
  }, [listA, listB]);

  const handleListAChange = (index, value) => {
    // Permite apenas números e ponto decimal
    const numericValue = value.replace(/[^0-9.-]/g, "");
    const newList = [...listA];
    newList[index] = numericValue;
    setListA(newList);
  };

  const handleListBChange = (index, value) => {
    const numericValue = value.replace(/[^0-9.-]/g, "");
    const newList = [...listB];
    newList[index] = numericValue;
    setListB(newList);
  };

  const addInputToListA = () => {
    setListA([...listA, ""]);
  };

  const addInputToListB = () => {
    setListB([...listB, ""]);
  };

  const removeInputFromListA = (index) => {
    if (listA.length > 1) {
      const newList = listA.filter((_, i) => i !== index);
      setListA(newList);
    }
  };

  const removeInputFromListB = (index) => {
    if (listB.length > 1) {
      const newList = listB.filter((_, i) => i !== index);
      setListB(newList);
    }
  };

  const handleClearAll = () => {
    setListA([""]);
    setListB([""]);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🔍 Comparador de Listas de Números</h1>
        <p className="app-subtitle">
          Adicione números e veja quais coincidem entre as listas
        </p>
      </header>

      <div className="control-panel">
        <button onClick={handleClearAll} className="btn-clear">
          🗑️ Limpar Tudo
        </button>
      </div>

      <div className="main-content">
        {/* Lista A */}
        <div className="list-section">
          <div className="list-header">
            <h2>📋 Lista A</h2>
            <div className="list-controls">
              <span className="list-count">{listA.length} campos</span>
              <button
                onClick={addInputToListA}
                className="btn-add"
                title="Adicionar novo campo"
              >
                + Novo
              </button>
            </div>
          </div>

          <div className="inputs-container">
            {listA.map((value, index) => (
              <div key={`a-${index}`} className="input-wrapper">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleListAChange(index, e.target.value)}
                  placeholder={`Número ${index + 1}`}
                  className="number-input"
                />
                {listA.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeInputFromListA(index)}
                    className="btn-remove"
                    title="Remover este campo"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="list-stats">
            <div className="stat">
              <span className="stat-label">Números válidos:</span>
              <span className="stat-value">{stats.totalA}</span>
            </div>
          </div>
        </div>

        {/* Lista B */}
        <div className="list-section">
          <div className="list-header">
            <h2>📝 Lista B</h2>
            <div className="list-controls">
              <span className="list-count">{listB.length} campos</span>
              <button
                onClick={addInputToListB}
                className="btn-add"
                title="Adicionar novo campo"
              >
                + Novo
              </button>
            </div>
          </div>

          <div className="inputs-container">
            {listB.map((value, index) => (
              <div key={`b-${index}`} className="input-wrapper">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleListBChange(index, e.target.value)}
                  placeholder={`Número ${index + 1}`}
                  className="number-input"
                />
                {listB.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeInputFromListB(index)}
                    className="btn-remove"
                    title="Remover este campo"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="list-stats">
            <div className="stat">
              <span className="stat-label">Números válidos:</span>
              <span className="stat-value">{stats.totalB}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="results-section">
        <h2>🎯 Números que Coincidem</h2>

        {matches.length > 0 ? (
          <>
            <div className="matches-count">
              <span className="count">{matches.length}</span>
              <span className="label">coincidência(s) encontrada(s)</span>
            </div>

            <div className="matches-grid">
              {matches.map((match, index) => (
                <div key={index} className="match-card">
                  <div className="match-header">
                    <span className="match-index">#{index + 1}</span>
                  </div>
                  <div className="match-number">{match}</div>
                  <div className="match-footer">
                    Presente em ambas as listas
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="no-matches">
            <span className="no-matches-icon">🔍</span>
            <p>Nenhum número coincide entre as listas</p>
            <p className="hint">
              Adicione números iguais em ambas as listas para ver as
              coincidências
            </p>
          </div>
        )}

        {/* Estatísticas */}
        <div className="stats-summary">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📋</div>
              <div className="stat-content">
                <span className="stat-label">Lista A</span>
                <span className="stat-value">{stats.totalA} válidos</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📝</div>
              <div className="stat-content">
                <span className="stat-label">Lista B</span>
                <span className="stat-value">{stats.totalB} válidos</span>
              </div>
            </div>

            <div className="stat-card highlight">
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <span className="stat-label">Coincidências</span>
                <span className="stat-value">{stats.matchesCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
