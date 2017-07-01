(function() {
    angular
        .module("wbdvSortable", [])
        .directive('wbdvsortable', wbdvsortableDir)

    function wbdvsortableDir() {
        function linker(scope, element) {
            alert('testing');
            //do some sorting stuff
            // element.sortable();
        }

        return {
            link : linker
        }
    }

})();