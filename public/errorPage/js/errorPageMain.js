/**
 * Created by YU HAO on 2016/5/16.
 */
window.onload = function() {
    var day=new Date();
    var d=day.getHours();
    document.getElementById('offlinePic').className += (d >= 6 && d <= 18  ? " daylight" : " moonlight");

    window.refreshWebPage_callback = function() {
    };

    var _cefCall = function(inputJson) {
        if (!window.cefQuery)
            return;

        var jsonString = JSON.stringify(inputJson);
        var jsCallString = "jsAsynCall('" + jsonString + "')";

        //alert('jsAsynCall JSON string:\n' + jsCallString);

        return window.cefQuery({
            request:jsCallString,
            persistent: false,
            onSuccess:function(e) {
                //alert('cefQuery successfully!\n' + e);
            },
            onFailure:function(e, t){
                //alert('cefQuery failed!\nerrCode = ' + e + '\nerrMsg = ' + t);
            }
        });
    };

    document.getElementById('refresh').onclick = function() {
        _cefCall({
            method:      "refreshWebPage",
            callback:    "refreshWebPage_callback"
        });
    };
};