import morgan from 'morgan'
// j'apelle mon ami morgan. il s'y connait en debogage
import express from 'express'
// j'apelle mon ami express. il m'aide a communiquer
import mongoose from 'mongoose'
// j'apelle mongoose, il connait les bases de données
import authRouter from './routers/auth.router.js'

import ejs from 'ejs'
import mainRouter from './routers/main.router.js'




const { PORT, NODE_ENV } = process.env
// Je prend mon adresse locale et mon environnement 

async function connectDB() {
    try {
        const { MONGO_URI } = process.env
        // je cache l'adresse de ma base de donnée
        await mongoose.connect(MONGO_URI)
        // mongoose part avec l'adresse de ma base de données
        // il me promet de me m'authorisé a y faire des actions
        console.log('Acces a votre Base myDB Autorisée !')

        // Tous c'est bien passé je peux faire des actions
    } catch (err) {
        console.log('Connection to MongoDB : Fail !');
        console.log(err);
        throw err;
    }
    return mongoose.Connection
}
await connectDB()
// je donne une adresse Database a mongoose et il va l'ouvrire pour moi
const app = express()
// j'utilise les services de traduction d'express pour parser les donées

// Configuration du moteur de vue
app.set('view engine', 'ejs');
app.set('views', './frontend/views');

app.use(express.urlencoded({ extended: true }));
// Pour lire les données des formulaires

app.use(express.json())
// express manipule les informations json
app.use(morgan('tiny'))
// morgan m'aide a comprendre ce qu'il se passe sous le capot

//Vue pour s'enregistrer
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/register', (req, res) => {
    res.render('pages/register')
})



app.use("/api", mainRouter)
// je prend une route sur le navigateur et je dis quelquechose
// expresse se charge de controller les communnications



app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT} (Mode: ${NODE_ENV})`)
})
// j'attend une reponse










