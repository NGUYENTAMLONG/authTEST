// fetch("http://localhost:3001/api/user?page=2")
//   .then((res) => res.json())
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error));
// const content = document.querySelector(".content");
// function changePage(page) {
//   fetch("http://localhost:3001/api/user?page=" + page)
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       let html = data.map((user) => {
//         return `
//             <li>${user.username} : ${user.password}</li>`;
//       });
//       // console.log(html);
//       var item = "";
//       for (let i = 0; i < data.length; i++) {
//         item += `<li>${data[i].username}:${data[i].password}</li>`;
//       }
//       console.log(item);
//       content.innerHTML = item;
//     })
//     .catch((error) => console.log(error));
// }
const spanPaging = document.querySelector(".li-paging");
(function loadPage() {
  fetch("/api/user?page=1")
    .then((res) => {
      return res.json();
    })
    .then(({ userPaging, count }) => {
      $(".current").html(currentPage);
      document.querySelector(".prevBtn").style.display = "none";
      let htmlsListUser = userPaging.map(
        (user) =>
          `<li style="color:yellow">${user.username}:${user.password}</li>`
      );
      const totalPage = Math.ceil(count / 3);
      let htmls = "";
      for (let i = 1; i <= totalPage; i++) {
        htmls += `<li class="page-item"><a class="page-link" href="#" onclick="changePage(${i})">${i}</a></li>`;
      }
      document.querySelector(".content").innerHTML = htmlsListUser.join("");
      spanPaging.innerHTML = htmls;
      spanPaging.querySelectorAll(".page-item")[0].classList.add("active");
    })
    .catch((error) => console.log(error));
})();
var currentPage = 1;
function changePage(page) {
  currentPage = page;

  if (currentPage === 1) {
    document.querySelector(".prevBtn").style.display = "none";
  } else {
    document.querySelector(".prevBtn").style.display = "block";
  }
  $.ajax({
    url: "/api/user?page=" + page,
    type: "GET",
    // data: "data",
    // dataType: "dataType",
    success: function ({ userPaging, count }) {
      $(".current").html(currentPage);
      if (currentPage === Math.ceil(count / 3)) {
        document.querySelector(".nextBtn").style.display = "none";
      } else {
        document.querySelector(".nextBtn").style.display = "block";
      }
      let htmls = userPaging.map(
        (user) =>
          `<li style="color:yellow">${user.username}:${user.password}</li>`
      );
      spanPaging.querySelectorAll(".page-item").forEach((element) => {
        if (element.className === "page-item active") {
          element.classList.remove("active");
        }
      });
      spanPaging
        .querySelectorAll(".page-item")
        [page - 1].classList.add("active");
      document.querySelector(".content").innerHTML = htmls.join("");
    },
  });
  // $.ajax({
  //   url: "/api/user?page=" + page,
  //   type: "GET",
  // }).then((data) => {
  //   let htmls = data.map(
  //     (user) =>
  //       `<li style="color:seagreen">${user.username}:${user.password}</li>`
  //   );
  //   document.querySelector(".content").innerHTML = htmls.join("");
  // });
}
function nextPage() {
  currentPage++;
  if (currentPage === 1) {
    document.querySelector(".prevBtn").style.display = "none";
  } else {
    document.querySelector(".prevBtn").style.display = "block";
  }
  $.ajax({
    url: "/api/user?page=" + currentPage,
    type: "GET",
    // data: "data",
    // dataType: "dataType",
    success: function ({ userPaging, count }) {
      if (currentPage === Math.ceil(count / 3)) {
        document.querySelector(".nextBtn").style.display = "none";
      } else {
        document.querySelector(".nextBtn").style.display = "block";
      }
      $(".current").html(currentPage);
      let htmls = userPaging.map(
        (user) =>
          `<li style="color:yellow">${user.username}:${user.password}</li>`
      );
      spanPaging.querySelectorAll(".page-item").forEach((element) => {
        if (element.className === "page-item active") {
          element.classList.remove("active");
        }
      });
      spanPaging
        .querySelectorAll(".page-item")
        [currentPage - 1].classList.add("active");
      document.querySelector(".content").innerHTML = htmls.join("");
    },
  });
}

function previousPage() {
  currentPage--;
  if (currentPage === 1) {
    document.querySelector(".prevBtn").style.display = "none";
  } else {
    document.querySelector(".prevBtn").style.display = "block";
  }
  $.ajax({
    url: "/api/user?page=" + currentPage,
    type: "GET",
    // data: "data",
    // dataType: "dataType",
    success: function ({ userPaging, count }) {
      if (currentPage === Math.ceil(count / 3)) {
        document.querySelector(".nextBtn").style.display = "none";
      } else {
        document.querySelector(".nextBtn").style.display = "block";
      }
      $(".current").html(currentPage);
      let htmls = userPaging.map(
        (user) =>
          `<li style="color:yellow">${user.username}:${user.password}</li>`
      );
      spanPaging.querySelectorAll(".page-item").forEach((element) => {
        if (element.className === "page-item active") {
          element.classList.remove("active");
        }
      });
      spanPaging
        .querySelectorAll(".page-item")
        [currentPage - 1].classList.add("active");
      document.querySelector(".content").innerHTML = htmls.join("");
    },
  });
}
