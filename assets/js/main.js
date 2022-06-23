const tweetpostElm = document.querySelector('.tweetPost input[type="text"]');
const tweetSubBtn = document.querySelector('.tweetPost [type="submit"]');
const tweetCountElm = document.querySelector('.countHere');
const tweetSearchElm = document.querySelector('.searchTweets input[type="text"]');
const tweetListElm = document.querySelector('.tweetList');
const orderedTwitterlistElm = document.querySelector('.tweetList ol');
const tweetListTextElm = document.querySelector('.tweetList ol li');
const postTime = document.querySelector('.postTime');
const deleteBtn = document.querySelector('.dlt-btn');

let tweetArr = [];
let tweetWordArr = 0;

function resetTweetText(){
    tweetpostElm.value = '';
}

function gettingTweetText(){

        let tweetText = tweetpostElm.value;
        // console.log(tweetText);

        return tweetText;
}

function validInputs(textVal){
    if(textVal === ''){
        alert('Write something')
    }
}

tweetSubBtn.addEventListener('click', function(e){
    e.preventDefault();

    const id = tweetArr.length;

    tweetCountElm.textContent = 0;
    const tweetText = gettingTweetText();
    // console.log(tweetText)

    validInputs(tweetText);

    resetTweetText();

    // console.log(tweetArr);

    // var dateObj = new Date();
    // var month = dateObj.getUTCMonth() + 1; //months from 1-12
    // var day = dateObj.getUTCDate();
    // var year = dateObj.getUTCFullYear();

    // newdate = year + "/" + month + "/" + day;
    

    // let postTime =  newdate;

    let date = new Date().toDateString();

    // let currDate = date.toLocaleString();
    // console.log(typeof currDate)

    // console.log(postTime);

    tweetArr.push({
        id : id,
        post : tweetText,
        time : date
    })


    listingTweets(id, tweetText, date);

    console.log(tweetArr);

    showFilterItem(tweetArr);

    storeDataLocalStorage(tweetArr);

})

function countWord(){

    let tweetText = tweetpostElm.value;
    tweetWordLength = tweetText.split(' ').length;

    tweetCountElm.textContent = tweetWordLength;

    if(tweetWordLength > 250 ){
        alert('Word Limit reached');
    }
}

tweetpostElm.addEventListener('keyup', function(e){


    countWord();
})

// console.log(tweetTextArr.length)

function listingTweets(id, post, postTime){

    // console.log(postTime);

    // console.log(tweet)


            let tweetElm =
        `
        <li class="item-${id}"> ${post}
        <br>
        <br>
        <p class="postTime"><b><i>${postTime}</i></b></p>
        <br>
        <button class="dlt-btn">Delete</button>
        </li>
        `

        orderedTwitterlistElm.insertAdjacentHTML('beforeend', tweetElm)
}

tweetSearchElm.addEventListener('keyup', e => {
    const filterValue = e.target.value;
    const filterPost = tweetArr.filter( item => item.post.includes(filterValue));


    showFilterItem(filterPost)
})

function showFilterItem(fillterItem){
    orderedTwitterlistElm.innerHTML = '';
    fillterItem.forEach(element => {
        let tweetElm =
        `
        <li class="item-${element.id}">${element.post}
        <br>
        <br>
        <p class="postTime"><b><i>${element.currDate}</i></b></p>
        <br>
        <button class="dlt-btn">Delete</button>
        </li>
        `

        orderedTwitterlistElm.insertAdjacentHTML('beforeend', tweetElm)
    });
}


orderedTwitterlistElm.addEventListener('click', e => {
    if(e.target.classList.contains('dlt-btn')){
        
    }
    let id = getItemId(e.target);
    removeTweetFromList(id);
    removeTweetFromArr(id);

    // console.log(tweetArr)
    
})

function removeTweetFromArr(id){
    let filterTweet = tweetArr.filter( elm => elm.id !== id);
    tweetArr = filterTweet;
    console.log(tweetArr);
}

function removeTweetFromList(id){
    document.querySelector(`.item-${id}`).remove();
    // console.log(idLoc);
}

function getItemId(itemId){
    const liElm = itemId.parentElement.classList[0].split('-')[1];

    return Number(liElm);
    
    // console.log(liElm);
}

// store data in localStorage

function storeDataLocalStorage(tweet){
    let tweets;
    if(!localStorage.getItem('posts')){
        
        tweets = tweet;
        
        // console.log(tweets);
        localStorage.setItem('posts', JSON.stringify(tweets))
    }else{
        tweets = JSON.parse(localStorage.getItem('posts'));
        tweets.push(tweet)
        localStorage.setItem('posts', JSON.stringify(tweets));
        // tweets.push(tweet);
    }
    
}

const time = document.querySelector('.time');
time.textContent = new Date().toDateString();