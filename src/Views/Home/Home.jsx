/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import SearchBar from "../../components/SearchBar/SearchBar";
import Landing from "../Landing/Landing";
import {
  FilterByDate,
  GetByCity,
  GetByDate,
  getEvents,
  getGenres,
  getReset,
  getResetOrder,
  getUserById,
 
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import Paginate from "../../components/Paginate/Paginate";
import "react-calendar/dist/Calendar.css";
import Reviews from "../../components/Reviews/Reviews";


const Home = () => {
  const allowedDates = [
    "2023-08-10",
    "2023-08-16",
    "2023-08-17",
    "2023-08-18",
    "2023-08-23",
    "2023-08-26",
    "2023-08-27",
    "2023-09-01",
    "2023-09-07",
    "2023-09-09",
    "2023-09-13",
    "2023-09-15",
    "2023-09-20",
    "2023-09-23",
    "2023-09-24",
    "2023-09-26",
    "2023-09-30",
    "2023-10-03",
    "2023-10-13",
    "2023-10-17",
    "2023-10-18",
    "2023-10-20",
    "2023-10-28",
    "2023-11-04",
    "2023-11-05",
    "2023-11-07",
    "2023-11-09",
    "2023-11-13",
    "2023-11-15",
    "2023-11-21",
    "2023-11-24",
    "2023-11-28",
    "2023-11-29",
  ];

  //const navigate = useNavigate();
  const dispatch = useDispatch();
  const noEvents = useSelector((state) => state.noEvents);
  const allEvents = useSelector((state) => state.Events);
  const genres = useSelector((state) => state.genres);
  const [order, setOrder] = useState(true);
  const allEventsDates = useSelector((state) => state.date);
  const prices = useSelector((state) => state.price);
  const [deletedEvents, setdeletedEvents] = useState(new Set());
  const activeEvents = allEvents.filter((event) => !event.deleted);
  const [filteredEvents, setFilteredEvents] = useState(activeEvents);
  const [filters, setFilters] = useState({
    genres: "",
    price: "",
    date: "",
  });
  const [events, setEvents] = useState(activeEvents);

  const [orderType, setOrderType] = useState("asc");

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    dispatch(GetByCity());
  }, [dispatch]);

  useEffect(() => {
    dispatch(GetByDate());
  }, [dispatch]);

  const handleFilterGenres = (event) => {
    const genreValue = event.target.value;
    setFilters((prev) => ({ ...prev, genres: genreValue }));
  
    const filteredEvents = activeEvents.filter((event) => {
      const matchesGenre = !genreValue || event.genre.includes(genreValue);
      const matchesCity = !filters.price || event.price.includes(filters.price);
      return matchesGenre && matchesCity;
    });
  
    setEvents(filteredEvents);
    setCurrentPage(1);
  };

  const handleFiltroPrecios = (event) => {
    const priceValue = event.target.value;
    setFilters((prev) => ({ ...prev, price: priceValue }));
  
    const filteredEvents = activeEvents.filter((event) => {
      return !priceValue || event.price === priceValue;
    });
  
    setEvents(filteredEvents);
    setCurrentPage(1);
  };
  useEffect(() => {
    const eventosFiltrados = allEvents.filter((evento) => {
      const matchesGenre =
        !filters.genres || evento?.genre.includes(filters.genres);
      const matchesCity = !filters.price || evento.price.includes(filters.price);
      const matchesDate = !filters.date || evento.date === filters.date;
      return matchesGenre && matchesCity && matchesDate;
    });
    setEvents(eventosFiltrados);
    setCurrentPage(1);
    dispatch(getUserById());
  }, [allEvents, filters]);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // Estado para controlar si el calendario está abierto o cerrado

  const handleToggleCalendar = () => {
    setIsCalendarOpen((prevIsCalendarOpen) => !prevIsCalendarOpen); // Cambia el estado al valor opuesto
  };

  const handleInputChange = (value) => {
    setDate(value);
    const selectedDate = value.toISOString().split("T")[0];
    if (allowedDates.includes(selectedDate)) {
      dispatch(FilterByDate(selectedDate));
      setCurrentPage(1);
    }
  };

  const handleOrderDate = () => {
    setOrderType(orderType === "asc" ? "desc" : "asc");
    const sortedEvents = [...activeEvents].sort((a, b) => {
      return orderType === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    });
    setEvents(sortedEvents);
    setCurrentPage(1);
  };

  const handleOrderByName = () => {
    setOrderType(orderType === "asc" ? "desc" : "asc");
    const sortedEvents = [...activeEvents].sort((a, b) => {
      return orderType === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
    setEvents(sortedEvents);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters({
      genre: "",
      price: "",
      date: "",
    });
    setEvents(allEvents);
    dispatch(getReset());
    dispatch(getResetOrder());
    setCurrentPage(1);
  };

  
  console.log(filters);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(6);
  const indexOfLastEvents = currentPage * eventsPerPage;
  const indexOfFirstEvents = indexOfLastEvents - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvents, indexOfLastEvents);
  console.log(currentEvents);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const returnToFirstPage = () => {
    setCurrentPage(1);
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800)
    return () => {
      clearTimeout(timer);
    }
  }, [])
  

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {loading ? (
        <img
        alt=""
        className="self-center flex-shrink-0 w-50 h-50 bg-cover rounded-full dark:bg-gray-500"
        src="https://media.tenor.com/oRL3LmyUExYAAAAM/umm-zen.gif"
        style={{ marginTop: '3cm' }}
      />
      ) : (
        <>
          <Hero />

          {/* //- Filter bar ---------> */}
          <section className="py-4 w-4/6 md:w-2/4 max-w-xl md:mx-auto h-fit md:h-24 flex flex-col md:flex-row gap-2 justify-evenly items-center md:mt-[-66px] md:z-10 bg-rojosanteria/95 rounded-2xl">
            {/* Filter by genres */}
            <div className="flex flex-col m-1 gap-2 text-LightText w-44">
              <span className="font-semibold text-xs text-black">Opciones</span>
              <select
                id="genre-selector"
                className="bg-transparent border-b border-secondaryColor outline-none focus:border-blue-700 text-grey-500 "
                onChange={(event) => handleFilterGenres(event)}
                defaultValue="default"
              >
                <option value="default" disabled className="font-semibold text-xs text-black">
                  {" "}
                  Filtrado de Productos{" "}
                </option>
                {genres?.map((gen) => (
                  <option
                    value={gen.name}
                    key={gen.id}
                    className="text-black rounded-lg"
                  >
                    {gen.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by cities */}
            {/* <div className="flex flex-col m-1 gap-2 text-LightText w-44">
              <span className="font-semibold text-xs text-black ">Precios</span> */}
              {/* <select
                className="bg-transparent border-b border-secondaryColor outline-none focus:border-blue-700 text-grey-500"
                onChange={(event) => handleFiltroPrecios(event)}
                defaultValue="default"
              >
                <option value="default" disabled>
                  {" "}
                  prices{" "}
                </option>
                {prices?.map((cit) => (
                  <option value={cit.price} key={cit.id} className="text-black">
                    {cit.price}
                  </option>
                ))}
              </select> */}
            {/* </div> */}
          </section>
          {/* //- Fin Filter bar ---------> */}

          

          <SearchBar returnToFirstPage={returnToFirstPage} />

         

          {/* Title & order by events */}
          <section className="w-full md:flex-wrap max-w-5xl md:mx-auto px-7 mt-20 flex flex-col md:flex-row items-center justify-center" style={{ marginLeft: '4cm' }}>
  <p className="text-3xl font-semibold text-primaryColor mb-5 mr-5 md:mb-0">
    {/* Tu contenido aquí */}
  </p>
  <div className="md:space-x-3.5 flex flex-col md:flex-row items-center gap-4">
    {/* order by alfabético */}
    <select
      className="h-8 w-44 px-2 rounded-lg focus:outline-none border focus:border-secondaryColor pointer cursor-pointer"
      onChange={(event) => handleOrderByName(event)}
      defaultValue="default"
    >
      <option className="" value="default" disabled>
        Orden Alfabético
      </option>
      <option value="asc">A-Z</option>
      <option value="desc">Z-A</option>
    </select>
    <button
      className="py-1.5 px-3 rounded-md bg-primaryColor/90 text-Color200 hover:text-black hover:bg-white border hover:border-primaryColor transition duration-500 ease-in-out transform"
      onClick={handleReset}
    >
      Reiniciar Filtros
    </button>
  </div>
</section>
          {/* Fin Title & order by events */}

        {/* Inicio Card section */}
        <section className="w-full md:w-auto h-full overflow-x-scroll overscroll-x-contain max-w-7xl mx-auto p-10 m-6 flex flex-nowrap space-x-6 md:flex-wrap md:justify-center overflow-y-hidden scrollbar-hide">
        {noEvents ? <p>No hay productos disponibles</p> : (
              (
                currentEvents.length > 0 ? (
                  currentEvents.map((cu) =>
                    !cu.disabled &&
                    (!filters?.genres || cu.genre && cu.genre.includes(filters.genres)) &&
                    (!filters?.city || cu?.city.includes(filters.city)) ? (
                      <Card
                        id={cu.id}
                        name={cu.name}
                        image={cu.image}
                        genre={cu.genre}
                        date={cu.date}
                        location={cu.location}
                        city={cu.city}
                        price={cu.price}
                        key={cu.id}
                        deletedEvents={deletedEvents}
                      />
                    ) : null
                  )
                ) : (
                  <p>No hay productos disponibles que coincidan con los filtros.</p>
                )
              )
            )}
      </section>
          {/* Fin Card section */}

          {/* Pagination */}
          <section className="mb-5">
            <Paginate
              eventsPerPage={eventsPerPage}
              allEvents={events.length}
              paginate={paginate}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </section>
          <Landing />
          <Reviews />
          {/* <Footer /> */}
        </>
      )}
    </div>
  );
};

export default Home;
const allowedDates = [
  "2023-08-10",
  "2023-08-16",
  "2023-08-17",
  "2023-08-18",
  "2023-08-23",
  "2023-08-26",
  "2023-08-27",
  "2023-09-01",
  "2023-09-07",
  "2023-09-09",
  "2023-09-13",
  "2023-09-15",
  "2023-09-20",
  "2023-09-23",
  "2023-09-24",
  "2023-09-26",
  "2023-09-30",
  "2023-10-03",
  "2023-10-13",
  "2023-10-17",
  "2023-10-18",
  "2023-10-20",
  "2023-10-28",
  "2023-11-04",
  "2023-11-05",
  "2023-11-07",
  "2023-11-09",
  "2023-11-13",
  "2023-11-15",
  "2023-11-21",
  "2023-11-24",
  "2023-11-28",
  "2023-11-29",
];