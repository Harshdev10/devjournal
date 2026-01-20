const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/notebooks", require("./routes/notebook.routes"));
app.use("/api/notes", require("./routes/note.routes"));
app.use("/api/tasks", require("./routes/task.routes"));
app.use("/api/timetable", require("./routes/timetable.routes"));
app.use("/api/journal", require("./routes/journal.routes"));




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});