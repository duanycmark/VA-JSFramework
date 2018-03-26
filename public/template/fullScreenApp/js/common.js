/**
 *
 * Created by duanyc
 *
 * Versions : 1.0
 *
 * Update: 2017/08/14
 *
 */

console.time('commonJS RunTimer');
$(function () {
    var
        navBar, leftFunBox, leftFunView, leftFunChild;

    navBar = $('#navBar');
    leftFunBox = $('#left-function');
    leftFunView = $('.V_leftFunction_view');
    leftFunChild = $('.V_leftFunction_view_child');

    //init
    leftFunBox.find('li').each(function () {
        $(this).css('transform', 'translate(0,0)');
    });
    setTimeout(function () {
        viewShow(leftFunView.find('div:nth-child(1)'), true, function () {
            console.log('callback --> button1 --> init ');
        });
    }, 367);


    //navBar
    navBar.find('li').click(function () {
        $(this).parent().find('li').each(function () {
            $(this).removeClass();
        });
        $(this).addClass('active');
    });

    function viewShow(n, s, callback) {

        leftFunChild.not(n).fadeOut('slow').css('transform', 'translate(-800px, 0)');

        setTimeout(function () {
            s === true ? n.fadeIn('slow') : n.fadeOut('slow');

            n.css({transform: 'translate(0, 0)'});

            leftFunChild.not(n).css({
                display: 'none',
                transform: 'translate(-800px, 0)'
            });
            callback.apply(this);
        }, 290);
    }

    //leftFunction
    leftFunBox.find('li').click(function () {

        $(this).parent().find('li').each(function () {
            $(this).removeClass();
        });
        $(this).addClass('active');

        if ($(this).prop('id') === 'button1') {
            viewShow(leftFunView.find('div:nth-child(1)'), true, function () {
                console.log('callback --> button1');
            })
        } else if ($(this).prop('id') === 'button2') {
            viewShow(leftFunView.find('div:nth-child(2)'), true, function () {
                console.log('callback --> button2');
            })
        } else if ($(this).prop('id') === 'button3') {
            viewShow(leftFunView.find('div:nth-child(3)'), true, function () {
                console.log('callback --> button3');
            })
        } else if ($(this).prop('id') === 'button4') {
            viewShow(leftFunView.find('div:nth-child(4)'), true, function () {
                console.log('callback --> button4');
            })
        } else if ($(this).prop('id') === 'button5') {
            viewShow(leftFunView.find('div:nth-child(5)'), true, function () {
                console.log('callback --> button5');
            })
        }

    });


});
console.timeEnd('commonJS RunTimer');