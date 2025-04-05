from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI(title="UltraRepo Agent")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount the static files directory
app.mount("/", StaticFiles(directory="public", html=True), name="static")

# For development purposes, you can access it via:
# uvicorn app:app --reload --port 8008

if __name__ == "__main__":
    # Run the app directly when script is executed
    uvicorn.run("app:app", host="0.0.0.0", port=8008, reload=True) 