(function() {
    angular
        .module("wbdvSortable", [])
        .directive('wbdvsortable', wbdvsortableDir)

    function wbdvsortableDir() {

        function linker(scope, element, attrs) {
            console.log("Entering sortable directive.");
            var start = -1;
            var end = -1;
            $(element)
                // sortable is some function that takes two maps as inputs; each map's value is a function
                .sortable({
                    // gets the item's index of array containing the item
                    start: function(event, ui) {
                        start = $(ui.item).index();
                    },
                    // sets start and end to new values if end >= start
                    stop: function (event, ui) {
                        end = $(ui.item).index();
                        console.log(start, end);
                        // if(start >= end) {
                        //     start--;
                        // }
                        if(end >= start){
                            end = end + 1;
                        }
                        console.log(start, end);
                        scope.callback({
                            start : start,
                            end : end
                        });
                    }
                });
        }

        var directive =  {
            // Used as attribute, class, or element
            restrict : 'ACE',
            // todo: add comment
            scope : {
                callback : '&'
            },
            // Post-link function
            link : linker
        };

        return directive;
    }

})();