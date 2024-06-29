import React, { useState, useEffect, useRef } from "react";
import Menu from "../components/menu";
import "../style/style.css";
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { countOrder, countOrderByMonth } from "../services/API_order";
import { countProduct } from "../services/API_product";
import { Chart } from 'primereact/chart';

const Dashboard = () => {
    const [countOrders, setCountOrder] = useState();
    const [countProducts, setCountProduct] = useState();
    const [data, setDate] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const orderData = await countOrder();
                setCountOrder(orderData.count_order);

                const productData = await countProduct();
                setCountProduct(productData.count_product);

                const orderDataByMonth = await countOrderByMonth();
                setDate(orderDataByMonth)
            } catch (error) {
                console.error('Error fetching products:',);
            }
        };
        fetchProducts();
    }, []);

    const chartData = {
        labels: data.map(item => item.month),
        datasets: [
            {
                label: 'Pedidos por Mes',
                data: data.map(item => item.order_count),
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <Menu />
            <div className="container">
                <h3>dashboard</h3>
                <Splitter style={{ height: '300px' }}>
                    <SplitterPanel>
                        <h3>Producto</h3>
                        <h5>Cantidad de productos</h5>
                        <h2>{countProducts}</h2>
                    </SplitterPanel>
                    <SplitterPanel>
                        <h3>Ordenes</h3>
                        <h5>Cantidad de ordenes</h5>
                        <h2>{countOrders}</h2>
                    </SplitterPanel>
                </Splitter>
            </div>
            <div className="graphicData">
                <Chart type="bar" data={chartData} />
            </div>
        </div>
    );
};

export default Dashboard;