
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

// function postElement(post){
//     const anchorElement = document.createElement('a');
//     // anchorElement.setAttribute('href', `${apiUrl}/items/${post.id}`);
//     anchorElement.setAttribute('href', `${apiUrl}/detalItem.html`);
//     anchorElement.setAttribute('target', '_black');
//     anchorElement.innerText = post.productname;


//     const postTitleElement = document.createElement('h5');
//     postTitleElement.className = "container white"

//     const postIntroElement = document.createElement('h6');
//     postIntroElement.innerText = post.intro;

//     const div = document.createElement('div');
//     div.className = "third container margin-bottom"

//     const postImgElement = document.createElement('img');
//     postImgElement.src = post.image;
//     postImgElement.className = "hover-opacity";
//     postImgElement.style.cssText = "width:40%";

//     postTitleElement.appendChild(div)
//     postTitleElement.appendChild(postImgElement)
//     postTitleElement.appendChild(anchorElement)
//     postTitleElement.appendChild(postIntroElement)
 

//     return postTitleElement;

// }

function postElement(post){
    const anchorElement = document.createElement('a');
    // anchorElement.setAttribute('href', `${apiUrl}/items/${post.id}`);
    anchorElement.setAttribute('href', `${apiUrl}/detalItem.html`);
    anchorElement.setAttribute('target', '_black');
    // anchorElement.innerText = post.productname;

    const div = document.createElement('div');
    div.className = "third container margin-bottom"
    div.style.cssText = "height:450px";

    const postImgElement = document.createElement('img');
    postImgElement.src = post.image;
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