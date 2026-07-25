import { useState, useCallback } from 'react';

export default function WelcomeScreen({ onContinue }) {
  const [showInstructions, setShowInstructions] = useState(false);

  const handleGetStarted = useCallback(() => {
    setShowInstructions(true);
  }, []);

  if (showInstructions) {
    return (
      <div className="welcome-instructions">
        <div className="welcome-instructions-content">
          <h2>Como usar Excel a MySQL</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-text">
                <h3>Selecciona archivos</h3>
                <p>Haz clic en la zona de carga o arrastra archivos Excel (.xlsx, .xls) para agregarlos.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-text">
                <h3>Configura opciones</h3>
                <p>Elige si deseas usar transacciones y si quieres eliminar tablas existentes antes de crear las nuevas.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-text">
                <h3>Convierte a SQL</h3>
                <p>Haz clic en el boton "Convertir" para generar el script SQL compatible con MySQL.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-text">
                <h3>Descarga el resultado</h3>
                <p>Una vez convertido, descarga el archivo .sql generado listo para ejecutar en MySQL.</p>
              </div>
            </div>
          </div>
          <button className="btn btn-primary welcome-start-btn" onClick={onContinue}>
            <i className="fa-solid fa-arrow-right"></i> Comenzar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <div className="welcome-logo">
          <i className="fa-solid fa-database"></i>
        </div>
        <h1>Excel a MySQL</h1>
        <p className="welcome-subtitle">Convierte tus archivos Excel en scripts SQL de forma rapida y sencilla</p>
        <button className="btn btn-primary welcome-btn" onClick={handleGetStarted}>
          <i className="fa-solid fa-play"></i> Iniciar
        </button>
      </div>
    </div>
  );
}
