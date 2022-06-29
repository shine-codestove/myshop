import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Container,
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, TextField
} from "@mui/material";
import {DataGrid} from '@mui/x-data-grid';
import useAxios from "axios-hooks";
import {useState} from "react";
import {Form, Formik} from "formik";

const columns = [
    {
        field: 'id',
        headerName: '상품ID',
        width: 90
    },
    {
        field: 'name',
        headerName: '상품명',
        editable: true,
        flex: 100
    },
    {
        field: 'price',
        headerName: '가격',
        width: 150,
        editable: true,
    },
    {
        field: 'size',
        headerName: '크기',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'category',
        headerName: '카테고리',
        width: 110,
        editable: true,
    }
];

const ProductList = () => {
    const [{data: productData, loading: productLoading, error: productError}, refetchProductList] = useAxios(
        'http://127.0.0.1:8000/shopping/product/list/'
    )
    const [open, setOpen] = useState(false);

    const addProduct = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const submitProduct = () => {

    }

    if (productLoading) return (
        <Box sx={{display: 'flex'}}>
            <CircularProgress/>
        </Box>
    );

    if (productError) return <p>Error!</p>

    return (<>
        <Container>
            <Box>
                <Card>
                    <CardHeader title={"상품목록"}></CardHeader>
                    <CardContent>
                        <Box sx={{marginBottom: 1}}><Button variant={'outlined'}
                                                            onClick={addProduct}>상품추가</Button></Box>
                        <Box sx={{height: 400, width: '100%'}}>
                            <DataGrid
                                rows={productData.data}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                checkboxSelection
                                disableSelectionOnClick
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>상품등록하기</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{name: '상품명'}}
                        onSubmit={(values, actions) => {
                            addProduct();
                        }}
                    >
                        {({isSubmitting, values}) => (
                            <Form>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="상품명"
                                    fullWidth
                                    variant="standard"
                                />
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Save</Button>
                </DialogActions>
            </Dialog>
        </Container>
    </>)
}

export default ProductList