import { useState, useCallback } from 'react';

const infoPanels = {
  excel: {
    title: 'Que es Excel?',
    icon: 'fa-solid fa-file-excel',
    content: (
      <>
        <p>Microsoft Excel es una aplicacion de hoja de calculo parte del paquete Microsoft Office. Permite organizar, analizar y manipular datos en filas y columnas.</p>
        <ul>
          <li><strong>Libro (Workbook):</strong> Archivo completo que contiene una o mas hojas.</li>
          <li><strong>Hoja (Sheet):</strong> Cada pestana dentro del libro donde trabajas los datos.</li>
          <li><strong>Celdas:</strong> Interseccion de fila y columna, donde se almacena cada dato.</li>
          <li><strong>Formulas:</strong> Funciones como SUMA, PROMEDIO, BUSCARV para calcular valores.</li>
          <li><strong>Formato:</strong> Estilos visuales como colores, bordes, fuentes y tipos de celda.</li>
        </ul>
      </>
    ),
  },
  sql: {
    title: 'Que es SQL?',
    icon: 'fa-solid fa-code',
    content: (
      <>
        <p>SQL (Structured Query Language) es un lenguaje de programacion disenado para gestionar bases de datos relacionales como MySQL, PostgreSQL y SQL Server.</p>
        <ul>
          <li><strong>Base de datos:</strong> Contenedor de tablas (equivalente al libro de Excel).</li>
          <li><strong>Tabla:</strong> Estructura de filas y columnas (equivalente a una hoja de Excel).</li>
          <li><strong>Columnas:</strong> Definen el tipo de dato de cada campo (texto, numero, fecha).</li>
          <li><strong>Filas (registros):</strong> Cada entrada de datos en la tabla.</li>
          <li><strong>Consultas (queries):</strong> Instrucciones para insertar, buscar, actualizar o eliminar datos.</li>
        </ul>
      </>
    ),
  },
  equivalencia: {
    title: 'Equivalencia Excel vs SQL',
    icon: 'fa-solid fa-arrows-left-right',
    content: (
      <>
        <div className="equiv-table">
          <div className="equiv-row equiv-header">
            <div className="equiv-col">Excel</div>
            <div className="equiv-col">SQL / MySQL</div>
          </div>
          <div className="equiv-row">
            <div className="equiv-col">Libro (.xlsx)</div>
            <div className="equiv-col">Base de datos</div>
          </div>
          <div className="equiv-row">
            <div className="equiv-col">Hoja (pestana)</div>
            <div className="equiv-col">Tabla</div>
          </div>
          <div className="equiv-row">
            <div className="equiv-col">Fila</div>
            <div className="equiv-col">Registro (ROW)</div>
          </div>
          <div className="equiv-row">
            <div className="equiv-col">Columna</div>
            <div className="equiv-col">Campo (columna)</div>
          </div>
          <div className="equiv-row">
            <div className="equiv-col">Celda</div>
            <div className="equiv-col">Valor en una celda de la tabla</div>
          </div>
          <div className="equiv-row">
            <div className="equiv-col">Encabezado de columna</div>
            <div className="equiv-col">Nombre del campo + tipo de dato</div>
          </div>
          <div className="equiv-row">
            <div className="equiv-col">Filtros</div>
            <div className="equiv-col">WHERE</div>
          </div>
          <div className="equiv-row">
            <div className="equiv-col">Ordenar</div>
            <div className="equiv-col">ORDER BY</div>
          </div>
          <div className="equiv-row">
            <div className="equiv-col">BUSCARV / VLOOKUP</div>
            <div className="equiv-col">JOIN</div>
          </div>
          <div className="equiv-row">
            <div className="equiv-col">SUMA / PROMEDIO</div>
            <div className="equiv-col">Funciones de agregacion (SUM, AVG)</div>
          </div>
          <div className="equiv-row">
            <div className="equiv-col">Eliminar duplicados</div>
            <div className="equiv-col">DISTINCT</div>
          </div>
        </div>
      </>
    ),
  },
};

export default function WelcomeScreen({ onContinue }) {
  const [showInstructions, setShowInstructions] = useState(false);
  const [activePanel, setActivePanel] = useState(null);

  const handleGetStarted = useCallback(() => {
    setShowInstructions(true);
  }, []);

  const togglePanel = useCallback((key) => {
    setActivePanel(prev => prev === key ? null : key);
  }, []);

  if (showInstructions) {
    return (
      <div className="welcome-instructions">
        <div className="welcome-instructions-content">
          <h2>Conoce los conceptos</h2>
          <div className="info-buttons">
            <button
              className={'btn info-btn' + (activePanel === 'excel' ? ' active' : '')}
              onClick={() => togglePanel('excel')}
            >
              <i className={infoPanels.excel.icon}></i> Excel
            </button>
            <button
              className={'btn info-btn' + (activePanel === 'sql' ? ' active' : '')}
              onClick={() => togglePanel('sql')}
            >
              <i className={infoPanels.sql.icon}></i> SQL
            </button>
            <button
              className={'btn info-btn' + (activePanel === 'equivalencia' ? ' active' : '')}
              onClick={() => togglePanel('equivalencia')}
            >
              <i className={infoPanels.equivalencia.icon}></i> Equivalencia
            </button>
          </div>

          {activePanel && (
            <div className="info-panel">
              <h3><i className={infoPanels[activePanel].icon}></i> {infoPanels[activePanel].title}</h3>
              {infoPanels[activePanel].content}
            </div>
          )}

          <h2 className="instructions-title">Como usar Excel a MySQL</h2>
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
