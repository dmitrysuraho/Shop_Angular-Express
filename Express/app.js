const express = require('express');
const WebSocketServer = require('ws').Server;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const sequelize = require('./config/sequelize');
const brandsRouter = require('./routes/brands.router');
const categoriesRouter = require('./routes/categories.router');
const productsRouter = require('./routes/products.router');
const authRouter = require('./routes/auth.router');
const usersRouter = require('./routes/users.router');
const basketsRouter = require('./routes/baskets.router');
const ordersRouter = require('./routes/orders.router');
const associations = require('./models/associations');
const middlewarePassport = require('./middleware/passport');
const app = express();
const port = process.env.PORT || 3000;

associations();
app.use(passport.initialize());
app.use('/static', express.static(__dirname + '/static'));
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', (req, res, next) => {
    middlewarePassport(req, res, passport);
    next();
});
app.use('/api/brands', brandsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/baskets', basketsRouter);
app.use('/api/orders', ordersRouter);

sequelize.sync()
    .then(() => {
        const server = app.listen(port, () => console.log(`Server has been started on ${port}!`));
        const wss = new WebSocketServer({ port: 6759 /*{server} - for deploy*/ });
        wss.on('connection', (ws) => {
            console.log('WebSocket connection');
            ws.on('message', (event) => {
                const data = JSON.parse(event);
                const res = JSON.parse(data);
                switch (res.event) {
                    case 'add-product':
                        ws.send(JSON.stringify({
                            event: 'messages',
                            data: true
                        }));
                        break;
                    case '':
                        break;
                }
            });
            ws.on('close', () => {
                console.log('WebSocket disconnected');
            });
        });
    })
    .catch(error => console.log(error));