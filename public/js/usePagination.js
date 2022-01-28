// fetch("/api/user")
//   .then((res) => {
//     return res.json();
//   })
//   .then((data) => {
//     // console.log(data);
//     $("#demo").pagination({
//       dataSource: data,
//       pageSize: 3,
//       callback: function (users, pagination) {
//         let htmls = users.map(
//           (user) => `<li>${user.username}:${user.password}</li>`
//         );
//         $(".container").html(htmls);
//         console.log(pagination);
//       },
//     });
//   })
//   .catch((error) => console.log(error));

$("#demo").pagination({
  dataSource: function (done) {
    $.ajax({
      type: "GET",
      url: "/api/user",
      success: function (response) {
        done(response);
      },
    });
  },
  pageSize: 3,
  showGoInput: true,
  showGoButton: true,
  callback: function (users, pagination) {
    let htmls = users.map(
      (user) => `<li>${user.username}:${user.password}</li>`
    );
    $(".container").html(htmls);
    console.log(pagination);
  },
});

//cach khac
// $("#demo").pagination({
//   dataSource: function (done) {
//     $.ajax({
//       type: "GET",
//       url: "/api/user",
//       success: function (response) {
//         done(response);
//       },
//     });
//   },
//   pageSize: 3,
//   afterPageOnClick: function (event, pageNumber) {
//     loadPage(pageNumber);
//   },
// });
// const loadPage = (pageNumber) => {
//   // console.log(pageNumber);
//   $(".container").html("");
//   $.ajax({
//     type: "GET",
//     url: "/api/user?page=" + pageNumber,
//   })
//     // .then((res) => res.json())
//     .then((data) => {
//       // for (let i = 0; i < data.userPaging.length; i++) {
//       //   let item = $(
//       //     `<li style="color:gray">${data.userPaging[i].username} - ${data.userPaging[i].password} </li>`
//       //   );
//       //   $(".container").append(item);
//       // }
//       let htmls = data["userPaging"].map(
//         (user) =>
//           `<li style="color:green">${user.username} - ${user.password} </li>`
//       );
//       $(".container").html(htmls);
//     })
//     .catch((error) => console.log(error));
// };
// loadPage(1);
