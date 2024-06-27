"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, IconButton, Drawer, Box, TextField, Button } from '@mui/material'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '@/redux/agentSlice';
import { AppDispatch, RootState } from '@/redux/store';
import Layout from '@/app/commonLayout/page';
import EditIcon from '@mui/icons-material/Edit'; 
import { updateItem } from '@/redux/updateSlice';

interface Item {
    id: number;
    name: string;
    email: string;
    phoneNo: string;
    gender: string;
    partnerId: number;
    genderId: number;
    partnerName: string;
    storeName: string;
    status: string;
    storeServiceIds: number[];
    yearOfService: number;
    timezone: string;
    knowledgeOnBrands: number[];
    isImageUpdate: boolean;
    storeId: number;
}

interface ItemCardProps {
  params: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ params }) => {
    const data = useSelector((state: RootState) => state.agent.data);
    const dispatch = useDispatch<AppDispatch>();
    const item = data.data?.find((item: any)=>item.id==params.id);
    
    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleEdit = () => {
        console.log('Edit button clicked for item:', item);
        toggleDrawer();
        
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();

        const updatedItem = {
            id: params.id,
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phoneNo: formData.get('phoneNo') as string,
            gender: formData.get('gender') as string,
            partnerId: Number(formData.get('partnerId')),
            genderId: Number(formData.get('genderId')),
            partnerName: formData.get('partnerName') as string,
            storeName: formData.get('storeName') as string,
            status: formData.get('status') as string,
            storeServiceIds: JSON.parse(formData.get('storeServiceIds') as string) as number[],
            yearOfService: Number(formData.get('yearOfService')),
            timezone: formData.get('timezone') as string,
            knowledgeOnBrands: JSON.parse(formData.get('knowledgeOnBrands') as string) as number[],
            isImageUpdate: Boolean(formData.get('isImageUpdate')),
            storeId: Number(formData.get('storeId')),
        };

        console.log("Form Submitted", updatedItem);
        dispatch(updateItem(updatedItem));
        toggleDrawer();
    };

    if (!item) {
        return <p>Loading...</p>; 
    }

    const { id, name, email, phoneNo, gender, partnerId, genderId, partnerName, storeName, status, storeServiceIds, yearOfService, timezone, knowledgeOnBrands, isImageUpdate, storeId } = item;

    return (
        <Layout>
            <Card>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={10}>
                            <Typography variant="h5">
                                Item ID: {id}
                            </Typography>
                            <Typography variant="body1">
                                Name: {name}
                            </Typography>
                            <Typography variant="body1">
                                Email: {email}
                            </Typography>
                            <Typography variant="body1">
                                PhoneNo: {phoneNo}
                            </Typography>
                            <Typography variant="body1">
                                Gender: {gender}
                            </Typography>
                            <Typography variant="body1">
                                Partner Name: {partnerName}
                            </Typography>
                            <Typography variant="body1">
                                Store Name: {storeName}
                            </Typography>
                            <Typography variant="body1">
                                Status: {status}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={2} container justifyContent="flex-end">
                            <IconButton onClick={handleEdit} aria-label="edit">
                                <EditIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            
            <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
                <Box sx={{ width: 400, padding: 2 }}>
                    <Typography variant="h5" gutterBottom>
                        Edit Item
                    </Typography>
                    <TextField
                        fullWidth
                        label="Name"
                        defaultValue={name}
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        defaultValue={email}
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Phone Number"
                        defaultValue={phoneNo}
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Gender"
                        defaultValue={gender}
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Partner ID"
                        defaultValue={partnerId}
                        variant="outlined"
                        margin="normal"
                    />
                     <TextField
                        fullWidth
                        label="Gender ID"
                        defaultValue={genderId}
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Partner Name"
                        defaultValue={partnerName}
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Store Name"
                        defaultValue={storeName}
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Status"
                        defaultValue={status}
                        variant="outlined"
                        margin="normal"
                    />
                    <TextField
              fullWidth
              label="Store Service IDs"
              name="storeServiceIds"
              defaultValue={JSON.stringify(storeServiceIds)}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Year of Service"
              name="yearOfService"
              defaultValue={yearOfService}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Timezone"
              name="timezone"
              defaultValue={timezone}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Knowledge on Brands"
              name="knowledgeOnBrands"
              defaultValue={JSON.stringify(knowledgeOnBrands)}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Is Image Update"
              name="isImageUpdate"
              defaultValue={String(isImageUpdate)}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Store ID"
              name="storeId"
              defaultValue={storeId}
              variant="outlined"
              margin="normal"
            />
                    <Box sx={{ marginTop: 2 }}>
                        <Button variant="contained" color="primary" onClick={handleFormSubmit}>
                            Save Changes
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </Layout>
    );
}

export default ItemCard;