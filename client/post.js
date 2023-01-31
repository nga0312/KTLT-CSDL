
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

function postElement(post){

    console.log('post',post)
    const searchParams = new URLSearchParams(post);
    const queryString = searchParams.toString();
    const query = 'detalItem.html?' + queryString;

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


    anchorElement.appendChild(div);
    div.appendChild(postImgElement);
    div.appendChild(div2);
    div2.appendChild(postTitleElement);
    div2.appendChild(postIntroElement);

    return anchorElement;
}