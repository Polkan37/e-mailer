import express from "express";
import cors from "cors";
import proxy from "express-http-proxy";
import { getTemplateByName, getAllTemplatesList, getAllConstants, updateConstant } from "./utils.js";

const PORT = process.env.PORT || 3001;

const headers = {
  "Access-Control-Allow-Origin": "*",
};

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  "/thiscrm-proxy",
  proxy("https://thiscrm.co", {
    proxyReqOptDecorator: (proxyReqOpts) => {
      proxyReqOpts.headers = { ...headers, ...proxyReqOpts.headers };
      return proxyReqOpts;
    },
  })
);

app.get("/api/templates", async (req, res) => {
  const templates = await getAllTemplatesList(); 
  res.send(templates)
});

app.get("/api/constants", async (req, res) => {
  const constants = await getAllConstants(); 
  res.send(constants)
});

app.get("/api/templates/:name", async (req, res) => {
  const name = req.params.name;
  const template = await getTemplateByName(name); 
  template ? res.send(template) : res.status(404).json("Type not supported. Pls, object should be either email or news")
});

app.put("/api/constants/:name", async (req, res) => {
  const name = req.params.name;
  const body = req.body;
  
  const data = await updateConstant(name, body); 
  data ? res.send(data) : res.status(404).json(`[Error 404] constant ${name} not found`)
});

// app.get("/api/melissa/template/:id", async (req, res) => {
//   const id = req.params.id;
//   const { melissaTemplate } = await getMelissaTemplateById(id);
//   if (!melissaTemplate) {
//     return res.status(404).json("Not Found");
//   }
//   res.json(melissaTemplate);
// });

// app.put("/api/melissa/template/:id", async (req, res) => {
//   const id = req.params.id;
//   const body = req.body;

//   const type = Object.keys(body)[0];
//   if (type !== "email" && type !== "news") {
//     return res
//       .status(400)
//       .json("Type not supported. Pls, object should be either email or news");
//   }

//   const updatedMelissaTemplate = await updateMelissaTemplateById(
//     id,
//     body[type],
//     type
//   );

//   if (!updatedMelissaTemplate) {
//     return res.status(404).json("Not Found");
//   }

//   res.json(updatedMelissaTemplate);
// });


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


app.use(express.static("../client/build"));
app.use(express.json());