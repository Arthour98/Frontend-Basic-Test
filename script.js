// script.js

// Συνάρτηση για fetch των posts και εμφάνιση λίστας
let postsContainer=document.getElementById("posts");
let postList=document.createElement('ul');

function postCreation(data,start,length)
{
  postsContainer.appendChild(postList);
  //dhmiourgw mia function gia genikh xrhsh gia to an 8elw na fetcharw
  //sugkekrimena posts sto sugkekrimeno container 
    for(let i=start;i<length;i++)
    {
    let listItem=document.createElement('li');
    listItem.setAttribute("class","post");
    listItem.setAttribute("data-id",data[i].id)
    listItem.textContent=data[i].title;
    postList.appendChild(listItem);
    }
}

function detailsCreation(data=[],container)
{
const title=document.createElement("h2");
const body=document.createElement('p');
const comments=document.createElement('ul');


title.className="post-title";
body.className='post-body';
comments.className="post-comments";


container.appendChild(title)
container.appendChild(body);
container.appendChild(comments)

let [data1,data2]=data

title.textContent="Title:  "+data1.title;
body.textContent=data1.body;

for(let i=0;i<data2.length;i++)
{
  let  comment=document.createElement('li');
  comment.textContent=data2[i].body
  comments.appendChild(comment);
}
////o rolos ths sugkekrimenhs sunarthshs einai na dhmiourghsei ta elements ta opoia tha
////mpoune sto detailsDiv , kai to periexomeno tous , o logos pou dhmiourghsa thn sunarthsh 
///einai gia na mhnei o kwdikos katharos sthn asynxrwnh sunarth pou fetcharei ta dedomena !!!!
}

async function getPosts() {
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
    if(posts)
    {
    postCreation(posts,0,10); //edw thn kalw :) 
    let postNodes=document.getElementsByClassName('post');
    let postElems=Array.from(postNodes);
        postElems.forEach(post=>post.addEventListener('click',function()
      {
        let id=post.getAttribute('data-id');
        showDetails(id);
         //edw kalw thn function pou me ton sugkekrimeno id pou to exw ws attribute
        //fetcharei to sugkekrimeno post me ta details,comments tou !
      }));
    }
   
    // TODO: Εμφανίστε τα πρώτα 10 posts στο #posts div
  } catch (error) {
    document.getElementById('posts').innerText = 'Σφάλμα φόρτωσης δεδομένων';
  }
}

// Συνάρτηση για εμφάνιση λεπτομερειών και σχολίων για ένα post
async function showDetails(id) {
  const detailsDiv = document.getElementById('details');
  detailsDiv.innerHTML = '';
  try {
    const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const post = await postRes.json();
    const commentsRes = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
    const comments = await commentsRes.json();
    detailsCreation([post,comments],detailsDiv)
    // TODO: Εμφανίστε τα post details και τα comments στο detailsDiv
  } catch (error) {
    detailsDiv.innerText = 'Σφάλμα φόρτωσης λεπτομερειών';
  }
}

document.addEventListener('DOMContentLoaded', getPosts);

