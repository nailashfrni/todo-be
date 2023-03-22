function addCard(todo) {
    $("#tasks").append(
        `<div class="card indigo-popup mx-2" id="card-${todo.id}" style="width: 18rem;">
            <div class="card-body-setup">
                <div class="row">
                <div class="col-7">
                    <div class="card-header-me">${todo.name}</div>
                </div>
                <div class="col">
                    <a href="javascript:updateStatus(${todo.id});" class="status small-text indigo" id="status-${todo.id}">
                        ${todo.status}
                    </a>
                </div>
                </div>
                <div class="mt-1 small-text">${todo.description}</div>
                <div class="row row-card-end d-flex justify-content-between">
                <div class="col-9 align-self-end">
                    <p></p>
                    <p class="small-text text-muted">${todo.date.toString()}</p>
                </div>
                <div class="col">
                    <a href="javascript:deleteTask(${todo.id});"><img id="delete-${todo.id}" alt="Delete"/></a>
                </div>
                </div>
            </div>
        </div>`
    );         
    document.getElementById(`delete-${todo.id}`).src = trashPic;
}

window.onload = function() {
    axios.get('all/')
    .then((response) => {
        console.log(response.data);
        response.data.forEach(addCard);
    })
    .catch(errors => console.log(errors));

    axios.get('progress/')
    .then((res) => {
        var data = res.data
        console.log(data);
        $(`#complete`).text(data.complete);
        $(`#incomplete`).text(data.incomplete);
    })
    .catch(errors => console.log(errors));
};

function updateComplete(int) {
    var temp = parseInt($(`#complete`).text());
    $(`#complete`).text(temp + int);
}

function updateIncomplete(int) {
    var temp = parseInt($(`#incomplete`).text());
    $(`#incomplete`).text(temp + int);
}

function createTask() {
    var name = $("#name").val();
    var description = $("#description").val();
    var token = document.getElementsByName("csrfmiddlewaretoken")[0].value;

    if (name && description) {
        axios.post("create/", {
            name: name,
            description: description
        }, {
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": token
            }
        })
        .then(res => {
            console.log(res);
            addCard(res.data);
            $("#name").val("");
            $("#description").val("");
            updateIncomplete(1);
        })
        .catch(errors => console.log(errors));
    } else {
        console.log("Masukkan input dengan benar");
        swal({
            title: "Warning",
            text: "Masukkan input dengan benar",
            icon: "warning",
            button: "Back",
          });
    }
}

function updateStatus(id) {
    var token = document.getElementsByName("csrfmiddlewaretoken")[0].value;

    axios.put(`update/${id}/`, {}, {
        headers: {
            "X-CSRFToken": token
        }
    })
    .then(res => {
        console.log(res);
        var status = res.data.status;
        $(`#status-${id}`).text(status);
        if (status == "COMPLETE") {
            updateComplete(1);
            updateIncomplete(-1);
        } else {
            updateComplete(-1);
            updateIncomplete(1);
        }
    })
    .catch(errors => console.log(errors));
}

function deleteTask(id) {
    var token = document.getElementsByName("csrfmiddlewaretoken")[0].value;

    axios.delete(`delete/${id}/`, {
        headers: {
            "X-CSRFToken": token
        }
    })
    .then(res => {
        console.log(res);
        $(`#card-${res.data.id}`).remove();
        var status = res.data.status;
        if (status == "COMPLETE") {
            updateComplete(-1);
        } else {
            updateIncomplete(-1);
        }
    })
    .catch(errors => console.log(errors));
}