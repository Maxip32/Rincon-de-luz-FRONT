import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../redux/actions";
import "./ProductList.css"; // Importa el archivo de estilos CSS
import { FaPrint } from 'react-icons/fa';

const ProductList = () => {
  const dispatch = useDispatch();
  const allEvents = useSelector((state) => state.Events);

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  
  // Función para imprimir la lista de productos
  const handlePrint = () => {
    window.print(); // Esta función imprime la página actual
  };

  // Función para calcular el precio con el 65% añadido
  const calculateSellPrice = (price) => {
    return (price * 1.65).toFixed(2);
  };


  return (
    <div className="product-list">
      {/* Mapear sobre allEvents para renderizar las tarjetas */}
      {allEvents?.map((event) => (
        <div className="card" key={event.id}>
          <p>Nombre: {event.name}</p>
          <p>Precio $: {event.price}</p>
          <p>Precio con 65% +: {calculateSellPrice(event.price)}</p>
        </div>
      ))}

      {/* Agrega el botón para imprimir */}
      <button className="print-button" onClick={handlePrint}>
  <FaPrint className="print-icon" /> Imprimir Lista
</button>
    </div>
  );
};

export default ProductList;
