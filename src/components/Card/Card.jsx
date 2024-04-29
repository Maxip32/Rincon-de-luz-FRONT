/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const Card = ({ id, image, name}) => {
  const { user } = useAuth(); // Obtén el usuario autenticado desde el contexto de autenticación

  

  return (
    <div className="bg-transparent w-72 h-[350px] md:h-80 m-4 border bg-Red shadow-md rounded-2xl flex-none lg:flex lg:flex-col transform transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className=" flex flex-col h-3/4 w-full justify-center items-center ">
        <img
          className="w-64 h-56 md:h-52 object-cover md:mt-3 rounded-lg"
          src={image}
          alt="imagen no encontrada"
        />
      </div>

      <div className="w-full flex flex-col md:flex-row items-center justify-between md:p-2 mb-2 md:mb-0">
        <div className="w-full flex flex-col items-center h-full mx-2">
          <div className="w-full flex items-center justify-center h-1/4 truncate">
            <span className="font-semibold text-lg text-primaryColor ">
              {name}
            </span>
            {/* <span className="p-1 rounded-lg bg-DarkTextPurple text-Color200 text-sm font-extralight">
              $ {price}{" "}
            </span> */}
          </div>
          <div className="w-full text-black flex items-center justify-around md:justify-between md:mt-1">
            <div className="flex flex-col items-center justify-end">
              <p className="text-md text-ChryslerBlue"></p>
              <h2 className="text-2xl font-bold"></h2>
            </div>
           
              <>
                <Link to={`/detail/${id}`}>
                  <button className="py-1.5 px-5 rounded-md bg-tr text-black hover:text-primaryColor hover:bg-amarillosanteria/75 border hover:border-secondaryColor transition duration-500 ease-in-out transform">
                    {" "}
                    Detalles del producto{" "}
                  </button>
                </Link>
              </>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
