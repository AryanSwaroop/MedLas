import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid
import random
from dotenv import load_dotenv
from chains import Chain
from portfolio import Portfolio

load_dotenv()

# Initialize FastAPI app
app = FastAPI()


# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://medlas.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize instances of Chain and Portfolio
chain = Chain()
portfolio = Portfolio()

class QueryRequest(BaseModel):
    query: str

@app.post("/generate-reply")
async def generate_reply(request: QueryRequest):
    global id
    try:
        id = str(uuid.uuid4()) + str(random.randint(0, 1000000))
        query = request.query

        portfolio.load_portfolio()
        results = []

        links = portfolio.query_links(query)
        reply = chain.write_reply(query, links)
        results.append({"query": query, "reply": reply})

        return {"success": True, "result": results}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    """
    Health check endpoint.
    """
    return {"status": "OK", "message": "API is running successfully."}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
