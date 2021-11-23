let targetId;

$(document).ready(function () {
    $('#header-title-select-shop').on('click', function () {
        window.location.reload();
    })
    $('#close').on('click', function () {
        $('#review-container').removeClass('active');
    })

    getMessages();
    getReview();
})


// 미리 작성된 영역 - 수정하지 않으셔도 됩니다.
// 사용자가 내용을 올바르게 입력하였는지 확인합니다.
function isValidContents(contents) {
    if (contents == '') {
        alert('내용을 입력해주세요');
        return false;
    }
    if (contents.trim().length > 140) {
        alert('공백 포함 140자 이하로 입력해주세요');
        return false;
    }
    return true;
}
// 수정 버튼을 눌렀을 때, 기존 작성 내용을 textarea 에 전달합니다.
// 숨길 버튼을 숨기고, 나타낼 버튼을 나타냅니다.
function editPost(id) {
    showEdits(id);
    let contents = $(`#${id}-contents`).text().trim();
    $(`#${id}-textarea`).val(contents);
}

function showEdits(id) {
    $(`#${id}-editarea`).show();
    $(`#${id}-submit`).show();
    $(`#${id}-delete`).show();

    $(`#${id}-contents`).hide();
    $(`#${id}-edit`).hide();
}

function hideEdits(id) {
    $(`#${id}-editarea`).hide();
    $(`#${id}-submit`).hide();
    $(`#${id}-delete`).hide();

    $(`#${id}-contents`).show();
    $(`#${id}-edit`).show();
}

// 게시글을 생성합니다.
function writePost() {
    // 1. 작성한 메모를 불러옵니다.
    let usernameDiv = document.getElementById('board-username');
    let username = usernameDiv.textContent;
    console.log(username);
    let title = $('#board-title').val();
    let contents = $('#board-contents').val();
    // 2. 작성한 메모가 올바른지 isValidContents 함수를 통해 확인합니다.
    if (isValidContents(contents) == false) {
        return;
    }
    console.log(title);
    console.log(contents);
    // 3. genRandomName 함수를 통해 익명의 username을 만듭니다.
    // 4. 전달할 data JSON으로 만듭니다.
    let data = {'username':username, 'title': title, 'contents': contents};
    // 5. POST /api/memos 에 data를 전달합니다.
    $.ajax({
        type: "POST",
        url: "/api/boards",
        contentType: "application/json", // JSON 형식으로 전달함을 알리기
        data: JSON.stringify(data),
        success: function (response) {
            alert('메시지가 성공적으로 작성되었습니다.');
            window.location.reload();
        }
    })
}

// 전체 게시글 리스트 페이지 로딩 자동 업데이트
function getMessages() {
// 1. 기존 메모 내용을 지웁니다.
    $('#boardList-area').empty();
    // 2. 메모 목록을 불러와서 HTML로 붙입니다.
    $.ajax({
        type: 'GET',
        url: '/api/boards',
        success: function (response) {
            for(let i =0; i<response.length; i++){
                let memo = response[i];
                let id = memo.id;
                let username = memo.username;
                let title =memo.title;
                let contents = memo.contents;
                let modifiedAt = memo.modifiedAt;
                addHTML(id, username, title, contents, modifiedAt);
            }
            console.log(response);
        }
    })
}

//하단의 id는 memo id
function addHTML(id, username, title,  contents, modifiedAt) {
// 1. HTML 태그를 만듭니다.
    let tempHtml = `<div class="card">
                        <div class="metadata">
                            <div class="date">
                                ${modifiedAt}
                            </div>
                            <div id="${id}-username" class="username">
                                ${username}
                            </div>
                        </div>
                        <div class="title">
                            <div id="${id}-title" class="text">
                                ${title}
                            </div>
                        </div>
                        <div class ="modal">
                            <div onclick="execSearch('${id}');" id="${id}-submit" class="modal-search">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-arrow-bar-up" viewBox="0 0 16 16">
                                     <path fill-rule="evenodd" d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z"/>
                                 </svg>
                            </div>
                        </div>
                    </div>`;
    // 2. #cards-box 에 HTML을 붙인다.
    $('#boardList-area').append(tempHtml);
}

//review 페이지_ 특정게시글 내용
// 게시글을 누르면 memo id 로 이동
function execSearch(id) {

    $('#boardExtra-area').empty();
    $.ajax({
        type: 'GET',
        url: `/api/boards/${id}`,
        success: function (response) {
            console.log("여기");
            for (let i = 0; i < response.length; i++) {
                let itemDto = response[i];
                let tempHtml = Review (id, itemDto);
                $('#boardExtra-area').append(tempHtml);
            }
            console.log("여기2");
            window.location.reload();
            $('.modal-search').click(function(d) {
                console.log("clear");
                window.location.reload('/user/signup');
            });
        }
    })
}

function Review (id, itemDto) {
    return `<div id="boardExtra-container" class="boardExtra-containerC">
    <div class="boardExtra">
        <div class="metadata">
            <div id="${id}-title" class="popup_title">${itemDto.title}</div>
            <div id="${id}-username" class="popup_username">${itemDto.username}</div>
            <div class="popup_date">${itemDto.modifiedAt}</div>
        </div>
        <div class="contents">
            <div id="${id}-contents" class="contents">
                <div>${itemDto.contents}</div>
            </div>
        </div>
    </div>
</div>`
}

////review 페이지_댓글 작성란
function writeReview(id) {
    // 1. 작성한 메모를 불러옵니다.
    let usernameDiv = document.getElementById('review-username');
    let username = usernameDiv.textContent;
    let contents = $('#review-contents').val();
    // 2. 작성한 메모가 올바른지 isValidContents 함수를 통해 확인합니다.
    if (isValidContents(contents) == false) {
        return;
    }
    // 3. genRandomName 함수를 통해 익명의 username을 만듭니다.
    // 4. 전달할 data JSON으로 만듭니다.
    let data = {'username':username,'reviewContents': contents};
    // 5. POST /api/memos 에 data를 전달합니다.
    $.ajax({
        type: "POST",
        url: `/api/boards/${id}`,
        contentType: "application/json", // JSON 형식으로 전달함을 알리기
        data: JSON.stringify(data),
        success: function (response) {
            alert('댓글이 성공적으로 작성되었습니다.');
            window.location.reload();
        }
    })
}

// 특정 게시물의 리뷰 리스트 로딩 자동 업데이트
function getReview(id) {
// 1. 기존 메모 내용을 지웁니다.
    $('#reviewList-area').empty();
    // 2. 메모 목록을 불러와서 HTML로 붙입니다.
    $.ajax({
        type: 'GET',
        url: `/api/boards/${id}`,
        success: function (response) {
            for(let i =0; i<response.length; i++){
                let user = response[i];
                let username = user.username;
                let reviewContents = user.reviewContents;
                let modifiedAt = user.modifiedAt;
                addReview(id, username, reviewContents, modifiedAt);
            }
            console.log(response);
        }
    })
}

//하단의 id는 memo id
function addReview(id, username, reviewContents, modifiedAt) {
// 1. HTML 태그를 만듭니다.
    let tempHtml = `<div id="reviewList-container" class="reviewList-containerC">
                        <div class="reviewList">
                            <div class="metadata">
                                <div><span th:text="${username}"></span> 님의 댓글</div>
                                <div class="popup_date">${modifiedAt}</div>
                            </div>
                            <div class="contents">
                                <div id="${id}-contents" class="contents">
                                    <div>${reviewContents}</div>
                                </div>
                                <div id="${id}-editarea" class="edit">
                                    <textarea id="${id}-textarea" class="te-edit" cols="30" rows="5"></textarea>
                                </div>
                            </div>
                            <div class="footer">
                                <img id="${id}-edit" onClick="editPost('${id}')" class="icon-start-edit" src="/images/edit.png" alt="">
                                <img id="${id}-delete" onClick="deleteOne('${id}')" class="icon-delete" src="/images/delete.png" alt="">
                                <img id="${id}-submit" onClick="submitEdit('${id}')" class="icon-end-edit" src="/images/done.png" alt="">
                            </div>
                        </div>
                    </div>`;
    // 2. #cards-box 에 HTML을 붙인다.
    $('#reviewList-area').append(tempHtml);
}




// 메모를 수정합니다.
function submitEdit(id) {
    // 1. 작성 대상 메모의 username과 contents 를 확인합니다.
    let username = $(`#${id}-username`).text().trim();
    let contents = $(`#${id}-textarea`).val().trim();
    // 2. 작성한 메모가 올바른지 isValidContents 함수를 통해 확인합니다.
    if (isValidContents(contents) == false) {
        return;
    }
    // 3. 전달할 data JSON으로 만듭니다.
    let data = {'username': username, 'contents': contents};
    // 4. PUT /api/memos/{id} 에 data를 전달합니다.
    $.ajax({
        type: "PUT",
        url: `/api/boards/${id}`,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert('메시지 변경에 성공하였습니다.');
            window.location.reload();
        }
    });
}

// 메모를 삭제합니다.
function deleteOne(id) {
    $.ajax({
        type: "DELETE",
        url: `/api/boards/${id}`,
        success: function (response) {
            alert('메시지 삭제에 성공하였습니다.');
            window.location.reload();
        }
    })
}

