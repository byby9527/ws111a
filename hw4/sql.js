import { DB } from "https://deno.land/x/sqlite/mod.ts";
//移除資料庫
try {
  Deno.remove("data.db")
} catch (e) {
  console.log('remove fail!')
}
//新增資料庫
const db = new DB("data.db");
//查詢
db.query("CREATE TABLE users (user TEXT, pass TEXT)");
db.query("CREATE TABLE msgs (msg TEXT, user TEXT)");

//插入資料
db.query(`INSERT INTO users (user, pass) VALUES ('ccc', '123')`);
db.query(`INSERT INTO users (user, pass) VALUES ('tim', '321')`);

//印出table裡的內容
for (const [user,pass] of db.query("SELECT user,pass FROM users"))
    console.log(user, pass);

//印出table裡的名稱    
let r = db.query(`SELECT name FROM sqlite_schema WHERE type ='table' AND name NOT LIKE 'sqlite_%'`)
console.log('r=', r)
db.close();
