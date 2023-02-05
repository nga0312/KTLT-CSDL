
const apiUrl = 'http://localhost:5500'

// hàm gọi data từ http://localhost:5500/api/items
async function fetchPosts(){
    try{
    const response = await fetch(`${apiUrl}/api/items`);

    if(!response.ok){
        throw new Error(`Failed to fetch posts: ${response.status}`)
    }

    return response.json();
} catch(e){
    console.log('error', e);
}
}

// hàm tìm kiếm vị trí display các sản phẩm
function listsPosts(postContainerElementId) {
    const postContainerElement = document.getElementById(postContainerElementId);

    if(!postContainerElement){
        return ;
    }

    fetchPosts().then(posts => {
        if(!posts) {
            postContainerElement.innerHTML = 'No posts fetched.'; 
            return; 
        }

        for( const post of posts){
            postContainerElement.appendChild(postElement(post));
        }
    }).catch(e =>{
        console.log('error', e);
    })
}

// hàm display sản phẩm và kiểm tra thuộc tính cần tìm kiếm
function postElement(post){

    console.log('post',post)

    // truyền queryString sang trang detalItem
    const searchParams = new URLSearchParams(post);
    const queryString = searchParams.toString();
    const query = 'detalItem.html?' + queryString;

    const div1 = document.createElement('div');
    div1.className = 'item hide'

    const anchorElement = document.createElement('a');
    anchorElement.setAttribute('href', `${apiUrl}/${query}`);
    anchorElement.setAttribute('target', '_black');

    const div = document.createElement('div');
    div.className = "third container margin-bottom"
    div.style.cssText = "height:450px";

    const postImgElement = document.createElement('img');
    postImgElement.src = "./img/" + post.image;
    postImgElement.className = "hover-opacity";
    postImgElement.style.cssText = "width:60%";

    const div2 = document.createElement('div');
    div2.className = "container white"

    const postTitleElement = document.createElement('b');
    postTitleElement.innerText = post.productname;
    postTitleElement.className = "ItemName"

    const postIntroElement = document.createElement('h6');
    postIntroElement.innerText = post.intro;

    const postTypeProduct = document.createElement('input');
    postTypeProduct.type = 'hidden';
    postTypeProduct.value = post.typeproduct;
    postTypeProduct.className = 'type';
    // console.log(postTypeProduct.value)

    const postColor = document.createElement('input');
    postColor.type = 'hidden';
    postColor.value = post.color;
    postColor.className = 'color';

    const postBrand= document.createElement('input');
    postBrand.type = 'hidden';
    postBrand.value = post.brand;
    postBrand.className = 'brand';

    const postSize = document.createElement('input');
    postSize.type = 'hidden';
    postSize.value = post.size;
    postSize.className = 'size';

    div1.appendChild(anchorElement);
    anchorElement.appendChild(div);
    div.appendChild(postImgElement);
    div.appendChild(div2);
    div2.appendChild(postTitleElement);
    div2.appendChild(postIntroElement);
    // giá trị filter
    div2.appendChild(postTypeProduct);
    div2.appendChild(postColor);
    div2.appendChild(postBrand);
    div2.appendChild(postSize);

    return div1;
}


function filterItem(value){
    console.log('value',value)

    let elements = document.querySelectorAll(".item");
    // console.log('element', elements[1]);
    let type =  document.querySelectorAll(".type");
    let color =  document.querySelectorAll(".color");
    let brand =  document.querySelectorAll(".brand");
    let size =  document.querySelectorAll(".size");

    elements.forEach((element, index) => {
        if(value === 'All'){
            element.classList.remove('hide');
        }
        else{
            console.log(type[index].value)
           
            if(value ===  type[index].value || 
                value === color[index].value ||
                value === brand[index].value ||
                value === size[index].value){
                element.classList.remove('hide');
            }
            else{
                element.classList.add('hide');
            }
        }
    })
}




// search input 
document.getElementById('search').addEventListener('click', ()=>{
    let searchInput = document.getElementById('search-input').value;
    let elements = document.querySelectorAll('.ItemName')
    let cards = document.querySelectorAll('.item')
    console.log(searchInput);
    elements.forEach((element, index) =>{
        if(element.innerText.includes(searchInput.toUpperCase())){
            cards[index].classList.remove('hide');
        }
        else {
            cards[index].classList.add('hide');
        }
    })
})

//sau khi load xong trang mới chạy hiện thị listsPosts
window.onload = () =>{
    filterItem('All')
}