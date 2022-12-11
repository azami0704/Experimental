
let data = [];

axios.get('https://hexschool.github.io/ajaxHomework/data.json')
    .then(function (response) {
        data = response.data;
        render();
    });

    function render(){
        const title = document.querySelector('.title');
        title.innerHTML = data[0].name;
    }