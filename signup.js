let id = document.querySelector("#iid");
let pwd = document.querySelector("#psw");
let as = document.getElementById("id01");
let up = document.querySelector("#signup");
let un = document.querySelector("#username")
let url = "https://db-api.amarea.cn/users";

function signon() {
  let iv = id.value;
  let wv = pwd.value;

  
  console.log(iv)

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let requestOptions = {
    // 里面不能有body
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`${url}/${iv}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data.id === iv && data.password === wv) {
        // 验证是否存在该用户return data
        console.log(data);
        let names = data.name;
        as.style.display = "none";
        console.log(un)
        un.innerHTML = names;
        up.style.display = "none";

      } else {
        throw new Error("用户名不存在或密码错误！");
      }
    })
    .catch((err) => console.log(err));
  



}
