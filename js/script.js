let btn = document.querySelector('#btn').addEventListener('click', async () => {
  let request = new XMLHttpRequest();
  request.open('GET', 'https://picsum.photos/v2/list?page=2&limit=100');
  request.send();

  request.addEventListener('load', function () {
    let data = JSON.parse(this.responseText);
    // console.log(data);
    data.map(Item => {
      let img = document.createElement('img');
      let div = document.createElement('div');
      div.id = 'card';
      let p = document.createElement('p');
      img.src = `${Item.download_url}`;
      p.innerHTML = `Name : ${Item.author}`;

      div.appendChild(img);
      div.appendChild(p);
      document.body.appendChild(div);
    });
  });
});
