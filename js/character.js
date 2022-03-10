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
  // 마지막 스크롤 위치
  this.lastScrollTop = 0;
  // x축 위치
  this.xPos = info.xPos;
  // 좌우 이동 속도
  this.speed = info.speed;
  // 방향
  this.direction = '';
  // 좌우 이동 여부
  this.runningState = false;
  // 애니메이션프레임 id
  self.rafId = 0;
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

      // console.log('lastScrollTop: ' + self.lastScrollTop);
      // console.log('scrollY: ' + this.scrollY);

      // 이전 스크로 위치와 현재 스크롤 위치를 비교
      if (self.lastScrollTop > this.scrollY) {
        // 이전 스크롤 위치가 크다면: 스크롤 올림
        // backward
        self.mainElem.dataset.direction = 'backward';
      } else {
        // 이전 스크롤 위치가 크다면: 스크롤 내림
        // forward
        self.mainElem.dataset.direction = 'forward';
      }

      self.lastScrollTop = this.scrollY;
    });

    window.addEventListener('keydown', function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (self.runningState) return;

      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].indexOf(e.key) > -1) {
        self.mainElem.classList.add('running');

        if (e.key === 'ArrowLeft') {
          self.direction = 'left';
          self.mainElem.dataset.direction = 'left';
        } else if (e.key === 'ArrowRight') {
          self.direction = 'right';
          self.mainElem.dataset.direction = 'right';
        } else if (e.key === 'ArrowUp') {
          self.direction = 'up';
        } else if (e.key === 'ArrowDown') {
          self.direction = 'down';
        }

        self.runningState = true;
        self.run();
      }
    });

    window.addEventListener('keyup', function (e) {
      self.mainElem.classList.remove('running');
      this.cancelAnimationFrame(self.rafId);
      self.runningState = false;
    });
  },
  run: function () {
    const self = this;

    if (['left', 'right'].indexOf(self.direction) > -1) {
      if (self.direction === 'left') {
        self.xPos -= self.speed;
      } else if (self.direction === 'right') {
        self.xPos += self.speed;
      }

      if (self.xPos < 2) {
        self.xPos = 2;
      } else if (self.xPos > 88) {
        self.xPos = 88;
      }

      self.mainElem.style.left = self.xPos + '%';
    } else if (['up', 'down'].indexOf(self.direction) > -1) {
      if (self.direction === 'up') {
        window.scrollTo(window.scrollX, window.scrollY + 20);
      } else if (self.direction === 'down') {
        window.scrollTo(window.scrollX, window.scrollY - 20);
      }
    }

    self.rafId = requestAnimationFrame(self.run.bind(self));
  },
};
