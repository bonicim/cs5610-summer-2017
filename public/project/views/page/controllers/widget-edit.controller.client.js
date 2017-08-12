(function() {
  angular
    .module("Yobai")
    .controller("EditWidgetController", EditWidgetController)

  function EditWidgetController($routeParams, $location, WidgetService) {
    var vm = this;
    vm.uid = $routeParams.uid;

    vm.updateWidget = updateWidget;
    vm.deleteWidget = deleteWidget;

    function updateWidget(widget, uid) {
      WidgetService.updateYouTubeWidgetByUser(widget, uid)
        .then(function (widget) {
          console.log("Updated youtube:", widget);
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
