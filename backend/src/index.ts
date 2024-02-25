import app from "./app.js";
import { connectDB } from "./db/connection.js";


connectDB().then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log("Server is running");
    });
}).catch((e) => {
    console.log(e);
})



