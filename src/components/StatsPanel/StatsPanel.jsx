import React from "react";
import "./StatsPanel.css";

function StatsPanel({ stats, listA, listB }) {
  const formatListPreview = (list) => {
    const validNumbers = list
      .filter((num) => num.trim() !== "" && !isNaN(num))
      .map((num) => num.trim());

    if (validNumbers.length === 0) return "Nenhum número válido";

    return validNumbers.join(", ");
  };

  return (
    <div className="stats-panel">
      <h3>📊 Estatísticas e Análise</h3>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <span className="stat-label">Lista A</span>
            <span className="stat-value">{stats.totalA} números</span>
            <div className="stat-preview">{formatListPreview(listA)}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <span className="stat-label">Lista B</span>
            <span className="stat-value">{stats.totalB} números</span>
            <div className="stat-preview">{formatListPreview(listB)}</div>
          </div>
        </div>

        <div className="stat-card highlight">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <span className="stat-label">Coincidências</span>
            <span className="stat-value large">{stats.matchesCount}</span>
            <div className="stat-detail">
              {stats.matchesCount === 0 ? "Nenhuma" : "Encontradas"}
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <span className="stat-label">Taxa de Match</span>
            <span className="stat-value">{stats.matchPercentage}%</span>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${Math.min(stats.matchPercentage, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="analysis-section">
        <h4>Análise</h4>
        <div className="analysis-content">
          {stats.totalA === 0 && stats.totalB === 0 ? (
            <p>Adicione números em ambas as listas para começar a análise.</p>
          ) : stats.matchesCount === 0 ? (
            <p>
              As listas não compartilham nenhum número em comum. Tente adicionar
              alguns números iguais em ambas as listas.
            </p>
          ) : (
            <p>
              Encontrado{stats.matchesCount === 1 ? "" : "s"}{" "}
              <strong>{stats.matchesCount}</strong>
              número{stats.matchesCount === 1 ? "" : "s"} em comum entre as
              listas, representando uma taxa de coincidência de{" "}
              <strong>{stats.matchPercentage}%</strong>.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StatsPanel;
