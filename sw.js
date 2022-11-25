//캐싱 스토리지에 저장될 이름
// var CHCHE_NAME = "pwa-offline-v1";
//캐싱할 웹자원(이미지,css..)목록을 배열로
// var filesToCache = ["/", "/images/screenshot1.PNG"];
var CHCHE_NAME = "pwa-offline-v2";
var filesToCache = [
  "/", 
  "/images/screenshot1.PNG",
  "css/main.css",
  "css/responsive.css" //새로추가
];

//서비스워커 설치(웹자원 캐싱)
self.addEventListener("install", function (event) {
	event.waitUntil( //인스톨이 끝날때 까지
		caches
			.open(CHCHE_NAME)
			//CHCHE_NAME변수 이름으로 캐시 스토리지에 캐시를 생성 -> pwa파일 나옴
			//caches - 캐시스토리지에 접근할 수 있는 예약어
			.then(function (cache) {
				// 캐싱이 성공했을때(위에 결과물 캐시파일)
				return cache.addAll(filesToCache); //pwa파일 웹자원 추가
			})
      .catch(function (error) {
        return console.log(error);
      })
	); 
});

// 서비스워커 설치후 네트워크 요청이 있을때는 캐쉬로 돌려줌(캐쉬된 자원으로)
self.addEventListener('fetch', function (event) {
  console.log('[Service Worker Fatch]')
  event.respondWith( //fetch과에 대한 응답을 알려주는 api
    caches.match(event.request) //caches.match() - 네트워크에 요청에 해당하는 캐싱을 반환
    .then(function (response) {
      return response || fetch(event.request) //  캐쉬에 없을때는 fetch API(네트워크로 가서 가져옴)
    })
    .catch(function (error) {
      return console.log(error);
    })
  )
})
// 서비스워커 활성화 및 업데이트 
self.addEventListener('activate', function (event) {
  var newCacheList =  "pwa-offline-v2"  //바뀐 내용
  event.waitUntil( // 내부 동작이 끝날때까지 기다려줌
    caches.keys() //객체안의 모든 키들, 스토리지 모든 목록을 확인
    .then(function (cacheList) { // 위의 목록을 가져온다
      return Promise.all( // 여러 비동기 작업을 동시에 처리하여 결과를 얻고자 할때
      cacheList.map(function (cacheName) {
        //새로운 서비스워커에서 사용할 캐시 이외의 것들은 모두 삭제
        if (newCacheList.indexOf(cacheName) === -1) {
          
          //문자열.indexOf('찾을문자') - 같은게 몇번째 인지 알아옴
          //새로운 newCacheList가 캐쉬리스트 아이템에 없을 경우
          return caches.delete(cacheName)
        }
        
      })
      )
    })
    .catch(function (error) {
      return console.log(error);
    })
  )
})