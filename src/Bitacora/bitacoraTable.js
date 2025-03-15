// src/Pages/BitacoraTable.js
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import axios from 'axios';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Button,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate } from 'react-router-dom';

// Funciones de ordenamiento
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const cmp = comparator(a[0], b[0]);
    if (cmp !== 0) return cmp;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'id', label: 'ID' },
  { id: 'event_type', label: 'Evento' },
  { id: 'description', label: 'Descripción' },
  { id: 'created_at', label: 'Fecha' },
  { id: 'name', label: 'Nombre' },
  { id: 'username', label: 'Usuario' },
  { id: 'area', label: 'Área' },
  { id: 'ip', label: 'IP' },
  { id: 'location', label: 'Ubicación' },
];

const BitacoraTable = () => {
  const { user } = useContext(AuthContext);
  const [logs, setLogs] = useState([]);

  // Estados para ordenamiento
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');

  // Estados para paginación
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Estados para filtros y búsqueda
  const [searchQuery, setSearchQuery] = useState('');
  const [filterEventType, setFilterEventType] = useState('');
  const [filterDate, setFilterDate] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(
          'https://casunibackend-5f8218b68a78.herokuapp.com/api/logs',
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setLogs(response.data);
      } catch (error) {
        console.error('Error al obtener la bitácora:', error);
      }
    };

    if (user && user.role === 'admin') {
      fetchLogs();
    }
  }, [user]);

  if (!user || user.role !== 'admin') {
    return <Typography>No tienes permiso para ver esta página.</Typography>;
  }

  // Manejar ordenamiento al hacer clic en el encabezado
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Filtrar registros según la búsqueda y filtros
  const filteredLogs = logs.filter((log) => {
    const matchesQuery =
      searchQuery === '' ||
      (log.name && log.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (log.event_type && log.event_type.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesEventType = filterEventType === '' || log.event_type === filterEventType;
    const matchesDate =
      !filterDate ||
      new Date(log.created_at).toDateString() === filterDate.toDateString();
    return matchesQuery && matchesEventType && matchesDate;
  });

  const sortedLogs = stableSort(filteredLogs, getComparator(order, orderBy));
  const paginatedLogs = sortedLogs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Botón para regresar a la página principal */}
      <Box sx={{ mb: 2 }}>
        <Button variant="outlined" onClick={() => navigate('/')} startIcon={<i className="fas fa-home"></i>}>
          Regresar a Principal
        </Button>
      </Box>

      <Typography variant="h4" gutterBottom sx={{ color: '#183D83', fontWeight: 'bold' }}>
        Bitácora de Eventos
      </Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Buscar por nombre o evento"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ backgroundColor: '#fff' }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth variant="outlined" sx={{ backgroundColor: '#fff' }}>
            <InputLabel>Tipo de Evento</InputLabel>
            <Select
              label="Tipo de Evento"
              value={filterEventType}
              onChange={(e) => setFilterEventType(e.target.value)}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="login">Login</MenuItem>
              <MenuItem value="logout">Logout</MenuItem>
              <MenuItem value="download">Download</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Filtrar por fecha"
              value={filterDate}
              onChange={(newValue) => setFilterDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth sx={{ backgroundColor: '#fff' }} />}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#183D83' }}>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  sortDirection={orderBy === headCell.id ? order : false}
                  sx={{ color: '#F9FD05', fontWeight: 'bold' }}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={(event) => handleRequestSort(event, headCell.id)}
                    sx={{ color: '#F9FD05', '&.Mui-active': { color: '#F9FD05' } }}
                  >
                    {headCell.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedLogs.map((log) => (
              <TableRow key={log.id} sx={{ '&:hover': { backgroundColor: '#f0f0f0' } }}>
                <TableCell>{log.id}</TableCell>
                <TableCell>{log.event_type}</TableCell>
                <TableCell>{log.description}</TableCell>
                <TableCell>{new Date(log.created_at).toLocaleString()}</TableCell>
                <TableCell>{log.name}</TableCell>
                <TableCell>{log.username}</TableCell>
                <TableCell>{log.area}</TableCell>
                <TableCell>{log.ip}</TableCell>
                <TableCell>{log.location}</TableCell>
              </TableRow>
            ))}
            {paginatedLogs.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No se encontraron registros.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredLogs.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        sx={{ mt: 2 }}
      />
    </Box>
  );
};

export default BitacoraTable;
