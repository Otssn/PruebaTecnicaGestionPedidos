import React, { useState, useEffect, useRef } from "react";
import Menu from "../components/menu";
import "../style/style.css";
import { Button } from 'primereact/button';
import { listProducts, searchProduct, createProducts, deleteProduct, updateProduct } from "../services/API_product";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { useForm } from "react-hook-form";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';

const Product = () => {

    const [displayBasic, setDisplayBasic] = useState(false);
    const [isNew, setIsNew] = useState(false);
    const [products, setProducts] = useState([]);
    const [id, setId] = useState('');

    const onHandleNew = () => {
        setIsNew(true);
        setDisplayBasic(true);
    };

    const saveProduct = async (data) => {
        try {
            if(data.unit_value > 0){
                const result = await createProducts(data)
                toast.current.show({ severity: 'success', summary: 'Guardado', detail: 'Se ha guardado de forma exitosa', life: 3000 });
                window.location.reload();
            }else{
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'El valor unitario debe ser mayor a 0' });    
            }
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al registrar el producto' });
        }
    }

    const updateProducts = async (data) => {
        try {
            const result = await updateProduct(id, data)
            toast.current.show({ severity: 'success', summary: 'Guardado', detail: 'Se ha actualizado de forma exitosa', life: 3000 });
            window.location.reload();
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al actualizar el producto' });
        }
    }


    const onHide = (name) => {
        setDisplayBasic(false);
        setId('')
        reset()
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await listProducts();
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products:',);
            }
        };
        fetchProducts();
    }, []);

    const actionTemplate = (node, column) => {

        const onDelete = async () => {
            try {
                const result = await deleteProduct(node.id);
                toast.current.show({ severity: 'success', summary: 'Eliminado', detail: 'Registro eliminado', life: 3000 });
                window.location.reload();
            } catch (error) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al eliminar el producto' });
            }
        }

        const onHandleUpdate = async () => {
            setIsNew(false);
            setDisplayBasic(true);
            try {
                const result = await searchProduct(node.id);
                setId(result.id);
                setValue('name', result.name);
                setValue('description', result.description);
                setValue('unit_value', result.unit_value);
            } catch (error) {
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al consultar el producto' });
                setDisplayBasic(false);
            }
        }

        const confirm = () => {
            confirmDialog({
                message: `¿Desea eliminar el registro ${node.name}?`,
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
                <h1>Producto</h1>
                <div className="buttonNew">
                    <Button label="Nuevo" className="p-button-rounded" onClick={onHandleNew} />
                </div>
            </div>
            <div className="card">
                <DataTable value={products} responsiveLayout="scroll">
                    <Column field="id" header="Code"></Column>
                    <Column field="name" header="Nombre"></Column>
                    <Column field="description" header="Descripción"></Column>
                    <Column field="unit_value" header="Valor unitario"></Column>
                    <Column body={actionTemplate} style={{ textAlign: 'center', width: '10rem' }} />
                </DataTable>
            </div>

            <Dialog header="Producto" visible={displayBasic} style={{ width: '50vw' }} onHide={() => onHide('displayBasic')}>
                <div className="formData">
                    <form onSubmit={handleSubmit((isNew) ? saveProduct : updateProducts)}>

                        <h5>Nombre</h5>
                        <InputText id="nameLaber" type="text" placeholder="Nombre" {...register("name", { required: true })} />
                        
                        <br />
                        {errors.name && <small id="nameLaber" className="p-error block">Este campo es obligatorio*</small>}
                        <br />

                        <h5>Descripción</h5>
                        <InputTextarea rows={5} cols={55} id="descriptionLaber" placeholder="Descripcion" type="textarea" {...register("description", { required: false })} />
                        
                        <br />
                        {errors.description && <small id="descriptionLaber" className="p-error block">Este campo es obligatorio*</small>}
                        <br />

                        <h5>Valor unitario</h5>
                        <InputText id="unitValueLaber" type="number" {...register("unit_value", { required: true })} />
                        
                        <br />
                        {errors.unit_value && <small id="unitValueLaber" className="p-error block">Este campo es obligatorio*</small>}
                        <br />

                        <Button label={(isNew) ? 'Crear' : 'Guardar'} className="p-button-rounded" />
                    </form>
                </div>
            </Dialog>
        </div>
    );
};

export default Product;