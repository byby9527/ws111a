## 程式碼解說:

### websocket+pgsql;
```
//server端

app.use(async (ctx) => {
  console.log('path=', ctx.request.url.pathname)
  await send(ctx, ctx.request.url.pathname, {
    root: `${Deno.cwd()}/public/`,
    index: "index.html", //使用oak主要是為了把index.html和javascript送到前端
  });
});
// websocket serve
const wss = new WebSocketServer(8080);
wss.on("connection", function (wsc: WebSocketClient) { //connection是指有成功連進來
	wsc.on("message", function (message: string) { //message代表有訊息進來
		// console.log(message);
		// ws.send(message);
		// broadcast message
		wss.clients.forEach(function each(client) { 
			if (!client.isClosed) {
				client.send(message);
			}  //有訊息進來就使用forEach對每個客戶端送出訊息
		});
	});
});
console.log('start at : http://127.0.0.1:8001')
await app.listen({ port: 8001});

//server端只負責接收訊息跟傳訊息



```











