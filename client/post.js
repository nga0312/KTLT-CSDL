
const apiUrl = 'http://localhost:5500'

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


function listsPosts(postContainerElementId, filter) {
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
            postContainerElement.appendChild(postElement(post, filter));
        }
    }).catch(e =>{
        console.log('error', e);
    })
}

function postElement(post, filter){

    console.log('post',post)
    const searchParams = new URLSearchParams(post);
    const queryString = searchParams.toString();
    const query = 'detalItem.html?' + queryString;

    const divClass = document.createElement('div');
    divClass.style.cssText = "display: block; visibility: visible;"
    
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

    const postIntroElement = document.createElement('h6');
    postIntroElement.innerText = post.intro;

    divClass.appendChild(anchorElement);
    anchorElement.appendChild(div);
    div.appendChild(postImgElement);
    div.appendChild(div2);
    div2.appendChild(postTitleElement);
    div2.appendChild(postIntroElement);

    // const hasItems = true;

    if(filter !== 'ALL'){
        const hasItems = check(post, filter);
        console.log(hasItems);
        if(hasItems === false){
            divClass.style.cssText = "display: none; visibility: visible;"
        }
    }

    return divClass;
}

function filterItems(postContainerElementId){
    const btns = document.querySelectorAll('.btn')
    console.log(btns)

    let filter;
    // console.log('filter1',filter)
    // listsPosts(postContainerElementId, filter)
    for (let i = 0;i <btns.length; i++){
        btns[i].addEventListener('click', (e)=>{
            e.preventDefault();
            filter = e.target.dataset.filter;
            // filter = e.target.dataset.filter;
            listsPosts(postContainerElementId, filter)
            console.log('filter2',filter)


        })
    }
}

function check(post, filter){
    var check = false;
    for (let key in post){
        if(post[key] == filter) {
            check = true;
        }
    }
    return check;
}