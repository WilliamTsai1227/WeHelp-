from fastapi import FastAPI, Request, Form ,Query
from fastapi.responses import RedirectResponse,HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware.sessions import SessionMiddleware
from fastapi.middleware.cors import CORSMiddleware
import uvicorn



app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
app.add_middleware(SessionMiddleware, secret_key="secret")
# 添加 CORS 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允许所有来源的请求
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # 允许的请求方法
    allow_headers=["*"],  # 允许所有请求头
)

message = {}

@app.post("/api/message")
async def createMessage(request:Request):
    new_message = await request.json()
    message["message"] = new_message
    return message




