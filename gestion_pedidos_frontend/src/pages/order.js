import React, { useState, useEffect, useRef } from "react";
import Menu from "../components/menu";
import "../style/style.css";
import { Button } from 'primereact/button';
import { listOrder, searchOrder, createOrder, deleteOrder, updateOrder } from "../services/API_order";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { useForm } from "react-hook-form";
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';
import { Checkbox } from 'primereact/checkbox';
import { listProducts,searchProductId } from "../services/API_product";
import { format } from 'date-fns-tz';

const Order = () => {
    const [displayBasic, setDisplayBasic] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const [order, setOrder] = useState([]);
    const [id, setId] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [products, setProduct] = useState([]);
    const [date, setDate] = useState(null);

    const onHandleNew = () => {
        setIsNew(true);
        setDisplayBasic(true);
    };

    const saveOrder = async (data) => {
        try {
            const ids = selectedProducts.map(product => product.id);
            data.list_products = JSON.stringify(ids);
            data.total = totalCost
            const result = await createOrder(data)
            toast.current.show({ severity: 'success', summary: 'Guardado', detail: 'Se ha guardado de forma exitosa', life: 3000 });
            window.location.reload();
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al registrar la orden' });
        }
    }

    const updateOrders = async (data) => {
        try {
            const ids = selectedProducts.map(product => product.id);
            data.list_products = JSON.stringify(ids);
            data.total = totalCost;
            if(!data.date_order){
                data.date_order = data.date
            }            
            delete data.date;
            const result = await updateOrder(id, data)
            toast.current.show({ severity: 'success', summary: 'Guardado', detail: 'Se ha actualizado de forma exitosa', life: 3000 });
            window.location.reload();
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al actualizar el producto' });
        }
    }


    const onHide = (name) => {
        setDisplayBasic(false);
        setId('');
        reset();
        setSelectedProducts([]);
        setTotalCost(0);
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const orderData = await listOrder();
                setOrder(orderData);

                const productData = await listProducts();
                setProduct(productData);
            } catch (error) {
                console.error('Error fetching products:',);
            }
        };
        fetchProducts();
    }, []);

    const actionTemplate = (node, column) => {

        const onDelete = async () => {
            try {
                const result = await deleteOrder(node.id);
                toast.current.show({ severity: 'success', summary: 'Eliminado', detail: 'Registro eliminado', life: 3000 });
                window.location.reload();
            } catch (error) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al eliminar la orden' });
            }
        }

        const onHandleUpdate = async () => {
            setIsNew(false);
            setDisplayBasic(true);
            try {
                const result = await searchOrder(node.id);
                const date_order_out_format = result.date_order;      
                // const date_order_format = format(new Date(date_order_out_format), 'eee MMM dd yyyy HH:mm:ss [GMT]XX (z)', { timeZone: 'UTC' });
                const date_order_format = format(new Date(date_order_out_format), 'dd/MM/yyyy');
                setId(result.id);
                setValue('date_order',date_order_format);
                setValue('date',date_order_format);
                setDate(date_order_format);
                setValue('client_name', result.client_name);
                setTotalCost(result.total);
                search_product_ids(result.list_products);
                
            } catch (error) {
                console.log(error)
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al consultar la orden' });
                setDisplayBasic(false);
            }
        }

        const search_product_ids = async (idsSearch) => {
                let idsimple = idsSearch.replace(/[\[\]]/g, '');
                const searchProducts = await searchProductId(idsimple);
                setSelectedProducts(searchProducts)
        };

        const confirm = () => {
            confirmDialog({
                message: `¿Desea eliminar la orden ${node.id}?`,
                header: 'Confirmar',
                icon: 'pi pi-exclamation-triangle',
                accept: () => onDelete(),
            });
        }

        return <div>
            <Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ marginRight: '.5em' }} onClick={onHandleUpdate}></Button>
            <Button type="button" icon="pi pi-trash" className="p-button-danger" onClick={confirm}></Button>
        </div>;
    };

    const handleProductSelect = (product) => {
        const currentIndex = selectedProducts.findIndex((p) => p.id === product.id);

        if (currentIndex === -1) {
            setSelectedProducts([...selectedProducts, product]);
            setTotalCost(totalCost + product.unit_value);
        } else {
            const updatedProducts = [...selectedProducts];
            updatedProducts.splice(currentIndex, 1);
            setSelectedProducts(updatedProducts);
            setTotalCost(totalCost - product.unit_value); 
        }
    };

    const renderSelectedProducts = () => {
        return (
            <div>
                <h5>Productos Seleccionados:</h5>
                <ul>
                    {selectedProducts.map((product) => (
                        <li key={product.id}>{product.name}</li>
                    ))}
                </ul>
                <h3>Total: ${totalCost}</h3>
            </div>
        );
    };

    const toast = useRef(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm();

    return (
        <div>
            <Menu />
            <Toast ref={toast}></Toast>
            <ConfirmDialog />
            <div className="container">
                <h1>Orden</h1>
                <div className="buttonNew">
                    <Button label="Nuevo" className="p-button-rounded" onClick={onHandleNew} />
                </div>
            </div>
            <div className="card">
                <DataTable value={order} responsiveLayout="scroll">
                    <Column field="id" header="Code"></Column>
                    <Column field="date_order" header="Fecha de orden"></Column>
                    <Column field="client_name" header="Nombre del cliente"></Column>
                    <Column field="total" header="Total"></Column>
                    <Column body={actionTemplate} style={{ textAlign: 'center', width: '10rem' }} />
                </DataTable>
            </div>

            <Dialog header="Orden" visible={displayBasic} style={{ width: '50vw' }} onHide={() => onHide('displayBasic')}>
                <div className="formData">
                    <form onSubmit={handleSubmit((isNew) ? saveOrder : updateOrders)}>

                        <h5>Fecha de la orden</h5>
                        <InputText id="" placeholder="" type="text" {...register("date", { required: true })}  disabled />

                        <h5>Fecha de la orden</h5>
                        <Calendar id="dateOrderLaber" type="text" showIcon {...register("date_order", { required: true })} />
                        {errors.dateOrderLaber && <small id="dateOrderLaber" className="p-error block">Este campo es obligatorio*</small>}


                        <h5>Nombre del cliente</h5>
                        <InputText id="clientNameLaber" placeholder="nombre del cliente" type="text" {...register("client_name", { required: true })}  />
                        {errors.client_name && <small id="clientNameLaber" className="p-error block">Este campo es obligatorio*</small>}

                        <div className="p-field">
                            <h5>Selección de Productos:</h5>
                            <ul>
                                {products.map((product) => (
                                    <li key={product.id}>
                                        <Checkbox
                                            inputId={product.id}
                                            value={product}
                                            onChange={() => handleProductSelect(product)}
                                            checked={selectedProducts.some((p) => p.id === product.id)}
                                        />
                                        <label htmlFor={product.id} className="p-checkbox-label">
                                            {product.name} - ${product.unit_value}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div><br></br>
                        
                        {renderSelectedProducts()}

                        <br></br>
                        <Button label={(isNew) ? 'Crear' : 'Guardar'} className="p-button-rounded" />
                    </form>
                </div>
            </Dialog>
        </div>
    );
};

export default Order;