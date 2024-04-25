from fastapi import FastAPI, Request, Form
from fastapi.responses import RedirectResponse,HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware.sessions import SessionMiddleware

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

app.add_middleware(SessionMiddleware, secret_key="secret")


@app.get("/")
async def home(request: Request):
    if "SIGNED-IN" not in request.session or request.session["SIGNED-IN"] != True : #如果尚未登入，顯示home page
        return templates.TemplateResponse("Home_page.html",{"request": request})
    elif request.session["SIGNED-IN"] == True : #如果已經登入了顯示會員頁
        return templates.TemplateResponse("Success_page.html", {"request": request})


@app.post("/signin")
async def signin(request: Request,account: str= Form(None), password: str= Form(None)):
    if account is None or password is None:
        error_message = "請輸入帳號、密碼"
        request.session["SIGNED-IN"] = False
        return RedirectResponse(url=f"/error?message={error_message}", status_code=303)
    elif account != "test" or password != "test":
        error_message = "帳號、或密碼輸入錯誤"
        request.session["SIGNED-IN"] = False
        return RedirectResponse(url=f"/error?message={error_message}", status_code=303)
    elif account == "test" or password == "test":
        request.session["SIGNED-IN"] = True
        return RedirectResponse(url="/member", status_code=303)


@app.get("/member")
async def member(request: Request):    
    if "SIGNED-IN" not in request.session or request.session["SIGNED-IN"] == False :
        return RedirectResponse(url="/")
    elif  request.session["SIGNED-IN"] == True:
        return templates.TemplateResponse("Success_page.html", {"request": request})


@app.get("/error")
async def error(request: Request,message: str=None):
    if message == None:
        return RedirectResponse(url="/")
    else:
        return templates.TemplateResponse("Error_page.html",{"error_message": message,"request": request})

@app.get("/signout")
async def logout(request: Request):
    request.session["SIGNED-IN"] = False
    return RedirectResponse(url="/")


@app.get("/square/{positive_number}")
async def square(request: Request, positive_number: str):
     Squared = str(int(positive_number) ** 2)
     result = str(Squared)
     return templates.TemplateResponse("Squared_Number_Page.html", {"Squared_Num": result, "request": request})
    

