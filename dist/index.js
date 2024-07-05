import app from "./app.js";
import { connectDB } from "./db/connectiondb.js";
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`listening on port ${process.env.PORT}`);
    });
}).catch((error) => {
    console.log(error);
});
//# sourceMappingURL=index.js.map