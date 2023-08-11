import express from "express";
import { config } from "dotenv";
import path from "path";
import url from "url";
const _filename = url.fileURLToPath(import.meta.url);
const _dirname = url.fileURLToPath(new URL(".", import.meta.url));
config();
const port = process.env.port;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(_dirname, "./routes")));
app.listen(port, () => {
    console.log(`${port}`);
});
//# sourceMappingURL=index.js.map