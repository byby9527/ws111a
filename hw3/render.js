export function layout(time, content) {
    return `
    <html>
    <head>
      <title>${time}</title>
      <style>
        body {
          padding: 80px;
          font: 16px Helvetica, Arial;
          background-color:#d7fff8;
        }
    
        h1 {
          font-size: 2em;
          color:red;
        }
    
        h2 {
            
          font-size: 1.2em;
          color:#0000ff;
        }
    
        #posts {
          margin: 0;
          padding: 0;
        }
    
        #posts li {
          margin: 40px 0;
          padding: 0;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
          list-style: none;
        }
    
        #posts li:last-child {
          border-bottom: none;
        }
    
        textarea {
          width: 700px;
          height: 700px;
        }
    
        input[type=text],
        textarea {
          border: 1px solid #eee;
          border-top-color: #ddd;
          border-left-color: #ddd;
          border-radius: 2px;
          padding: 15px;
          font-size: .8em;
        }
    
        input[type=text] {
          width: 500px;
        }
        .styled {
            border: 0;
            line-height: 2.5;
            padding: 0 20px;
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
            background-color:rgba(255, 0, 0, 1);
        }
        
        .styled:active {
            box-shadow: inset -2px -2px 3px rgba(255, 255, 255, .6),
                        inset 2px 2px 3px rgba(0, 0, 0, .6);
        }
      </style>
    </head>
    <body>
      <section id="content">
        ${content}
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
      <h2>${post.time}</h2>
      <h3>${post.title}</h3>
      <p><a href="/post/${post.id}">更多資訊</a></p>
      <p><a href="/deleted/${post.id}">刪除blog</a></p>
      </li>
      `)
    }
    let content = `
    <h1>Myblog</h1>
    <p>您有 <strong>${posts.length}</strong> 事件</p>
    <p><a href="/post/new">建立此事件</a></p>
    <ul id="posts">
      ${list.join('\n')}
    </ul>
    `
    return layout('Posts', content)
  }
  
  export function newPost() {
    return layout('New Event', `
    <h1>新事件</h1>
    <p>創立一個新事件</p>
    <form action="/post" method="post">
    <p><input type="text" placeholder="Title" name="title"></p>
    <p><input type="datetime-local" value="" name="time"></p>
    <p><textarea placeholder="Contents" name="body"></textarea></p>
    <input class="favorite styled" type="submit" value="Create">
    </form>
    `)
  }
  
  export function show(post) {
    return layout(post.time, `
      <h1>${post.time}</h1>
      <h2>${post.title}</h2>
      <pre>${post.body}</pre>
      </br></br>
      <p><a href="/">回到主頁面</a></p>
    `)
  }
