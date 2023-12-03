async function getComment() {
  const response = await fetch("https://comseba-p4ki.onrender.com/comment");
  const jsonData = await response.json();

  return jsonData;
}

getComment();

const postComment = async (param) => {
  console.log(param);
  const res = await fetch("https://comseba-p4ki.onrender.com/createcomment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(param),
  });
  return await res.json();
};

const makeComment = async () => {
  const db = await getComment();

  const commentArea = document.querySelector(".guest_comment-area");

  const htmlList = db.commentList.map((info, idx) => {
    const date = info.time.split("-");

    const time = new Date(...date);

    const curTime = new Date();

    console.log(time, curTime);
    const timeStr = elapsedTime(time, curTime);

    console.log(info.time.split("-"));
    return `<div class="guest_comment">
              <div class="guest_comment_left">
                <div class="guest_comment_left_name">${info.name}</div>
              </div>
              <div class="guest_comment_right">
                <div class="guest_comment_right_text">${info.comment}</div>
                <div class="guest_comment_right_time">${timeStr}</div>
              </div>
              <button class="delete-${idx}">Delete</button>
            </div>
          `;
  });

  const html = htmlList.reduce((a, c) => a + c, "");

  commentArea.innerHTML = html;

  db.commentList.forEach((val, idx) => {
    const btn = document.querySelector(`.delete-${idx}`);
    btn.addEventListener("click", () => {
      deleteComment(idx);
    });
  });
};

makeComment();

const elapsedTime = (start, end) => {
  const diff = (end - start) / 1000;

  const times = [
    { name: "년", milliSeconds: 60 * 60 * 24 * 365 },
    { name: "개월", milliSeconds: 60 * 60 * 24 * 30 },
    { name: "일", milliSeconds: 60 * 60 * 24 },
    { name: "시간", milliSeconds: 60 * 60 },
    { name: "분", milliSeconds: 60 },
  ];

  for (const value of times) {
    const betweenTime = Math.floor(diff / value.milliSeconds);

    if (betweenTime > 0) {
      return `${betweenTime}${value.name} 전`;
    }
  }
  return "방금 전";
};

const commentBtn = document.querySelector(".guest_form button");

commentBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const name = document.querySelector(".guest_form input");
  const comment = document.querySelector(".guest_form textarea");

  const time = new Date();
  const timeStr = `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}-${time.getHours()}-${time.getMinutes()}-${time.getSeconds()}`;

  console.log(name.value, comment.value, timeStr);

  const state = await postComment({
    name: name.value,
    comment: comment.value,
    time: timeStr,
  });

  console.log(state);

  if (state) {
    window.location.reload();
  }
});

const deleteComment = async (idx) => {
  //서버로 요청
  const param = {
    idx: idx,
  };
  console.log(param);
  const res = await fetch(`https://comseba-p4ki.onrender.com/deletecomment`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(param),
  });

  makeComment();
};
