from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from algorithms.linear_search import linear_search  # Importing the algorithm

app = FastAPI()

class SearchRequest(BaseModel):
    array: List[int]
    target: int

# List of available algorithms
algorithms = {
    "linear_search": linear_search,
}

@app.get("/algorithms/")
def get_algorithms():
    return {"algorithms": list(algorithms.keys())}

@app.post("/run/{algorithm}/")
def run_algorithm(algorithm: str, data: SearchRequest):
    if algorithm in algorithms:
        return algorithms[algorithm](data.array, data.target)
    return {"error": "Algorithm not found"}
