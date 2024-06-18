const ATTACK_VALUE = 10;//(2) 글로벌 범위는 보통 대문자+언더바로 명명, 상수니까 const로 선언
const MONSTER_ATTACK_VALUE = 14; //
const STRONG_ATTACK_VALUE = 17; // (17) 강공격 버튼을 위해 상수 선언
const HEAL_VALUE = 20; //(28) 힐 VALUE 상수 선언

//1)2)순서상관없음
let chosenMaxLife = 100; //(1) 하드코딩으로 일단 맥스라이프 선언, 변수니까 let으로 선언
let currentMonsterHealth = chosenMaxLife; //(6) 괴물 체력 변수 선언
let currentPlayerHealth = chosenMaxLife; //(7) 플레이어 체력 변수 선언

adjustHealthBars(chosenMaxLife); //(3)게임을 로드할때마다 화면을 업데이트하게 함

//(31)endRound함수 선언 - 상황에 상관없이 게임이 끝나면 함수가 선언되도록 만든다.
function endRound() {
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE); 
    currentPlayerHealth -= playerDamage; 
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) { 
        alert('You won!');
    } 
    else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0){ 
        alert('You lost!'); 
    }
    else if (currentMonsterHealth <=0 && currentPlayerHealth <=0){
        alert('You have a draw!') 
    }
}

function attackMonster(mode){//(20)코드 중복을 제거하기 위한 함수 하나 선언했음
    let maxDamage; //(22)
    if(mode === 'ATTACK'){ //(21)
        maxDamage = ATTACK_VALUE; //(23)
    } else{ //(24)
        maxDamage = STRONG_ATTACK_VALUE; //(25)
    }
    //(26) 원래 만들어둔 dealMonsterDamage 함수를 들고와서 ATTACK_VALUE를 MaxDamage로 바꿔준다.
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    endRound(); //(32)endround함수 만든걸 입력하기

    //아래는 모두 endRound 함수 내부로 옮겼음
    // const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE); 
    // currentPlayerHealth -= playerDamage; 
    // if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) { 
    //     alert('You won!');
    // } 
    // else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0){ 
    //     alert('You lost!'); 
    // }
    // else if (currentMonsterHealth <=0 && currentPlayerHealth <=0){
    //     alert('You have a draw!') 
    // }
}

//(27) 아래 주석처리된 내용 확인 요망
function attackHandler() {  
    attackMonster('ATTACK')}
function strongAttackHandler(){ 
    attackMonster('STRONG_ATTACK')}

//(30)힐버튼에 함수 달아줬음 vendor.js함수 들고왔음
function healPlayerHandler() {
    let healValue; //(34)if조건문을 만들어 현재체력이 chosenMaxLife보다 크거나 같은지 확인할것임
    if(currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) { //(35)초기 체력보다 플레이어의 체력이 더 높아지지 않도록 하는 조건
        alert("You can't heal to more than your max initial health.") //(36)경고 문구 입력
        healValue = chosenMaxLife - currentMonsterHealth; // (37)맥스에서 현재 체력을 뺀 값을 반환시켜 최대치보다 더 충전시켜 주지 않겠다는 단호한 의지를 밝힘
    }
    else {
        healValue = HEAL_VALUE;//(38)조건이 만족되지 않는다면 전역함수 heal_value만큼 체력 보충해줘라
    }
    // increasePlayerHealth(HEAL_VALUE);
    increasePlayerHealth(healValue); //(39)최대체력과 현재 체력을 반영하는 동적값이므로 HEAL_VALUE에서 healValue로 변경해준다.

    
    currentPlayerHealth+= HEAL_VALUE;//(34)현재 플레이어 체력에 추가되도록 적용
    endRound(); //(33) endRound 함수에 다시 만든걸 재활용
}

//(27) attackHandler와 strongAttackHandler안에 필요 내용만 남겨둔다.
//아래는 모두 주석처리하겠음 공부해야되니까!
// function attackHandler() {  //(5)vendor.js에 있는 dealMonstrDamange함수를 불러왔다
//     const damage = dealMonsterDamage(ATTACK_VALUE);
//     currentMonsterHealth -= damage; //(8)클릭하면 괴물 체력 까임
//     const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE); //(10)몬스터가 때리면 플레이어 체력 까이게 만듬
//     currentPlayerHealth -= playerDamage; //11
//     if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) { //(14) and연산자 추가
//         alert('You won!'); //(9)
//     } 
//     // else {
//     //     alert('You lost, loser');
//     // }
//     // else로 하면 한번 클릭하고 currentMonsterHealth가 0보다 크면 바로 실행되서
//     //여기서는 else if로 적어줘야됨
//     //else if를 하면 체력이 0보다 크더라도 플레이어의 체력이 0이 아닌 이상 경고창이 안뜸

//     else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0){ // (12) else->else if로 변경, (15) and연산자 추가
//         alert('You lost!'); //(13)
//     }
//     else if (currentMonsterHealth <=0 && currentPlayerHealth <=0){
//         alert('You have a draw!') //(16)둘다 체력이 0일 경우 동점입니다 반환되도록 하는 조건문 추가
//     }
// }

// function strongAttackHandler(){ //(18) 공격버튼 함수 복사
//     const damage = dealMonsterDamage(ATTACK_VALUE);
//     currentMonsterHealth -= damage;
//     const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE); 
//     currentPlayerHealth -= playerDamage; 
//     if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) { 
//         alert('You won!');
//     } 
//     else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0){ 
//         alert('You lost!'); 
//     }
//     else if (currentMonsterHealth <=0 && currentPlayerHealth <=0){
//         alert('You have a draw!') 
//     }
// } 여기까지 주석처리 했음


attackBtn.addEventListener('click', attackHandler); //(4)ATTACK 버튼 이벤트 핸들러 함수 선언
strongAttackBtn.addEventListener('click', strongAttackHandler); //(19)스트롱ATTACK 버튼 이벤트 핸들러 함수 선언
healBtn.addEventListener('click', healPlayerHandler) //(29)