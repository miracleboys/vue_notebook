let cells = document.querySelectorAll(".cell");
let cellfunctions = document.querySelectorAll(".cell_function");
let select = document.querySelector(".select");
const left = document.querySelector("#left");
const content = document.querySelector("#content");
const right = document.querySelector("#right");
const sidenav = document.querySelector(".sidenav");
const open_s = document.querySelector("#open");
const upon = document.querySelectorAll("#upon");
const downon = document.querySelector("#downon");
const del = document.querySelector(".del");
const upadd = document.querySelector("#upadd");
const downadd = document.querySelector("#downadd");
let cell_id = document.querySelectorAll("#right span");
let newcell = content.firstElementChild.cloneNode(true);
let a = 0;
let cell_select = null
let temp = 0;

var rendererMD = new marked.Renderer();
marked.setOptions({
  renderer: rendererMD,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
}); //markdown基本设置


// 展开
open_s.onclick = function () {
  if (a % 2 == 0) {
    console.log(a);
    left.style.width = "200px";
    content.style.width = "1200px";

    sidenav.style.display = "block";
    a = a + 1;
  } else {
    left.style.width = "0";
    content.style.width = "1200px";
    sidenav.style.display = "none";
    a = a + 1;
  }
};

// 寻找select
function find_select() {
  cell_arr = 0;
  cell_select = 0;
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].className == "select") {
      cell_select = i;
      break;
    }
  }
}


// 删除类名
function dcc() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].className = "cell";
  }
  for (let j = 0; j < cellfunctions.length; j++) {
    cellfunctions[j].style.cssText = `display:none;`;
  }
}



content.onclick = function (event) {
  // console.log(event.target);
  var target = event.target;
  // console.log(content);
  // 选中
  if (target.className == "cell") {
    // 统一类名
    dcc();

    // 刷新节点
    cells = document.querySelectorAll(".cell");
    cellfunctions = document.querySelectorAll(".cell_function");

    // 清除类名,功能框
    dcc();


    // 选中节点
    target.className = "select";
    target.parentNode.childNodes[3].style.cssText = `display:block;`;
    find_select();

    // cell属性
    cell_id[3].innerHTML = "cell属性：" + cell_select;


  }
  // 上移
  if (target.className == "upon") {
    let nowcell = target.parentNode.parentNode;
    let precell = previousNode(nowcell);
    if (!precell) {
      console.log(precell);
    } else {
      // 选中
      find_select();

      // 清除类名
      dcc()

      // 节点交换
      content.insertBefore(nowcell, precell);

      // 重新定位
      cells = document.querySelectorAll(".cell");

      // 重新选中
      cells[cell_select - 1].className = "select";
      cells[cell_select - 1].parentNode.childNodes[3].style.cssText = `display:block;`;
      find_select();


      // cell属性
      cell_id[3].innerHTML = "cell属性：" + cell_select;


    }
  }
  // 下移
  if (target.className == "downon") {
    let nowcell = target.parentNode.parentNode;
    let nextcelll = nextNode(nowcell);
    if (!nextcelll) {
      console.log(nextcelll);
    } else {
      // 选中
      find_select();

      // 清除类名
      dcc();

      // 节点交换
      content.insertBefore(nextcelll, nowcell);

      // 重新定位
      cells = document.querySelectorAll(".cell");

      // 重新选中
      cells[cell_select + 1].className = "select";
      cells[cell_select + 1].parentNode.childNodes[3].style.cssText = `display:block;`;
      find_select();

      // cell属性
      cell_id[3].innerHTML = "cell属性：" + cell_select;
    }
  }
  // 删除
  if (target.className == "del") {
    if (cells.length > 1) {
      // 选中
      find_select();

      // 清除类名
      dcc();

      // 节点删除
      content.removeChild(target.parentNode.parentNode);

      // 重新定位
      cells = document.querySelectorAll(".cell");


      cell_id[3].innerHTML = "cell属性：";

    }
  }
  // 向上新增

  if (target.className == "upadd") {
    let nowcell = target.parentNode.parentNode;

    // 选中
    find_select();

    // 清除类名
    dcc();

    // 节点添加
    if (content.firstElementChild) {
      newcell = content.firstElementChild.cloneNode(true);
      newcell.childNodes[1].innerHTML = "";
      // 元素内容修改
    }
    content.appendChild(newcell);
    content.insertBefore(newcell, nowcell);

    // 重新定位
    cells = document.querySelectorAll(".cell");
    cellfunctions = document.querySelectorAll(".cell_function");

    // 重新选中
    cells[cell_select].className = "select";
    cells[cell_select].parentNode.childNodes[3].style.cssText = `display:block;`;
    find_select();

    // cell属性
    cell_id[3].innerHTML = "cell属性：" + cell_select;
    console.log(cells)

  }
  // 向下新增

  if (target.className == "downadd") {
    let nowcell = target.parentNode.parentNode;
    let nextcell = nextNode(nowcell);

    // 选中
    find_select();

    // 清除类名
    dcc();

    // 节点添加
    if (cell_select == (cells.length - 1)) {
      if (content.firstElementChild) {
        newcell = content.firstElementChild.cloneNode(true);
        newcell.childNodes[1].innerHTML = "";
      }
      content.appendChild(newcell);
    } else {
      if (content.firstElementChild) {
        newcell = content.firstElementChild.cloneNode(true);
        newcell.childNodes[1].innerHTML = "";
      }
      content.appendChild(newcell);
      content.insertBefore(newcell, nextcell);

    }


    // 重新定位
    cells = document.querySelectorAll(".cell");
    cellfunctions = document.querySelectorAll(".cell_function");

    // 重新选中
    cells[cell_select + 1].className = "select";
    cells[cell_select + 1].parentNode.childNodes[3].style.cssText = `display:block;`;
    find_select();


    // cell属性
    cell_id[3].innerHTML = "cell属性：" + cell_select;


  }
};

// 键盘事件
document.addEventListener('keyup', function (e) {
  console.log(e.key);
  if (e.key == "ArrowUp") {
    // 键盘向上
    find_select();
    if (cell_select != 0) {

      // 清除类名
      dcc();

      
      cells[cell_select-1].className = "select";
      cells[cell_select-1].parentNode.childNodes[3].style.cssText = `display:block;`;

      // 编号刷新
      find_select();
      cell_id[3].innerHTML = "cell属性：" + cell_select;


    }


  }
  if (e.key == "ArrowDown") {
    // 键盘向下
    find_select();
    if (cell_select != (cells.length - 1)) {
      // 清除类名
      dcc();

      cells[cell_select + 1].className = "select";
      cells[cell_select + 1].parentNode.childNodes[3].style.cssText = `display:block;`;

      // 编号刷新
      find_select();
      cell_id[3].innerHTML = "cell属性：" + cell_select;
    }

  }
  if (e.key == "Control" && cell_select != null) {
    // 模式切换,还无法切换回去

    // 选中
    find_select();

    // 获取文本
    // console.log(cells[cell_select].textContent);
    let text = cells[cell_select].textContent



    // 文本修改
    cells[cell_select].innerHTML = marked.parse(text);

   

  }
})

function firstNode(obj) {
  if (!obj.firstChild) {
    return false;
  }
  return (
    obj.firstElementChild ||
    (obj.firstChild.nodeType == 1 ? obj.firstChild : nextNode(obj.firstChild))
  );
}

function lastNode(obj) {
  if (!obj.lastChild) {
    return false;
  }
  return (
    obj.lastElementChild ||
    (obj.lastChild.nodeType == 1 ? obj.lastChild : previousNode(obj.lastChild))
  );
}

function nextNode(obj) {
  if (!obj.nextSibling) {
    return false;
  }
  return (
    obj.nextElementSibling ||
    (obj.nextSibling.nodeType == 1
      ? obj.nextSibling
      : nextNode(obj.nextSibling))
  );
}

function previousNode(obj) {
  if (!obj.previousSibling) {
    return false;
  }
  return (
    obj.previousElementSibling ||
    (obj.previousSibling.nodeType == 1
      ? obj.previousSibling
      : previousNode(obj.previousSibling))
  );
}
