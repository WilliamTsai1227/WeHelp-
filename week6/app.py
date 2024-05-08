from fastapi import FastAPI, Request, Form 
from fastapi.responses import RedirectResponse,HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.middleware.sessions import SessionMiddleware
import mysql.connector

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

app.add_middleware(SessionMiddleware, secret_key="secret")


@app.get("/")
async def home(request: Request):
    if "SIGNED-IN" not in request.session or request.session["SIGNED-IN"] != True : #如果尚未登入，顯示home page
        return templates.TemplateResponse("Home_page.html",{"request": request})
    elif request.session["SIGNED-IN"] == True : #如果已經登入了顯示會員頁
        name = request.session["name"]
        return templates.TemplateResponse("Success_page.html", {"name":name , "request": request})
    
@app.post("/signup")
async def signup(request: Request,register_name: str= Form(None),register_account: str= Form(None), register_password: str= Form(None)):
    con = mysql.connector.connect(
        user = "root",
        password = "12345678",
        host = "localhost",
        database = "website"
    )
    name = register_name
    account = register_account
    password = register_password
    
    #創建cursor物件
    cursor = con.cursor()
    cursor.execute("SELECT username FROM member WHERE username=%s",(account,))
    data = cursor.fetchall()
    if data == []:
        cursor.execute("INSERT INTO member(name,username,password) VALUES (%s,%s,%s)",(name,account,password))
        con.commit()
        con.close()
        return RedirectResponse(url="/", status_code=303)
    if data != []:
        con.close()
        error_message = "Repeated username"
        return RedirectResponse(url=f"/error?message={error_message}", status_code=303)

    
    


@app.post("/signin")
async def signin(request: Request,account: str= Form(None), password: str= Form(None)):
    con = mysql.connector.connect(
        user = "root",
        password = "12345678",
        host = "localhost",
        database = "website"
    )
    cursor = con.cursor()
    cursor.execute("SELECT id, name, username, password FROM member WHERE username=%s AND password=%s",(account,password))
    data = cursor.fetchone()
    if data == None:
        error_message = "帳號或密碼輸入錯誤"
        request.session["SIGNED-IN"] = False
        return RedirectResponse(url=f"/error?message={error_message}", status_code=303)
    if account == data[2] or password == data[3]:
        request.session.update({"SIGNED-IN": True, "id": data[0], "name": data[1], "username":data[2]})
        return RedirectResponse(url="/member", status_code=303)


@app.get("/member")
async def member(request: Request):    
    if "SIGNED-IN" not in request.session or request.session["SIGNED-IN"] == False :
        return RedirectResponse(url="/")
    elif request.session["SIGNED-IN"] == True:
        name = request.session["name"]
        id = request.session["id"]
        con = mysql.connector.connect(
        user = "root",
        password = "12345678",
        host = "localhost",
        database = "website"
        )
        cursor = con.cursor()
        cursor.execute("SELECT member.name, message.content, message.member_id, message.id FROM member INNER JOIN message ON member.id = message.member_id ORDER BY message.time DESC;")
        data = cursor.fetchall()
        result = []
        for item in data:
            empty = []
            check = ""
            message_username = item[0]
            message = item[1]
            if id == item[2]:
                check = '<button type="submit">X</button>'
            member_id = item[2]
            message_id = item[3]
            empty.append(message_username+":")
            empty.append(message)
            empty.append(check)
            empty.append(message_id)
            empty.append(member_id)
            result.append(empty)
        # result=[[message_username,message,check,message_id,member_id]....]
        return templates.TemplateResponse("Success_page.html", {"result":result,"id":id,"name":name,"request": request})    
        # result = ["{}: {}".format(item[0], item[1]) for item in data]

        


@app.get("/error")
async def error(request: Request,message: str=None):
    return templates.TemplateResponse("Error_page.html",{"error_message": message,"request": request})

@app.get("/signout")
async def logout(request: Request):
    request.session.update({"SIGNED-IN": False, "id": None, "name": None, "username":None})
    return RedirectResponse(url="/")


@app.post("/createMessage")
async def createMessage(request: Request,message: str= Form(None)):
    con = mysql.connector.connect(
        user = "root",
        password = "12345678",
        host = "localhost",
        database = "website"
    )
    cursor = con.cursor()
    id = request.session["id"]
    cursor.execute("INSERT INTO message(member_id,content) VALUES (%s,%s)",(id,message))
    con.commit()
    con.close()
    return RedirectResponse(url="/member", status_code=303)

@app.post("/deleteMessage")
async def deleteMessage(request: Request):
    # 从请求体中获取 JSON 数据
    message_data = await request.json()

    # 获取messageId和memberId
    messageId = message_data.get("messageId")
    memberId = message_data.get("memberId")

    con = mysql.connector.connect(
        user = "root",
        password = "12345678",
        host = "localhost",
        database = "website"
    )
    cursor = con.cursor()
    cursor.execute("DELETE FROM message WHERE id=%s",(messageId,))
    con.commit()
    con.close()
    return RedirectResponse(url="/member", status_code=303)

    

