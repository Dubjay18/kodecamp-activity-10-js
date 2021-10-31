let postTitle = document.querySelector("#post-title");
let postBody = document.querySelector("#post-body");
let postForm = document.querySelector("#post-form");
let newPT = document.querySelector(".post-title");
let newPB = document.querySelector(".post-body");
let userPost = [];
let singleUserPost = [];

function creatPost(e) {
  e.preventDefault();
  let pTite = postTitle.value;
  let pBody = postBody.value;
  console.log(pTite, pBody);
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: pTite,
      body: pBody,
      userID: "5",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      userPost.push(data);
      console.log(userPost);
      let postLayout = document.querySelector("#post-layout");
      let Post = "";
      userPost.forEach((element) => {
        // console.log(element)
        Post += ` <div class="col-md-4 mb-3">
            <div class="card h-100">
              <div class="card-body">
              <div class="d-flex justify-content-end">
                    <h6 class="text-primary">${element.id}</h6>
                    </div>
                <h5 class="post-title mb-4">${element.title}</h5>
                <p class="post-body">
                 ${element.body}
                </p>
                <div  class="d-flex justify-content-end">
                <button class= "btn btn-danger" onclick="deletePost(${element.id})">Delete</button>
                </div>
                <div  class="d-flex justify-content-end">
                <button class="btn btn-primary  d-flex justify-content-end" onclick="singlePost(${element.id})" >view</button>
                </div>
                <div  class="d-flex justify-content-end">
                <button class="btn btn-warning" onclick="updatePost(${element.id})" >update</button>
                </div>
              </div>
            </div>
          </div>`;
        postLayout.innerHTML = Post;
      });

      alert("Post created suceesfully");
    });
}

function deletePost(postId) {
  console.log(postId);
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(userPost);
      userPost.splice(postId - 1, 1);
      console.log(userPost);
      console.log(data);
      let postLayout = document.querySelector("#post-layout");
      let Post = "";
      userPost.forEach((element) => {
        // console.log(element)
        Post += ` <div class="col-md-4 mb-3">
            <div class="card h-100">
              <div class="card-body">
              <div class="d-flex justify-content-end">
                    <h6 class="text-primary">${element.id}</h6>
                    </div>
                <h5 class="post-title mb-4">${element.title}</h5>
                <p class="post-body">
                 ${element.body}
                </p>
                <div  class="d-flex justify-content-end">
                <button class= "btn btn-danger" onclick="deletePost(${element.id})">Delete</button>
                </div>
                <div  class="d-flex justify-content-end">
                <button class="btn btn-primary  d-flex justify-content-end" onclick="singlePost(${element.id})" >view</button>
                </div>
                <div  class="d-flex justify-content-end">
                <button class="btn btn-warning" onclick="updatePost(${element.id})" >update</button>
                </div>
              </div>
            </div>
          </div>`;
        postLayout.innerHTML = Post;
      });
    });
  alert("Post deleted suceesfully");
}

function singlePost(postId) {
  console.log(postId);
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((response) => response.json())
    .then((data) => {
      window.location.pathname = "/post.html";
      console.log(data);
      singleUserPost.push(data);
      console.log(singleUserPost);
      localStorage.setItem("userpost", JSON.stringify(singleUserPost));

      const New = localStorage.getItem("userpost");
      const userPostNew = JSON.parse(New);

      console.log(New);
      console.log(userPostNew);

      let single = document.querySelector("singlepost");
      let d = userPostNew.length - 1;
      let html = "";
      console.log(d);
      let e = userPostNew[d];
      console.log(e);
      window.location.pathname = "/kodecamp-activity-10-js/post.html";
      html += `
       <div class="col-md-4">
                  <div class="card">
                    <div class="card-body">
                    <h6 class="text-primary">${e.id}</h6>
                    </div>
                      <h5 class="post-title mb-4">${e.title}</h5>
                      <p class="post-body">
                        ${e.body}
                      </p>
                    </div>
                  </div>
                </div>
       `;
      single.innerHTML = html;
    });
}

function updatePost(postId) {
  let pTite = postTitle.value;
  let pBody = postBody.value;
  console.log(pTite, pBody);
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: "PUT",
    body: JSON.stringify({
      id: `${postId}`,
      title: pTite,
      body: pBody,
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(newPT);
      console.log(newPB);
      newPT.innerHTML = pTite;
      newPB.innerHTML = pBody;
    });
}
