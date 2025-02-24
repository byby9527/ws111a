import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import * as front from './render.js'
import { DB } from "https://deno.land/x/sqlite/mod.ts";
const db = new DB("data.db");
db.query("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT,date TEXT, body TEXT)");

const router = new Router();

router.get('/', list)
  .get('/post/new', add)
  .get('/deleted/:id', deleted)
  .get('/post/:id', show)
  .post('/post', create);

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

function query(sql) {
    let list = []
    for (const [id, title,time, body] of db.query(sql)) {
      list.push({id, title,time, body})
    }
    return list
  }

async function list(ctx) {
    let posts = query("SELECT id, title,date, body FROM posts")
    console.log('list:posts=', posts)
    ctx.response.body = await front.list(posts);
  }

  async function deleted(ctx){
    db.query(`DELETE FROM posts WHERE id=${ctx.params.id}`);
    ctx.response.redirect("/");
}

async function add(ctx){
    ctx.response.body = await front.newPost();
}



async function show(ctx) {
    const pid = ctx.params.id;
    let posts = query(`SELECT id, title,date, body FROM posts WHERE id=${pid}`)
    let post = posts[0]
    console.log('show:post=', post)
    if (!post) ctx.throw(404, 'invalid post id');
    ctx.response.body = await front.show(post);
  }

async function create(ctx) {
    const body = ctx.request.body()
    if (body.type === "form") {
      const pairs = await body.value
      const post = {}
      for (const [key, value] of pairs) {
        post[key] = value
      }
      console.log('create:post=', post)
      db.query("INSERT INTO posts (title,date, body) VALUES (?,?, ?)", [post.title,post.time, post.body]);
      ctx.response.redirect('/');
    }
  }

console.log('Server run at http://127.0.0.1:8012')
await app.listen({ port: 8012 });
