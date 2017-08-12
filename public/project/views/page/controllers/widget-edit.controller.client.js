(function() {
  angular
    .module("Yobai")
    .controller("EditWidgetController", EditWidgetController)

  function EditWidgetController($routeParams, $location, WidgetService) {
    var vm = this;
    vm.uid = $routeParams.uid;

    vm.updateWidget = updateWidget;
    vm.updatePhotoWidgetByUser = updatePhotoWidgetByUser;
    vm.updateIdealDateWidgetByUser = updateIdealDateWidgetByUser;
    vm.deleteWidget = deleteWidget;


    function updateIdealDateWidgetByUser(widget, uid) {
      WidgetService.updateWidgetByUserByType(widget, uid, "IDEALDATE")
        .then(function (widget) {
          $location.url("/user/public/" + vm.uid +"/" + vm.uid);
        })
        .catch(function (err) {
          console.log(err);
        })
    }

    function updateWidget(widget, uid) {
      WidgetService.updateWidgetByUserByType(widget, uid, "YOUTUBE")
        .then(function (widget) {
          console.log("Updated youtube:", widget);
          $location.url("/user/public/" + vm.uid +"/" + vm.uid);
        })
        .catch(function (err) {
          console.log(err);
        })
    }

    function updatePhotoWidgetByUser(widget, uid) {
      WidgetService.updateWidgetByUserByType(widget, uid, "PROFPHOTO")
        .then(function (widget) {
          console.log("Updated photo:", widget);
          $location.url("/user/public/" + vm.uid +"/" + vm.uid);
        })
        .catch(function (err) {
          console.log(err);
        })

    }

    function deleteWidget(widget, uid) {

    }
  }

}) ();
