from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware.sessions import SessionMiddleware

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")
app.add_middleware(SessionMiddleware, secret_key="secret")

@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse("login_page.html",{"request": request})

@app.post("/signin")
async def signin(request: Request,account: str= Form(None), password: str= Form(None)):
    if account is None or password is None:
        error_message = "Please_enter_username_and_password"
        return RedirectResponse(url=f"/error?message={error_message}", status_code=303)
    elif account != "test" or password != "test":
        error_message = "Username_or_password_is_not_correct"
        return RedirectResponse(url=f"/error?message={error_message}", status_code=303)
    else:
        request.session["SIGNED-IN"] = True
        return RedirectResponse(url="/member", status_code=303)

@app.get("/member")
async def member(request: Request):
    if not request.session.get("SIGNED-IN"):
        return RedirectResponse(url="/", status_code=303)
    return templates.TemplateResponse("success_page.html", {"request": request})

@app.get("/error")
async def error(message: str,request: Request):
    if message == "Please_enter_username_and_password":
        error_message = "請輸入帳號和密碼"
        return templates.TemplateResponse("error_page.html",{"error_message": error_message ,"request": request})
    elif message == "Username_or_password_is_not_correct":
        error_message = "帳號、或密碼輸入錯誤"
        return templates.TemplateResponse("error_page.html",{"error_message": error_message,"request": request})
    else:
        error_message = message
        return templates.TemplateResponse("error_page.html",{"error_message": error_message,"request": request})
    

