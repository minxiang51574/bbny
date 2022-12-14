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
          console.log("?????????");
        } else {
          console.log("??????");
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
$(".lib87467138_4wap1 .banner").slick({
  infinite: true,
  autoplay: true,
  dots: true,
  arrows: false,
});
$(".lib87467138_4 .slideBox").slide({
  titCell: ".hd ul",
  mainCell: ".bd ul",
  autoPage: true,
  effect: "fold",
  autoPlay: true,
  delayTime: 500,
});
$(".NPqpqsb8wap1 .slidelist").slick({
  dots: true,
  infinite: true,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
  ],
});
$(".NPqpqsb8 .faqs").slide({
  mainCell: ".faqs_cl",
  vis: 2,
  scroll: 1,
  effect: "leftMarquee",
  autoPlay: "True",
  interTime: "25",
});
$(".OLqphlj8wap1 .slidebox").slide({
  mainCell: "ul",
  autoPlay: true,
  effect: "leftMarquee",
  vis: 3,
  interTime: 50,
  trigger: "click",
});
$(function () {
  jQuery(".OLqphlj8 .coop_list").slide({
    mainCell: "ul",
    effect: "leftLoop",
    vis: 5,
    autoPlay: true,
  });
});
$(document).ready(function () {
  $(".lib49896503_6wap1 .lib49896503_6wap1videosamplex1").click(function () {
    $(this).css({ opacity: "1", transition: "1s", "transition-delay": "0.5s" });
    $(".lib49896503_6wap1 .picmask1").css({ opacity: "0", transition: "0.5s" });
  });
  var cover = $(".lib49896503_6wap1 .attribute1").attr("data-cover");
  var videofile = $(".lib49896503_6wap1 .attribute1").attr("data-video");
  var format = $(".lib49896503_6wap1 .attribute1").attr("data-format");
  var definition = $(".lib49896503_6wap1 .attribute1").attr("data-definition");
  var videoObject = {
    container: ".lib49896503_6wap1videosamplex1",
    variable: "player",
    poster: cover,
    mobileCkControls: true,
    mobileAutoFull: false,
    h5container: "#lib49896503_6wap1videoplayer1",
    video: [[videofile, format, definition, 0]],
  };
  var player = new ckplayer(videoObject);
  $(".lib49896503_6wap1 .promptvv").css({ transform: "scale(0)" });
  $(".lib49896503_6wap1 canvas").css({ transform: "scale(0.7)" });
});
$(document).ready(function () {
  $(".lib49896503_6 .lib49896503_6videosamplexs").click(function () {
    $(this).css({ opacity: "1", transition: "1s", "transition-delay": "0.5s" });
    $(".lib49896503_6 .picmasks").css({ opacity: "0", transition: "0.5s" });
  });
  var cover = $(".lib49896503_6 .attribute").attr("data-cover");
  var videofile = $(".lib49896503_6 .attribute").attr("data-video");
  var format = $(".lib49896503_6 .attribute").attr("data-format");
  var definition = $(".lib49896503_6 .attribute").attr("data-definition");
  var videoObject = {
    container: ".lib49896503_6videosamplexs",
    variable: "player",
    poster: cover,
    mobileCkControls: true,
    mobileAutoFull: false,
    h5container: "#lib49896503_6videoplayers",
    video: [[videofile, format, definition, 0]],
  };
  var player = new ckplayer(videoObject);
  $(".lib49896503_6 .promptvv").css({ transform: "scale(0)" });
  $(".lib49896503_6 canvas").css({ transform: "scale(0.7)" });
});
$(".lib74962874_8wap1 .all a").click(function () {
  $(".lib74962874_8wap1 .dec").addClass("cur").siblings().clickClass("cur");
});
$(".lib74962874_8wap1 .all").click(function () {
  $(this).addClass("none").siblings().removeClass("none");
  $(".lib74962874_8wap1 .list2").addClass("cur2").siblings().clickClass("cur2");
});
jQuery(".lib74962874_8 .dhfz").slide({});
$(function () {
  var lib77932230_6wap1tit_num = $(".lib77932230_6wap1 .sys_tit1 sysWapTitle")
      .find("h2")
      .text(),
    lib77932230_6wap1desc_num = $(".lib77932230_6wap1 .sys_tit1 sysWapTitle")
      .find("p")
      .text();
  if (lib77932230_6wap1tit_num == "" && lib77932230_6wap1desc_num == "") {
    $(".lib77932230_6wap1 .sys_tit1 sysWapTitle").hide();
  }
  var lib77932230_6wap1leg = $(".lib77932230_6wap1 .nav>ul>li").length;
  if (lib77932230_6wap1leg <= 1) {
    $(".lib77932230_6wap1 .nav").hide();
  }
  $(".lib77932230_6wap1 .nav ul li").each(function () {
    var plus = $(this).find("p.maintitle").text();
    str = plus.replace(/\s+/g, "");
    if (str == "") {
      $(".lib77932230_6wap1 .nav").hide();
    }
  });
  var lib77932230_6wap1href = $(
    ".lib77932230_6wap1 .more .partner-more"
  ).text();
  if (lib77932230_6wap1href == "") {
    $(".lib77932230_6wap1 .more").hide();
  }
  var lib77932230_6wap1maintit_num = $(".lib77932230_6wap1 .textcons")
    .find(".maintitle")
    .text();
  if (lib77932230_6wap1maintit_num == "") {
    $(".lib77932230_6wap1 .textcons").hide();
  }
});
var bgUrl = $(".lib42791380_4wap1 .bgg").attr("data-url");
if (bgUrl == "") {
  $(".lib42791380_4wap1 .bgg").css({ "min-height": "auto" });
}
$(function () {
  var src = $(".lib42791380_4 .image img").attr("data-url");
  if (src == "" || src == null) {
    var pht = $(".lib42791380_4").css("padding-top");
    var phb = $(".lib42791380_4").css("padding-bottom");
    var th = parseInt(pht) + parseInt(phb);
    $(".lib42791380_4 .bg").css({
      position: "absolute",
      top: "50%",
      height: th,
      "margin-top": -th / 2,
    });
  }
});
$(document).ready(function () {
  var href = $(".lib42791380_4 .bg>a").attr("href");
  if (href == "") {
    $(".lib42791380_4 .bg>a").removeAttr("href");
  }
});
var bgUrl = $(".lib43663023_6wap1 .bgg").attr("data-url");
if (bgUrl == "") {
  $(".lib43663023_6wap1 .bgg").css({ "min-height": "auto" });
}
$(function () {
  var src = $(".lib43663023_6 .image img").attr("data-url");
  if (src == "" || src == null) {
    var pht = $(".lib43663023_6").css("padding-top");
    var phb = $(".lib43663023_6").css("padding-bottom");
    var th = parseInt(pht) + parseInt(phb);
    $(".lib43663023_6 .bg").css({
      position: "absolute",
      top: "50%",
      height: th,
      "margin-top": -th / 2,
    });
  }
});
$(document).ready(function () {
  var href = $(".lib43663023_6 .bg>a").attr("href");
  if (href == "") {
    $(".lib43663023_6 .bg>a").removeAttr("href");
  }
});
$(function () {
  var lib21878492_6wap13href = $(
    ".lib21878492_6wap13 .more .partner-more"
  ).text();
  if (lib21878492_6wap13href == "") {
    $(".lib21878492_6wap13 .more").hide();
  }
  if (lib21878492_6wap13href != "") {
    $(".lib21878492_6wap13").css("padding-bottom", "3rem");
  }
});
var h = $(".lib21878492_6 .pinz_bg").height();
var pht = $(".lib21878492_6 .pinz_bg").css("padding-top");
var phb = $(".lib21878492_6 .pinz_bg").css("padding-bottom");
var th = h + parseInt(pht) * 2 + parseInt(phb);
$(".lib21878492_6 .mainbg").css({ "margin-top": -th });
$(function () {
  $(".lib80260779_7wap1 .advantagelist ul li").each(function () {
    var lib80260779_7wap1num = $(this).find(".d1").text();
    var lib80260779_7wap1num2 = $(this).find(".d2").text();
    var lib80260779_7wap1num3 = $(this).find(".d3").text();
    var lib80260779_7wap1num4 = $(this).find(".d4").text();
    var lib80260779_7wap1title = $(this).find(".maintitle").text();
    if (lib80260779_7wap1num == "") {
      $(this).find(".d1").hide();
    }
    if (lib80260779_7wap1num2 == "") {
      $(this).find(".d2").hide();
    }
    if (lib80260779_7wap1num3 == "") {
      $(this).find(".d3").hide();
    }
    if (lib80260779_7wap1num4 == "") {
      $(this).find(".d4").hide();
    }
    if (lib80260779_7wap1title == "") {
      $(this).find(".desc").css({ "margin-top": "0" });
    }
  });
});
$(".lib80260779_7 .ysy dl").each(function () {
  $(this)
    .find("h3 span")
    .text("0" + $(this).index());
});
$(function () {
  var lib80260779_7href = $(".lib80260779_7 .ysy h4 em a").text();
  if (lib80260779_7href == "") {
    $(".lib80260779_7 .ysy h4").hide();
  }
});
$(".lib75952032_8wap7 .banner").slick({
  infinite: true,
  dots: true,
  arrows: false,
  responsive: [
    { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
  ],
});
var lib75952032_8wap7href = $(".lib75952032_8wap7 .more .partner-more").text();
if (lib75952032_8wap7href == "") {
  $(".lib75952032_8wap7 .more").hide();
}
if (lib75952032_8wap7href != "") {
  $(".lib75952032_8wap7").css("padding-bottom", "3rem");
}
$(".lib49428774_8wap1 .banner").slick({
  infinite: true,
  dots: true,
  arrows: false,
  responsive: [
    { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
  ],
});
var li_len = $(".lib49428774_8wap1 .nav ul li").length;
if (li_len <= 0) {
  $(".lib49428774_8wap1 .nav").hide();
}
$(".lib49428774_8wap1 .nav ul li").each(function () {
  var plus = $(this).find("p.maintitle").text();
  str = plus.replace(/\s+/g, "");
  if (str == "") {
    $(".lib49428774_8wap1 .nav").hide();
  }
});
$(".lib49428774_8 .xzbj").slide({
  titCell: ".hd ul",
  mainCell: ".bd2 ul",
  autoPage: true,
  effect: "left",
  autoPlay: true,
  vis: 3,
});
$(function () {
  $(".lib46083756_11wap1").slide({
    titCell: ".nav li",
    mainCell: ".list",
    autoPlay: false,
    titOnClassName: "on",
    effect: "left",
    vis: 1,
  });
  var lib46083756_11wap1leg = $(".lib46083756_11wap1 .nav>ul>li").length;
  if (lib46083756_11wap1leg <= 1) {
    $(".lib46083756_11wap1 .nav").hide();
  }
  var lib46083756_11wap1href = $(
    ".lib46083756_11wap1 .more .partner-more"
  ).text();
  if (lib46083756_11wap1href == "") {
    $(".lib46083756_11wap1 .more").hide();
  }
});
var RGr98nxbwap1txt = $(".RGr98nxbwap1 .content p span >a:last-child").text();
if (RGr98nxbwap1txt == "") {
  $(".RGr98nxbwap1 .zizhi").hide();
}
var RGr98nxbtxt = $(".RGr98nxb .content p span >a:last-child").text();
if (RGr98nxbtxt == "") {
  $(".RGr98nxb .zizhi").hide();
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
