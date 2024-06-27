"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Layout from "../commonLayout/page";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchAgentCount } from "@/redux/associateSlice";

const Associate = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { labelValue, personCount, loading, error } = useSelector(
    (state: RootState) => state.associate
  );

  useEffect(() => {
    dispatch(fetchAgentCount());
  }, []);

  const handleView = () => {
    router.push("/associateList");
  };

  return (
    <Layout>
      <Card sx={{ minWidth: 500, maxWidth: 500, minHeight: 200, mt: 5 }}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h5" component="div">
              {labelValue}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              mt={2}
              sx={{ fontSize: 20 }}
            >
              {loading ? "Loading..." : personCount}
            </Typography>
          </Box>
          <IconButton sx={{ fontSize: 80 }}>
            <PersonIcon fontSize="inherit" />
          </IconButton>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleView}
          >
            View
          </Button>
        </CardActions>
      </Card>
      {error && <Typography color="error">{error}</Typography>}
    </Layout>
  );
};

export default Associate;