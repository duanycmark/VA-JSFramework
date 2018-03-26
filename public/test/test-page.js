/**
 * Created by duanyc on 2017/7/13.
 */

var a = 1;

//加载
$('#start').click(function () {

    // VA('body').loadingAnimation('canvasLoading');

    // VA('body@background:rgba(0, 0, 0, .7)').loadingAnimation('svg', {
    //     width: 80,
    //     height: 80,
    //     color: '#20a0ff'
    // });

    // VA().prompt('你一共点了 ' + a + ' 次');

    //动态生成modal
    // VA().alertModal('你确定你要删除这个？？？', function success() {
    //     console.log('success');
    // }, function error() {
    //     console.log('error');
    // });


    //激活html中已有的modal

    // V().alertModal('#myModal', function success() {
    //     console.log('successCallback');
    // }, function error() {
    //     console.log('errorCallback');
    // });

    // ================================================加载按钮
    VA('#start@color:#ccc').loadBtn(true, '#ccc', '保存中...');
    // ================================================加载按钮

    // =========================================== SVG
    // VA('body').loadingAnimation('svg');
    // =========================================== SVG

    a++;
});

//删除动画
$('#delete').click(function () {

    // VA().hideAnimation();

    VA('#start').loadBtn(false);
});


//搜索框
$('input[V-searchInput="#prompt"]').click(function () {

    var list = ['a', 'a1', 'a2', 'a3', 'a4', 'a5', 'ni', '你好', 's2', 'dsas', 'ddcx', 'asklx',
        '12iojnn90zx', '213hizx-09', '12jmioasnjkzx'];

    VA('#prompt').search('../libs/VirusAnimation/js/data.json', function (data, node) {
        console.log(data);
        console.log(node);
    });
});

//文件预览功能
//$('[V-fileInput="#image"]').each(function (i, e) {
//    $(e).click(function () {
//        var id, file, reader;
//        id = $(e).attr('V-fileInput');
//
//        $(this).change(function (eve) {
//            file = eve.target.files[0];
//            reader = new FileReader();
//
//            reader.onload = function (e) {
//                $(id).prop('src', e.target.result);
//            };
//
//            reader.readAsDataURL(file);
//        })
//
//    });
//});

//下拉框
$('#dropdownMenu').click(function () {
    V('#dropdownMenu').dropdown('down', function (e) {
        console.log(e);
    });
});

//init
$('#example').tooltip();
