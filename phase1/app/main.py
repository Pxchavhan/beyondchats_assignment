from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Phase 1 API running"}
