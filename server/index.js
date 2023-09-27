import Express from "express";
const app = Express();
app.listen(3000,()=> {
    console.log(`server is running at port ${3000}`);
});