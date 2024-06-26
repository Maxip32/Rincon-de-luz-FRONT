/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { editEvent, getUserById } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // Suponiendo que el ícono FcGoogle proviene de react-icons
import registerPublic from "../../assets/image/registerPublic.jpg";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
const EditEvent = ({ selectedEvent }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { eventId } = useParams(); // Obtener el ID del evento de la URL
  const events = useSelector((state) => state.Events);
  const [eventData, setEventData] = useState(null);
  const [formData, setFormData] = useState(selectedEvent);

  useEffect(() => {
    // Aquí puedes buscar los datos del evento con el ID en la lista de eventos
    // y guardarlos en el estado local 'eventData'
    const event = events.find((event) => event.id === eventId);
    setEventData(event);
  }, [eventId, events]);
  // Si selectedEvent tiene datos, utiliza esos datos para el estado inicial de eventInfo.
  const [eventInfo, setEventInfo] = useState(
    selectedEvent || {
      id: eventId,
      name: "",
      description: "",
      image: "",
      stock: "",
      price: "",
      genres: "",
    }
  );

  // Resto del código sin cambios...

  const handleChange = (e) => {
    setEventData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    //console.log(eventInfo, "INFORMACIÓN DEL EVENTO POR PROPS");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEventInfo = {
      id: eventId,
      ...eventData,
    };

    try {
      await dispatch(editEvent(updatedEventInfo));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Producto editado Exitosamente!",
        showConfirmButton: false,
        timer: 2500,
      });
      navigate("/");
      dispatch(getUserById());
    } catch (error) {
      console.error("Error al editar el producto:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error al editar el producto",
        text: "Hubo un problema al editar el producto. Inténtalo nuevamente.",
      });
    }
  };

  if (!user) {
    // Si el usuario no está autenticado, mostrar un mensaje o redireccionar a la página de inicio de sesión.

    Swal.fire({
      position: "center",
      icon: "warning",
      title: "Tienes que estar autenticado",
      showConfirmButton: false,
      timer: 2500,
    });
    navigate("/");
  }

  return (
    <div className="w-full flex justify-center items-center mt-2 mb-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg flex  w-full">
        {/* image section */}
        <section className="w-3/6">
          <img
            src={registerPublic}
            alt="Register image"
            className="rounded-l-2xl object-cover h-full"
          />
        </section>

        <section className="p-2 flex flex-col justify-center items-center w-full">
          <div className="my-4 text-base text-Color1000 flex flex-col gap-4">
            <h2 className="text-3xl font-bold text-primaryColor text-left">
              Edita el Producto
            </h2>
            <p className="text-base text-Color1000 text-left">
              modifica los detalles del producto y publicalo en el Inicio.
            </p>
          </div>

          <form
            className="flex flex-col gap-4 w-full justify-center items-center"
            onSubmit={handleSubmit}
          >
            <div className="w-3/4">
              <label>Nombre del producto:</label>
              <input
                type="text"
                name="name"
                value={eventData?.name}
                onChange={(e) =>
                  setEventData({ ...eventData, name: e.target.value })
                }
                className="w-full rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
              />
            </div>

            <div className="w-3/4">
              <label>Descripción:</label>
              <textarea
                name="description"
                value={eventData?.description}
                onChange={(e) =>
                  setEventData({ ...eventData, description: e.target.value })
                }
                className="w-full rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
              />
            </div>

            <div className="w-3/4">
              <label>Imagen Producto:</label>
              <input
                type="text"
                name="image"
                value={eventData?.image}
                onChange={(e) =>
                  setEventData({ ...eventData, image: e.target.value })
                }
                className="w-full rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
              />
            </div>

            <section className="w-full grid grid-cols-2 gap-3 place-items-center">
             


              <div className="w-3/4">
                <label>Stock:</label>
                <input
                  type="text"
                  name="quotas"
                  value={eventData?.quotas}
                  onChange={(e) =>
                    setEventData({ ...eventData, quotas: e.target.value })
                  }
                  className="w-full rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
                />
              </div>

              

              <div lassName="w-3/4">
              <label>Precio:</label>
              <input
                type="text"
                name="price"
                value={eventData?.price}
                onChange={(e) => setEventData({ ...eventData, price: e.target.value })}
                className="w-full rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
              />
              
               
            </div>

            <div className="w-3/4">
            <label>Categoria:</label>
            <select
              name="genres"
              value={eventData?.genre}
              onChange={(e) => setEventData({ ...eventData, genre: e.target.value })}
              className="w-full rounded-lg border bg-BackgroundLight px-4 py-2 focus:outline-none focus:border-secondaryColor"
            >
              <option value="">Selecciona una categoria</option>
              <option value="Perfumeria">Perfumeria</option>
              <option value="Accesorios">Accesorios</option>
              <option value="Velas">Velas</option>
              <option value="Sahumerios">Sahumerios</option>
              <option value="Hornitos">Hornitos</option>
              <option value="Cascadas">Cascadas</option>
              <option value="Santos">Santos</option>
              <option value="Regaleria">Regaleria</option>
              <option value="Decoracion">Decoracion</option>
              <option value="Sahumadores">Sahumadores</option>
              <option value="Varios">Varios</option>
              <option value="Bijouteri">Bijouteri</option>
            </select>
          </div>
            </section>

            <button
              type="submit"
              className="w-2/4 bg-primaryColor text-Color200 hover:bg-Color200 hover:text-primaryColor 
              border hover:border-secondaryColor focus:outline-none px-10 py-3.5 text-base font-medium 
          transition duration-500 ease-in-out transform shadow-md rounded-xl mb-4"
            >
              Aceptar
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default EditEvent;