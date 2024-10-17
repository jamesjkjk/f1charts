import express from 'express';
import cors from 'cors';
import openf1Routes from "./routes/openf1.route.js"
// Create an instance of Express
const app = express();

// Use CORS middleware
app.use(cors({
  origin:"https://f1charts-frontend-ggd4haevc6h7btbm.westus-01.azurewebsites.net/"
}));
app.use(express.json())
// Define a port for the server to listen on
const PORT = process.env.PORT || 8080;

app.use('/api', openf1Routes);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
