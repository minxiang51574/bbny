function resetCopyRight() {
    var domTag = ["a", "span", "p", "div"];
    var reg0 = /\u5907/; //备
    var reg1 = /copyright/i;
    var reg2 = /\u7248\u6743/; //版权
    var reg3 = /[0-9]{8,}/; //数字
    var reg4 = /\u5907\u6848\u53f7/; //备案号
    var reg5 = /icp/i;
    for (var i = 0; i < domTag.length; i++) {
        var doms = document.getElementsByTagName(domTag[i])
        for (var j = 0; j < doms.length; j++) {
            var dom = doms[j]
            if (dom.getAttribute('icp_link') || (dom.children && dom.children.length > 0)) {
                continue
            }
            var text = dom.innerText
            if (text && text.length < 100) {
                if (reg0.test(text) && reg3.test(text) && (reg1.test(text) || reg2.test(text) || reg4.test(text) || reg5.test(text))) {
                    dom.innerText = ""
                }
            }
        }
    }
}
resetCopyRight();

function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}
var scriptDoms = document.getElementsByTagName('script');
for (var j = 0; j < scriptDoms.length; j++) {
    if (scriptDoms[j].id == "icp_script" && !scriptDoms[j].getAttribute("icp")) {
        var icp_style = document.createElement('style');
        icp_style.setAttribute('type', 'text/css');
        icp_style.append('.icp-footer{background-color: transparent;z-index: 9999;padding: 10px 0;font-size: 12px;display: flex;justify-content: center;}');
        icp_style.append('.icp-footer .item:last-child {border-right: none;}');
        var icp_link = document.createElement('a');
        icp_link.setAttribute('href', 'https://beian.miit.gov.cn');
        icp_link.setAttribute('target', '_blank');
        icp_link.setAttribute('class', 'item');
        icp_link.setAttribute('icp_link', '1')
        icp_link.append('备案号：蜀ICP备12007864号-1');
        var icp_div = document.createElement('div');
        icp_div.setAttribute('class', 'icp-footer');
        icp_div.appendChild(icp_link);

        insertAfter(icp_div, scriptDoms[j]);
        insertAfter(icp_style, scriptDoms[j]);
        scriptDoms[j].setAttribute("icp", "done");
    }
}






