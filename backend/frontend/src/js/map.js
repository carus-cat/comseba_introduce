var mapContainer = document.getElementById("map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(37.3980292, 126.6438333), // 지도의 중심좌표
    level: 3, // 지도의 확대 레벨
  };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

function setCenter() {
  // 이동할 위도 경도 위치를 생성합니다
  var moveLatLon = new kakao.maps.LatLng(37.3980292, 126.6438333);

  // 지도 중심을 이동 시킵니다
  map.setCenter(moveLatLon);
}

function panTo() {
  // 이동할 위도 경도 위치를 생성합니다
  var moveLatLon = new kakao.maps.LatLng(37.3980292, 126.6438333);

  // 지도 중심을 부드럽게 이동시킵니다
  // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
  map.panTo(moveLatLon);
}

// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

function getInfo() {
  // 지도의 현재 중심좌표를 얻어옵니다
  var center = map.getCenter();

  // 지도의 현재 레벨을 얻어옵니다
  var level = map.getLevel();

  // 지도타입을 얻어옵니다
  var mapTypeId = map.getMapTypeId();

  // 지도의 현재 영역을 얻어옵니다
  var bounds = map.getBounds();

  // 영역의 남서쪽 좌표를 얻어옵니다
  var swLatLng = bounds.getSouthWest();

  // 영역의 북동쪽 좌표를 얻어옵니다
  var neLatLng = bounds.getNorthEast();

  // 영역정보를 문자열로 얻어옵니다. ((남,서), (북,동)) 형식입니다
  var boundsStr = bounds.toString();

  var message = "지도 중심좌표는 위도 " + center.getLat() + ", <br>";
  message += "경도 " + center.getLng() + " 이고 <br>";
  message += "지도 레벨은 " + level + " 입니다 <br> <br>";
  message += "지도 타입은 " + mapTypeId + " 이고 <br> ";
  message +=
    "지도의 남서쪽 좌표는 " +
    swLatLng.getLat() +
    ", " +
    swLatLng.getLng() +
    " 이고 <br>";
  message +=
    "북동쪽 좌표는 " + neLatLng.getLat() + ", " + neLatLng.getLng() + " 입니다";

  // 개발자도구를 통해 직접 message 내용을 확인해 보세요.
  // ex) console.log(message);
}
