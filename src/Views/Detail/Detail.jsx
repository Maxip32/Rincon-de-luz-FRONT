/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEventId } from "../../redux/actions";
//import Loading from "../../components/Loading/Loading";
import { CartContext } from "../../components/Shoppingcart/shoppingCartContext";
import { useContext, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  LiaCartPlusSolid,
  LiaCartArrowDownSolid,
} from "react-icons/lia";
import {
  MdMap,
  MdLocationOn,
  MdDateRange,
  MdWatch,
  MdMusicVideo,
} from "react-icons/md";
import { BsTicketPerforated, BsCurrencyDollar } from "react-icons/bs";

const Detail = ({ image, name, price }) => {
  const { user } = useAuth();
  const { id } = useParams();
  const [loading, setLoading] = useState(true) 
  const  event = useSelector((state) => state.detail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventId(id));
  }, [id, dispatch]);

  const [cart, setCart] = useContext(CartContext);

  const itemAdded = {
    id: event.id,
    name: event.name,
    quantity: 1,
    price: event.price,
    image: event.image,
    stock: event.quotas > 0 ? event.quotas - 1 : 0,
  };
  const isItemsFound = cart.find((item) => item.id === id);
  const existingCartItem = cart.find((item) => item.id === id);
  const stockFromCart = existingCartItem
    ? existingCartItem.stock
    : itemAdded.stock;

  // Agregar al carrito
  const addToCart = () => {
    setCart((currItems) => {
      if (isItemsFound) {
        return currItems.map((item) => {
          if (item.id === id) {
            const updatedQuantity = item.quantity + 1;
            const updateStock = Math.max(item.stock - 1, 0);
            console.log(updateStock, "soy el stock");
            return { ...item, quantity: updatedQuantity, stock: updateStock };
          } else {
            return item;
          }
        });
      } else {
        return [...currItems, itemAdded];
      }
    });
  };

  // remover al carrito
  const removeItem = (id) => {
    setCart((currItems) => {
      const existingCartItem = currItems.find((item) => item.id === id);

      if (existingCartItem) {
        const updatedCart = currItems.map((item) => {
          if (item.id === id) {
            /* const updatedQuantity = item.quantity - 1; */
            const updatedQuantity = Math.max(item.quantity - 1, 0);
            const updateStock = Math.min(item.stock + 1, event.quotas);
            return { ...item, quantity: updatedQuantity, stock: updateStock };
          }
          return item;
        });

        return updatedCart;
      }

      return currItems;
    });
  }


  const getQuantityById = (id) => {
    return cart.find((item) => item.id === id)?.quantity || 0;
  };

  const quantityPerItem = getQuantityById(id);


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800)
    return () => {
      clearTimeout(timer);
    }
  }, [])

  

  return (
    <div className="flex flex-col mx-auto w-full max-w-5xl">
      {loading ? (
         <img
         alt=""
         className="self-center flex-shrink-0 w-50 h-50 bg-cover rounded-full dark:bg-gray-500"
         src="https://media.tenor.com/oRL3LmyUExYAAAAM/umm-zen.gif"
         style={{ marginTop: '3cm' }}
       />
      ):(
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
                alt="foto del artista"
              />
            </div>
            <div className="flex flex-col items-center md:items-start text-center px-4 gap-4 mx-8 mt-11">
              <span className="text-3xl text-DarkTextPurple font-semibold mb-4 mt-10 md:mt-0">
                Información general
              </span>
              <p className="flex items-center gap-2">
                <MdMap size="20" color="#f84e4e" /> Ciudad: {event.city}
              </p>
              <p className="flex items-center gap-2">
                <MdLocationOn size="20" color="#f84e4e" /> Direccion:{" "}
                {event.address}
              </p>
              <p className="flex items-center gap-2">
                <MdMusicVideo size="20" color="#f84e4e" /> Categoria:{" "}
                {event.genre}
              </p>
             
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
        style={{ marginTop: '3cm' }}
      />
      )}
      </>
      )}
    </div>
    
  );
};

export default Detail;