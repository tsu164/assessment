'use strict';
const usernameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');
 /**
  * 指定した要素の子どもを全て削除する
  * @param {HTMLElement} element HTMLの要素
  */
 function removechildlen(element) {
     while (element.firstChild) {
         element.removeChild(element.firstChild);
     }
 }
assessmentButton.onclick = function() {
    const username = usernameInput.value;
    if (username.length === 0){
        return;
    }
    console.log('押した'+ username);
    //エリア作成
    removechildlen(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '結果';
    resultDivided.appendChild(header);
    const paragraph = document.createElement('p');
    const result = assessment(username);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    //tweetarea
    removechildlen(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
    + encodeURIComponent('きみの飯田橋')
    + '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #きみの飯田橋';
    tweetDivided.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script)
};
usernameInput.onkeydown = function(event){
    if (event.key === 'Enter') {
        assessmentButton.onclick();
    }
}
const answers = [
    '{username}は生きている',
    '{username}は死んでいる',
    '{username}は死にかけている',
    '{username}は生まれた',
    '{username}は寝た',
    '{username}は苦しい',
    '{username}は眠い',
    '{username}は永久',
    '{username}は起きた',
    '{username}は殺した',
    '{username}は悲しい',
    '{username}は楽しい',
    '{username}は虚',
    '{username}は帰った',
    '{username}は刺された',
    '{username}は来た'
];
/**
 * @param {string} username ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(username) {
    //コードを足す
    let sum = 0;
    for (let i = 0; i < username.length; i++) {
    sum = sum + username.charCodeAt(i);
    }
    //合計の余
    const index = sum % answers.length;
    let result = answers[index];
    result = result.replace(/\{username\}/g, username);
    return result;
}

