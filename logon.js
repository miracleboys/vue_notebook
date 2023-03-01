let id = document.querySelector("#zhanghao");
let iname = document.querySelector("#name");
let pass = document.querySelector("#psw");
let pasr = document.querySelector("#psr");
let url = "https://db-api.amarea.cn/users";

// 注册

function zc() {
  let id_value = id.value;
  let name_value = iname.value;
  let pasv = pass.value;
  let pasrv = pasr.value;
 

  if (pasv != pasrv) {
    console.log("密码错误");
  } else {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow"
    }
    requestOptions.body = JSON.stringify({
      id: id_value,
      name: name_value,
      password: pasv,
    });
  
    fetch(`${url}`, requestOptions) // 这里的网址没有id
      .then((response) => response.json())
      .then((data) => console.log(data.id)) //新创建后的数据的id
      .catch((err) => console.log(err));
  }
}
