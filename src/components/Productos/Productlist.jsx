import React, { useEffect, useState } from "react";
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

  // Estado para almacenar los productos en formato JSON
  const [productosJSON, setProductosJSON] = useState("");

  // Función para generar el JSON con la información de los productos
  const generarJSON = () => {
    const productos = allEvents.map((event) => ({
      // id: event.id,
      name: event.name,
      description: event.description, // Asegúrate de tener el campo 'description' en tu objeto event
      image: event.image, // Asegúrate de tener el campo 'image' en tu objeto event
      quotas: event.quotas,
      price: event.price,
      genre: event.genre,
    }));

    // Convierte los productos a formato JSON
    const jsonProductos = JSON.stringify(productos, null, 2);

    // Actualiza el estado con el JSON generado
    setProductosJSON(jsonProductos);
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

      {/* Agrega un botón para generar el JSON */}
      <button className="generate-json-button" onClick={generarJSON}>
        Generar JSON
      </button>

      {/* Muestra el JSON generado */}
      <pre>{productosJSON}</pre>
    </div>
  );
};

export default ProductList;
