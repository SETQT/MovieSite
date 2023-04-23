



// function test() {
//     // alert("asd")
// }
// $('.buttonP').on("click", function () {
//     alert("ASd")
// });

loadReview = () => {
    // alert("Sdf")
    let page = event.target.id
    let film = $('.info').attr('id')
    // alert(film)
    postData("http://localhost:3000/film/loadReview", { film, page })
        .then((data) => {
            console.log(data);
            let html = ''
            data = data.data
            data.forEach(element => {
                html += `<span class="title"> ${element.reviewTitle} </span>
                <div>
                <span
                 class="author"> by ${element.author} </span>
                 </div>
                <p>
                     ${element.reviewText}
    
                </p>
                `
                // console.log(element.reviewTitle);
            });

            // for (const key in data) {
            //     console.log(data[key.reviewTitle]);
            // }
            // <div>

            // <span class="author"> by {{this.author}} </span>
            // </div>
            // {{!-- <span class="title"> {{this.submiss}} </span> --}}
            // <p>
            //     {{this.reviewText}}

            // </p>
            $('.contentReview').html(html)

            // if (data.status == "ok")
            //     window.location.href = `http://localhost:3000/home`

        })
        .catch((data) => {
            // console.log(data);
        })
}
updateCategory = () => {

    // let data = $('.updateCategory')[1].text();
    // console.log(data);
    let data = []
    $('input[type="text"].updateCategory').each(function () {

        let id = $(this).attr('id').toString().replace('newNameCategory', '');
        let val = $(this).val();
        if (val != "")
            data.push({
                id,
                val
            })
        // else data.push(id"default");
    });

    // console.log(data);
    // let name = $('#nameCategory').val();

    postData("http://localhost:3000/updateCategory", { data })
        .then((data) => {
            console.log(data);
            if (data.status == "ok")
                window.location.href = `http://localhost:3000/home`

        })
        .catch((data) => {
            console.log(data);
        })
    //     .then((data) => {
    //         console.log(data);
    //         if (data.status == "ok")
    //             window.location.href = `http://localhost:3000/home`

    //     })
    //     .catch((data) => {
    //         console.log(data);
    //     })
}

deleteMyFilm = () => {
    // alert("Asd")
    let page = event.target.id
    window.location.href = `http://localhost:3000/home/myFilm?del=${page}`

}
loadPageSearch = () => {
    let page = event.target.id
    let val = $('.remember').attr("id")
    // alert(val)
    window.location.href = `http://localhost:3000/home/search?name=${val}&page=${page}`

}
searchButton = () => {
    let input = $('.contentSearch').val()
    // alert(input)
    if (input != '') {
        // $('.remember').html() = input
        window.location.href = `http://localhost:3000/home/search?name=${input}`
    }
}
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

// $(document).on('change', 'select', function (e) {
//     let val = this.options[e.target.selectedIndex].value;
//     window.location.href = `http://localhost:3000/home?cat=${val}`
//     // console.log(val);


// });



// saveProduct=()=>{
//     id =
// }
// $('select')(function () {
//     var optionSelected = $(this).find("option:selected");
//     var valueSelected = optionSelected.val();
//     // var textSelected = optionSelected.text();
//     // alert(valueSelected)
//     window.location.href = `http://localhost:3000/home?cat=${valueSelected}`
// });



deleteCategory = () => {
    let name = $('#nameCategory').val();
    let check = $('.checkDelete:checkbox:checked')

    let arrayDelete = []
    $('input:checkbox').each(function () {
        var val = (this.checked ? $(this).val() : "");
        id = $(this).attr('id').toString().replace('check', '');
        // console.log(id);
        if (val == 'on') arrayDelete.push(id);
        // console.log(sThisVal);
    });
    // console.log(arrayDelete);

    // console.log(check);
    postData("http://localhost:3000/deleteCategory", { arrayDelete })
        .then((data) => {
            console.log(data);
            if (data.status == "ok")
                // window.location.href = `http://localhost:3000/home`
                window.location.reload();

        })
        .catch((data) => {
            console.log(data);
        })
}

$(".buttonEdit").click(() => {
    let id = event.target.id
    let name = $('#newNameProduct' + id.toString()).val();
    let price = $('#newPriceProduct' + id.toString()).val();
    // let link = $('#newLinkProduct' + id.toString()).val();

    postData("http://localhost:3000/updateProduct", { id, name, price })
        .then((data) => {
            // console.log(data);
            if (data.status == "ok")
                // window.location.href = `http://localhost:3000/home`
                window.location.reload();

        })
        .catch((data) => {
            console.log(data);
        })
    // console.log(price);

    // ?alert(id)
    // alert("Asdasd")
})
function saveProduct() {
    alert("asd")
}

saveCategory = () => {
    let name = $('#nameCategory').val();
    postData("http://localhost:3000/saveCategory", { name })
        .then((data) => {
            console.log(data);
            if (data.status == "ok")
                // window.location.href = `http://localhost:3000/home`
                window.location.reload();

        })
        .catch((data) => {
            console.log(data);
        })
    // alert(name)
}
$(function () {

    $('#login-form-link').click(function (e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function (e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

});
