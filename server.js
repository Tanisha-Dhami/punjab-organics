const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const products = [
    { id: 1, name: "Fresh Milk", price: 60, unit: "L", image: "https://images.unsplash.com/photo-1550583724-b2692b85b154?w=400", category: "dairy", description: "Fresh organic milk directly from Punjab farms" },
    { id: 2, name: "Desi Ghee", price: 500, unit: "500g", image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400", category: "dairy", description: "Pure desi ghee made from cow's milk" },
    { id: 3, name: "Fresh Paneer", price: 180, unit: "500g", image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400", category: "dairy", description: "Soft and fresh cottage cheese" },
    { id: 4, name: "Yogurt", price: 50, unit: "500g", image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400", category: "dairy", description: "Creamy probiotic yogurt" },
    { id: 5, name: "Butter", price: 80, unit: "250g", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400", category: "dairy", description: "Fresh creamy butter" },
    { id: 6, name: "Buttermilk", price: 30, unit: "500ml", image: "https://images.unsplash.com/photo-1601055903647-ddf1ee9701b7?w=400", category: "dairy", description: "Refreshing traditional chaas" }
];

const orders = [];

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
});

app.post('/api/orders', (req, res) => {
    const { customer, items, total } = req.body;
    
    if (!customer || !items || items.length === 0) {
        return res.status(400).json({ error: "Invalid order data" });
    }

    const order = {
        id: orders.length + 1,
        customer,
        items,
        total,
        status: "Pending",
        date: new Date().toISOString()
    };
    
    orders.push(order);
    res.json({ success: true, orderId: order.id, message: "Order placed successfully!" });
});

app.get('/api/orders', (req, res) => {
    res.json(orders);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});