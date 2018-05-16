/**
 * VirusAnimation
 *
 * Created by duanyc
 *
 * Update:2017/10/26
 *
 */

angular.module('app', ['ngRoute'])

    .controller('indexCtrl', function ($scope, $http, $location) {

        $scope.documentInit = function () {

            $scope.libList.loadList('css');

            //Click Register
            $('#V_navBar_collapse').find('li').click(function () {

                $(this).parent().find('li').each(function (i, e) {
                    $(e).removeClass('active');
                });

                $(this).addClass('active');
            });

            //init DemoTransform
            $('.V-nav').css({'transform': 'translateY(0)'});
        };

        $scope.logoSkip = function () {
            window.location.href = '/test/VirusAnimation-Test-Demo.html';
        };

        $scope.libList = {

            loadList: function (type) {
                var file;

                V('body@bg:rgba(0, 0, 0, .7)').loadingAnimation('svg', {
                    width: 80,
                    height: 80
                });

                switch (true) {
                    case type === 'css':
                        file = 'baseCss';
                        break;

                    case type === 'js':
                        file = 'baseJs';
                        break;

                    case type === 'template':
                        file = 'baseTemplate';
                        break;
                }

                $http.get('./data/' + file + '.json')
                    .then(function (response) {

                        setTimeout(function () {
                            V().hideAnimation();
                        }, 650);

                        $.each(response.data, function (i, e) {
                            e.description = e.description.split('/n').join('<code><br></code>');
                        });
                        $scope.nodeList = response.data;
                    })
            },

            downLoadCode: function (t) {
                window.open('./downloadCode/VirusAnimation_ES'+ t +'.zip');
            }
        }

    });
