import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(`${process.cwd()}/public/index.html`);
});

const openai = new OpenAI({
  apiKey: "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"
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });
    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:3000`));
