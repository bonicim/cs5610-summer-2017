(function() {
    angular
        .module("wbdvSortable", [])
        .directive('wbdvsortable', wbdvsortableDir)

    function wbdvsortableDir() {
        console.log("Entering sortable directive.");
        function linker(scope, element, attrs) {
            console.log("Entering sortable linker.");
            var start = -1;
            var end = -1;
            element
                .sortable({
                    // notifies when dragging of item begins
                    start: function(event, ui) {
                      start = $(ui.item).index();
                      console.log("start is: " + start);
                    },
                    // notifies when dragging stops
                    stop: function (event, ui) {
                        end = $(ui.item).index();
                        console.log("end is: " + end);
                        if(end >= start){
                            end = end + 1;
                        }
                        console.log("final start is: " + start);
                        console.log("final end is: " + end);
                        //scope.sortableController.sort(start,end);
                        scope.callback({
                             start : start,
                             end : end
                        });
                    }
                });
        }

        var directive =  {
            restrict : 'ACE',
            scope : {
                callback : '&'
            },
            link : linker
            //controller : sortableController,
            //controllerAs : 'sortableController'
        };

        return directive;
    }

    // function sortableController(WidgetService) {
    //   var vm =this;
    //   vm.sort = sort;
    //
    //   function sort(start, end) {
    //     WidgetService.sortWidgets(start,end,8);
    //     console.log("directive is starting to work");
    //     console.log([start, end]);
    //   }
    // }
})();