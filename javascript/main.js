$(".gnb").click(function () {
  $(".tab_gnb_inner").animate({ left: 0 }, 700, "swing");
  $(".mb_gnb_inner").animate({ left: 0 }, 700, "swing");
  $(".dark").css({ display: "block" });
});

$(".tab_gnb_content_close").click(function () {
  $(".tab_gnb_inner").animate({ left: -1000 }, 700, "swing");
  $(".mb_gnb_inner").animate({ left: -350 }, 700, "swing");
  $(".dark").css({ display: "none" });
});


$(".dark").click(function () {
  $(".tab_gnb_inner").animate({ left: -1000 }, 700, "swing");
  $(".mb_gnb_inner").animate({ left: -350 }, 700, "swing");
  $(".dark").css({ display: "none" });
});
