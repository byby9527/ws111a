import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

function page(body) {
  return `<html>
  <head>
  <style>
  </style>
  </head>
  <body>
  ${body}
  </body>
  </html>`
}

app.use((ctx) => {
  console.log('ctx.request.url=', ctx.request.url)
  let pathname = ctx.request.url.pathname
  if (pathname.startsWith("/login")) {
    ctx.response.body = page(`
    <head>
    <style>
        .center{
            padding-top: 120px;
            text-align: center;
            font-size: 30px;
        }
        body{
            background-color: blue;
        }
 
       
    </style>
</head>
<body>
      <div class="center">
      <h2>登入表單</h2>
      <form action="" method="post">
            <h1> Login 登入</h1>
            <input type="text placeholder="Username 用戶名" />
            <input type="password" placeholder="Password 密碼"/>
            <input type="submit" value="Submit 提交"/>
      </form>
      </div>
</body>
</html>


    `)
} else {
    ctx.response.body = page(
        <html>
        <head>
        </head>
        <body>
        <h1 >歡迎來到我的網站</h1>
        
        <h2 class="box">個人資料:</h2>
        <p>姓名:陳先正</p>
        <p>出生年月份:92/07/25</p>
        <p>學校:國立金門大學</p>
        <h2 class="city">興趣:</h2>
        <p>打籃球</p>
        <p>玩手遊</p>
        <p>遊戲:傳說、神魔</p>
        </div>
        <div style="text-align: center; width: 500px; border: green solid 1px; ">
        <img alt="" src="https://upload.cc/i1/2022/03/26/1odyzA.png
        "alt="嗨"width="600" height="400" style="margin: 0 auto;" />
        </div>
        <h2 class="tree">個人通訊:</h2>
        <button class="ig" onclick="window.open('https://www.instagram.com/kkdd_0725/', '_blank')">
                <b>
                    IG
                </b>
                </button>
        <h2 class="tree">專業證照:</h2>
        <p>電腦硬體裝修乙級、電腦硬體裝修丙級</p>
        <p>數位電子乙級、工業電子丙級</p>
        <p>網路架設丙級</p>  
        </body>
        </html>
)
}
// searchParams.get('name')=${ctx.request.url.searchParams.get('name')}
});
console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 });
