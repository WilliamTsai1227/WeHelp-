from fastapi import FastAPI, Request,Form
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse("login_page.html",{"request": request})

@app.post("/signin")
async def signin(account: str= Form(...), password: str= Form(...), checkbox: bool= Form(...)):
    if not account or not password:
        error_message = "請輸入帳號和密碼"
        return RedirectResponse(url=f"/error?message={error_message}")
    elif account != "test" or password != "test":
        error_message = "帳號或密碼不正確"
        return RedirectResponse(url=f"/error?message={error_message}")
    else:
        return RedirectResponse(url="/member")

@app.post("/member")
async def member():
    return RedirectResponse(url="http://127.0.0.1:8000/member")

@app.get("/error")
async def error(message: str):
    if message == "請輸入帳號和密碼":
        error_message = "請輸入帳號和密碼"
    elif message == "帳號或密碼不正確":
        error_message = "帳號或密碼不正確"
    else:
        error_message = "未知錯誤"
    return {"error_message": error_message}

