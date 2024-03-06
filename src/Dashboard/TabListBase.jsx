import { Badge, Card, Tab, TabGroup, TabList, TabPanel, TabPanels, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, Title } from '@tremor/react';
import { BoltIcon, CircleStackIcon, UsersIcon } from '@heroicons/react/24/solid';
import TableUsers from './TableUsers';
import DashboardBase from './DashboardBase';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Switch, TextField } from '@mui/material'; // Importa TextField para el campo de búsqueda
import { useAuth } from '../context/AuthContext';
import { getUserById, updateUser } from '../redux/actions';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import CardsContainer from "../components/CardContainer/CardsContainer";
import { getEvents } from "../redux/actions";
import { deleteEvent, RestoreEvent } from '../redux/actions';

const TabListBase = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useAuth();
  const users = useSelector((state) => state?.user);
  const [localUsers, setLocalUsers] = useState([]);
  const [selectedView, setSelectedView] = useState(1);
  const [selectedView2, setSelectedView2] = useState(1);
  const usersList = useSelector((state) => state?.user);
  const allEvents = useSelector((state) => state.Events);
  const [events, setEvents] = useState(allEvents);
  const activeEvents = events.filter((event) => event.state); // Solo eventos activos (state=true)
  const inactiveEvents = events.filter((event) => !event.state); // Solo eventos inactivos (state=false)
  const [searchText, setSearchText] = useState(""); // Estado para almacenar el texto de búsqueda

  useEffect(() => {
    dispatch(getEvents());
  }, [events]);

  useEffect(() => {
    setLocalUsers(usersList);
  }, [usersList]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleEditEvent = (event) => {
    // Aquí manejas la edición del evento
    navigate(`/editEvent/${event.id}`);
  };

  const handleEventState = async (eventId, currentState) => {
    try {
      if (currentState) {
        await dispatch(RestoreEvent(eventId));
      } else {
        await dispatch(deleteEvent(eventId));
      }

      const updatedEvents = events.map((event) =>
        event.id === eventId ? { ...event, disabled: !currentState } : event
      );
      setEvents(updatedEvents);

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El estado del Producto ha sido actualizado correctamente',
        showConfirmButton: false,
        timer: 2000,
      });

      dispatch(getEvents());
    } catch (error) {
      console.error('Error al cambiar el estado del Producto:', error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error al cambiar el estado del Producto',
        text: 'Por favor, inténtalo nuevamente.',
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  return (
    <main className="bg-slate-200 p-6 sm:p-10">
      <Title>Panel de administrador</Title>
      <Text>Gráficos y Detalles</Text>
      <TextField
        label="Buscar Evento"
        variant="outlined"
        value={searchText}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />
      <TabGroup defaultValue={selectedView} handleSelect={(value) => setSelectedView(value)} marginTop="mt-6">
        <TabList>
          <Tab value={1} icon={CircleStackIcon}>
            Ventas
          </Tab>
          <Tab value={2} icon={UsersIcon}>
            Usuarios
          </Tab>
          <Tab value={3} icon={UsersIcon}>
            Productos
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <DashboardBase />
          </TabPanel>
          <TabPanel>
            <TabGroup defaultValue={selectedView2} handleSelect={(value) => setSelectedView2(value)} marginTop="mt-6">
              <TabList>
                <Tab value={1}>Vista Gráfica</Tab>
                <Tab value={2}>Detalles</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <TableUsers />
                </TabPanel>
                <TabPanel>
                  <Card>
                    <Title>Tabla datos de Usuarios</Title>
                    <Table marginTop="mt-4">
                      <TableHead>
                        <TableRow>
                          <TableHeaderCell>Email</TableHeaderCell>
                          <TableHeaderCell>Rol</TableHeaderCell>
                          <TableHeaderCell>Cambio de Rol</TableHeaderCell>
                          <TableHeaderCell>Estado</TableHeaderCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {localUsers.map((item) => (
                          <TableRow key={item.email}>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.role}</TableCell>
                            <TableCell>
                              <div className="mb-4">
                                <span className="enabled">Habilitado</span>
                                <Switch
                                  key={`disabled-switch-${item.email}`}
                                  checked={!item.disabled}
                                  onClick={() => changeDisabled(item.email)}
                                  inputProps={{ 'aria-label': 'controlled' }}
                                />
                                <span className="disabled">Deshabilitado</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <button
                                className="bg-primaryColor hover:bg-primaryColorDark text-white font-bold py-2 px-4 rounded"
                                onClick={() => changeRol(item.email)}
                              >
                                Cambiar Rol
                              </button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </TabPanel>
          <TabPanel>
            <Card>
              {/* Mostrar eventos activos */}
              {filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.name}</TableCell>
                  <img src={event.image} alt={`Imagen de ${event.name}`} style={{ width: '100px' }} />
                  <TableCell>{event.date}</TableCell>
                  <TableCell>
                    <div className="mb-4">
                      <span className="enabled">Habilitado</span>
                      <Switch
                        key={`disabled-switch-${event.id}`}
                        checked={!event.disabled}
                        onClick={() => handleEventState(event.id, event.disabled)}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                      <span className="disabled">Deshabilitado</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <button
                      className="bg-primaryColor hover:bg-primaryColorDark text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleEditEvent(event)}
                    >
                      Editar
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </Card>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
};

export default TabListBase;
