const express = require("express");
const router = require("./routes/jobApplicationRouter");
const client = require("./elephantsql");

const PORT = process.env.port || 3001;
const app = express();

app.use(express.json());

app.get("/jobsnet/api/v1", (req, res) => {
    res.json({message: "Running API!"});
});

app.use("/jobsnet/api/v1", router);

client.connect(function(err) {
    if(err) {
      return console.error("could not connect to postgres", err);
    }
    console.log("connected to postgres - elephantsql");
});
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
