(function() {
  angular
    .module("Yobai")
    .service("OmdbService", omdbService)
    .controller("PublicPageController", PublicPageController);

  function PublicPageController($routeParams, $location, $sce,
                                WidgetService, UserService, $window, OmdbService) {
    var vm = this;
    vm.uid = $routeParams.uid;
    vm.user = undefined;
    vm.firstName = undefined;
    vm.lastName = undefined;
    vm.age = undefined;
    vm.email = undefined;
    vm.viber = undefined;
    vm.line = undefined;
    vm.isSuitor = undefined;
    vm.branch = undefined;
    vm.rank = undefined;
    vm.google = undefined;
    vm.instagram = undefined;
    vm.photoUrl = undefined;
    vm.maleWidgets = {};
    vm.femaleWidgets = undefined;
    vm.movie = undefined;

    init();
    function init() {
      UserService.findUserById(vm.uid)
        .then(function (user) {
          vm.user = user;
          vm.isSuitor = vm.user.isSuitor;
          vm.firstName = vm.user.firstName;
          vm.lastName = vm.user.lastName;
          vm.age = vm.user.age;
          vm.email = vm.user.email;
          vm.viber = vm.user.viber;
          vm.line = vm.user.line;
          vm.isSuitor = vm.user.isSuitor;
          vm.branch = vm.user.branch;
          vm.rank = vm.user.rank;
          vm.google = vm.user.google;
          vm.instagram = vm.user.instagram;
        })
        .then(function() {
          WidgetService.findWidgetById(vm.user.page.common.widgets[0])
            .then(function (widget) {
              if (widget) {
                vm.photoUrl = widget.url;
              } else {
                vm.photoUrl = null;
              }
              console.log("Checking photoUrl: ", vm.photoUrl);
            });
        })
        .then(function () {
          if (vm.isSuitor) {
            var idealDateWidget = vm.user.page.public.widgets[0];
            WidgetService.findWidgetById(idealDateWidget)
              .then(function (widget) {
                if (widget) {
                  vm.maleWidgets.idealDate = widget;
                  console.log("ideal date is: ", vm.maleWidgets.idealDate);
                }
              })
          } else {
            // populate widgets that have the user and are pageLocation is public
            // check widgetType for IMAGE, YOUTUBE, ABOUTME
            console.log("The female uid: ", vm.user._id);
            WidgetService.findWidgetsByIdAndPageLocation(vm.user._id, "PUBLIC")
              .then(function (widgetsArr) {
                console.log("array of female widgets is: ", widgetsArr);
                vm.femaleWidgets = widgetsArr;
                console.log("array female widgets on browser: ", vm.femaleWidgets);
              })
              // then make some api call to instagram and pull some pictures from your instagram
              // display it dynamicall
              // pics are not saved in mongo
          }
        })
        .then(function () {
          // make a call to get the favorite movie
          console.log("fav movie is: ", vm.user.favoriteMovie);
          UserService.getOmdbKey()
            .then(function (key) {
              OmdbService.searchMovieTitle(vm.user.favoriteMovie, key)
                .then(function (movie) {
                  vm.movie = movie;
                })
                .then(function () {
                  OmdbService.getMoviePoster(vm.movie.imdbID, key)
                    .then(function (poster) {
                      $window.poster.src = poster;
                    })

                });
            });
        })
    }

    vm.trustHtml = trustHtml;
    vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
    vm.goToProfile = goToProfile;
    vm.goToEditWidget = goToEditWidget;

    function trustHtml(html) {
                           // scrub html
                           return $sce.trustAsHtml(html);
                           }

    function getYouTubeEmbedUrl(url) {
                                   var embedUrl = "https://www.youtube.com/embed/";
                                   var urlLinkParts = url.split('/');
                                   embedUrl += urlLinkParts[urlLinkParts.length - 1];
                                   return $sce.trustAsResourceUrl(embedUrl);
                                   }

    function goToProfile() {
      $location.url("/profile")
    }

    function goToEditWidget() {

    }

  }

  function omdbService($http) {
    var api = {
      "searchMovieTitle": searchMovieTitle,
      "getMoviePoster": getMoviePoster
    };
    return api;

    function searchMovieTitle(title, key) {
      // todo: put key in env variable
      var url = "http://www.omdbapi.com/?t="+title+"&apikey="+key+"";
      console.log("key", key);
      console.log("URL", url);
      return $http.get(url)
        .then(function (response) {
          return response.data;
        })

    }

    function getMoviePoster(imdbId, key) {
      // todo: put key in env variable
          var url = "http://img.omdbapi.com/?i="+imdbId+"&h=600&apikey="+key+"";
          return $http.get(url)
            .then(function (response) {
              return response.data;
            })

    }

  }

}) ();
