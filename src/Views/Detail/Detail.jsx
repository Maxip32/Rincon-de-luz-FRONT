import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEventId, editEvent } from "../../redux/actions";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import { MdMap, MdMusicVideo } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";

const Detail = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const event = useSelector((state) => state.detail);
  const dispatch = useDispatch();
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    dispatch(getEventId(id));
  }, [id, dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    setEventData(event);
  }, [event]);

  const calculateSellPrice = () => {
    return (event.price * 1.65).toFixed(2);
  };

  const handleSell = () => {
    if (eventData.quotas > 0) {
      const updatedEvent = { ...eventData, quotas: eventData.quotas - 1 };
      setEventData(updatedEvent); // Actualizamos el estado local con el nuevo evento
      dispatch(editEvent(updatedEvent)); // Llamamos a la acción editEvent para actualizar el evento en el estado global
    }
  };

  return (
    <div className="flex flex-col mx-auto w-full max-w-5xl">
      {loading ? (
        <img
          alt=""
          className="self-center flex-shrink-0 w-50 h-50 bg-cover rounded-full dark:bg-gray-500"
          src="https://media.tenor.com/oRL3LmyUExYAAAAM/umm-zen.gif"
          style={{ marginTop: "3cm" }}
        />
      ) : (
        <>
          {event ? (
            <>
              <div className="flex flex-col md:flex-row w-full justify-between mb-10">
                <div className="flex items-center md:items-start flex-col gap-4">
                  <p className="text-4xl text-primaryColor font-bold">
                    {event.name}
                  </p>
                  <img
                    className="w-80 h-72 rounded-xl"
                    src={event.image}
                    alt="Imagen del Producto"
                  />
                </div>
                <div className="flex flex-col items-center md:items-start text-center px-4 gap-4 mx-8 mt-11">
                  <span className="text-3xl text-DarkTextPurple font-semibold mb-4 mt-10 md:mt-0">
                    Información general
                  </span>
                  <p className="flex items-center gap-2">
                    <BsCurrencyDollar size="20" color="#f84e4e" /> Precio:{" "}
                    {event.price}
                  </p>
                  <p className="flex items-center gap-2">
                    <BsCurrencyDollar size="20" color="#f84e4e" /> Venta con
                    el 65% +: {calculateSellPrice()}
                  </p>
                  <p className="flex items-center gap-2">
                    <MdMap size="20" color="#f84e4e" /> Stock:{" "}
                    {eventData.quotas} {/* Mostramos el stock actualizado */}
                  </p>
                  <p className="flex items-center gap-2">
                    <MdMusicVideo size="20" color="#f84e4e" /> Categoria:{" "}
                    {event.genre}
                  </p>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSell}
                  >
                    Confirmar venta!
                  </button>
                </div>
              </div>
              <div className="mx-auto text-black bg-white shadow-lg p-4 rounded-2xl mb-10">
                <span>{event.description}</span>
              </div>
            </>
          ) : (
            <img
              alt=""
              className="self-center flex-shrink-0 w-50 h-50 bg-cover rounded-full dark:bg-gray-500"
              src="https://media.tenor.com/oRL3LmyUExYAAAAM/umm-zen.gif"
              style={{ marginTop: "3cm" }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Detail;
