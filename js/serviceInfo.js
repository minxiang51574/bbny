function isMobile() {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  )
    return true;
  return false;
}
function isWeiXin() {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
}
function IEVersion() {
  var userAgent = navigator.userAgent;
  var isIE =
    userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;
  var isEdge = userAgent.indexOf("Edge") > -1 && !isIE;
  var isIE11 =
    userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
  if (isIE) {
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    if (fIEVersion == 7) {
      return 7;
    } else if (fIEVersion == 8) {
      return 8;
    } else if (fIEVersion == 9) {
      return 9;
    } else if (fIEVersion == 10) {
      return 10;
    } else {
      return 6;
    }
  } else if (isEdge) {
    return "edge";
  } else if (isIE11) {
    return 11;
  } else {
    return false;
  }
}
$(function () {
  isMobile() ? (isMobile = true) : (isMobile = false);
  isWeiXin() ? (isWeiXin = true) : (isWeiXin = false);
  var isMac = /macintosh|mac os x/i.test(navigator.userAgent);
  $("[data-url]")
    .each(function (i) {
      var imgsrc = $(this).attr("data-url");
      var myclassname = $(this).attr("class");
      if (typeof myclassname === "undefined") {
        myclassname = "";
      }
      if (
        /^https:\/\/sjzz\.ilhjy\.cn/.test(imgsrc) &&
        myclassname.indexOf("_ORGBG") === -1
      ) {
        var _ext = imgsrc.split(".");
        if (/@/.test(_ext[_ext.length - 1])) {
          var _extv = _ext[_ext.length - 1].split("@");
          if (_extv.length > 2) {
            var _n = imgsrc.split("@");
            imgsrc = _n[0] + "@" + _extv[_extv.length - 1];
          }
          if (!isMobile) {
          }
        } else {
          if (!isMobile) {
            if (!isMac && !IEVersion()) {
              imgsrc = imgsrc + "@f_webp,q_80";
            }
          } else {
            if (!$(this).attr("keepImgOrg")) {
              imgsrc = imgsrc + "@w_750,l_1,f_jpg,q_80";
            }
          }
        }
        $(this).attr("data-url", imgsrc);
      }
    })
    .scrollLoading();
  $("#fullPage").each(function () {
    $(this)
      .find("[data-lib]")
      .each(function (i) {
        var _u = $(this).attr("data-url");
        var _c = $(this).css("background-color");
        $(this).css({ "background-color": "transparent" });
        $(this).parent().css({ "background-color": _c });
        if (typeof _u != "undefined") {
          $(this)
            .parent()
            .css("background-image", "url(" + _u + ")");
          $(this).css({ "background-image": "url()" }).removeAttr("data-url");
        }
      });
  });
  $("div[data-lib]").hover(function (e) {
    if (typeof $(this).attr("data-url") != "undefined") {
      var imgsrcc = $(this).attr("data-url");
      $(this)
        .css("background-image", "url('" + imgsrcc + "')")
        .removeAttr("data-url");
    }
    $(this)
      .find("[data-url]")
      .each(function (i) {
        var imgsrc = $(this).attr("data-url");
        if ($(this)[0].tagName != "IMG") {
          $(this)
            .css("background-image", "url('" + imgsrc + "')")
            .removeAttr("data-url");
        } else {
          $(this).attr("src", imgsrc).removeAttr("data-url");
        }
      });
  });
  $("a").each(function (i) {
    var url = $(this).attr("href");
    if (url === "") {
      $(this).attr("href", "####").css({ cursor: "default" });
    }
  });
  $(".sysWapTitle").each(function (i) {
    if ($(this).find("h2>p>img").attr("alt")) {
      $(this).find("h2").text($(this).find("h2>p>img").attr("alt"));
    } else {
      $(this).find("h2").text($(this).find("h2").text());
    }
    $(this).find("p").text($(this).find("p").text());
  });
  $(
    ".sys_tit1,.sys_tit2,.sys_tit3,.sys_tit4,.sys_tit5,.sys_tit6,.sys_tit7,.sys_tit8,.sys_tit9"
  ).each(function () {
    if (
      $(this).find("h2").text() != "" &&
      (isMobile === true || $(window).width() < 768)
    ) {
      $(this).find("h2").html($(this).find("h2").text());
    }
    if ($(this).find("p").text() != "" && isMobile === true) {
      $(this).find("p").html($(this).find("p").text());
    }
  });
  if (
    typeof window.lanh != "undefined" &&
    typeof window.lanh.apiHost != "undefined"
  ) {
    $.get(
      window.lanh.apiHost + "service/cms_api/get_version.html",
      function (d) {
        var d = eval("(" + d + ")");
        console.log(d);
        if (
          (d.data.web < 0 && isMobile != false) ||
          (d.data.wap < 0 && isMobile === true && isWeiXin != true) ||
          (d.data.wx < 0 && isMobile === true && isWeiXin === true)
        ) {
          console.log("不支持");
        } else {
          console.log("支持");
        }
      }
    );
  }
});
document.addEventListener("keydown", bodyListener, false);
document.addEventListener("keyup", function (e) {
  $("div[data-libcode]").unbind("click");
});
function bodyListener(e) {
  if (e.keyCode === 69 && e.altKey && e.target === document.body) {
    $("div[data-libcode]").click(function () {
      var str = $(this).attr("data-libcode").split("-");
      if (/^[0-9]*$/.test(str[1])) {
        window.open(
          "https://utool.iwanshang.cloud/g-do-" +
            $(this).attr("data-libcode") +
            "-" +
            $(this).attr("data-lib")
        );
      } else {
        window.open("http://u.etion.org/g-do-" + $(this).attr("data-libcode"));
      }
      $("div[data-libcode]").unbind("click");
    });
    e.preventDefault();
    e.returnValue = false;
    return false;
  }
}
function dofullPage() {
  if ($(window).width() > 768 || window.parent.$(window).width() > 768) {
    $("#fullPage").fullpage({
      navigation: true,
      controlArrows: false,
      slidesNavigation: true,
      onLeave: function (index, nextIndex, direction) {
        $("#fullPage > .section")
          .eq(nextIndex - 1)
          .find("[data-url]")
          .each(function (i) {
            var imgsrc = $(this).attr("data-url");
            if ($(this)[0].tagName != "IMG") {
              $(this)
                .css("background-image", "url(" + imgsrc + ")")
                .removeAttr("data-url");
            } else {
              $(this).attr("src", imgsrc).removeAttr("data-url");
            }
          });
        setTimeout(function () {
          $("#fullPage > .fp-completely")
            .find(".aos-init")
            .addClass("aos-animate");
          $("#fullPage > div:not(.fp-completely)")
            .find(".aos-init")
            .removeClass("aos-animate");
        }, 1000);
      },
    });
  }
}
$("#search_btn").click(function () {
  var text = $("#sear_text").val();
  window.location.href = "/search?search_key=" + text;
});
$(window).on("scroll", function () {
  if ($(window).scrollTop() > 0) {
    $(".lib40917467_3wap1header").addClass("lib40917467_3wap1po");
  } else {
    $(".lib40917467_3wap1header").removeClass("lib40917467_3wap1po");
  }
});
$(function () {
  $(".lib40917467_3wap1header .icon_toggle").on("click", function () {
    $(".searchbar").toggleClass("open");
  });
  $(".lib40917467_3wap1header .nav_toggle").on("click", function () {
    $(this).toggleClass("showhide");
    $(".nav").toggleClass("showslide");
    $(".overlay").toggleClass("active");
    $(".searchbar").removeClass("open");
    $(".wrap").toggleClass("posfix");
    if ($(".lib40917467_3wap1header .nav").height() == 0) {
      $("body").css({ position: "fixed", width: "100%" });
    } else {
      $("body").css("position", "static");
    }
  });
  $(".lib40917467_3wap1header .overlay").on("click", function () {
    $(this).toggleClass("active");
    $(".nav").removeClass("showslide");
    $(".nav_toggle").removeClass("showhide");
  });
  $(".lib40917467_3wap1header .nav").on("click", function () {
    $(this).removeClass("showhide");
  });
  $(".lib40917467_3wap1header .nav_add").on("click", function () {
    var cn = $(this).parent().hasClass("cur");
    if (cn == false) {
      $(this).parent().addClass("cur");
      $(this).parent().find(".subnav").slideDown();
      $(this).parent().siblings().removeClass("cur");
      $(this).parent().siblings().find(".subnav").removeClass("showhide");
      $(this).parent().siblings().find(".subnav").slideUp();
    } else {
      $(this).parent().removeClass("cur");
      $(this).parent().find(".subnav").slideUp();
    }
  });
  $(".lib40917467_3wap1header .nav .wrap_nav ul li .subnav").each(function () {
    var plus = $(this).find("a").text();
    if (plus == "") {
      $(this).parent().find(".nav_add").hide();
    }
  });
});
onkeydown = "return ClearSubmit(event)";
function ClearSubmit(e) {
  if (e.keyCode == 13) {
    return false;
  }
}
$(function () {
  $(".lib40917467_3 .t-nav ul li").each(function () {
    var dhej = $(this).find(".erjp a").size();
    if (dhej > 0) {
      $(this).hover(
        function () {
          $(this).find(".erjp").show();
          $(".erjsv").show();
          $(this).addClass("on");
        },
        function () {
          $(this).find(".erjp").hide();
          $(".erjsv").hide();
          $(this).removeClass("on");
        }
      );
    }
  });
});
var bgUrl = $(".lib52860540_1wap1 .bgg").attr("data-url");
if (bgUrl == "") {
  $(".lib52860540_1wap1 .bgg").css({ "min-height": "auto" });
}
$(function () {
  var src = $(".lib52860540_1 .image img").attr("data-url");
  if (src == "" || src == null) {
    var pht = $(".lib52860540_1").css("padding-top");
    var phb = $(".lib52860540_1").css("padding-bottom");
    var th = parseInt(pht) + parseInt(phb);
    $(".lib52860540_1 .bg").css({
      position: "absolute",
      top: "50%",
      height: th,
      "margin-top": -th / 2,
    });
  }
});
$(document).ready(function () {
  var href = $(".lib52860540_1 .bg>a").attr("href");
  if (href == "") {
    $(".lib52860540_1 .bg>a").removeAttr("href");
  }
});
$(function () {
  var subtext = $(".lib61793912_1 .crumbs").find("span").text();
  if (subtext != "") {
    $(".lib61793912_1 .crumbs span").addClass("has");
  }
});
window._bd_share_config = {
  common: {
    bdSnsKey: {},
    bdText: "",
    bdMini: "2",
    bdMiniList: false,
    bdPic: "",
    bdStyle: "0",
    bdSize: "16",
  },
  share: {},
};
with (document)
  (0)[
    ((getElementsByTagName("head")[0] || body).appendChild(
      createElement("script")
    ).src =
      "http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=" +
      ~(-new Date() / 36e5))
  ];
window._bd_share_config = {
  common: {
    bdSnsKey: {},
    bdText: "",
    bdMini: "2",
    bdMiniList: false,
    bdPic: "",
    bdStyle: "0",
    bdSize: "16",
  },
  share: {},
};
with (document)
  (0)[
    ((getElementsByTagName("head")[0] || body).appendChild(
      createElement("script")
    ).src =
      "http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=" +
      ~(-new Date() / 36e5))
  ];
$(document).ready(function () {
  $(".news_info_detail .news_pcon").find("img").addClass("spotlight");
});
var news_info_detaildes1 = $(".news_info_detail .news_tit .des span").text();
var news_info_detaildes2 = $(".news_info_detail .news_tit .des p").text();
if (news_info_detaildes1 == "" && news_info_detaildes2 == "") {
  $(".news_info_detail .news_tit .des").hide();
}
$(document).ready(function () {
  $(".lib11380064_4news_info_detail .news_pcon")
    .find("img")
    .addClass("spotlight");
});
var lib11380064_4news_info_detaildes1 = $(
  ".lib11380064_4news_info_detail .news_tit .des span"
).text();
var lib11380064_4news_info_detaildes2 = $(
  ".lib11380064_4news_info_detail .news_tit .des p"
).text();
if (
  lib11380064_4news_info_detaildes1 == "" &&
  lib11380064_4news_info_detaildes2 == ""
) {
  $(".lib11380064_4news_info_detail .news_tit .des").hide();
}
var menu_id = $(".lib11380064_4wap1 .news_hot").attr("data-id");
var isArt_id = $(".lib11380064_4wap1 .news_hot").attr("data-artId");
var temp = $(".lib11380064_4wap1 .det_page").attr("data-temp");
$.ajax({
  url: lanh.apiHost + "/service/cms_article/list.html",
  type: "GET",
  data: { menu_id: menu_id },
  dataType: "json",
  async: true,
  success: function (result) {
    $.each(result.data, function (index, val) {
      var art_id = val.art_id;
      if (isArt_id < art_id) {
        $(".lib11380064_4wap1 #det_prev")
          .attr(
            "href",
            "/" +
              temp +
              "?art_id=" +
              val.art_id +
              "&menu=" +
              val.art_menu_guid +
              ""
          )
          .text(val.art_title);
      }
      if (isArt_id > art_id) {
        $(".lib11380064_4wap1 #det_next")
          .attr(
            "href",
            "/" +
              temp +
              "?art_id=" +
              val.art_id +
              "&menu=" +
              val.art_menu_guid +
              ""
          )
          .text(val.art_title);
      }
      if ($(".lib11380064_4wap1 #det_prev").text() == "") {
        $(".lib11380064_4wap1 #det_prev")
          .text("没有上一篇文章了")
          .removeAttr("href");
      }
      if ($(".lib11380064_4wap1 #det_next").text() == "") {
        $(".lib11380064_4wap1 #det_next")
          .text("没有下一篇文章了")
          .removeAttr("href");
      }
    });
  },
});
var lib28477374_13wap1txt = $(
  ".lib28477374_13wap1 .content p span >a:last-child"
).text();
if (lib28477374_13wap1txt == "") {
  $(".lib28477374_13wap1 .zizhi").hide();
}
$(window).scroll(function () {
  var scrollTop =
    document.documentElement.scrollTop ||
    window.pageYOffset ||
    document.body.scrollTop;
  var eltop = $(".lib40734406_16wap1").find(".my-kefu-ftop");
  if (scrollTop > 0) {
    eltop.show();
  } else {
    eltop.hide();
  }
});
$(".lib40734406_16wap1")
  .find(".my-kefu-ftop")
  .click(function () {
    var scrollTop =
      document.documentElement.scrollTop ||
      window.pageYOffset ||
      document.body.scrollTop;
    if (scrollTop > 0) {
      $("html,body").animate({ scrollTop: 0 }, "slow");
    }
  });
$(".lib40734406_16 .returnTop").click(function () {
  $("body,html").animate({ scrollTop: 0 }, 800);
  return false;
});
function scroll() {
  window.onscroll = function (event) {
    var evenObj = window.event || event;
    var scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    var banHeig = $(".banner").height();
    if (scrollTop >= banHeig) {
      $(".lib40734406_16 #float").removeClass("on").addClass("on");
    } else {
      $(".lib40734406_16 #float").removeClass("on");
    }
  };
}
scroll();
var h = $(".lib40734406_16 #float").height();
var th = h / 2;
$(".lib40734406_16 #float").css({ "margin-top": -th });
