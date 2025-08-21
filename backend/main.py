from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from collections import defaultdict
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool

# allow your frontend domain (Vercel) and localhost for dev
origins = [
    "http://localhost:5173",   # Vite default dev server
    "http://localhost:3000",   # CRA default dev server
    "https://vectorshift-assessment-frontend.vercel.app/p"  # <-- your Vercel URL
]

# ✅ Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # or specify: ["POST", "GET"]
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Message": "Hello World"}


@app.post(
    "/pipelines/parse",
    response_model=PipelineResponse,
    status_code=status.HTTP_200_OK
)
async def parse_pipeline(request: Request):
    try:
        body = await request.json()
        nodes = body.get("nodes", [])
        edges = body.get("edges", [])

        num_nodes = len(nodes)
        num_edges = len(edges)

        # Build graph
        graph = defaultdict(list)
        for e in edges:
            graph[e["source"]].append(e["target"])

        visited, rec_stack = set(), set()

        def dfs(node):
            if node in rec_stack:
                return True
            if node in visited:
                return False
            visited.add(node)
            rec_stack.add(node)
            for nei in graph[node]:
                if dfs(nei):
                    return True
            rec_stack.remove(node)
            return False

        is_dag = not any(dfs(n["id"]) for n in nodes)

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "num_nodes": num_nodes,
                "num_edges": num_edges,
                "is_dag": is_dag,
            },
        )

    except Exception as e:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"error": str(e)},
        )
