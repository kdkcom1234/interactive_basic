function Character(info) {
  console.log(info);
  this.mainElem = document.createElement('div');
  this.mainElem.classList.add('character');
  this.mainElem.innerHTML = `
  <div class="character-face-con character-head">
    <div class="character-face character-head-face face-front"></div>
    <div class="character-face character-head-face face-back"></div>
  </div>
  <div class="character-face-con character-torso">
    <div class="character-face character-torso-face face-front"></div>
    <div class="character-face character-torso-face face-back"></div>
  </div>
  <div class="character-face-con character-arm character-arm-right">
    <div class="character-face character-arm-face face-front"></div>
    <div class="character-face character-arm-face face-back"></div>
  </div>
  <div class="character-face-con character-arm character-arm-left">
    <div class="character-face character-arm-face face-front"></div>
    <div class="character-face character-arm-face face-back"></div>
  </div>
  <div class="character-face-con character-leg character-leg-right">
    <div class="character-face character-leg-face face-front"></div>
    <div class="character-face character-leg-face face-back"></div>
  </div>
  <div class="character-face-con character-leg character-leg-left">
    <div class="character-face character-leg-face face-front"></div>
    <div class="character-face character-leg-face face-back"></div>
  </div>
  `;

  document.querySelector('.stage').appendChild(this.mainElem);

  this.mainElem.style.left = info.xPos + '%';

  // 스크롤 중인지 아닌지
  this.scrollState = 0;
  this.init();
}

// prototype: 객체들의 공통 함수, 속성 정의
// prototype 객체 재정의라서 생성자 함수를 정의 해야함
Character.prototype = {
  constructor: Character,
  init: function () {
    const self = this;
    window.addEventListener('scroll', function (e) {
      // 스크롤이 되면 기존에 등록된 멈춤(running 제거) 타임아웃을 클리어함
      this.clearTimeout(self.scrollState);

      // 스크롤이 되면 초기 상태이거나, 멈춤(running 제거)이 실행됐을 때만 running을 추가함
      if (!self.scrollState) {
        self.mainElem.classList.add('running');
      }

      // 스크롤이 끝나고 0.1초 후에 running 제거
      self.scrollState = this.setTimeout(function () {
        self.scrollState = 0;
        self.mainElem.classList.remove('running');
      }, 500);
    });
  },
};
