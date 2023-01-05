export function layout(box, detail) {
    return `
    <html>
    <head>
      <title>${box}</title>
      <style>
        body {
          text-align: center;
          padding: 50px;
          font: 16px Verdana, Arial;
          background-color: #94e8ef;
        }
    
        h1 {
          color:red;
          font-size: 2.5em;
          text-align: center;
        }
    
        h2 {
          color:#fb37f8;
          font-size: 1.2em;
          text-align: center;
        }
    
        #posts {
          margin: 0;
          padding: 0;
          text-align: center;
        }
    
        #posts li {
          margin: 50px 0;
          padding: 0;
          padding-bottom: 25px;
          border-bottom: 2px solid #eee;
          list-style: none;
          text-align: center;
        }
    
        #posts li:last-child {
          border-bottom: none;
          text-align: center;
        }
    
        textarea {
          width: 500px;
          height: 300px;
          text-align: center;
        }
        .styled {
          border: 0;
          line-height: 4;
          padding: 0 60px;
          font-size: 1rem;
          text-align: center;
          color: #fff;
          text-shadow: 1px 1px 1px #000;
          border-radius: 10px;
          background-color: rgba(220, 0, 0, 1);
          background-image: linear-gradient(to top left,
                                            rgba(0, 0, 0, .2),
                                            rgba(0, 0, 0, .2) 30%,
                                            rgba(0, 0, 0, 0));
          box-shadow: inset 2px 2px 3px rgba(255, 255, 255, .6),
                      inset -2px -2px 3px rgba(0, 0, 0, .6);
      }
      .styled:hover {
        background-color: rgba(255, 0, 0, 1);
    }
    
    .styled:active {
        box-shadow: inset -2px -2px 3px rgba(255, 255, 255, .6),
                    inset 2px 2px 3px rgba(0, 0, 0, .6);
    }
        
    
      </style>
    </head>
    <body>
      <section id="content">
        ${detail}
      </section>
    </body>
    </html>
    `
  }
  
  export function list(posts) {
    let list = []
    for (let post of posts) {
      list.push(`
      <li>
        <h2>${ post.title }</h2>
        <p><a href="/post/${post.id}">查看貼文</a></p>
      </li>
      `)
    }
   
    let detail = `
    <h1>我的部落格</h1>
    <button id="註冊"favorite styled="margin-right:20px;"><a href="/login/signup">Sign up</a></button>
    <button id="登入"favorite styled="margin-left:60px;"><a href="/login/log">Login</a></button>
    <h2>你現在有 <strong>${posts.length}</strong> 篇貼文</h2>
    <p><a href="/post/new">新增貼文</a></p>
    <ul id="posts">
      ${list.join('\n')}
    </ul>
    `
    return layout('Posts', detail)
  }
  

  export function loginsignup(){
    return layout('New Post',`
    <h1>註冊</h1>
    <label>電子信箱:</label>
    <input type="email" placeholder="電子信箱"><br><br>
    <label>帳號:</label>
    <input type="text" placeholder="帳號"><br><br>
    <label>密碼:</label>
    <input type="password" placeholder="密碼"><br><br>
    <p><input class="favorite styled" type="button" value="發送"></p>
    `)
  }
  
  export function login(){
    return layout('New Post',`
    <h1>登入</h1>
      <label>帳號:</label>
      <input type="text" placeholder="帳號"><br><br>
      <label>密碼:</label>
      <input type="password" placeholder="密碼"><br><br>
      <p><input class="favorite styled" type="button" value="發送"></p>
    `)
  }
  
  export function newPost() {
    return layout('New Post', `
    <h1>新增貼文</h1>
    <p>創建新貼文.</p>
    <form action="/post" method="post">
      <p><input type="text" placeholder="標題" name="title"></p>
      <p><textarea placeholder="內容" name="body"></textarea></p>
      <p><input class="favorite styled" type="button" value="新增"></p>
    </form>
    `)
  }
  
  
  export function show(post) {
    return layout(post.title, `
      <h1>${post.title}</h1>
      <p>${post.body}</p>
    `)
  }
