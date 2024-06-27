"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchData } from "@/redux/agentSlice";
import Layout from "../commonLayout/page";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import CircleIcon from "@mui/icons-material/Circle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import addSlice from "@/redux/addSlice";
import { deleteStoreList } from "@/redux/deleteSlice";

interface DataRow {
  id: number;
  partnerName: string;
  storeName: string;
  name: string;
  meetingsConducted: number;
  meetingsCancelled: number;
  meetings: string;
  availability: string;
  status: number;
}

const DataGridDemo: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.agent.data);
  const loading = useSelector((state: RootState) => state.agent.loading);
  const error = useSelector((state: RootState) => state.agent.error);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [formState, setFormState] = useState({
    partnerName: "",
    storeName: "",
    yearOfService: "",
    contactPerson: "",
    email: "",
    phoneNumber: "",
    timeZone: "",
  });

  const columns: GridColDef[] = [
    {
      field: "partnerName",
      headerName: "Partner Name",
      width: 200,
      editable: true,
    },
    {
      field: "storeName",
      headerName: "Store Location",
      width: 200,
      editable: true,
    },
    { field: "name", headerName: "Associate Name", width: 200, editable: true },
    {
      field: "meetingsConducted",
      headerName: "Conducted",
      width: 150,
      editable: true,
    },
    {
      field: "meetingsCancelled",
      headerName: "Cancel",
      width: 150,
      editable: true,
    },
    { field: "meetings", headerName: "Meetings", width: 150, editable: true },
    {
      field: "availability",
      headerName: "Availability",
      width: 150,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      editable: true,
      renderCell: (params) => (
        <CircleIcon color={params.value === 1 ? "success" : "error"} />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton onClick={() => handleView(params.row)} color="primary">
            <VisibilityIcon style={{ color: "black" }} />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.row)}
            color="secondary"
          >
            <DeleteIcon style={{ color: "black" }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  const arr = data?.data || [];
  const newArr: DataRow[] = arr.map((item: any) => ({
    id: item.id,
    partnerName: item.partnerName,
    storeName: item.storeName,
    name: item.name,
    meetingsConducted: item.meetingsConducted.total,
    meetingsCancelled: item.meetingsCancelled.total,
    meetings:
      "BAC " + item.allocatedSlots.bac + " | ISV " + item.allocatedSlots.isv,
    availability:
      "BAC " + item.availableSlots.bac + " | ISV " + item.availableSlots.isv,
    status: item.status,
  }));

  const filteredRows = newArr.filter((row) =>
    row.partnerName.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleAddAssociate = () => {
    setIsDrawerOpen(true);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleView = (row: DataRow) => {
    console.log("View button clicked", row);
    router.push(`/associateList/${row.id}`);
  };

  const handleDelete = (row: DataRow) => {
    console.log("Delete button clicked", row);
    dispatch(deleteStoreList(row.id));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDropdownChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = e.target.name as keyof typeof formState;
    const value = e.target.value as string;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted", formState);
    setIsDrawerOpen(false);

    dispatch(addSlice(formState));
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "left",
          mb: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddAssociate}
        >
          Add An Associate
        </Button>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            variant="outlined"
            placeholder="Search..."
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
      <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
        <Box sx={{ width: 400, padding: 2 }}>
          <Typography variant="h5" gutterBottom>
            Add Associate
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h5" gutterBottom>
                Basic Information
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Partner Name</InputLabel>
                  <Select
                    name="partnerName"
                    value={formState.partnerName}
                    onChange={handleDropdownChange}
                    label="Partner Name"
                  >
                    <MenuItem value="Partner1">Partner1</MenuItem>
                    <MenuItem value="Partner2">Partner2</MenuItem>
                    <MenuItem value="Partner3">Partner3</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Store Location</InputLabel>
                  <Select
                    name="storeName"
                    value={formState.storeName}
                    onChange={handleDropdownChange}
                    label="Store Location"
                  >
                    <MenuItem value="Location1">Location1</MenuItem>
                    <MenuItem value="Location2">Location2</MenuItem>
                    <MenuItem value="Location3">Location3</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Years of Service</InputLabel>
                  <Select
                    name="yearOfService"
                    value={formState.yearOfService}
                    onChange={handleDropdownChange}
                    label="Years of Service"
                  >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Typography variant="h5" gutterBottom>
                Contact Information
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  fullWidth
                  label="Contact Person"
                  variant="outlined"
                  name="contactPerson"
                  value={formState.contactPerson}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  variant="outlined"
                  name="phoneNumber"
                  value={formState.phoneNumber}
                  onChange={handleInputChange}
                />
              </Box>
              <Box sx={{ marginTop: 2 }}>
                <Button variant="contained" color="primary" type="submit">
                  Save Associate
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Drawer>
    </Layout>
  );
};

export default DataGridDemo;
