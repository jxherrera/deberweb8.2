import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function FormularioPost() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '',
    body: '',
    userId: 1
  });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  // Nuevo estado para mostrar mensaje de éxito al "Continuar Editando"
  const [mensajeExito, setMensajeExito] = useState(null);

  // Cargar datos del post si estamos editando
  useEffect(() => {
    if (isEditing) {
      const cargarPost = async () => {
        try {
          setCargando(true);
          const respuesta = await fetch(`/api/posts/${id}`);
          if (!respuesta.ok) {
            throw new Error('Error al cargar el post');
          }
          const datos = await respuesta.json();
          setFormData({
            title: datos.title,
            body: datos.body,
            userId: datos.userId
          });
        } catch (err) {
          setError(err.message);
        } finally {
          setCargando(false);
        }
      };
      cargarPost();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Modificado: Ahora recibe el evento (e) y un booleano (redirigir)
  const manejarEnvio = async (e, redirigir = true) => {
    e.preventDefault();
    
    // Limpiamos mensajes previos
    setError(null);
    setMensajeExito(null);
    
    // Corrección pequeña en la URL para creación
    const url = isEditing 
      ? `/api/posts/${id}` 
      : '/api/posts'; 
      
    const method = isEditing ? 'PUT' : 'POST';

    try {
      setCargando(true);
      const respuesta = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!respuesta.ok) {
        throw new Error(`Error al ${isEditing ? 'actualizar' : 'crear'} el post`);
      }

      const datos = await respuesta.json();
      console.log(`Post ${isEditing ? 'actualizado' : 'creado'}:`, datos);
      
      // LÓGICA DE REDIRECCIÓN CONDICIONAL
      if (redirigir) {
        // Opción: Actualizar y Regresar
        navigate('/');
      } else {
        // Opción: Actualizar y Continuar Editando
        setMensajeExito("¡Cambios guardados correctamente!");
        // Ocultar el mensaje después de 3 segundos (opcional)
        setTimeout(() => setMensajeExito(null), 3000);
      }

    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setCargando(false);
    }
  };

  if (cargando && isEditing && !formData.title) {
    return (
      <div className="cargando">
        <div className="spinner"></div>
        <p>Cargando post...</p>
      </div>
    );
  }

  return (
    <div className="formulario-container">
      <h2>{isEditing ? 'Editar Post' : 'Crear Nuevo Post'}</h2>
      
      {/* Mensaje de Error */}
      {error && (
        <div className="error" style={{ color: 'red', marginBottom: '10px' }}>
          <p>❌ {error}</p>
        </div>
      )}

      {/* Nuevo Mensaje de Éxito (Verde) */}
      {mensajeExito && (
        <div className="exito" style={{ backgroundColor: '#d4edda', color: '#155724', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
          <p>✅ {mensajeExito}</p>
        </div>
      )}

      {/* Quitamos onSubmit del form para manejarlo en los botones */}
      <form className="formulario-post">
        <div className="form-group">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="body">Contenido:</label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            className="form-textarea"
            rows="5"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="userId">Usuario ID:</label>
          <input
            type="number"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className="form-input"
            min="1"
            required
          />
        </div>
        
        <div className="form-actions" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          
          {isEditing ? (
            /* LÓGICA PARA MODO EDICIÓN: DOS BOTONES */
            <>
              <button 
                onClick={(e) => manejarEnvio(e, false)} // false = No redirigir
                className="btn-primary"
                disabled={cargando}
                style={{ backgroundColor: '#17a2b8' }} // Un color diferente (info/azul claro)
              >
                {cargando ? 'Guardando...' : 'Actualizar y Continuar Editando'}
              </button>

              <button 
                onClick={(e) => manejarEnvio(e, true)} // true = Redirigir
                className="btn-primary"
                disabled={cargando}
              >
                {cargando ? 'Guardando...' : 'Actualizar y Regresar a Listado'}
              </button>
            </>
          ) : (
            /* LÓGICA PARA CREAR (Se mantiene igual) */
            <button 
              onClick={(e) => manejarEnvio(e, true)}
              className="btn-primary"
              disabled={cargando}
            >
              {cargando ? 'Guardando...' : 'Crear'}
            </button>
          )}

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-secondary"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioPost;