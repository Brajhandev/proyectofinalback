import  express  from "express";
import { engine } from "express-handlebars";
import mongoose from "mongoose";


import productRoutes from './routes/product.routes.js'
import cartRoutes from './routes/cart.routes.js'
import viewsRoutes from './routes/views.routes.js'


import * as dotenv from "dotenv"
dotenv.config();

const app = express();
const PORT = 8080

app.engine('handlebars', engine())
app.set('view engine', 'handlebars');
app.set('views','./src/views');
app.use(express.static('public'))


const server = app.listen(PORT, () => { console.log(`Server listening on ${PORT}`)})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//mongoose
mongoose.set('strictQuery', false);
mongoose.connect(`mongodb+srv://brajhan:AgH0OxOsKGboaBYb@cluster0.deiefvn.mongodb.net/ecommerce`, (err)=>{
    if(err){
        console.log('No se puede conectar a la base de dato ', err.message)
        process.exit();
    }else{
        console.log('Servidor Mongo levantado con exito')
    }
})

app.use('/api/products', productRoutes)
app.use('/api/carts', cartRoutes)
app.use('/api/viewProducts', viewsRoutes)