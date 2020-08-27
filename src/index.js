const express = require("express");
const cors = require("cors");
const moment = require("moment");
const app = express();
const data = require("./data");

app.use(cors());

app.get("/", async (req, res) => {
  res.json({ data: "hello" });
});

app.get("/daily", async (req, res) => {
  try {
    const date = req.query.date;

    const dataToReturn = data.daysData.find(x =>{
      console.log(x.date, date)
      return moment(x.date).isSame(moment(date))
    }
    );
    res.json(dataToReturn);
  } catch (err) {
    console.log(err);
    res.json({ err });
  }
});

app.get("/dashboard2", async (req, res) => {
  try {
    const startDate = req.query.startDate;
    const weeks = req.query.weeks;
    const dataToReturn = data.weeksData.filter(week =>
      week.week.filter(
        x =>
          moment(x.date).isBetween(
            moment(startDate),
            moment(startDate).add(weeks, "weeks")
          ) || moment(x.date).isSame(moment(startDate))
      )
    );
    console.log(dataToReturn);
    res.json(dataToReturn);
  } catch (err) {
    console.log(err);
    res.json({ err });
  }
});

app.listen(3001, () => {
  console.log("Listening...");
});
