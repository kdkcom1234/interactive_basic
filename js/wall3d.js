(function () {
  const stageElem = document.querySelector('.stage');
  const houseElem = document.querySelector('.house');
  const barElem = document.querySelector('.progress-bar');
  const mousePos = { x: 0, y: 0 };
  let maxScrollValue;

  function resizeHandler() {
    // 문서의 전체 높이에서 창높이제외(처음출력되는 화면 높이는 스크롤이 아님)
    // 예) 문서높이가 500vh이면 100vh는 스크롤x, 400vh만 스크롤 발생
    maxScrollValue = this.document.body.offsetHeight - this.window.innerHeight;
  }

  // 창 스크롤 이벤트
  window.addEventListener('scroll', function () {
    // console.log(this.scrollY / maxScrollValue);

    // 스크롤 비율
    const scrollPer = this.scrollY / maxScrollValue;

    // 1. 중앙벽 z축 이동
    // 사이드 벽 길이가 1000vw임(전체 트랙길이)
    // 기본적으로 중앙벽은 500vw만큼 밀려나 있음
    // 끝까지 Z축 이동이 안되도록 조정
    const zMove = scrollPer * (1000 - 10) - 500;
    houseElem.style.transform = 'translateZ(' + zMove + 'vw)';

    // 2. 스크롤 진행도 상단 표시
    barElem.style.width = scrollPer * 100 + '%';
  });

  window.addEventListener('mousemove', function (e) {
    // console.log(e.clientX + ' ' + e.clientY);
    // 가운데가 0, 0, 좌측끝은 -1, 0, 우측끝은 1 0
    // 상단끝은 0 1, 하단끝은 -1 0
    mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
    mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;

    stageElem.style.transform = 'rotateX(' + mousePos.y * 5 + 'deg) rotateY(' + mousePos.x * 5 + 'deg)';
  });

  // 창 크기 변경 이벤트
  window.addEventListener('resize', resizeHandler);
  resizeHandler();

  new Character();
})();
