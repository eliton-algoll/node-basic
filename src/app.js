const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

// const { uuid } = require("uuidv4");

// middlewares 
function validateRepositorieId(request, response, next){
  const { id } = request.params;

  if(!isUuid(id)){
    return response.status(400).json({error: "Invalid repositorie ID."});
  }

  return next();
} 

const app = express();

app.use(express.json());
app.use(cors());

app.use('/repositories/:id',validateRepositorieId);

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const {title,url,techs} = request.body;

  const repositorie = {id: uuid(), title, url, techs, likes:0}

  repositories.push(repositorie);

  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const {title,url,techs} = request.body;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if(repositorieIndex < 0){
    return response.status(400).json({error: "Repositorie not found"});
  }

  const { likes } = repositories[repositorieIndex];

  const repositorie = {id, title, url, techs, likes};

  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if(repositorieIndex < 0){
    return response.status(400).json({error: "Repositorie not found"});
  }

  repositories.splice(repositorieIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if(repositorieIndex < 0){
    return response.status(400).json({error: "Repositorie not found"});
  }

  const {title,url,likes} = repositories[repositorieIndex];

  const liked = likes + 1;

  const repositorie = {
    id,
    title,
    url,
    likes:liked
  }

  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie)

});

module.exports = app;
